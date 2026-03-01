## MODIFIED Requirements

### Requirement: Data Export
The system SHALL provide JSON and CSV export options from the history view.

#### Scenario: Export JSON
- **GIVEN** entries exist
- **WHEN** the user taps "Export JSON" in the history header
- **THEN** a JSON file is downloaded containing all entries, settings, and an export timestamp

#### Scenario: Export CSV
- **GIVEN** entries exist
- **WHEN** the user taps "Export CSV" in the history header
- **THEN** a CSV file is downloaded with columns for date, time, severity, duration, pressure, temperature, symptoms, triggers, medications, and notes

(Previously: Only JSON export was available.)
