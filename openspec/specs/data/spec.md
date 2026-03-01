# Data Specification

## Purpose

Data model and persistence layer using localStorage.

## Requirements

### Requirement: Entry Data Model
The system SHALL store each migraine entry with a consistent schema.

#### Scenario: New entry structure
- **GIVEN** the user logs a migraine
- **WHEN** the entry is created
- **THEN** it contains: `id` (UUID v4), `timestamp` (ISO 8601), `weather` (nullable object), and `details` (object with nullable fields for severity, duration_minutes, symptoms, triggers, medications, notes)

### Requirement: localStorage Persistence
The system SHALL persist all entries and settings to localStorage.

#### Scenario: Data survives app close
- **GIVEN** entries have been logged
- **WHEN** the user closes and reopens the app
- **THEN** all entries are still present

#### Scenario: Corrupted storage
- **GIVEN** localStorage contains invalid JSON
- **WHEN** the store reads entries or settings
- **THEN** it returns an empty array or object rather than crashing

### Requirement: Settings Storage
The system SHALL persist user settings including custom medications to localStorage.

#### Scenario: Location coordinates stored
- **GIVEN** the user grants geolocation permission
- **WHEN** coordinates are received
- **THEN** `settings.location` is saved with `lat` and `lon` values

#### Scenario: Custom medications stored in settings
- **GIVEN** the user has added custom medications
- **WHEN** settings are read
- **THEN** `settings.customMedications` contains an array of custom medication names

### Requirement: Entry Updates
The system SHALL support updating individual entries by ID.

#### Scenario: Weather attached after creation
- **GIVEN** an entry exists with `weather: null`
- **WHEN** weather data is fetched successfully
- **THEN** the entry is updated with the weather object while preserving all other fields

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
