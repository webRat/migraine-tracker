# History Specification

## Purpose

Chronological view of all logged migraine entries, grouped by date.

## Requirements

### Requirement: Reverse-Chronological List
The system SHALL display all entries sorted from most recent to oldest.

#### Scenario: Entries are sorted
- **GIVEN** multiple entries exist across different dates and times
- **WHEN** the history view is rendered
- **THEN** entries are displayed newest-first

### Requirement: Date Grouping
The system SHALL group entries by local date with readable labels.

#### Scenario: Today's entries
- **GIVEN** entries exist for the current local date
- **WHEN** the history view is rendered
- **THEN** those entries appear under a "Today" heading

#### Scenario: Yesterday's entries
- **GIVEN** entries exist for the previous local date
- **WHEN** the history view is rendered
- **THEN** those entries appear under a "Yesterday" heading

#### Scenario: Older entries
- **GIVEN** entries exist for dates before yesterday
- **WHEN** the history view is rendered
- **THEN** those entries appear under a formatted date heading (e.g., "Feb 27, 2026")

### Requirement: Entry Row Display
Each entry row SHALL show the time, weather data, and detail status.

#### Scenario: Entry with weather
- **GIVEN** an entry has weather data attached
- **WHEN** the entry row is rendered
- **THEN** it displays the time (e.g., "2:30 PM"), barometric pressure (e.g., "1013 hPa"), and temperature

#### Scenario: Entry without weather
- **GIVEN** an entry has `weather: null`
- **WHEN** the entry row is rendered
- **THEN** it displays the time and a dash (—) in place of weather data

#### Scenario: Entry with details filled
- **GIVEN** an entry has a severity set and at least one symptom or trigger selected
- **WHEN** the entry row is rendered
- **THEN** it displays the time, weather data, and the severity value

#### Scenario: Stub entry (no details)
- **GIVEN** an entry has no details filled in (all detail fields null/empty)
- **WHEN** the entry row is rendered
- **THEN** it displays the time, weather data, and an "Add details" indicator

### Requirement: Entry Tap Navigation
The system SHALL navigate to the detail editor when an entry is tapped.

#### Scenario: Tap entry card
- **GIVEN** the user is on the history view
- **WHEN** the user taps an entry card
- **THEN** the app navigates to the detail editor for that entry's ID

### Requirement: Multiple Entries Per Day Visibility
The system SHALL display all entries for a given day under a single date header.

#### Scenario: Two migraines in one day
- **GIVEN** two entries exist for the same local date
- **WHEN** the history view is rendered
- **THEN** both entries appear under one date group header

### Requirement: Empty State
The system SHALL show a message when no entries exist.

#### Scenario: No entries logged
- **GIVEN** no migraine entries exist in storage
- **WHEN** the history view is rendered
- **THEN** the text "No migraines logged yet." is displayed

### Requirement: JSON Export
The system SHALL provide a JSON export of all data.

#### Scenario: Export button
- **GIVEN** entries exist
- **WHEN** the user taps the "Export JSON" button in the history header
- **THEN** a JSON file is downloaded containing all entries, settings, and an export timestamp
