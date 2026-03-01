## ADDED Requirements

### Requirement: Settings Screen
The system SHALL provide a settings screen for managing app preferences.

#### Scenario: Navigate to settings
- **GIVEN** the app is loaded
- **WHEN** the user taps the Settings navigation tab
- **THEN** the settings screen is displayed

### Requirement: Location Management
The system SHALL allow the user to view and re-fetch their stored location.

#### Scenario: View stored location
- **GIVEN** location coordinates are stored
- **WHEN** the settings screen renders
- **THEN** the approximate stored location is displayed (city-level or coordinates)

#### Scenario: Re-fetch location
- **GIVEN** the user is on the settings screen
- **WHEN** the user taps "Update Location"
- **THEN** fresh geolocation is fetched and stored

#### Scenario: No location stored
- **GIVEN** location permission was never granted
- **WHEN** the settings screen renders
- **THEN** a prompt to enable location is shown with an explanation of why it's needed

### Requirement: Data Export from Settings
The system SHALL provide JSON and CSV export buttons on the settings screen.

#### Scenario: Export JSON from settings
- **GIVEN** the user is on the settings screen
- **WHEN** the user taps "Export JSON"
- **THEN** a JSON file is downloaded with all entries and settings

#### Scenario: Export CSV from settings
- **GIVEN** the user is on the settings screen
- **WHEN** the user taps "Export CSV"
- **THEN** a CSV file is downloaded with all entry data in a tabular format

### Requirement: About Section
The system SHALL display version and about information.

#### Scenario: View about info
- **GIVEN** the user is on the settings screen
- **WHEN** the about section is visible
- **THEN** it shows the app name, version, and a note that all data is stored locally on-device

### Requirement: PWA Install Prompt
The system SHALL prompt first-time visitors to install the app to their home screen.

#### Scenario: Install banner shown
- **GIVEN** the app is loaded in a browser (not installed)
- **WHEN** the `beforeinstallprompt` event fires
- **THEN** a non-intrusive banner is shown suggesting the user install the app

#### Scenario: User dismisses prompt
- **GIVEN** the install banner is shown
- **WHEN** the user dismisses it
- **THEN** the banner is hidden and not shown again for that session

#### Scenario: App already installed
- **GIVEN** the app is running in standalone mode (installed PWA)
- **WHEN** the app loads
- **THEN** no install banner is shown
