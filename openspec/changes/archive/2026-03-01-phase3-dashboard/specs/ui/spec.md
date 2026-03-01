## MODIFIED Requirements

### Requirement: Bottom Navigation
The system SHALL provide a fixed bottom navigation bar with three tabs.

#### Scenario: Navigation between views
- **GIVEN** the app is loaded
- **WHEN** the user taps a navigation item
- **THEN** the corresponding view is rendered and the active nav item is highlighted

#### Scenario: Dashboard tab
- **GIVEN** the bottom navigation is displayed
- **WHEN** the user taps the Dashboard tab
- **THEN** the app navigates to the dashboard view

(Previously: Bottom navigation had two tabs — Home and History. Now adds a third Dashboard tab.)
