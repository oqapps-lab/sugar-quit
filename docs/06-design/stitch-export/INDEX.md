# Stitch Export — выбранные экраны

**Дата:** 2026-04-19
**Источник:** Stitch project `Sugar Quit AI Coach` (ID `2348002901540229278`)
**API:** Google Stitch MCP (`https://stitch.googleapis.com/mcp`)

Для каждого экрана сохранены:
- `{slug}.png` — скриншот макета
- `{slug}.html` — HTML+CSS от Stitch (ссылка для извлечения токенов, не для прод-кода)
- `{slug}.meta.json` — метаданные Stitch API

## Экраны

| # | Slug | Stitch title | Screen ID |
|---|------|--------------|-----------|
| 1 | `01-sos-breathe` | SOS: Breathe | `046e4c7a7ef64f48999ab99ee8838ecf` |
| 2 | `02-craving-forecast-a` | Craving Forecast (A) | `c564f8b6d9c64e3389825a6a1ab870cf` |
| 3 | `03-living-dashboard` | Living Dashboard | `e74704acc29d404992201bb80fe2045d` |
| 4 | `04-onboarding-why-now` | Onboarding: Why Now? | `44e15f0fac834c8faa55f9f87c8681a7` |
| 5 | `05-craving-profile` | Your Craving Profile | `b3f1d5e1eaf144e5a20faf79833fcfd9` |
| 6 | `06-craving-forecast-b` | Craving Forecast (B) | `599475b3106848b5b4c91824bad14f03` |
| 7 | `07-sleep-sugar-insight-v3` | Sleep & Sugar Insight (V3) | `5a87a61cff354551ab211814998f6ab2` |
| 8 | `08-90-day-horizon` | The 90-Day Horizon | `75da9435398d4c32a800ca40c6cd9de9` |
| 9 | `09-craving-forecast-c` | Craving Forecast (C) | `c2b265f3342b43638c7cb6282eaac8d2` |
| 10 | `10-craving-forecast-d` | Craving Forecast (D) | `f0ccf43fad2a47a282bad4e23bab51e4` |
| 11 | `11-craving-forecast-e` | Craving Forecast (E) | `f9d7c9bf54a94d5687ef0faecedc6d70` |
| 12 | `12-daily-wellness-weather` | Daily Wellness Weather Report | `ebf9e36602b641fdbe8d94db6b01ffb5` |

## Как повторить скачивание

```bash
cd docs/06-design/stitch-export
STITCH_API_KEY=<key> node fetch.js
```

Скрипт не перезаписывает selectively — просто перекачивает все 12.
