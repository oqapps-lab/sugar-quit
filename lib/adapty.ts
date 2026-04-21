/**
 * Adapty wrapper for in-app subscriptions.
 *
 * IMPORTANT: `react-native-adapty` is a NATIVE module — it does NOT work in
 * Expo Go. To test purchases you need an Expo dev client built with
 * `expo prebuild` + `eas build --profile development`.
 *
 * In Expo Go (or before keys are set) every helper returns a mock so the UI
 * can still be navigated end-to-end. Set `EXPO_PUBLIC_ADAPTY_PUBLIC_KEY` and
 * run from a dev client to get real billing.
 */
import { isAdaptyConfigured } from './env';

export type Tier = {
  id: 'annual' | 'monthly';
  productId: string; // App Store product identifier
  priceLabel: string; // pre-formatted, e.g. "$79.99"
  perPeriodLabel: string; // "$6.67 / month" or "per month"
  trialDays?: number;
};

export type PurchaseResult =
  | { ok: true; tier: 'annual' | 'monthly'; entitlement: 'premium' }
  | { ok: false; error: string; code?: 'cancelled' | 'pending' | 'unknown' };

const MOCK_TIERS: Tier[] = [
  { id: 'annual',  productId: 'sugarquit.annual',  priceLabel: '$79.99', perPeriodLabel: '$6.67 / month', trialDays: 7 },
  { id: 'monthly', productId: 'sugarquit.monthly', priceLabel: '$9.99',  perPeriodLabel: 'per month' },
];

let _initialized = false;

export async function initAdapty(): Promise<{ ok: boolean; mock: boolean }> {
  if (!isAdaptyConfigured) return { ok: true, mock: true };
  if (_initialized) return { ok: true, mock: false };
  try {
    // Lazy-require so the native module isn't pulled into Expo Go bundle.
    const { adapty } = await import('react-native-adapty');
    await adapty.activate(process.env.EXPO_PUBLIC_ADAPTY_PUBLIC_KEY!, { logLevel: 'verbose' });
    _initialized = true;
    return { ok: true, mock: false };
  } catch {
    // Native module not available (Expo Go) — fall back to mock silently.
    return { ok: true, mock: true };
  }
}

// We treat the Adapty SDK objects as `unknown`-shape on purpose: the SDK type
// surface changes between minor versions and we only consume a few fields.
// The mock branch is the source of truth for our own shape (Tier).
type AdaptyAny = any; // eslint-disable-line @typescript-eslint/no-explicit-any

export async function getTiers(): Promise<Tier[]> {
  const init = await initAdapty();
  if (init.mock) return MOCK_TIERS;
  try {
    const mod: AdaptyAny = await import('react-native-adapty');
    const paywall = await mod.adapty.getPaywall('sugar_quit_default');
    const products: AdaptyAny[] = await mod.adapty.getPaywallProducts(paywall);
    return products.slice(0, 2).map((p, i): Tier => ({
      id: i === 0 ? 'annual' : 'monthly',
      productId: p.vendorProductId ?? p.productId ?? '',
      priceLabel: p.price?.localizedString ?? p.localizedPrice ?? '$0',
      perPeriodLabel: p.subscriptionPeriod?.unit ?? p.localizedSubscriptionPeriod ?? '',
      trialDays: p.introductoryOfferPhases ? 7 : undefined,
    }));
  } catch {
    return MOCK_TIERS;
  }
}

export async function purchase(tierId: 'annual' | 'monthly'): Promise<PurchaseResult> {
  const init = await initAdapty();
  if (init.mock) {
    // Mock-success in Expo Go so the UI flow can be walked.
    return { ok: true, tier: tierId, entitlement: 'premium' };
  }
  try {
    const mod: AdaptyAny = await import('react-native-adapty');
    const paywall = await mod.adapty.getPaywall('sugar_quit_default');
    const products: AdaptyAny[] = await mod.adapty.getPaywallProducts(paywall);
    const target = tierId === 'annual' ? products[0] : products[1];
    if (!target) return { ok: false, error: 'Product not found', code: 'unknown' };
    const result: AdaptyAny = await mod.adapty.makePurchase(target);
    if (result?.type === 'user_cancelled') {
      return { ok: false, error: 'cancelled', code: 'cancelled' };
    }
    if (result?.type === 'pending') {
      return { ok: false, error: 'pending', code: 'pending' };
    }
    const isActive = !!result?.profile?.accessLevels?.premium?.isActive;
    if (!isActive) return { ok: false, error: 'No premium entitlement', code: 'pending' };
    return { ok: true, tier: tierId, entitlement: 'premium' };
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Unknown error';
    const cancelled = /cancel/i.test(msg);
    return { ok: false, error: msg, code: cancelled ? 'cancelled' : 'unknown' };
  }
}

export async function restorePurchases(): Promise<{ ok: boolean; isPremium: boolean; error?: string }> {
  const init = await initAdapty();
  if (init.mock) return { ok: true, isPremium: false };
  try {
    const mod: AdaptyAny = await import('react-native-adapty');
    const profile: AdaptyAny = await mod.adapty.restorePurchases();
    const isPremium = !!profile?.accessLevels?.premium?.isActive;
    return { ok: true, isPremium };
  } catch (err) {
    return { ok: false, isPremium: false, error: err instanceof Error ? err.message : 'restore failed' };
  }
}
