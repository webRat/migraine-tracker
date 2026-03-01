const HistoryView = (() => {
  function render(container) {
    const entries = Store.getEntries().sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    );

    if (entries.length === 0) {
      container.innerHTML = `
        <div class="history-view">
          <div class="history-header">
            <h1>History</h1>
          </div>
          <div class="empty-state">No migraines logged yet.</div>
        </div>
      `;
      return;
    }

    const groups = groupByDate(entries);

    let html = `
      <div class="history-view">
        <div class="history-header">
          <h1>History</h1>
          <div class="export-btns">
            <button class="export-btn" id="export-json-btn">Export JSON</button>
            <button class="export-btn" id="export-csv-btn">Export CSV</button>
          </div>
        </div>
    `;

    for (const [label, groupEntries] of groups) {
      html += `<div class="date-group"><div class="date-label">${label}</div>`;
      for (const entry of groupEntries) {
        const time = formatTime(entry.timestamp);
        const pressure = entry.weather ? `${Math.round(entry.weather.pressure_hpa)} hPa` : '\u2014';
        const temp = entry.weather ? `${Math.round(entry.weather.temperature_c)}\u00b0C` : '';
        const hasDetails = entry.details && entry.details.severity;
        const detailBadge = hasDetails
          ? `<span class="entry-severity">Severity ${entry.details.severity}</span>`
          : `<span class="entry-badge-stub">Add details</span>`;
        html += `
          <div class="entry-card" data-entry-id="${entry.id}">
            <div class="entry-left">
              <div class="entry-time">${time}</div>
              ${detailBadge}
            </div>
            <div class="entry-weather">
              <div>${pressure}</div>
              ${temp ? `<div>${temp}</div>` : ''}
            </div>
          </div>
        `;
      }
      html += `</div>`;
    }

    html += `</div>`;
    container.innerHTML = html;

    container.querySelector('#export-json-btn').addEventListener('click', () => {
      Store.exportJSON();
    });
    container.querySelector('#export-csv-btn').addEventListener('click', () => {
      Store.exportCSV();
    });

    container.querySelectorAll('.entry-card[data-entry-id]').forEach(card => {
      card.addEventListener('click', () => {
        window.location.hash = `#/detail/${card.dataset.entryId}`;
      });
    });
  }

  function toLocalDate(date) {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
  }

  function groupByDate(entries) {
    const groups = new Map();
    const now = new Date();
    const today = toLocalDate(now);
    const yesterdayDate = new Date(now);
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterday = toLocalDate(yesterdayDate);

    for (const entry of entries) {
      const dateStr = toLocalDate(new Date(entry.timestamp));
      let label;
      if (dateStr === today) {
        label = 'Today';
      } else if (dateStr === yesterday) {
        label = 'Yesterday';
      } else {
        label = new Date(dateStr + 'T12:00:00').toLocaleDateString('en-US', {
          month: 'short', day: 'numeric', year: 'numeric'
        });
      }

      if (!groups.has(label)) {
        groups.set(label, []);
      }
      groups.get(label).push(entry);
    }

    return groups;
  }

  function formatTime(isoString) {
    return new Date(isoString).toLocaleTimeString('en-US', {
      hour: 'numeric', minute: '2-digit', hour12: true
    });
  }

  return { render };
})();
