## Context

The app is functionally complete after Phase 3. Phase 4 is about production readiness: installability, offline reliability, doctor-friendly export, and user settings.

## Goals

- App is installable on a Samsung phone home screen with its own icon
- App shell works fully offline via service worker
- CSV export produces a file a doctor can open in Excel
- Settings screen gives users control over location and export

## Non-Goals

- No cloud backup or sync
- No import functionality (restore from JSON)
- No theme customization (dark theme only for now)
- No app store listing (PWA install only)

## Decisions

### Service worker strategy

**Chosen: Cache-first for app shell, network-first for API calls**

- App shell (HTML, CSS, JS, icons) cached on SW install and served from cache
- Weather API calls go to network first, no caching (stale weather data is worse than no data)
- Cache versioning via a `CACHE_VERSION` constant — bump to bust cache on deploy
- Alternative considered: workbox library — rejected, overkill for a handful of static files
- Alternative considered: cache-only — rejected, need network for weather API

### CSV format

**Chosen: Standard CSV with semicolon-delimited multi-value fields**

- One row per entry, columns match the data model fields
- Multi-value fields (symptoms, triggers, medications) joined with "; " — readable in Excel and parseable
- Header row included
- UTF-8 with BOM for Excel compatibility on Windows
- Alternative considered: one row per symptom/trigger (normalized) — rejected, makes the file harder to read for non-technical users

### PWA icons

**Chosen: Simple generated icons at 192x192 and 512x512**

- Minimal design — app initial or simple migraine-related icon on dark background
- Matches the app's dark theme
- maskable icon variant for Android adaptive icons
- Alternative considered: full icon set (16, 32, 48, 72, 96, 144, 192, 512) — rejected, Android only needs 192 and 512, others are optional

### Install prompt UX

**Chosen: Capture `beforeinstallprompt` event, show custom banner**

- Browser's default prompt is unreliable and often ugly
- Custom banner at the top of the screen, dismissable, non-blocking
- Shown only when the app is running in the browser (not when already installed as PWA)
- `display-mode: standalone` media query detects installed state
- Prompt stored in a variable, triggered when user taps "Install"
- Alternative considered: just let the browser handle it — rejected, too inconsistent across browsers

### Settings screen layout

**Chosen: Simple card-based sections**

- Location section: shows coordinates or "not set", update button
- Export section: JSON and CSV buttons side by side
- About section: app name, version, data-on-device note
- No complex forms — just informational display and action buttons

### Fourth nav tab placement

**Chosen: Home → History → Dashboard → Settings (left to right)**

- Settings is the least-used screen, rightmost position is conventional
- Consistent with most mobile apps (settings last)
- Four tabs still fit comfortably on mobile — each gets ~25% width

## Risks

- **Service worker cache invalidation**: Users could get stuck on an old version if the cache isn't properly busted. Mitigated by cache versioning and `skipWaiting()`
- **CSV encoding issues**: Excel on some systems may not handle UTF-8 properly. Mitigated by adding BOM (byte order mark) to the CSV blob
- **Icon quality**: Generated icons may look rough at larger sizes. Acceptable for MVP — can be replaced with designed icons later

## Open Questions

None.
