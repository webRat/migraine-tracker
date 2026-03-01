## Why

With Phase 1 (logging) and Phase 2 (detail enrichment) in place, users are capturing rich data — timestamps, weather/barometric pressure, severity, symptoms, triggers, and medications. But there's no way to see patterns. The dashboard turns raw entries into actionable insight: "migraines cluster on Mondays", "episodes correlate with pressure drops", "most common trigger is poor sleep."

## What Changes

- Add a dashboard screen with three sections: calendar heatmap, barometric pressure chart, and stats panel
- Add Chart.js dependency for the pressure chart
- Build a custom calendar heatmap component (no dependency needed)
- Add a third navigation tab (Dashboard)
- Compute stats from entry data: frequency, common days, average gap, top symptoms/triggers

## Impact

- Affected specs: `ui` (new nav tab), new spec `dashboard`
- Affected code: new `js/views/dashboard.js`, new `js/components/calendar.js`, new `js/components/charts.js`, `index.html` (Chart.js script, nav tab), `css/styles.css` (dashboard styles)
