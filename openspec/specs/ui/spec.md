# UI Specification

## Purpose

Visual design, navigation, and interaction patterns.

## Requirements

### Requirement: Dark Theme
The system SHALL use a dark color scheme by default.

#### Scenario: Default appearance
- **GIVEN** the app is loaded
- **WHEN** the UI renders
- **THEN** the background is dark, text is muted/light, and no pure white is used

### Requirement: Mobile-First Layout
The system SHALL be designed for mobile screens as the primary target.

#### Scenario: Samsung phone viewport
- **GIVEN** the app is opened on a mobile browser
- **WHEN** the layout renders
- **THEN** the content is constrained to a max-width of 480px, centered, with appropriate padding

### Requirement: Large Tap Targets
The system SHALL use large, accessible tap targets for primary actions.

#### Scenario: Log button size
- **GIVEN** the home screen is rendered
- **WHEN** the log button is displayed
- **THEN** the button is at least 160x160px with a circular shape

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

### Requirement: Hash-Based Routing
The system SHALL use hash-based routing for navigation.

#### Scenario: Direct URL access
- **GIVEN** the user navigates to `#/history`
- **WHEN** the page loads
- **THEN** the history view is rendered

#### Scenario: Default route
- **GIVEN** no hash is present in the URL
- **WHEN** the app initializes
- **THEN** the home view is rendered at `#/`

### Requirement: Safe Area Support
The system SHALL respect device safe area insets.

#### Scenario: Notch/home indicator
- **GIVEN** the device has a bottom safe area (e.g., no home button)
- **WHEN** the bottom navigation renders
- **THEN** padding accounts for `env(safe-area-inset-bottom)`
