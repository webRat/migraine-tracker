const CalendarHeatmap = (() => {
  const DAY_NAMES = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  function render(container, entries) {
    const now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth();

    const el = document.createElement('div');
    el.className = 'calendar-heatmap';
    container.appendChild(el);

    function draw() {
      const countsByDay = buildDayCounts(entries, year, month);
      const today = new Date();
      const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month;

      const firstDay = new Date(year, month, 1).getDay();
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const monthLabel = new Date(year, month, 1).toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

      let html = '<div class="cal-nav">';
      html += '<button class="cal-arrow cal-prev" aria-label="Previous month">&lsaquo;</button>';
      html += '<span class="cal-month-label">' + monthLabel + '</span>';
      html += '<button class="cal-arrow cal-next" aria-label="Next month">&rsaquo;</button>';
      html += '</div>';

      html += '<div class="cal-grid">';
      for (let i = 0; i < 7; i++) {
        html += '<div class="cal-header">' + DAY_NAMES[i] + '</div>';
      }

      for (let i = 0; i < firstDay; i++) {
        html += '<div class="cal-cell cal-empty"></div>';
      }

      for (let d = 1; d <= daysInMonth; d++) {
        const count = countsByDay[d] || 0;
        const isToday = isCurrentMonth && d === today.getDate();
        let cls = 'cal-cell';
        if (count === 1) cls += ' cal-level-1';
        else if (count >= 2) cls += ' cal-level-2';
        if (isToday) cls += ' cal-today';
        html += '<div class="' + cls + '">' + d + '</div>';
      }

      html += '</div>';
      el.innerHTML = html;

      el.querySelector('.cal-prev').addEventListener('click', () => {
        month--;
        if (month < 0) { month = 11; year--; }
        draw();
      });

      el.querySelector('.cal-next').addEventListener('click', () => {
        month++;
        if (month > 11) { month = 0; year++; }
        draw();
      });
    }

    draw();
  }

  function buildDayCounts(entries, year, month) {
    const counts = {};
    entries.forEach(entry => {
      const d = new Date(entry.timestamp);
      if (d.getFullYear() === year && d.getMonth() === month) {
        const day = d.getDate();
        counts[day] = (counts[day] || 0) + 1;
      }
    });
    return counts;
  }

  return { render };
})();
