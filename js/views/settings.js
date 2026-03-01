const SettingsView = (() => {
  function render(container) {
    const settings = Store.getSettings();
    const loc = settings.location;
    const locationText = loc
      ? `${loc.lat.toFixed(4)}, ${loc.lon.toFixed(4)}`
      : 'Not set';

    container.innerHTML = `
      <div class="settings-view">
        <h1>Settings</h1>

        <div class="settings-card">
          <h2>Location</h2>
          <p class="settings-location-value" id="location-display">${locationText}</p>
          ${!loc ? '<p class="settings-hint">Location is used to fetch weather data when logging migraines.</p>' : ''}
          <button class="settings-btn" id="update-location-btn">Update Location</button>
        </div>

        <div class="settings-card">
          <h2>Export Data</h2>
          <div class="export-btns">
            <button class="settings-btn" id="settings-export-json">Export JSON</button>
            <button class="settings-btn" id="settings-export-csv">Export CSV</button>
          </div>
        </div>

        <div class="settings-card">
          <h2>About</h2>
          <p class="settings-about-name">Migraine Tracker</p>
          <p class="settings-about-version">Version 1.0</p>
          <p class="settings-hint">All data is stored on this device.</p>
        </div>
      </div>
    `;

    container.querySelector('#update-location-btn').addEventListener('click', async () => {
      const btn = container.querySelector('#update-location-btn');
      btn.textContent = 'Updating...';
      btn.disabled = true;
      try {
        await Location.requestLocation();
        const updated = Store.getSettings().location;
        if (updated) {
          container.querySelector('#location-display').textContent =
            `${updated.lat.toFixed(4)}, ${updated.lon.toFixed(4)}`;
        }
      } catch {
        container.querySelector('#location-display').textContent = 'Permission denied';
      }
      btn.textContent = 'Update Location';
      btn.disabled = false;
    });

    container.querySelector('#settings-export-json').addEventListener('click', () => {
      Store.exportJSON();
    });

    container.querySelector('#settings-export-csv').addEventListener('click', () => {
      Store.exportCSV();
    });
  }

  return { render };
})();
