const Weather = (() => {
  const BASE = 'https://api.open-meteo.com/v1';

  const WEATHER_CODES = {
    0: 'Clear',
    1: 'Partly cloudy', 2: 'Partly cloudy', 3: 'Partly cloudy',
    45: 'Fog', 48: 'Fog',
    51: 'Drizzle', 53: 'Drizzle', 55: 'Drizzle',
    61: 'Rain', 63: 'Rain', 65: 'Rain',
    71: 'Snow', 73: 'Snow', 75: 'Snow',
    80: 'Rain showers', 81: 'Rain showers', 82: 'Rain showers',
    95: 'Thunderstorm', 96: 'Thunderstorm', 99: 'Thunderstorm'
  };

  function describeCode(code) {
    return WEATHER_CODES[code] || 'Unknown';
  }

  async function fetchCurrent(lat, lon) {
    try {
      const url = `${BASE}/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,surface_pressure,weather_code`;
      const res = await fetch(url);
      if (!res.ok) return null;
      const data = await res.json();
      const c = data.current;
      return {
        pressure_hpa: c.surface_pressure,
        temperature_c: c.temperature_2m,
        humidity_pct: c.relative_humidity_2m,
        conditions: describeCode(c.weather_code)
      };
    } catch {
      return null;
    }
  }

  async function fetchHistorical(lat, lon, date) {
    try {
      const url = `https://archive-api.open-meteo.com/v1/archive?latitude=${lat}&longitude=${lon}&start_date=${date}&end_date=${date}&hourly=temperature_2m,relative_humidity_2m,surface_pressure,weather_code`;
      const res = await fetch(url);
      if (!res.ok) return null;
      const data = await res.json();
      const h = data.hourly;
      // Use midday (index 12) as representative
      const i = 12;
      return {
        pressure_hpa: h.surface_pressure[i],
        temperature_c: h.temperature_2m[i],
        humidity_pct: h.relative_humidity_2m[i],
        conditions: describeCode(h.weather_code[i])
      };
    } catch {
      return null;
    }
  }

  async function backfillMissing() {
    const loc = Location.getStored();
    if (!loc) return;

    const entries = Store.getEntries();
    for (const entry of entries) {
      if (entry.weather) continue;
      const date = entry.timestamp.slice(0, 10);
      const weather = await fetchHistorical(loc.lat, loc.lon, date);
      if (weather) {
        Store.updateEntry(entry.id, { weather });
      }
    }
  }

  return { fetchCurrent, fetchHistorical, backfillMissing };
})();
