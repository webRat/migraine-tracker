## Why

The app is functionally complete after Phase 3 but isn't installable as a PWA, has no settings screen, and only exports JSON (not useful for handing to a doctor). Phase 4 makes it feel like a real app: installable on the home screen, works fully offline, exports doctor-friendly CSV, and gives users control over their settings.

## What Changes

- Add PWA manifest and service worker for installability and offline caching
- Add CSV export alongside JSON export
- Add a settings screen (location management, export, about)
- Add install-to-home-screen prompt for first-time visitors
- Add a fourth navigation tab (Settings)

## Impact

- Affected specs: `ui` (fourth nav tab), `history` (CSV export button), `data` (CSV export function), new specs `settings`, `pwa`
- Affected code: new `manifest.json`, new `sw.js`, new `js/views/settings.js`, `js/store.js` (CSV export), `js/views/history.js` (CSV button), `index.html` (manifest link, SW registration, nav tab, new scripts), `css/styles.css` (settings styles, install prompt styles)
