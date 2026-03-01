## Why

Migraine entries are currently stubs — timestamp and weather only. Users need to add details (severity, symptoms, triggers, medications, notes) after the acute episode passes. Without enrichment, the data is too sparse for meaningful trend analysis in Phase 3.

## What Changes

- Add a detail editor screen accessible by tapping any entry in history
- Add visual distinction in history between stub entries and detailed entries
- Add multi-select chip UI components for symptoms, triggers, and medications
- Add severity scale (1–5) selector
- Add duration input
- Add free-text notes field
- Extend the data model's `details` object to be user-editable
- Fetch fresh geolocation on every log instead of reusing a static stored location
- Store per-entry coordinates so weather is location-accurate regardless of where the user is
- **BREAKING**: None — existing entries retain their current structure, details fields are already present as null/empty

## Impact

- Affected specs: `history`, `data`, `logging`, `weather`, new spec `detail-editor`
- Affected code: `js/views/history.js` (tap handler, visual indicator), new `js/views/detail.js`, `js/views/home.js` (fresh geolocation), `js/location.js` (silent re-fetch), `js/weather.js` (per-entry coords), `css/styles.css` (new component styles)
