## ADDED Requirements

### Requirement: Custom Medications Persistence
The system SHALL store user-added custom medications for reuse.

#### Scenario: Custom medication remembered
- **GIVEN** the user adds a custom medication name "Rizatriptan"
- **WHEN** the user opens the detail editor for a different entry
- **THEN** "Rizatriptan" appears as an available chip alongside preset medications

### Requirement: Entry Detail Retrieval
The system SHALL support retrieving a single entry by ID.

#### Scenario: Fetch entry for editing
- **GIVEN** an entry exists with a known ID
- **WHEN** the detail editor requests that entry
- **THEN** the complete entry object is returned

## MODIFIED Requirements

### Requirement: Settings Storage
The system SHALL persist user settings including custom medications to localStorage.

#### Scenario: Custom medications stored in settings
- **GIVEN** the user has added custom medications
- **WHEN** settings are read
- **THEN** `settings.customMedications` contains an array of custom medication names

(Previously: Settings only stored location coordinates.)
