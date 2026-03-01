## 1. Data Layer

- [x] 1.1 Add `getEntry(id)` method to `js/store.js`
- [x] 1.2 Add `getCustomMedications()` and `addCustomMedication(name)` to `js/store.js`
- [x] 1.3 Add bug fix: use local dates instead of UTC for today/yesterday comparisons in `js/views/home.js` and `js/views/history.js`
- [x] 1.4 Add bug fix: use `archive-api.open-meteo.com` for historical weather in `js/weather.js`
- [x] 1.5 Add `fetchFreshLocation()` to `js/location.js` — silently fetches current coordinates, falls back to stored
- [x] 1.6 Update `js/views/home.js` to call `fetchFreshLocation()` on each log instead of reading static stored location
- [x] 1.7 Pass fresh coordinates to `Weather.fetchCurrent()` per entry
- [x] 1.8 Store `location: { lat, lon }` on each entry

## 2. Detail Editor View

- [x] 2.1 Create `js/views/detail.js` with entry loading by ID from hash route
- [x] 2.2 Add severity selector (1–5 tappable scale)
- [x] 2.3 Add duration input (hours/minutes)
- [x] 2.4 Add reusable chip selector component for multi-select fields
- [x] 2.5 Add symptom chips (Aura, Nausea, Light sensitivity, Sound sensitivity, Neck pain, Fatigue)
- [x] 2.6 Add trigger chips (Poor sleep, Stress, Food, Weather, Hormonal, Alcohol, Caffeine, Dehydration)
- [x] 2.7 Add medication chips with presets (Ibuprofen, Sumatriptan, Acetaminophen, Naproxen) and custom add
- [x] 2.8 Add free-text notes field (textarea)
- [x] 2.9 Wire auto-save: each field change calls `Store.updateEntry()` immediately
- [x] 2.10 Add back navigation button to return to history

## 3. History View Updates

- [x] 3.1 Add tap handler on entry cards to navigate to `#/detail/{id}`
- [x] 3.2 Add visual indicator for stub entries ("Add details" badge or muted style)
- [x] 3.3 Show severity value on entry cards that have details filled in

## 4. Routing

- [x] 4.1 Add `#/detail/:id` route to `js/app.js`
- [x] 4.2 Parse entry ID from hash and pass to detail view

## 5. Styles

- [x] 5.1 Add detail editor layout styles to `css/styles.css`
- [x] 5.2 Add severity selector styles (tappable circles or buttons)
- [x] 5.3 Add chip component styles (selected/unselected states)
- [x] 5.4 Add duration input styles
- [x] 5.5 Add notes textarea styles
- [x] 5.6 Add "add details" badge/indicator styles for history entry cards

## 6. Testing

- [ ] 6.1 Test on mobile Chrome (Samsung phone): create entry, tap it, add details, verify persistence
- [ ] 6.2 Verify auto-save: change a field, navigate away, return — data persists
- [ ] 6.3 Verify custom medications persist across entries
- [ ] 6.4 Verify stub vs detailed visual distinction in history
- [ ] 6.5 Verify weather backfill bug fix works (archive API URL)
- [ ] 6.6 Verify today count and date grouping are correct in evening hours (local date fix)
- [ ] 6.7 Verify fresh geolocation is fetched on each log (not static stored coordinates)
- [ ] 6.8 Verify fallback to stored coordinates when fresh geolocation fails
- [ ] 6.9 Verify each entry stores its own `location` field
