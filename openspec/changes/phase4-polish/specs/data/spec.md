## ADDED Requirements

### Requirement: CSV Export
The system SHALL export entry data as a CSV file.

#### Scenario: CSV format
- **GIVEN** entries exist with varying levels of detail
- **WHEN** CSV export is triggered
- **THEN** the file contains one row per entry with columns: Date, Time, Severity, Duration (min), Pressure (hPa), Temperature (C), Humidity (%), Conditions, Symptoms, Triggers, Medications, Notes

#### Scenario: Multi-value fields in CSV
- **GIVEN** an entry has multiple symptoms (e.g., "Aura", "Nausea")
- **WHEN** that entry is exported to CSV
- **THEN** the symptoms are joined with semicolons in a single cell (e.g., "Aura; Nausea")

#### Scenario: Empty fields in CSV
- **GIVEN** an entry has no severity or weather data
- **WHEN** that entry is exported to CSV
- **THEN** those columns are empty strings rather than "null" or "undefined"

### Requirement: PWA Manifest
The system SHALL include a web app manifest for installability.

#### Scenario: Manifest metadata
- **GIVEN** the app is loaded in a browser
- **WHEN** the browser reads the manifest
- **THEN** it finds: name "Migraine Tracker", short_name "Migraines", start_url "/", display "standalone", dark theme/background colors, and icons at 192x192 and 512x512

### Requirement: Service Worker
The system SHALL register a service worker for offline support.

#### Scenario: App shell caching
- **GIVEN** the service worker is installed
- **WHEN** the user loads the app offline
- **THEN** the HTML, CSS, and JS files are served from cache

#### Scenario: Weather API network-first
- **GIVEN** the service worker intercepts a weather API request
- **WHEN** the network is available
- **THEN** the request goes to the network (not cache)

#### Scenario: Full offline logging
- **GIVEN** the device is offline and the service worker is active
- **WHEN** the user taps the log button
- **THEN** the entry is saved to localStorage and the UI responds normally
