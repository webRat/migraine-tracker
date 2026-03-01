const HomeView = (() => {
  function render(container) {
    const todayCount = getTodayCount();

    container.innerHTML = `
      <div class="home-view">
        <button class="log-button" id="log-btn">Log Migraine</button>
        <div class="today-count" id="today-count">
          ${todayCount ? `${todayCount} logged today` : ''}
        </div>
      </div>
      <div class="confirmation" id="confirmation">&#10003;</div>
    `;

    container.querySelector('#log-btn').addEventListener('click', handleLog);
  }

  function toLocalDate(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }

  function getTodayCount() {
    const today = toLocalDate(new Date());
    return Store.getEntries().filter(e => toLocalDate(new Date(e.timestamp)) === today).length;
  }

  async function handleLog() {
    const entry = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      weather: null,
      details: {
        severity: null,
        duration_minutes: null,
        symptoms: [],
        triggers: [],
        medications: [],
        notes: ''
      }
    };

    Store.addEntry(entry);
    showConfirmation();
    updateTodayCount();

    // Fetch fresh location and weather async — never blocks
    const loc = await Location.fetchFreshLocation();
    if (loc) {
      Store.updateEntry(entry.id, { location: { lat: loc.lat, lon: loc.lon } });
      try {
        const weather = await Weather.fetchCurrent(loc.lat, loc.lon);
        if (weather) {
          Store.updateEntry(entry.id, { weather });
        }
      } catch {
        // Silently fail — entry is already saved
      }
    }
  }

  function showConfirmation() {
    const el = document.getElementById('confirmation');
    if (!el) return;
    el.classList.remove('show');
    // Force reflow to restart animation
    void el.offsetWidth;
    el.classList.add('show');
  }

  function updateTodayCount() {
    const el = document.getElementById('today-count');
    if (!el) return;
    const count = getTodayCount();
    el.textContent = count ? `${count} logged today` : '';
  }

  return { render };
})();
