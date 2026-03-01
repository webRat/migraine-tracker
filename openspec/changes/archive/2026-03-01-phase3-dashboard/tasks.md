## 1. Dependencies and Shell

- [x] 1.1 Add Chart.js `<script>` tag (CDN) to `index.html`
- [x] 1.2 Add Dashboard tab to bottom navigation in `index.html` (chart/graph icon)
- [x] 1.3 Add `#/dashboard` route to `js/app.js`

## 2. Calendar Heatmap Component

- [x] 2.1 Create `js/components/calendar.js` — renders a month grid into a container element
- [x] 2.2 Accept entries array and render day cells with color intensity based on entry count (0 = none, 1 = light, 2+ = dark)
- [x] 2.3 Add month navigation (previous/next arrows) with re-render
- [x] 2.4 Highlight today's date with a subtle border or indicator
- [x] 2.5 Show day-of-week headers (S M T W T F S)

## 3. Barometric Pressure Chart

- [x] 3.1 Create `js/components/charts.js` — wrapper for Chart.js pressure chart
- [x] 3.2 Extract pressure readings from entries with weather data over last 30 days
- [x] 3.3 Render line chart: X-axis = dates, Y-axis = pressure (hPa)
- [x] 3.4 Overlay migraine events as point markers on the pressure line
- [x] 3.5 Handle sparse data — skip days with no weather rather than interpolating
- [x] 3.6 Show "Not enough weather data" message when fewer than 2 entries have weather
- [x] 3.7 Style chart for dark theme (dark background, muted grid lines, light text)

## 4. Stats Panel

- [x] 4.1 Create stats computation functions in `js/views/dashboard.js`
- [x] 4.2 Compute migraines this week (current Mon–Sun)
- [x] 4.3 Compute migraines this month (current calendar month)
- [x] 4.4 Compute most common day of week
- [x] 4.5 Compute average gap between episodes (days)
- [x] 4.6 Compute top 3 most logged symptoms
- [x] 4.7 Compute top 3 most logged triggers
- [x] 4.8 Show "Not enough data" for stats that require more entries

## 5. Dashboard View

- [x] 5.1 Create `js/views/dashboard.js` — composes calendar, chart, and stats panel
- [x] 5.2 Layout: calendar heatmap at top, pressure chart below, stats panel at bottom
- [x] 5.3 Add section headers ("Calendar", "Barometric Pressure", "Stats")
- [x] 5.4 Add `<script>` tag for dashboard view in `index.html`
- [x] 5.5 Add `<script>` tags for calendar and charts components in `index.html`

## 6. Styles

- [x] 6.1 Add calendar heatmap styles (grid layout, day cells, color scale, month nav arrows)
- [x] 6.2 Add pressure chart container styles (fixed aspect ratio, dark theme overrides)
- [x] 6.3 Add stats panel styles (card layout, stat label + value pairs)
- [x] 6.4 Add dashboard section header styles
- [x] 6.5 Update bottom nav styles for 3-tab layout (ensure even spacing)

## 7. Testing

- [ ] 7.1 Verify calendar renders current month with correct day alignment
- [ ] 7.2 Verify heatmap colors reflect actual entry counts per day
- [ ] 7.3 Verify month navigation works (previous/next)
- [ ] 7.4 Verify pressure chart renders with real entry data
- [ ] 7.5 Verify migraine markers appear on correct dates in the chart
- [ ] 7.6 Verify stats numbers are accurate (spot-check against history view)
- [ ] 7.7 Verify "Not enough data" states display correctly with few/no entries
- [ ] 7.8 Verify dashboard tab works in bottom nav on mobile Chrome (Samsung)
- [ ] 7.9 Verify Chart.js loads from CDN and renders in dark theme
