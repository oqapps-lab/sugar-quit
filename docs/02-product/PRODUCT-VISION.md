# Product Vision: Sugar Quit

**Дата:** 13 апреля 2026
**Стадия:** Product Definition (Stage 2)
**Синтез:** [Target Audience](./TARGET-AUDIENCE.md), [Problem-Solution Fit](./PROBLEM-SOLUTION-FIT.md), [Features](./FEATURES.md), [Monetization](./MONETIZATION.md)
**Данные:** [Research Brief](../01-research/RESEARCH-BRIEF.md), [Market Research](../01-research/MARKET-RESEARCH.md), [Competitors](../01-research/COMPETITORS.md), [Domain Research](../01-research/DOMAIN-RESEARCH.md)

---

## 1. Elevator Pitch

**Sugar Quit — первый AI-коуч, который разговаривает с вами в момент тяги к сахару и предсказывает, когда она наступит.** 195 миллионов американцев хотят снизить потребление сахара, но лучшее приложение в категории имеет 805 отзывов — рынок фактически пуст, а AI впервые делает real-time craving coaching экономически жизнеспособным.

---

## 2. Product Canvas

| Блок | Содержание |
|------|-----------|
| **Problem** | 75% американцев хотят снизить сахар, но в момент тяги (15-20 мин) у них нет инструмента помощи. Все решения работают ретроспективно (трекинг) или превентивно (общие советы). Сахар активирует те же reward pathways, что и наркотики — willpower проигрывает нейрохимии |
| **Solution** | AI-коуч, который ведёт персонализированный разговор в момент тяги (SOS), предсказывает триггеры за 15-30 мин, предлагает конкретные альтернативы еды и проводит через 90-дневную neuroscience-backed программу |
| **Key Metrics** | 1) Craving Defeated Rate >60% (SOS побеждает тягу)<br>2) D30 Retention >30%<br>3) Free→Paid Conversion >8%<br>4) NPS >50<br>5) MAU/DAU ratio >30% |
| **UVP** | "Для офисных работников и людей, контролирующих здоровье, у которых ежедневная тяга к сахару побеждает силу воли, Sugar Quit позволяет побеждать тягу в реальном времени через AI-разговор и предсказание триггеров, в отличие от трекеров и generic sobriety apps, потому что мы единственные с real-time AI craving coaching + predictive triggers + sugar-specific food alternatives" |
| **Unfair Advantage** | 1) **Data moat:** каждый SOS-разговор кормит ML → predictions точнее → switching costs растут<br>2) **First-mover в AI sugar coaching:** ни один конкурент не реализовал<br>3) **Community lock-in:** sugar-specific, moderated — не существует альтернативы<br>4) **Playbook от Reframe/Sunnyside:** proven formula, адаптированная под больший рынок |
| **Channels** | 1) **TikTok/Instagram** — "No Sugar Challenge" viral content (Sarah + Chloe)<br>2) **App Store SEO** — "quit sugar app" = blue ocean keyword<br>3) **Google Search** — "how to reduce sugar prediabetes" (Paul)<br>4) **r/sugarfree** — authentic community engagement, 100K+ members<br>5) **Influencer partnerships** — wellness creators doing sugar-free challenges<br>6) **January launch** — 10x organic installs (New Year's resolutions spike) |
| **Customer Segments** | **Primary:** "Stress Sarah" — офисные работники 28-35, stress-eating at 3pm, $85K income, iPhone, готовы платить $9.99/мес<br>**Secondary:** "Pre-Diabetic Paul" (40-55, health-motivated) и "Challenge Chloe" (22-28, social/emotional) |
| **Cost Structure** | 1) **Engineering team** — 2-3 devs, $300-500K/год<br>2) **AI costs** — $0.04-0.10/user/мес (<1% revenue)<br>3) **Content production** — curriculum, 1 content lead, $120-150K/год<br>4) **Infrastructure** — Supabase + hosting, $2-5K/мес<br>5) **Marketing** — $15-25 CPI paid, TikTok/Instagram, $200-500K/год<br>6) **Advisory board** — 3-5 experts, $50-100K/год |
| **Revenue Streams** | 1) **B2C Subscription** — $9.99/мес, $79.99/год (core)<br>2) **B2B Corporate Wellness** — $5-8/employee/мес (v2.0)<br>3) **Premium Coaching** — $29.99-49.99/мес (v1.5)<br>4) **B2B Insurance** — $8-12/member/мес (v2.0+) |

---

## 3. Success Metrics (KPI)

### 3.1 Core Metrics

| Метрика | 3 мес (Beta) | 6 мес (Launch) | 12 мес |
|---------|-------------|----------------|--------|
| **MAU** | 5K (beta) | 50K | 150K |
| **Paying subscribers** | 500 (beta) | 5K | 20K |
| **Free→Paid conversion** | 8% | 10% | 10% |
| **D7 retention** | 45% | 50% | 55% |
| **D30 retention** | 30% | 35% | 40% |
| **D90 retention** | — | 15% | 20% |
| **MRR** | $5K | $50K | $170K |
| **ARR** | $60K | $600K | $2M |
| **App Store rating** | 4.5+ | 4.6+ | 4.7+ |
| **NPS** | 50+ | 55+ | 60+ |

### 3.2 Product-Specific Metrics

| Метрика | Target | Почему важна |
|---------|--------|-------------|
| **Craving Defeated Rate** | >60% | Core value prop. "SOS работает" = word of mouth |
| **SOS conversations/user/week** | >3 | Engagement с core feature. Ниже → не используют AI |
| **Curriculum completion (Day 14)** | >40% | Hook period. <40% → контент не держит |
| **Curriculum completion (Day 90)** | >15% | Long-term engagement. Benchmark: Reframe 160-day |
| **"Eat This Instead" usage** | >50% active users/week | Validation гипотезы H5 |
| **Community posts/week** | >100 | Community health indicator |
| **Prediction accuracy** | >70% (Day 14+) | Trust в ML predictions = retention driver |

### 3.3 Hypotheses to Validate

| # | Гипотеза | Метрика | Порог | Из Research Brief |
|---|----------|---------|-------|------------------|
| H1 | SOS AI конвертирует лучше static panic button | Craving Defeated Rate | >60% (vs ~20-30% для breathing exercise) | [Brief](../01-research/RESEARCH-BRIEF.md) H1 |
| H2 | Готовность платить $9.99/мес | Free→Paid conversion | >8% | [Brief](../01-research/RESEARCH-BRIEF.md) H2 |
| H3 | Predictive triggers повышают retention | D30 retention (с predictions vs без) | >35% (vs 15-25% health app benchmark) | [Brief](../01-research/RESEARCH-BRIEF.md) H3 |
| H4 | Community — retention driver | D90 retention community users vs solo | Community >2x solo | [Brief](../01-research/RESEARCH-BRIEF.md) H4 |
| H5 | "Eat This Instead" — top feature | Weekly feature usage rate | >50% active users | [Brief](../01-research/RESEARCH-BRIEF.md) H5 |

---

## 4. Roadmap

### Phase 0: Pre-Development (Апрель-Июнь 2026)

| Задача | Дедлайн | Статус |
|--------|---------|--------|
| Product Definition (этот документ) | Апрель 2026 | Текущий |
| UX Design (wireframes + prototypes) | Май 2026 | Следующий |
| Landing page validation (>5% email signup) | Май 2026 | Условие GO |
| Advisory board (минимум 2 эксперта) | Июнь 2026 | Условие GO |
| Regulatory review (health-tech attorney) | Июнь 2026 | Условие GO |
| Content Lead hiring | Май 2026 | Критично |

### Phase 1: MVP Development (Июль-Сентябрь 2026)

**Цель:** Работающий MVP с core features для beta-теста

| Месяц | Фокус | Deliverables |
|-------|-------|-------------|
| Июль | Foundation | Auth (Supabase), Home Dashboard, Onboarding, Navigation |
| Август | Core AI | SOS AI Coach (Claude API), Craving Logger, Push Notifications |
| Сентябрь | Content + Polish | Curriculum Day 1-14, Streak system, Settings, Paywall (Adapty) |

### Phase 2: Beta (Октябрь-Ноябрь 2026)

**Цель:** 500-1000 beta-тестеров, валидация H1-H2

| Месяц | Фокус | Deliverables |
|-------|-------|-------------|
| Октябрь | Beta launch | r/sugarfree recruitment, TestFlight/Firebase, feedback loops |
| Ноябрь | Iterate | Bug fixes, AI prompt tuning, UX polish по feedback, content refinement |

**Beta Success Criteria:**
- NPS >50
- Craving Defeated Rate >60%
- D7 retention >45%
- Free→Paid conversion >8%

### Phase 3: Launch — v0.9 (Январь 2027)

**Цель:** App Store launch в January spike window

| Deliverable | Описание |
|-------------|----------|
| App Store submit | Декабрь 2026 (2-3 недели на review) |
| Launch marketing | TikTok campaign, influencer partnerships, r/sugarfree, PR |
| ASO optimization | "quit sugar", "sugar detox", "sugar addiction app" keywords |
| Target | 50K downloads в January, 5K paid subscribers |

### Phase 4: Growth — v1.0 (Март-Апрель 2027)

**Цель:** Feature completeness, retention optimization

| Фича | Приоритет |
|------|-----------|
| "Eat This Instead" engine | P1 |
| Community (read + post) | P1 |
| Progress Dashboard (детальный) | P1 |
| 90-Day Curriculum (Day 15-90) | P1 |
| Doctor-shareable reports (Paul) | P1 |

### Phase 5: Scale — v1.5 (Май-Август 2027)

**Цель:** Prediction engine, premium tiers, B2B exploration

| Фича | Приоритет |
|------|-----------|
| Craving Predictor (ML) | P1 |
| Food Scanner | P2 |
| Apple Watch app | P2 |
| Premium Coaching tier ($29.99/мес) | P1 |
| Community Challenges & Leaderboards | P2 |
| B2B Corporate Wellness pilot | P1 |

### Phase 6: Expansion — v2.0 (2028)

- Health integrations (Apple Health, Google Fit, CGM)
- B2B Insurance partnerships
- Multi-language (Spanish, Portuguese, German)
- Accountability Partners / Buddy System
- Pilot clinical study (publishable)

---

## 5. Риски и митигация

| Риск | Вероятность | Severity | Митигация |
|------|------------|----------|-----------|
| **Вход крупного игрока** (Noom, MFP) | Средняя | Высокая | Окно 12-18 мес. Data moat + community lock-in. Стать "THE sugar app" первыми |
| **WTP ниже ожиданий** | Средняя | Средняя | Landing page test до разработки. Free tier конвертирует через SOS "aha-moment". Framing: "$80/год vs $10K/год диабет" |
| **Eating disorders** | Средняя | Высокая | AI guardrails (никогда не стыдить, не restrict). Advisory board с клиническим психологом. Auto-referral при red flags |
| **High churn** | Высокая | Высокая | Gamification + community + AI personalization (data moat) + 90-day curriculum (structure) |
| **Научная контроверсия** | Средняя | Средняя | "Behavior change, not addiction treatment." Никогда не заявлять "лечение" или "диагноз" |
| **Regulatory** | Низкая | Высокая | Wellness positioning (FDA January 2026 guidance). Disclaimers. Health-tech attorney review |
| **AI hallucinations** | Средняя | Средняя | RAG + verified food database. Никогда не генерировать nutrition facts. Disclaimers |

---

## 6. Команда (для следующего этапа)

| Роль | Приоритет | Обоснование | Timing |
|------|-----------|-------------|--------|
| **Content Lead** | Критично | 90-day curriculum — главный production bottleneck. 14 дней нейронауки + 76 уроков до beta | Май 2026 |
| **Advisory Board (3-5)** | Критично | Нейроучёный + диетолог + психолог + эндокринолог. Кредибильность для PR и App Store | Июнь 2026 |
| **Health-tech Attorney** | Важно | Проверка claims, disclaimers, FDA guidance compliance, FTC compliance | Июнь 2026 |
| **Community Moderator (1-2)** | Для beta | ED detection, content moderation, engagement | Октябрь 2026 |
| **Growth / Marketing** | Для launch | TikTok strategy, influencer outreach, ASO, paid acquisition | Ноябрь 2026 |

---

## 7. Verdict

### GO

**Рекомендация: GO на переход к UX-проектированию (Stage 3).**

### Обоснование

**Product Definition подтверждает все условия Research Brief:**

| Критерий | Статус | Подтверждение |
|----------|--------|---------------|
| Проблема чётко определена | ✅ | 195M Americans want to reduce sugar. Zero tools help in the moment of craving ([Problem-Solution Fit](./PROBLEM-SOLUTION-FIT.md)) |
| Аудитория специфицирована | ✅ | Primary persona (Stress Sarah) с Jobs-to-be-done, триггерами, WTP $9.99/мес ([Target Audience](./TARGET-AUDIENCE.md)) |
| MVP scope определён | ✅ | 9 Must Have фич, ~15-18 экранов, 2 bottlenecks (SOS AI + content) ([Features](./FEATURES.md)) |
| Монетизация обоснована | ✅ | Freemium + $9.99/мес. LTV/CAC 5.7-10.6x. AI cost <1% revenue ([Monetization](./MONETIZATION.md)) |
| Конкурентное преимущество ясно | ✅ | SOS AI + Predictive Triggers + "Eat This Instead" — ни у кого из конкурентов |
| Roadmap реалистичен | ✅ | MVP Jul-Sep 2026 → Beta Oct-Nov → Launch Jan 2027 |
| Риски manageable | ✅ | Каждый риск имеет конкретную митигацию |

### Условия перехода (из Research Brief, обновлённые)

| Условие | Дедлайн | Критерий |
|---------|---------|----------|
| Landing page validation | Май 2026 | >5% email signup при указании цены $9.99/мес |
| Advisory board (минимум 2) | Июнь 2026 | Нейроучёный/психолог + диетолог confirmed |
| Regulatory review | Июнь 2026 | Attorney confirmed: positioning safe |
| Content plan для curriculum | Июль 2026 | Day 1-14 draft ready, reviewed by advisory |
| UX Design complete | Июнь 2026 | Wireframes + key flows prototyped |

### Следующий шаг

**Stage 3: UX Design** — wireframes, user flows, visual design system. Фокус на:
1. SOS AI flow (core "aha-moment")
2. Onboarding (2 минуты до первого SOS)
3. Home dashboard (streak + SOS button)
4. Paywall (conversion-optimized)

---

*Данный документ является синтезом всех документов Product Definition Stage. Каждый companion document содержит детальные данные и обоснования.*
