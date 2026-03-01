## ADDED Requirements

### Requirement: Calendar Heatmap
The system SHALL display a monthly calendar heatmap showing migraine frequency by day.

#### Scenario: No migraines in a day
- **GIVEN** a day with zero entries
- **WHEN** the calendar renders
- **THEN** that day cell has no color fill

#### Scenario: One migraine in a day
- **GIVEN** a day with one entry
- **WHEN** the calendar renders
- **THEN** that day cell is shaded with a light accent color

#### Scenario: Multiple migraines in a day
- **GIVEN** a day with two or more entries
- **WHEN** the calendar renders
- **THEN** that day cell is shaded with a darker/more intense color to visually stand out

#### Scenario: Month navigation
- **GIVEN** the dashboard is displayed
- **WHEN** the user taps previous/next month arrows
- **THEN** the calendar navigates to the adjacent month

#### Scenario: Current month default
- **GIVEN** the user navigates to the dashboard
- **WHEN** the calendar first renders
- **THEN** the current month is displayed

### Requirement: Barometric Pressure Chart
The system SHALL display a line chart of barometric pressure with migraine events overlaid.

#### Scenario: Pressure over time
- **GIVEN** entries exist with weather data over a time range
- **WHEN** the chart renders
- **THEN** a line chart shows barometric pressure (hPa) on the Y-axis and dates on the X-axis

#### Scenario: Migraine markers
- **GIVEN** entries exist on specific dates
- **WHEN** the chart renders
- **THEN** migraine events are plotted as point markers on the pressure line at their corresponding dates

#### Scenario: Time range
- **GIVEN** the dashboard is displayed
- **WHEN** the pressure chart renders
- **THEN** it shows the last 30 days of data by default

#### Scenario: No weather data
- **GIVEN** no entries have weather data attached
- **WHEN** the chart attempts to render
- **THEN** a message is shown indicating insufficient weather data

### Requirement: Stats Panel
The system SHALL display summary statistics computed from entry data.

#### Scenario: Weekly and monthly frequency
- **GIVEN** entries exist
- **WHEN** the stats panel renders
- **THEN** it shows the count of migraines in the current week and current month

#### Scenario: Most common day of week
- **GIVEN** enough entries exist to identify a pattern
- **WHEN** the stats panel renders
- **THEN** it shows which day of the week has the most migraines

#### Scenario: Average gap between episodes
- **GIVEN** at least two entries exist
- **WHEN** the stats panel renders
- **THEN** it shows the average number of days between migraine episodes

#### Scenario: Top symptoms and triggers
- **GIVEN** entries have detail data with symptoms and triggers filled in
- **WHEN** the stats panel renders
- **THEN** it shows the most frequently logged symptoms and triggers

#### Scenario: Insufficient data
- **GIVEN** fewer than two entries exist
- **WHEN** the stats panel renders
- **THEN** stats that require more data show a "Not enough data" message instead of misleading numbers
