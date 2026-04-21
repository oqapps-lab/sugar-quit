# Screen-Map-First Development Methodology

**Статус:** канонический подход для всех mobile/web проектов с UX документацией
**Применимо к:** React Native / Expo / Flutter / any multi-screen app
**Автор ошибок:** VM-Claude на Sugar Quit 2026-04-19 — делал экраны без сверки с USER-FLOWS, изобретал фичи (SOS Breathe) которых нет в документации, не сопоставлял CTA с flows. Документ — чтобы больше не повторялось.

---

## Диагноз типичных провалов

Два режима отказа при реализации mobile app из UX-документации:

1. **Visual fidelity without flow integrity** — красивые экраны, которые неправильно соединены. Пример: Paywall `×` не закрывает, "Start 7 days free" ведёт непонятно куда.
2. **Scope creep via invention** — добавление экранов/фич, которых нет в документации. Пример: "SOS Breathe screen" — это не P0 из FEATURES.md. SOS это **AI Chat** (F1). Breathing — это техника *внутри* чата.

Оба провала имеют одну причину: **прыжок к коду до усвоения navigation graph и scope boundary из документации.**

---

## Pre-code фаза (обязательна)

### Шаг 1. Прочитать UX-канон в строгом порядке

1. `USER-FLOWS.md` — динамика: что происходит когда, error states, edge cases
2. `SCREEN-MAP.md` — статическое дерево всех экранов с родительством и состояниями
3. `WIREFRAMES.md` — element-level layout каждого экрана
4. `FEATURES.md` — acceptance criteria для каждой фичи (что MUST)
5. `FUNNEL.md` / `UX-SPEC.md` — если есть, глобальные принципы

**Если хотя бы одного нет — остановиться и попросить создать.** Без этого код = выдумка.

### Шаг 2. Построить NAVIGATION-MAP.md — единый источник правды навигации

Формат:

```
Nodes (routes):
  /(onboarding)/welcome
  /(onboarding)/quiz/goal
  /(onboarding)/quiz/motivation
  ...
  /(tabs)/home
  /(tabs)/curriculum
  /(tabs)/progress
  /(tabs)/profile
  /(modals)/sos
  /(modals)/checkin
  /(modals)/paywall
  ...

Edges (transitions):
  welcome        [tap Begin]             → quiz/goal
  welcome        [tap Sign in]           → auth/signin
  quiz/goal      [tap Continue]          → quiz/motivation
  home           [tap SOS FAB]           → sos (modal)
  sos            [tap × close]           → dismiss (back to home)
  sos            [tap End session]       → post-sos (modal)
  paywall        [tap × close]           → dismiss
  paywall        [tap Start 7 days free] → auth/signin → push-permission → home
```

### Шаг 3. Enumerate vs docs

Для каждого route в NAVIGATION-MAP проверь:
- Есть в SCREEN-MAP.md? **Если нет — удалить.** Это invention.
- Все acceptance criteria из FEATURES.md покрыты edges + content?
- User-flow шаги совпадают с sequence of edges?

Для каждого шага в USER-FLOWS.md проверь:
- Есть соответствующий node в NAVIGATION-MAP?
- Есть edge от предыдущего к текущему?

### Шаг 4. Определить группировку и presentation

- **Linear flow** (push/pop): onboarding, lesson reading
- **Parallel** (bottom tabs): main app
- **Contextual overlay** (modal / sheet): SOS, check-in, paywall, celebrations
- **System redirect** (route outside app): Settings.app deep link, App Store, OAuth

Это определяет структуру: Stack / Tabs / Modal group.

---

## Code фаза

### Шаг 5. Skeleton first

Создать каждый route как placeholder — только название + список CTA-кнопок с handlers wired на edges.

```tsx
// app/(onboarding)/welcome.tsx
export default function Welcome() {
  return (
    <View style={{ padding: 20, gap: 10 }}>
      <Text style={{ fontSize: 24 }}>Welcome (1.1)</Text>
      <Button title="Begin → Quiz Goal" onPress={() => router.push('/quiz/goal')} />
      <Button title="Sign in (existing) → Auth" onPress={() => router.push('/auth/signin')} />
    </View>
  );
}
```

Никаких градиентов, шрифтов, иллюстраций. Только routes + CTA.

### Шаг 6. Navigate end-to-end на skeleton'е

Вручную пройди **каждый flow** из USER-FLOWS.md. Проверь:
- Каждый CTA куда-то ведёт (не dead)
- Back-button работает
- Modal × закрывается (через `router.dismiss()` а не `router.back()` — `back()` может не иметь target если modal открыт через deep link)
- Deep links (`exp://host/--/paywall`) ведут корректно

**Не начинать полировку UI пока skeleton не зелёный.**

### Шаг 7. Fill screens

Только после валидного skeleton — наполнять визуально, один экран за раз. После каждого:
- Re-test flow, где этот экран участвует
- Сравнить с wireframe
- Проверить acceptance criteria из FEATURES.md

### Шаг 8. Правила ревью

- **Never invent**: каждый экран должен trace back в SCREEN-MAP entry
- **Never orphan**: каждый CTA имеет target из NAVIGATION-MAP
- **Never tangle**: group-folder layout матчит presentation mode (Stack/Tabs/Modal)
- **Never polish ahead of flow**: красивый экран без правильных CTA = бесполезен

---

## Anti-patterns (известные провалы)

- **"Visual-first iteration"** — фигачу красивые экраны, потом починяю навигацию. **Всегда skeleton first.**
- **"Scope creep by inspiration"** — добавляю экраны из Stitch/moodboard, которых нет в docs. **Stitch = палитра, не спека.**
- **"Silent route divergence"** — в коде есть route, которого нет в NAVIGATION-MAP. **Всегда обновлять карту до добавления route.**
- **"Modal-as-stack"** — открываю Paywall как push вместо modal, потом `×` не имеет back target. **Match presentation mode to flow role.**
- **"One screen, many flows"** — один компонент обслуживает 3 несвязанных flow. **Разделять по routes, даже если UI похож.**

---

## Multi-agent parallelization

Когда экранов >15, делить работу между агентами по изолированным директориям:

| Agent | Owns | Forbidden |
|---|---|---|
| A (Onboarding) | `/app/(onboarding)/*` | `(tabs)`, `(modals)`, shared |
| B (Main tabs) | `/app/(tabs)/*` | `(onboarding)`, `(modals)`, shared |
| C (Modals) | `/app/(modals)/*` | `(onboarding)`, `(tabs)`, shared |
| D (Topology + tokens) | `/app/_layout.tsx`, `/app/*/` layouts, `/constants/*` | `/app/*screen*.tsx` content |
| E (UI primitives) | `/components/ui/*` | any `/app/*` |

Каждый agent получает на вход: актуальный `NAVIGATION-MAP.md` + `DESIGN-TOKENS.md` + scope (список routes которые он пишет).

**Железное правило:** ни один файл не может быть в скоупе двух агентов одновременно. Агенты работают в parallel, результаты сливаются без merge-конфликтов.

Запуск агентов — параллельно через единственное сообщение с несколькими Agent tool calls. Прогон в параллель. После — ручная проверка что все routes из скоупов собраны.

---

## Чеклист применения методологии для нового проекта

- [ ] Прочитаны 4 канонических doc'а (USER-FLOWS, SCREEN-MAP, WIREFRAMES, FEATURES)
- [ ] Создан `NAVIGATION-MAP.md` с nodes + edges
- [ ] Каждый node сверен с SCREEN-MAP (нет invention)
- [ ] Каждый flow из USER-FLOWS представлен sequence edges
- [ ] Выбрана presentation mode per route (stack/tab/modal)
- [ ] Создан skeleton всех routes с working CTA
- [ ] Пройдены все flows вручную — CTA working, back working, modals dismiss
- [ ] Только после зелёного skeleton'а — visual polish
- [ ] После каждого screen polish — re-test flows
- [ ] Multi-agent: разделение по forbidden paths, единый DESIGN-TOKENS + NAVIGATION-MAP на входе

---

*Этот документ — мета-навык. Применяется к Sugar Quit, к следующему проекту, к любому, где есть UX-документация с flows и screens.*
