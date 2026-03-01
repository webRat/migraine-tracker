## Context

Phase 1 is complete — entries are logged as stubs with timestamps and weather. Phase 2 adds the ability to enrich entries with details after the fact. The data model already has the `details` object with null/empty fields, so this is purely additive UI work.

## Goals

- Users can enrich any past entry with severity, symptoms, triggers, medications, and notes
- History view makes it obvious which entries need details added
- Auto-save on every change (no save button — reduces friction)
- Custom medications persist across entries

## Non-Goals

- No reordering or deleting entries (not yet needed)
- No bulk editing
- No data validation beyond what the UI constrains (e.g., severity is always 1–5 because you tap a button)
- No manual location entry — geolocation API only

## Decisions

### Routing for detail editor

**Chosen: Hash route with entry ID** (`#/detail/{id}`)

- Consistent with existing hash-based routing
- Entry ID in the URL means the page is bookmarkable/refreshable
- Alternative considered: modal overlay — rejected because the detail form is too tall for a modal on mobile

### Auto-save vs explicit save button

**Chosen: Auto-save on change**

- Reduces interaction to minimum (no save button to find/tap)
- Each field change calls `Store.updateEntry()` immediately
- Low risk since localStorage writes are synchronous and fast
- Alternative considered: save button — rejected because it adds friction and the migraine context means users want minimum interaction

### Chip component architecture

**Chosen: Reusable chip selector rendered with a config array**

- Same component used for symptoms, triggers, and medications
- Config defines the preset chips, whether custom additions are allowed, and which entry field to bind to
- Alternative considered: separate components per field — rejected as duplicative

### Custom medications storage

**Chosen: Stored in `settings.customMedications` array**

- Keeps them separate from entry data
- Available globally across all entries
- Alternative considered: derive from all past entries — rejected because it requires scanning all entries on every render

### Fresh geolocation per log

**Chosen: Fetch coordinates on every button press, fall back to last known**

- The user's location isn't static — they could be at home, work, or traveling
- Using stale coordinates means the weather/pressure reading could be for the wrong location
- `getCurrentPosition` is fast (~1 second) and the permission is already granted after the initial prompt
- Stored `settings.location` becomes a fallback if the fresh fetch fails (e.g., GPS timeout)
- Each entry stores its own `location` so weather is always tied to where they actually were
- Alternative considered: periodic background updates — rejected, unnecessary complexity when we can just grab it on each log
- Alternative considered: keep static location — rejected because pressure readings are location-sensitive and the whole point is correlation accuracy

## Risks

- **localStorage size**: Adding details to many entries increases storage, but even 1000 detailed entries would be well under the 5MB limit
- **Auto-save data loss**: Navigating away mid-edit could lose in-flight changes — mitigated by saving on each individual field change rather than on navigation

## Open Questions

None — scope is well-defined.
