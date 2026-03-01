## ADDED Requirements

### Requirement: Detail Editor Screen
The system SHALL provide a screen for editing migraine entry details.

#### Scenario: Navigate to editor
- **GIVEN** the user is on the history screen
- **WHEN** the user taps an entry card
- **THEN** the detail editor is displayed for that entry

#### Scenario: Back navigation
- **GIVEN** the user is on the detail editor
- **WHEN** the user taps the back button
- **THEN** the user is returned to the history view

### Requirement: Severity Selection
The system SHALL allow the user to set a severity rating from 1 to 5.

#### Scenario: Set severity
- **GIVEN** the detail editor is open for an entry
- **WHEN** the user taps a severity level (1–5)
- **THEN** the entry's severity is updated and saved

#### Scenario: Change severity
- **GIVEN** an entry already has a severity of 3
- **WHEN** the user taps severity 4
- **THEN** the severity is updated to 4 and saved

### Requirement: Duration Input
The system SHALL allow the user to record how long the migraine lasted.

#### Scenario: Set duration
- **GIVEN** the detail editor is open
- **WHEN** the user enters a duration in hours and/or minutes
- **THEN** the entry's `duration_minutes` is updated and saved

### Requirement: Symptom Selection
The system SHALL provide multi-select chips for common symptoms.

#### Scenario: Select symptoms
- **GIVEN** the detail editor is open
- **WHEN** the user taps symptom chips (e.g., "Aura", "Nausea", "Light sensitivity", "Sound sensitivity")
- **THEN** the selected symptoms are stored in the entry's `symptoms` array

#### Scenario: Deselect a symptom
- **GIVEN** "Nausea" is currently selected
- **WHEN** the user taps "Nausea" again
- **THEN** it is removed from the `symptoms` array and saved

### Requirement: Trigger Selection
The system SHALL provide multi-select chips for common triggers.

#### Scenario: Select triggers
- **GIVEN** the detail editor is open
- **WHEN** the user taps trigger chips (e.g., "Poor sleep", "Stress", "Food", "Weather", "Hormonal", "Alcohol")
- **THEN** the selected triggers are stored in the entry's `triggers` array

### Requirement: Medication Selection
The system SHALL provide multi-select chips for medications with custom additions.

#### Scenario: Select a preset medication
- **GIVEN** the detail editor is open
- **WHEN** the user taps a medication chip (e.g., "Ibuprofen", "Sumatriptan", "Acetaminophen")
- **THEN** the medication is added to the entry's `medications` array

#### Scenario: Add a custom medication
- **GIVEN** the detail editor is open
- **WHEN** the user taps "Add custom" and enters a medication name
- **THEN** the custom medication is added to the entry's `medications` array and available as a chip for future entries

### Requirement: Notes Field
The system SHALL provide a free-text notes field.

#### Scenario: Add notes
- **GIVEN** the detail editor is open
- **WHEN** the user types in the notes field
- **THEN** the text is saved to the entry's `notes` field

### Requirement: Auto-Save
The system SHALL save changes automatically without a manual save button.

#### Scenario: Changes persist immediately
- **GIVEN** the user modifies any field in the detail editor
- **WHEN** the field value changes
- **THEN** the entry is updated in localStorage without requiring a save action
