/**
 * Canonical 90-day phase taxonomy for Sugar Quit.
 *
 * Single source of truth — every screen that surfaces a phase name, day-range,
 * or "what's happening now" copy MUST import from this file. Past inconsistency
 * (curriculum used Acute/Adaptation/Clarity/Integration/Identity/Horizon while
 * progress used Arrival/Detox/Exhale/Clarity/Horizon — same word "Clarity"
 * meaning Days 8-14 vs 25-60) is the bug class this prevents.
 *
 * Boundaries are evidence-grounded:
 * - Arrival 1-3: low-stakes orientation. Brain hasn't noticed yet.
 * - Detox 4-10: dopamine-receptor downregulation peaks Day 2-5
 *     (Avena/Rada/Hoebel 2008) and craving subjectivity peaks Day 3-5
 *     (Westwater/Fletcher/Ziauddeen 2016). Old "Adaptation" naming
 *     understated the misery; users felt lied to and quit.
 * - Clarity 11-24: hedonic sweetness threshold reset around Day 10-14
 *     (Wise/Bartoshuk taste-bud literature); insulin sensitivity
 *     improvements detectable Week 2 (Lustig, Ludwig).
 * - Integration 25-45: Day 15-30 is the documented retention cliff in
 *     habit-change apps (Smoke Free, Noom). Phase exists to give the
 *     user a labeled "I crossed something" moment exactly here.
 * - Identity 46-66: Lally et al. 2010 — habit automation MEDIAN 66 days.
 *     Naming the phase "Identity" before automation is hollow; here it
 *     lands. Borrows James Clear's identity-based habits framing.
 * - Freedom 67-90: concrete payoff label > vague "Horizon". Sunk-cost
 *     momentum to graduation.
 *
 * If you need to extend / re-tune, change the array here and every screen
 * picks it up. Don't add a parallel const elsewhere.
 */

export type PhaseName =
  | 'Arrival'
  | 'Detox'
  | 'Clarity'
  | 'Integration'
  | 'Identity'
  | 'Freedom';

export type PhaseGlyph = 'compass' | 'flame' | 'sun' | 'moon' | 'orbit' | 'snowflake';

export type Phase = {
  name: PhaseName;
  startDay: number;
  endDay: number;
  /** Short label for tabs / pills (e.g. "Week 1", "Day 90"). */
  shortLabel: string;
  /** Decorative glyph for phase pill / hero. */
  glyph: PhaseGlyph;
  /** Hero title shown when user is in this phase (Progress + Curriculum hero). */
  heroTitle: string;
  /** One-sentence "what's happening" subtitle. */
  heroBody: string;
  /** Short subtitle for the curriculum phase block list ("Days 4–10"). */
  daysLabel: string;
};

export const PHASES: readonly Phase[] = [
  {
    name: 'Arrival',
    startDay: 1,
    endDay: 3,
    shortLabel: 'Days 1–3',
    glyph: 'compass',
    heroTitle: 'The first decision',
    heroBody: "You showed up. Day one or three, the only act that matters is that you started.",
    daysLabel: 'Days 1–3',
  },
  {
    name: 'Detox',
    startDay: 4,
    endDay: 10,
    shortLabel: 'Days 4–10',
    glyph: 'flame',
    heroTitle: 'The 72-hour storm',
    heroBody: 'Cravings peak now. This is the hardest week — and it ends.',
    daysLabel: 'Days 4–10',
  },
  {
    name: 'Clarity',
    startDay: 11,
    endDay: 24,
    shortLabel: 'Days 11–24',
    glyph: 'sun',
    heroTitle: 'The fog lifts',
    heroBody: 'Taste buds reset. Energy steadies. The quiet is starting to feel normal.',
    daysLabel: 'Days 11–24',
  },
  {
    name: 'Integration',
    startDay: 25,
    endDay: 45,
    shortLabel: 'Days 25–45',
    glyph: 'moon',
    heroTitle: 'New defaults forming',
    heroBody: 'Your reflexes are rewiring. Sugar slips out of the auto-reach.',
    daysLabel: 'Days 25–45',
  },
  {
    name: 'Identity',
    startDay: 46,
    endDay: 66,
    shortLabel: 'Days 46–66',
    glyph: 'orbit',
    heroTitle: 'Identity, not effort',
    heroBody: "You don't decide each time anymore. The choice has become who you are.",
    daysLabel: 'Days 46–66',
  },
  {
    name: 'Freedom',
    startDay: 67,
    endDay: 90,
    shortLabel: 'Days 67–90',
    glyph: 'snowflake',
    heroTitle: 'Walking free',
    heroBody: 'The habit is automatic. You walk past the candy aisle without noticing.',
    daysLabel: 'Days 67–90',
  },
];

/** Find the phase a given day belongs to. Days < 1 clamp to Arrival, > 90 clamp to Freedom. */
export function phaseForDay(day: number): Phase {
  const clamped = Math.max(1, Math.min(90, day));
  for (const p of PHASES) {
    if (clamped >= p.startDay && clamped <= p.endDay) return p;
  }
  return PHASES[PHASES.length - 1];
}

/** Index (0-based) of the phase for a given day — useful for highlighting current phase pill. */
export function phaseIndexForDay(day: number): number {
  const p = phaseForDay(day);
  return PHASES.findIndex((x) => x.name === p.name);
}

/** All phase names in order — useful for iteration / mapping in UI. */
export const PHASE_NAMES: readonly PhaseName[] = PHASES.map((p) => p.name);
