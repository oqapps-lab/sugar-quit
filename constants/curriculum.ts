export type LessonStatic = { day: number; title: string; minutes: number };

export type Phase = {
  name: string;
  days: string;
  endDay: number;
  lessons: LessonStatic[];
  locked?: boolean;
};

export const PHASES: Phase[] = [
  {
    name: 'Acute',
    days: 'Days 1–3',
    endDay: 3,
    lessons: [
      { day: 1, title: 'Why sugar catches the brain',    minutes: 7 },
      { day: 2, title: 'The 72-hour storm',              minutes: 5 },
      { day: 3, title: 'First quiet morning',            minutes: 4 },
    ],
  },
  {
    name: 'Adaptation',
    days: 'Days 4–7',
    endDay: 7,
    lessons: [
      { day: 4, title: 'Your 3pm pattern, mapped',       minutes: 6 },
      { day: 5, title: 'Why fruit tastes bland',         minutes: 5 },
      { day: 6, title: 'The sleep-sugar loop',           minutes: 6 },
      { day: 7, title: 'One whole week',                 minutes: 4 },
    ],
  },
  {
    name: 'Clarity',
    days: 'Days 8–14',
    endDay: 14,
    lessons: [
      { day: 8,  title: 'Your taste buds are waking up',   minutes: 5 },
      { day: 9,  title: 'Triggers without reactions',      minutes: 6 },
      { day: 10, title: 'The stress-sugar reflex',         minutes: 5 },
      { day: 11, title: 'Alternatives that actually work', minutes: 7 },
    ],
  },
  {
    name: 'Integration',
    days: 'Days 15–30',
    endDay: 30,
    lessons: [],
    locked: true,
  },
];

const ALL_LESSONS: LessonStatic[] = PHASES.flatMap((p) => p.lessons);

export function getLessonForDay(day: number): LessonStatic {
  const found = ALL_LESSONS.find((l) => l.day === day);
  if (found) return found;
  // For days beyond defined lessons, return the last available
  return ALL_LESSONS[ALL_LESSONS.length - 1] ?? { day: 1, title: 'Why sugar catches the brain', minutes: 7 };
}
