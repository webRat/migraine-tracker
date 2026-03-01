## MODIFIED Requirements

### Requirement: One-Tap Logging
The system SHALL create a migraine entry with a single tap of the log button, using the user's current location.

#### Scenario: User logs a migraine
- **GIVEN** the user is on the home screen
- **WHEN** the user taps the log button
- **THEN** a new entry is saved to localStorage with the current timestamp and fresh geolocation coordinates

#### Scenario: Entry is saved before weather fetch
- **GIVEN** the user taps the log button
- **WHEN** the entry is created
- **THEN** the entry is persisted immediately, before the weather API responds

#### Scenario: Fresh geolocation on each log
- **GIVEN** the user has previously granted location permission
- **WHEN** the user taps the log button
- **THEN** the system fetches current coordinates via the Geolocation API rather than using stored static coordinates

#### Scenario: Geolocation fallback
- **GIVEN** the fresh geolocation fetch fails (timeout, GPS unavailable)
- **WHEN** the user taps the log button
- **THEN** the system uses the last known stored coordinates as a fallback

(Previously: Logging always used the static coordinates stored on first app launch.)
