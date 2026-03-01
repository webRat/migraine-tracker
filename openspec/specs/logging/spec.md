# Logging Specification

## Purpose

Core migraine logging — the primary interaction. A single tap creates a timestamped entry.

## Requirements

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

### Requirement: Logging Confirmation
The system SHALL display brief visual feedback after logging.

#### Scenario: Confirmation animation
- **GIVEN** the user taps the log button
- **WHEN** the entry is saved
- **THEN** a checkmark animation is shown and fades after approximately 1.5 seconds

### Requirement: Today Count
The system SHALL display the number of migraines logged today on the home screen.

#### Scenario: No migraines today
- **GIVEN** no entries exist for the current local date
- **WHEN** the home screen is rendered
- **THEN** no count text is shown

#### Scenario: Multiple migraines today
- **GIVEN** 2 entries exist for the current local date
- **WHEN** the home screen is rendered
- **THEN** the text "2 logged today" is displayed below the log button

### Requirement: Multiple Entries Per Day
The system SHALL treat each tap as a separate entry, even on the same day.

#### Scenario: Second migraine same day
- **GIVEN** one entry already exists for today
- **WHEN** the user taps the log button again
- **THEN** a second, separate entry is created with its own timestamp and weather data
