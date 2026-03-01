## MODIFIED Requirements

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

(Previously: Weather was always fetched using the static stored coordinates from first app launch.)

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

(Previously: Coordinates were fetched once on first launch and reused for all subsequent weather requests.)

## ADDED Requirements

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
