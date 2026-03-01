const Location = (() => {
  function requestLocation() {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation not supported'));
        return;
      }
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const location = {
            lat: pos.coords.latitude,
            lon: pos.coords.longitude
          };
          Store.updateSettings({ location });
          resolve(location);
        },
        (err) => reject(err),
        { enableHighAccuracy: false, timeout: 10000 }
      );
    });
  }

  function showPrompt() {
    const overlay = document.createElement('div');
    overlay.className = 'location-prompt';
    overlay.innerHTML = `
      <div class="location-prompt-card">
        <h2>Enable Location</h2>
        <p>Your location is used to fetch local weather and barometric pressure data when you log a migraine. It's stored only on your device.</p>
        <button class="btn-primary" id="loc-allow">Allow Location</button>
        <button class="btn-secondary" id="loc-skip">Skip for now</button>
      </div>
    `;
    document.body.appendChild(overlay);

    return new Promise((resolve) => {
      overlay.querySelector('#loc-allow').addEventListener('click', async () => {
        try {
          const loc = await requestLocation();
          overlay.remove();
          resolve(loc);
        } catch {
          overlay.querySelector('p').textContent =
            'Location access was denied. Weather data won\'t be available. You can enable it later in your browser settings.';
          overlay.querySelector('#loc-allow').style.display = 'none';
          overlay.querySelector('#loc-skip').textContent = 'Continue';
        }
      });

      overlay.querySelector('#loc-skip').addEventListener('click', () => {
        overlay.remove();
        resolve(null);
      });
    });
  }

  async function fetchFreshLocation() {
    try {
      const loc = await requestLocation();
      return loc;
    } catch {
      return getStored();
    }
  }

  function getStored() {
    return Store.getSettings().location || null;
  }

  return { requestLocation, showPrompt, getStored, fetchFreshLocation };
})();
