const PressureChart = (() => {
  let chartInstance = null;

  function render(container, entries) {
    const el = document.createElement('div');
    el.className = 'pressure-chart-container';
    container.appendChild(el);

    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentEntries = entries.filter(e => new Date(e.timestamp) >= thirtyDaysAgo);
    const withWeather = recentEntries.filter(e => e.weather && e.weather.pressure_hpa);

    if (withWeather.length < 2) {
      el.innerHTML = '<div class="chart-empty">Not enough weather data</div>';
      return;
    }

    // Sort by timestamp
    withWeather.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));

    const labels = withWeather.map(e => {
      const d = new Date(e.timestamp);
      return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    });

    const pressureData = withWeather.map(e => e.weather.pressure_hpa);

    // All entries in last 30 days are migraine events — mark them all
    const migraineMarkers = withWeather.map(e => e.weather.pressure_hpa);

    const canvas = document.createElement('canvas');
    el.appendChild(canvas);

    if (chartInstance) {
      chartInstance.destroy();
      chartInstance = null;
    }

    chartInstance = new Chart(canvas, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'Pressure (hPa)',
            data: pressureData,
            borderColor: 'rgba(78, 204, 163, 0.8)',
            backgroundColor: 'rgba(78, 204, 163, 0.1)',
            borderWidth: 2,
            fill: true,
            tension: 0.3,
            pointRadius: 0,
            pointHoverRadius: 4,
          },
          {
            label: 'Migraine',
            data: migraineMarkers,
            borderColor: 'transparent',
            backgroundColor: 'rgba(233, 69, 96, 0.9)',
            pointRadius: 5,
            pointHoverRadius: 7,
            pointStyle: 'circle',
            showLine: false,
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 1.8,
        interaction: {
          intersect: false,
          mode: 'index',
        },
        plugins: {
          legend: {
            display: true,
            labels: {
              color: '#8888a0',
              boxWidth: 12,
              padding: 16,
              font: { size: 11 },
            }
          },
          tooltip: {
            backgroundColor: '#22223a',
            titleColor: '#c8c8d8',
            bodyColor: '#c8c8d8',
            borderColor: '#33334d',
            borderWidth: 1,
          }
        },
        scales: {
          x: {
            ticks: {
              color: '#8888a0',
              font: { size: 10 },
              maxTicksLimit: 8,
            },
            grid: {
              color: 'rgba(51, 51, 77, 0.5)',
            }
          },
          y: {
            ticks: {
              color: '#8888a0',
              font: { size: 10 },
            },
            grid: {
              color: 'rgba(51, 51, 77, 0.5)',
            }
          }
        }
      }
    });
  }

  function destroy() {
    if (chartInstance) {
      chartInstance.destroy();
      chartInstance = null;
    }
  }

  return { render, destroy };
})();
