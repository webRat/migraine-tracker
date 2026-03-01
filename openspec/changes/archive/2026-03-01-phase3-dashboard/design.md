## Context

Phases 1 and 2 give users rich entry data — timestamps, weather, severity, symptoms, triggers, medications. Phase 3 makes that data visible as trends. The primary value proposition of the app is helping the user (and their doctor) identify patterns.

## Goals

- Calendar heatmap for at-a-glance frequency and multi-migraine day visibility
- Barometric pressure chart with migraine overlay for weather correlation
- Stats panel for quick summary numbers
- All computed client-side from localStorage data — no server needed

## Non-Goals

- No predictive analytics or forecasting (future consideration)
- No multi-month comparison views
- No data filtering (e.g., "show only migraines with aura") — keep it simple for now
- No sharing/screenshot export of charts

## Decisions

### Chart library

**Chosen: Chart.js via CDN**

- Lightweight (~60KB gzip), well-documented, no build step needed
- Supports line charts with point annotations out of the box
- Can be loaded from a CDN `<script>` tag, consistent with the no-build approach
- Alternative considered: lightweight custom SVG chart — rejected because pressure line + markers + axis labels would take significant effort to do well
- Alternative considered: D3.js — rejected, overkill for a single chart type

### Calendar heatmap

**Chosen: Custom HTML/CSS component (no library)**

- A month grid is simple enough to render with a loop
- Color intensity mapped to entry count per day (0 = none, 1 = light, 2+ = intense)
- No external dependency needed
- Alternative considered: Chart.js matrix plugin — rejected, adds dependency for something CSS handles natively

### Stats computation

**Chosen: Compute on render from raw entries**

- No precomputed aggregates or caching — scan the entries array each time
- With expected data sizes (hundreds of entries at most), this is effectively instant
- Keeps the data model simple — a single entries array is the only source of truth
- Alternative considered: precomputed stats object in localStorage — rejected, premature optimization that adds sync complexity

### Pressure chart time range

**Chosen: Last 30 days, fixed**

- Simple, predictable, covers roughly one menstrual cycle (relevant for hormonal triggers)
- Shows enough data to spot pressure patterns without being overwhelming
- Alternative considered: configurable range (7/30/90 days) — deferred to Phase 4 if needed

### Dashboard placement in nav

**Chosen: Third tab in bottom nav, rightmost position**

- Home (left) → History (center) → Dashboard (right)
- Dashboard is a "review" action, less frequent than logging, so rightmost is appropriate
- Three tabs still fit comfortably in mobile bottom nav

## Risks

- **Chart.js bundle size**: ~60KB gzip is acceptable for a PWA, but the service worker (Phase 4) should cache it aggressively
- **Render performance with many entries**: Stats computation scans all entries. At 1000+ entries this could introduce lag — mitigated by the fact that most users will have far fewer entries
- **Missing weather data holes**: If many entries lack weather (geolocation denied, offline), the pressure chart may have gaps. The chart should handle sparse data gracefully rather than interpolating

## Open Questions

None.
