const Store = (() => {
  const ENTRIES_KEY = 'migraine_entries';
  const SETTINGS_KEY = 'migraine_settings';

  function getEntries() {
    try {
      return JSON.parse(localStorage.getItem(ENTRIES_KEY)) || [];
    } catch {
      return [];
    }
  }

  function saveEntries(entries) {
    localStorage.setItem(ENTRIES_KEY, JSON.stringify(entries));
  }

  function addEntry(entry) {
    const entries = getEntries();
    entries.push(entry);
    saveEntries(entries);
  }

  function getEntry(id) {
    return getEntries().find(e => e.id === id) || null;
  }

  function updateEntry(id, updates) {
    const entries = getEntries();
    const idx = entries.findIndex(e => e.id === id);
    if (idx !== -1) {
      entries[idx] = { ...entries[idx], ...updates };
      saveEntries(entries);
    }
  }

  function getCustomMedications() {
    return getSettings().customMedications || [];
  }

  function addCustomMedication(name) {
    const meds = getCustomMedications();
    if (!meds.includes(name)) {
      meds.push(name);
      updateSettings({ customMedications: meds });
    }
  }

  function getSettings() {
    try {
      return JSON.parse(localStorage.getItem(SETTINGS_KEY)) || {};
    } catch {
      return {};
    }
  }

  function updateSettings(updates) {
    const settings = { ...getSettings(), ...updates };
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    return settings;
  }

  function exportJSON() {
    const data = {
      entries: getEntries(),
      settings: getSettings(),
      exportedAt: new Date().toISOString()
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `migraine-data-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function exportCSV() {
    const entries = getEntries();
    const header = ['Date', 'Time', 'Severity', 'Duration (min)', 'Pressure (hPa)', 'Temperature (C)', 'Humidity (%)', 'Conditions', 'Symptoms', 'Triggers', 'Medications', 'Notes'];
    const rows = entries.map(entry => {
      const d = new Date(entry.timestamp);
      const date = d.toLocaleDateString();
      const time = d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      const det = entry.details || {};
      const w = entry.weather || {};
      return [
        date,
        time,
        det.severity != null ? det.severity : '',
        det.duration_minutes != null ? det.duration_minutes : '',
        w.pressure_hpa != null ? w.pressure_hpa : '',
        w.temperature_c != null ? w.temperature_c : '',
        w.humidity_pct != null ? w.humidity_pct : '',
        w.conditions || '',
        (det.symptoms || []).join('; '),
        (det.triggers || []).join('; '),
        (det.medications || []).join('; '),
        det.notes || ''
      ];
    });

    const csvContent = [header, ...rows]
      .map(row => row.map(cell => {
        const str = String(cell);
        return str.includes(',') || str.includes('"') || str.includes('\n')
          ? '"' + str.replace(/"/g, '""') + '"'
          : str;
      }).join(','))
      .join('\n');

    const BOM = '\uFEFF';
    const blob = new Blob([BOM + csvContent], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `migraine-data-${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return { getEntries, getEntry, addEntry, updateEntry, getCustomMedications, addCustomMedication, getSettings, updateSettings, exportJSON, exportCSV };
})();
