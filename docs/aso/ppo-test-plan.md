# Apple PPO A/B/N Test Plan — Unsweet (v1.0)

Based on visual-aso-playbook.md §10 + Apple's Product Page Optimization native tool.

## Что Apple PPO МОЖЕТ тестить

✅ **Icon** (1024×1024 PNG)
✅ **Screenshots** (полный 7-frame set)
✅ **App Preview Video** (15-30s)

## Что Apple PPO НЕ тестит

❌ **App Name**
❌ **Subtitle**
❌ **Keywords field**
❌ **Description / Promo text**

→ Текстовый A/B requires **3rd party** (SplitMetrics ~$100/mo OR Storemaven enterprise).

---

## Mechanic

| Параметр | Значение |
|----------|----------|
| Treatments | До **3 + control** = 4 версии параллельно |
| Traffic split | Обычно 25/25/25/25 (равно), можно дать control больше |
| Duration | До **90 дней** (Apple авто-останавливает) |
| Min DAU | **500+ daily organic installs** для significance в 14 days |
| Stat significance | 95% confidence interval — Apple показывает в dashboard |
| Primary metric | **Impression-to-install CVR** (конверсия страницы) |
| Secondary | **CTR** на иконку в search results, **time on page** |

---

## Тестовый плана для Unsweet

Учитывая что мы **новый app без traffic**, прямой PPO с 14-day cycles не сработает на низких DAU. Стратегия:

### Phase 1 (Month 1 — pre-launch / TestFlight period): single best-guess

- Ship **Variant A** (control) с самым explainable hypothesis
- НЕ запускать PPO пока DAU < 500
- Собрать baseline conversion data 4 недели

### Phase 2 (Month 2): иконка A/B

- Достаточно DAU? → запускаем **PPO test 1**: 4 варианта иконки
- ⚠️ Иконка — single biggest visual lever (Storemaven: ±25% conversion)
- Не трогаем screenshots в этом тесте (только изолированный icon variable)
- Duration: 4 недели или до stat significance

### Phase 3 (Month 3): screenshots A/B

- Ставим winner-icon из Phase 2 как control
- **PPO test 2**: 4 screenshot sets (control + B + C + D)
- Variants:
  - **A (control)**: Cool indigo + white text, AI Coach hook
  - **B**: Warm cream + dark text, personal story hook
  - **C**: Minimalist navy + mint accent, numbers-led hook
  - **D**: Same A но reorder (frame02 PROOF → slot 1 instead of HOOK)

### Phase 4 (Month 4+): App Preview video A/B

- Если revenue justifies — produce 15-second video walkthrough
- Test video vs no-video (Storemaven data: +20-30% CVR for video)
- Cost: $200-1k для production

---

## Variant matrix для screenshots — что фактически тестируем

| Variant | Icon | BG palette | Hero color | Lead frame | Hypothesis |
|---------|------|------------|------------|------------|------------|
| **A control** | Default red/coral | Cool indigo→mint | White on dark | HOOK (AI chat) | "AI differentiator wins" |
| **B warm** | Default | Cream/peach soft | Black on light | HOOK (AI chat) | "Warmth = approachability for stress eaters" |
| **C minimal** | Solid mint badge | Solid navy | Mint accent | PROOF (Day 48) | "Numbers credibility > soft pitch" |
| **D reorder** | Default | Cool indigo→mint | White on dark | PROOF (Day 48) | "Streak proof above AI claim" |

---

## Метрики и thresholds

| Metric | Baseline (industry) | Win threshold |
|--------|---------------------|---------------|
| Impression → install CVR | 25-30% (Health & Fitness, per Adapty 2026) | +10% relative (e.g. 27% → 30%) |
| First-screen CTR | not reported by Apple | guesswork |
| Time on page | 30-60s healthy | track but not primary |
| Negative signals | uninstall within 7 days | flag if >40% |

**Decision rule**:
- Лидер с CVR ≥ +10% relative И stat significance ≥ 95% → ship as new control
- Tie или low significance → keep control, no change
- Negative result → revert immediately

---

## Cadence

| Когда | Действие | Cost |
|-------|----------|------|
| Each 14 days during PPO | Read Apple's PPO dashboard | 0 |
| Each 4 weeks | Refresh promotional text (NOT through PPO — instant edit) | 0 |
| Each 6-8 weeks | Run new PPO test (icon → screenshots → video → screenshot reorder...) | 0 (Apple) |
| Each 3 months | Run full /aso-iterate via skill — refresh keywords field if rankings dropped | ~90 ASOMobile credits |

---

## What I do as Claude после launch

Каждые 2 недели — `/aso-iterate` mode (когда напишем):
1. Run `world-wide-check` для top-10 keywords — текущие позиции (~10 ASOMobile credits)
2. Compare с baseline — flagged regressions
3. Suggest action:
   - Если рейтинг упал на head term → propose subtitle swap
   - Если PPO test показал winner → propose default change
   - Если new opportunity (analytics показывают что ranks for unexpected term) → propose keywords field update
4. Execute approved changes via ASC API + start new PPO test if needed

---

## NOT to do

- ❌ **Multiple variables в одном тесте** (icon + screenshots вместе) — невозможно атрибутировать lift
- ❌ **PPO test < 500 DAU** — undeliverable significance, потеряешь время
- ❌ **Менять name + subtitle + keywords в одном release** — не сможешь сказать что сработало
- ❌ **Test < 14 дней** — недостаточно данных
- ❌ **Менять creatives недельку до Apple Featured pitch** — they evaluate stable assets

---

## Resource budget

| Resource | Need |
|----------|------|
| Design time | 2-4 hours per variant set (Figma) |
| ASOMobile credits | ~50-100 / month for tracking |
| Apple PPO | $0 (native free tool) |
| 3rd party A/B (если решим тестировать text) | $99/mo SplitMetrics |
| Total per month | ~$100 / month max |

---

## Success picture (6 months out)

If we follow this plan correctly:
- **Month 1**: ship control, gather baseline
- **Month 2**: PPO icon test → +15-20% CVR if winner
- **Month 3**: PPO screenshot test → +10-15% CVR
- **Month 4**: video test → +20-30% CVR (if produced)
- **Cumulative**: 50-80% CVR uplift over 6 months from creative iteration alone

Combined with text-side iteration (subtitle / keywords swaps via release): another 10-20%.

**Total realistic 6-month uplift**: 60-100% from baseline на conversion rate. На same impressions count = 60-100% больше installs.
