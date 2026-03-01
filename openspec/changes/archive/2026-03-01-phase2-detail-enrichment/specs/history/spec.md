## MODIFIED Requirements

### Requirement: Entry Row Display
Each entry row SHALL show the time, weather data, and detail status.

#### Scenario: Entry with details filled
- **GIVEN** an entry has a severity set and at least one symptom or trigger selected
- **WHEN** the entry row is rendered
- **THEN** it displays the time, weather data, and the severity value

#### Scenario: Stub entry (no details)
- **GIVEN** an entry has no details filled in (all detail fields null/empty)
- **WHEN** the entry row is rendered
- **THEN** it displays the time, weather data, and an "Add details" indicator

(Previously: Entry rows only showed time and weather data with no detail status.)

## ADDED Requirements

### Requirement: Entry Tap Navigation
The system SHALL navigate to the detail editor when an entry is tapped.

#### Scenario: Tap entry card
- **GIVEN** the user is on the history view
- **WHEN** the user taps an entry card
- **THEN** the app navigates to the detail editor for that entry's ID
