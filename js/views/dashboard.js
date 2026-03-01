const DashboardView = (() => {
  function render(container) {
    PressureChart.destroy();
    const entries = Store.getEntries();

    container.innerHTML = '';

    const view = document.createElement('div');
    view.className = 'dashboard-view';

    // Calendar section
    view.innerHTML += '<h2 class="dash-section-header">Calendar</h2>';
    const calContainer = document.createElement('div');
    view.appendChild(calContainer);
    CalendarHeatmap.render(calContainer, entries);

    // Pressure chart section
    const chartHeader = document.createElement('h2');
    chartHeader.className = 'dash-section-header';
    chartHeader.textContent = 'Barometric Pressure';
    view.appendChild(chartHeader);
    const chartContainer = document.createElement('div');
    view.appendChild(chartContainer);
    PressureChart.render(chartContainer, entries);

    // Stats section
    const statsHeader = document.createElement('h2');
    statsHeader.className = 'dash-section-header';
    statsHeader.textContent = 'Stats';
    view.appendChild(statsHeader);
    const statsContainer = document.createElement('div');
    statsContainer.className = 'stats-panel';
    view.appendChild(statsContainer);
    renderStats(statsContainer, entries);

    container.appendChild(view);
  }

  function renderStats(container, entries) {
    const stats = computeStats(entries);
    let html = '';

    html += statCard('This Week', stats.thisWeek);
    html += statCard('This Month', stats.thisMonth);
    html += statCard('Most Common Day', stats.mostCommonDay);
    html += statCard('Avg. Gap', stats.avgGap);
    html += statCard('Top Symptoms', stats.topSymptoms);
    html += statCard('Top Triggers', stats.topTriggers);

    container.innerHTML = html;
  }

  function statCard(label, value) {
    return '<div class="stat-card"><div class="stat-label">' + label + '</div><div class="stat-value">' + value + '</div></div>';
  }

  function computeStats(entries) {
    const now = new Date();

    return {
      thisWeek: countThisWeek(entries, now),
      thisMonth: countThisMonth(entries, now),
      mostCommonDay: getMostCommonDay(entries),
      avgGap: getAverageGap(entries),
      topSymptoms: getTopItems(entries, 'symptoms'),
      topTriggers: getTopItems(entries, 'triggers'),
    };
  }

  function countThisWeek(entries, now) {
    const day = now.getDay();
    const monday = new Date(now);
    monday.setDate(now.getDate() - ((day + 6) % 7));
    monday.setHours(0, 0, 0, 0);
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 7);

    const count = entries.filter(e => {
      const d = new Date(e.timestamp);
      return d >= monday && d < sunday;
    }).length;

    return String(count);
  }

  function countThisMonth(entries, now) {
    const count = entries.filter(e => {
      const d = new Date(e.timestamp);
      return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
    }).length;

    return String(count);
  }

  function getMostCommonDay(entries) {
    if (entries.length < 2) return 'Not enough data';

    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const counts = [0, 0, 0, 0, 0, 0, 0];

    entries.forEach(e => {
      const d = new Date(e.timestamp);
      counts[d.getDay()]++;
    });

    const maxCount = Math.max(...counts);
    const maxIdx = counts.indexOf(maxCount);
    return dayNames[maxIdx];
  }

  function getAverageGap(entries) {
    if (entries.length < 2) return 'Not enough data';

    const sorted = entries
      .map(e => new Date(e.timestamp).getTime())
      .sort((a, b) => a - b);

    let totalGap = 0;
    for (let i = 1; i < sorted.length; i++) {
      totalGap += sorted[i] - sorted[i - 1];
    }

    const avgMs = totalGap / (sorted.length - 1);
    const avgDays = avgMs / (1000 * 60 * 60 * 24);

    return avgDays < 1
      ? '< 1 day'
      : avgDays.toFixed(1) + ' days';
  }

  function getTopItems(entries, field) {
    const counts = {};
    entries.forEach(e => {
      const items = e.details && e.details[field];
      if (Array.isArray(items)) {
        items.forEach(item => {
          counts[item] = (counts[item] || 0) + 1;
        });
      }
    });

    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    if (sorted.length === 0) return 'Not enough data';

    return sorted.slice(0, 3).map(([name]) => name).join(', ');
  }

  return { render };
})();
