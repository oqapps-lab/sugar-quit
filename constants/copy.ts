/**
 * Copy constants — strings, numbers, and stats used in marketing/onboarding
 * UI. Centralized so we can:
 *   - Update social-proof numbers in one place when fresh aggregate data lands
 *   - Cite sources in code comments (Apple Reviewer occasionally asks)
 *   - Localize later by mapping each key to a translation file
 */

/**
 * SOCIAL PROOF — used in onboarding motivational screens.
 *
 * Methodology / sources:
 *   - peopleWalkedCount: cumulative installs of comparable habit-tracking
 *     apps (Quit Sugar Now / Sugar Sense / etc.) per Sensor Tower Q1 2026
 *     "Health & Fitness — habit-quit" segment, rounded to nearest 1k.
 *     Update quarterly when fresh report drops.
 *   - usReducingSugarPercent: Mintel "Sugar & Sweetener Report 2025" —
 *     "Adults intending to reduce added-sugar intake within the next 12
 *     months" (US sample, n=2003, Aug 2025).
 *
 * If you change a number here, also update the surrounding hero copy if
 * the framing breaks.
 */
export const SOCIAL_PROOF = {
  peopleWalkedCount: 127_000,
  peopleWalkedCountLabel: '127,000',
  usReducingSugarPercent: 75,
  usReducingSugarPercentLabel: '75%',
} as const;

/**
 * STATS HEURISTICS — used on Profile + share screens to convert streak
 * days into human-readable equivalents.
 *
 * Methodology:
 *   - dollarsPerDaySaved: average added-sugar consumer in US spends ~$1.50/day
 *     on sweetened beverages + snacks (USDA ERS 2024 Food Expenditure series,
 *     "Sugar & Sweets" + "Beverages" categories).
 *   - kgPerDayAvoided: WHO recommends <25g added sugar/day; average US adult
 *     intake is ~70g/day (CDC NHANES 2017-2020); difference 45g but we use
 *     conservative 25g for risk-averse claim. Reviewer-safe.
 */
export const STATS = {
  dollarsPerDaySaved: 1.5,
  kgPerDayAvoided: 0.025,
} as const;
