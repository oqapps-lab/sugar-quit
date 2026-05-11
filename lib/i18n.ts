import { I18n } from 'i18n-js';
import { getLocales } from 'expo-localization';

import en from '../i18n/en.json';
import de from '../i18n/de.json';
import ja from '../i18n/ja.json';
import fr from '../i18n/fr.json';
import ko from '../i18n/ko.json';
import es from '../i18n/es.json';
import it from '../i18n/it.json';
import nl from '../i18n/nl.json';
import sv from '../i18n/sv.json';
import zhHant from '../i18n/zh-Hant.json';
import pt from '../i18n/pt.json';

export const i18n = new I18n({
  en,
  'en-GB': en,
  'en-US': en,
  de,
  'de-DE': de,
  ja,
  'ja-JP': ja,
  fr,
  'fr-FR': fr,
  ko,
  'ko-KR': ko,
  es,
  'es-ES': es,
  it,
  'it-IT': it,
  nl,
  'nl-NL': nl,
  sv,
  'sv-SE': sv,
  'zh-Hant': zhHant,
  pt,
  'pt-BR': pt,
});

const SCREENSHOT_OVERRIDE: string = '';

const deviceLanguageTag = getLocales()[0]?.languageTag ?? 'en';
const deviceLanguageCode = getLocales()[0]?.languageCode ?? 'en';

// Resolve to a supported locale. Match full tag first, then base language.
function resolveLocale(): string {
  if (SCREENSHOT_OVERRIDE && SCREENSHOT_OVERRIDE in i18n.translations) return SCREENSHOT_OVERRIDE;
  const candidates = [deviceLanguageTag, deviceLanguageCode, 'en'];
  for (const c of candidates) {
    if (c && c in i18n.translations) return c;
  }
  return 'en';
}

i18n.locale = resolveLocale();
i18n.enableFallback = true;
i18n.defaultLocale = 'en';

if (__DEV__) {
  // Marker for batch screenshot verification — grep '[i18n] locale' /tmp/metro_*.log
  console.log('[i18n] locale =', i18n.locale, '| sample =', i18n.t('home.tone_calm'));
}

export function t(key: string, options?: Record<string, unknown>): string {
  return i18n.t(key, options);
}
