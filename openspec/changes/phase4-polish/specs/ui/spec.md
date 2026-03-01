## MODIFIED Requirements

### Requirement: Bottom Navigation
The system SHALL provide a fixed bottom navigation bar with four tabs.

#### Scenario: Navigation between views
- **GIVEN** the app is loaded
- **WHEN** the user taps a navigation item
- **THEN** the corresponding view is rendered and the active nav item is highlighted

#### Scenario: Four tab layout
- **GIVEN** the bottom navigation is displayed
- **WHEN** the nav renders
- **THEN** four tabs are shown: Home, History, Dashboard, Settings

(Previously: Three tabs — Home, History, Dashboard. Now adds a fourth Settings tab.)
