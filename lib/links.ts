/**
 * Centralized external URLs used across the app (Privacy, Terms, Support, etc).
 *
 * Background: Apr 2026 user bug-report (kakoccc #37, #38) flagged that the
 * Privacy and Terms links point to `https://sugarquit.app/...` — a domain
 * that does not currently resolve (ECONNREFUSED at root). Apple App Store
 * Review WILL reject any submission that lists a Privacy Policy URL leading
 * to a dead host. Centralising the constants here means one edit covers
 * sign-in, sign-up, onboarding/auth and Profile/Settings pages.
 *
 * TODO before App Store submit:
 *   1. Stand up `sugarquit.app` (or replace with a working host such as
 *      GitHub Pages / Notion public page / Vercel static site).
 *   2. Publish the privacy policy + terms documents at the paths below.
 *   3. Smoke-test each link from a fresh device.
 *   4. Update App Store Connect → App Privacy → Privacy Policy URL field
 *      to the same URL the in-app code uses.
 *
 * Until that's done, any Apple reviewer (and any real user who taps these)
 * will land on an unreachable page. That's a hard ship blocker.
 */

export const LINKS = {
  privacyPolicy: 'https://sugarquit.app/privacy',
  termsOfService: 'https://sugarquit.app/terms',
  support: 'mailto:support@sugarquit.app?subject=Sugar%20Quit%20Support',
  manageSubscription: 'https://apps.apple.com/account/subscriptions',
} as const;
