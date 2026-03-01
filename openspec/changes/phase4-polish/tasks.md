## 1. PWA Manifest and Icons

- [x] 1.1 Create `manifest.json` with name, short_name, start_url, display, theme_color, background_color, and icon references
- [x] 1.2 Create PWA icons at 192x192 and 512x512 (simple design, dark background)
- [x] 1.3 Create maskable icon variant for Android adaptive icons
- [x] 1.4 Add `<link rel="manifest">` to `index.html`
- [x] 1.5 Add apple-touch-icon link to `index.html` for iOS

## 2. Service Worker

- [x] 2.1 Create `sw.js` at project root
- [x] 2.2 Define `CACHE_VERSION` and list of app shell files to cache
- [x] 2.3 Implement `install` event: precache app shell files
- [x] 2.4 Implement `activate` event: delete old caches, call `skipWaiting()`
- [x] 2.5 Implement `fetch` event: cache-first for app shell, network-first for API calls (open-meteo.com)
- [x] 2.6 Register service worker in `index.html` or `js/app.js`

## 3. CSV Export

- [x] 3.1 Add `exportCSV()` to `js/store.js`
- [x] 3.2 Generate header row: Date, Time, Severity, Duration (min), Pressure (hPa), Temperature (C), Humidity (%), Conditions, Symptoms, Triggers, Medications, Notes
- [x] 3.3 Generate one data row per entry, formatting multi-value fields with "; " separator
- [x] 3.4 Handle empty/null fields as empty strings (not "null")
- [x] 3.5 Add UTF-8 BOM to blob for Excel compatibility
- [x] 3.6 Trigger download as `migraine-data-{date}.csv`

## 4. History View Updates

- [x] 4.1 Add "Export CSV" button alongside existing "Export JSON" button in `js/views/history.js`
- [x] 4.2 Style export buttons side by side

## 5. Settings View

- [x] 5.1 Create `js/views/settings.js`
- [x] 5.2 Add location section: display stored coordinates (or "Not set"), "Update Location" button
- [x] 5.3 Wire "Update Location" to call `Location.requestLocation()` and refresh display
- [x] 5.4 Add export section: "Export JSON" and "Export CSV" buttons
- [x] 5.5 Add about section: app name, version, "All data stored on this device" note
- [x] 5.6 Add `<script>` tag for settings view in `index.html`

## 6. Navigation and Routing

- [x] 6.1 Add Settings tab to bottom navigation in `index.html` (gear icon)
- [x] 6.2 Add `#/settings` route to `js/app.js`
- [x] 6.3 Update nav styles for 4-tab layout

## 7. Install Prompt

- [x] 7.1 Capture `beforeinstallprompt` event in `js/app.js` and store the event
- [x] 7.2 Create install banner UI (top of screen, dismissable)
- [x] 7.3 On banner tap, call `prompt()` on the stored event
- [x] 7.4 Hide banner if app is already in standalone mode (`window.matchMedia('(display-mode: standalone)')`)
- [x] 7.5 Hide banner after dismissal (session only, show again next visit)

## 8. UX Improvements

- [x] 8.1 Replace `window.prompt()` for custom medication input in `js/views/detail.js` with an inline modal/input (less jarring on mobile)

## 9. Styles

- [x] 9.1 Add settings screen styles (card sections, buttons, location display)
- [x] 9.2 Add install banner styles (top bar, dismiss button, dark theme)
- [x] 9.3 Update export button area in history for side-by-side layout
- [x] 9.4 Update bottom nav for 4-tab even spacing
- [x] 9.5 Add custom medication inline modal styles

## 10. Testing

- [ ] 10.1 Verify `manifest.json` passes Chrome DevTools Lighthouse PWA audit
- [ ] 10.2 Verify service worker installs and caches app shell
- [ ] 10.3 Verify app loads fully offline after first visit (airplane mode test)
- [ ] 10.4 Verify log button works offline and entry is saved
- [ ] 10.5 Verify CSV export opens correctly in Excel/Google Sheets
- [ ] 10.6 Verify CSV handles entries with empty detail fields gracefully
- [ ] 10.7 Verify CSV multi-value fields are semicolon-separated
- [ ] 10.8 Verify install prompt appears in mobile Chrome browser
- [ ] 10.9 Verify install prompt does not appear when already installed as PWA
- [ ] 10.10 Verify settings screen shows stored location and update works
- [ ] 10.11 Verify 4-tab nav renders correctly on Samsung phone
- [ ] 10.12 Verify custom medication inline modal works on mobile (keyboard opens, input submits)
