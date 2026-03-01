const App = (() => {
  const container = () => document.getElementById('app-container');

  const routes = {
    '/': () => HomeView.render(container()),
    '/history': () => HistoryView.render(container()),
    '/dashboard': () => DashboardView.render(container()),
    '/settings': () => SettingsView.render(container()),
  };

  function getRoute() {
    const hash = window.location.hash.replace('#', '') || '/';
    return hash;
  }

  function navigate() {
    const route = getRoute();

    // Handle /detail/:id routes
    const detailMatch = route.match(/^\/detail\/(.+)$/);
    if (detailMatch) {
      DetailView.render(container(), detailMatch[1]);
      updateNav(route);
      return;
    }

    const renderFn = routes[route] || routes['/'];
    renderFn();
    updateNav(route);
  }

  function updateNav(route) {
    document.querySelectorAll('.nav-item').forEach(item => {
      const href = item.getAttribute('href').replace('#', '');
      item.classList.toggle('active', href === route);
    });
  }

  async function init() {
    window.addEventListener('hashchange', navigate);

    // Check for stored location; prompt if first visit
    const settings = Store.getSettings();
    if (!settings.location) {
      await Location.showPrompt();
    }

    // Set default route
    if (!window.location.hash) {
      window.location.hash = '#/';
    }

    navigate();

    // Backfill any entries missing weather data
    Weather.backfillMissing();
  }

  // Install prompt
  let deferredPrompt = null;

  function showInstallBanner() {
    // Don't show if already installed as PWA
    if (window.matchMedia('(display-mode: standalone)').matches) return;

    const banner = document.createElement('div');
    banner.id = 'install-banner';
    banner.innerHTML = `
      <span>Install Migraine Tracker for quick access</span>
      <div class="install-banner-actions">
        <button id="install-btn">Install</button>
        <button id="install-dismiss">&times;</button>
      </div>
    `;
    document.body.prepend(banner);

    document.getElementById('install-btn').addEventListener('click', async () => {
      if (deferredPrompt) {
        deferredPrompt.prompt();
        await deferredPrompt.userChoice;
        deferredPrompt = null;
      }
      banner.remove();
    });

    document.getElementById('install-dismiss').addEventListener('click', () => {
      banner.remove();
    });
  }

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    showInstallBanner();
  });

  return { init };
})();

document.addEventListener('DOMContentLoaded', () => App.init());

// Register service worker
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js');
}
