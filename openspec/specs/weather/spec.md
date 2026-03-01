# Weather Specification

## Purpose

Automatic capture of weather and barometric pressure data for each migraine entry via the Open-Meteo API.

## Requirements

### Requirement: Auto-Fetch Current Weather
The system SHALL fetch current weather data using the entry's own coordinates.

#### Scenario: Weather fetched at log time
- **GIVEN** the user has granted location permission
- **WHEN** a migraine entry is created
- **THEN** the system uses the freshly fetched coordinates (not stored settings) to fetch weather from Open-Meteo

#### Scenario: Weather fetch fails gracefully
- **GIVEN** the device is offline or the API is unreachable
- **WHEN** a migraine entry is created
- **THEN** the entry is saved with `weather: null` and no error is shown to the user

### Requirement: Historical Weather Backfill
The system SHALL backfill missing weather data from the Open-Meteo archive API.

#### Scenario: Backfill on app open
- **GIVEN** entries exist with `weather: null`
- **WHEN** the app is opened and location is available
- **THEN** the system fetches historical weather for each missing entry and updates it

#### Scenario: No location available
- **GIVEN** the user has not granted location permission
- **WHEN** the app attempts to backfill
- **THEN** backfill is skipped silently

### Requirement: Weather Data Shape
The system SHALL store weather data in a consistent structure.

#### Scenario: Weather data fields
- **GIVEN** a successful weather API response
- **WHEN** weather data is attached to an entry
- **THEN** the stored object contains `pressure_hpa`, `temperature_c`, `humidity_pct`, and `conditions`

### Requirement: Geolocation
The system SHALL request geolocation permission once and fetch fresh coordinates on each log.

#### Scenario: First app launch
- **GIVEN** no location permission has been granted
- **WHEN** the app initializes
- **THEN** a location permission prompt is shown explaining why location is needed

#### Scenario: Subsequent logs
- **GIVEN** location permission has been granted
- **WHEN** the user taps the log button
- **THEN** fresh coordinates are fetched silently without any prompt

#### Scenario: Location denied
- **GIVEN** the user denies location permission
- **WHEN** the prompt is dismissed
- **THEN** the app continues to function without weather data and no error blocks usage

### Requirement: Per-Entry Location
The system SHALL store coordinates on each entry for location-accurate weather.

#### Scenario: Entry includes location
- **GIVEN** fresh geolocation succeeds
- **WHEN** the entry is created
- **THEN** the entry stores `location: { lat, lon }` alongside its weather data

#### Scenario: Entry with fallback location
- **GIVEN** fresh geolocation fails but stored coordinates exist
- **WHEN** the entry is created
- **THEN** the entry stores the fallback coordinates in `location`
