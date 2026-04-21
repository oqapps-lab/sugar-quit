# Expo SDK 55 launch fixes

Первый локальный запуск на iPhone 17 Pro Simulator через Expo Go 55.0.27 (macOS 15, Node 25.8.1). Зафиксированы проблемы, которые мешали `npx expo start` и bundle'у, и применены правки.

## Итог
- `npx expo start` → bundle проходит (1591 modules, ~5.7s)
- Home screen рендерится в Expo Go на iOS Simulator (UDID `8C76591B-81AB-44F4-9210-042D524D684F`, iPhone 17 Pro)

## Правки

### 1. `app.json` — убран `expo-haptics` из `plugins`, добавлен `expo-image`, отключен `typedRoutes`

**Причина для `expo-haptics`:** падение на старте
```
PluginError: Unable to resolve a valid config plugin for expo-haptics.
• No "app.plugin.js" file found in expo-haptics
```
`expo-haptics` — runtime API, не config-plugin. В `plugins` ему не место.

**Причина для `typedRoutes: false`:** падение при старте Metro
```
Error: Cannot find module 'expo-router/internal/routing'
```
После `expo install --fix` можно вернуть `typedRoutes: true` (обновлённый `expo-router` уже совместим).

**Причина для `expo-image`:** автоматически добавлен `expo install --fix` (в SDK 55 `expo-image` требует config-plugin).

### 2. `package.json` — выровнены версии под Expo Go 55.0.27

`expo install --check` показал 19 рассинхронизированных пакетов. Применён `expo install --fix --legacy-peer-deps`. Ключевые бампы:

| Пакет | Было | Стало |
|---|---|---|
| react-native | 0.79.0 | 0.83.4 |
| react | 19.0.0 | 19.2.0 |
| react-native-reanimated | ~4.0.0 | 4.2.1 |
| expo-router | ~6.0.0 | ~55.0.12 |
| react-native-gesture-handler | ~2.24.0 | ~2.30.0 |
| react-native-screens | ~4.10.0 | ~4.23.0 |
| react-native-safe-area-context | 5.4.0 | ~5.6.2 |
| все `expo-*` модули | разнобой | `~55.0.x` |
| typescript | ~5.8.0 | ~5.9.2 |
| @types/react | ~19.0.0 | ~19.2.10 |

**Причина:** без этого TurboModule-лоадер Expo Go валился с
```
[runtime not ready]: Invariant Violation: TurboModuleRegistry.getEnforcing(...):
'PlatformConstants' could not be found.
```

### 3. Добавлен `react-native-worklets`

`react-native-reanimated@4` вынес babel-plugin в отдельный пакет:
```
Cannot find module 'react-native-worklets/plugin'
  at node_modules/react-native-reanimated/plugin/index.js:2
```
Поставлен `react-native-worklets@0.7.2` (версия из `expo install`).

### 4. Создан `.env` (локально, не в репо — `.gitignore` его исключает)

Содержит placeholder'ы: `EXPO_PUBLIC_SUPABASE_URL`, `EXPO_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `ADAPTY_PUBLIC_KEY`. Реальные значения в коде ещё не используются (Stage 6 / mock-data).

### 5. Побочные изменения от `expo install --fix`
- `tsconfig.json` — expo-cli убрал из `include` пути `.expo/types/**/*.ts` и `expo-env.d.ts` (теперь они подхватываются через `extends` от expo)
- `.gitignore` — добавлена managed-секция `# @generated expo-cli sync-...` с `expo-env.d.ts`
- `package-lock.json` — создан (раньше репо шёл без lock-файла)

## Локальный запуск

```bash
npm install --legacy-peer-deps
cp .env.example .env
npx expo start
# → open simulator, press "i", or:
xcrun simctl openurl <UDID> "exp://127.0.0.1:8081"
```

## Известные замечания
- Node 25.8.1 — bleeding edge, часть предупреждений deprecation идёт из-за этого, но bundle собирается.
- `--legacy-peer-deps` нужен из-за peer-конфликта `react-native-reanimated@4` с текущим peer-диапазоном RN в некоторых пакетах.
