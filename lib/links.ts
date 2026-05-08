/**
 * Centralized external URLs used across the app (Privacy, Terms, Support, etc).
 *
 * Privacy + Terms are hosted on GitHub Pages from this same repo's `/docs`
 * folder (see `docs/privacy/index.html` and `docs/terms/index.html`).
 * Editing the HTML in main + push triggers a deploy via GH Pages.
 *
 * Once a custom domain (sugarquit.app) is set up + DNS pointed at GitHub
 * Pages, swap the URLs below to https://sugarquit.app/privacy and /terms.
 * The HTML files at /docs/privacy/ and /docs/terms/ are the source of
 * truth either way.
 */

export const LINKS = {
  privacyPolicy: 'https://oqapps-lab.github.io/sugar-quit/privacy/',
  termsOfService: 'https://oqapps-lab.github.io/sugar-quit/terms/',
  support: 'mailto:support@sugarquit.app?subject=Sugar%20Quit%20Support',
  manageSubscription: 'https://apps.apple.com/account/subscriptions',
} as const;
