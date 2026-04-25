/**
 * peakHour helpers — derive surface-specific labels from the user's
 * `useUserStore.peakHour` string ("3:00 PM" / "11:00 AM" etc).
 *
 * The store value comes from the onboarding peak-time picker, which sets
 * one of `9:00 AM` / `12:00 PM` / `3:00 PM` / `9:00 PM`. Surfaces that
 * historically hardcoded "15:00 — 18:00" / "3pm" should call these so a
 * user with peakHour `9:00 PM` doesn't see contradictory times across
 * Home / Forecast / Result / Paywall.
 */

const FALLBACK = '3:00 PM';

function parse(peakHour: string | null): { h24: number } | null {
  const src = (peakHour ?? FALLBACK).trim();
  // Accept "3:00 PM" / "9:00 AM" (12h with AM/PM, from the picker) AND
  // "21:00" / "09:00" (24h plain, from server seed or future inputs).
  const m12 = src.match(/^(\d{1,2}):\d{2}\s+(AM|PM)$/i);
  if (m12) {
    let h = parseInt(m12[1], 10);
    const isPM = m12[2].toUpperCase() === 'PM';
    if (isPM && h < 12) h += 12;
    if (!isPM && h === 12) h = 0;
    return { h24: h };
  }
  const m24 = src.match(/^(\d{1,2}):\d{2}$/);
  if (m24) {
    const h = parseInt(m24[1], 10);
    if (h >= 0 && h < 24) return { h24: h };
  }
  return null;
}

/** "15:00 — 18:00" — three-hour window starting at peakHour, in 24h. */
export function peakWindow24h(peakHour: string | null): string {
  const p = parse(peakHour);
  if (!p) return '15:00 — 18:00';
  const end = (p.h24 + 3) % 24;
  const pad = (n: number) => `${String(n).padStart(2, '0')}:00`;
  return `${pad(p.h24)} — ${pad(end)}`;
}

/** "3pm" / "9am" / "11pm" — colloquial short form for inline copy. */
export function shortPeak(peakHour: string | null): string {
  const p = parse(peakHour);
  if (!p) return '3pm';
  const ampm = p.h24 < 12 ? 'am' : 'pm';
  let h12 = p.h24 % 12;
  if (h12 === 0) h12 = 12;
  return `${h12}${ampm}`;
}
