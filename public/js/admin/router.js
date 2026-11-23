
// Page navigation, shell events, and app start-up.
(() => {
  const T = window.Trimora;
  const content = document.getElementById('content');

  const errorCard = (title, msg) =>
    `<section class="card"><div class="empty"><h3>${title}</h3><p>${T.esc(msg)}</p></div></section>`;

  const loadError = () =>
    errorCard('Data not loaded', T.loadError || 'The admin data could not be loaded.');

  T.go = name => {
    if (!T.data) {
      document.querySelectorAll('.nav-item[data-view]').forEach(b =>
        b.classList.toggle('active', b.dataset.view === name)
      );
      content.innerHTML = loadError();
      return;
    }

    const page = T.pages[name];

    if (!page) {
      content.innerHTML = errorCard(
        'Page not found',
        `Missing script: public/js/admin/pages/${name}-page.js`
      );
      return;
    }

    T.destroyCharts();
    T.current = name;
    T.query = '';

    document.getElementById('search').value = '';

    document.querySelectorAll('.nav-item[data-view]').forEach(b =>
      b.classList.toggle('active', b.dataset.view === name)
    );

    document.getElementById('pageTitle').textContent = page.title;
    document.body.classList.remove('open');

    try {
      content.innerHTML = page.render();

      if (page.mount) {
        page.mount();
      }
    } catch (err) {
      console.error('Page rendering error:', err);

      content.innerHTML = errorCard(
        'This page failed to load',
        err.message
      );
    }

    T.refreshIcons();
    window.scrollTo(0, 0);
  };

  document.getElementById('nav').addEventListener('click', e => {
    const b = e.target.closest('[data-view]');

    if (b) {
      T.go(b.dataset.view);
    }
  });

  document.getElementById('toggle').onclick = () => {
    window.innerWidth <= 860
      ? document.body.classList.toggle('open')
      : document.body.classList.toggle('collapsed');
  };

  document.getElementById('overlay').onclick = () => {
    document.body.classList.remove('open');
  };

  document.getElementById('logout').onclick = () => {
    T.toast('Logout will be connected once authentication is built.');
  };

  document.getElementById('search').addEventListener('input', e => {
    T.query = e.target.value.trim();

    const page = T.pages[T.current];

    if (page && page.onSearch) {
      page.onSearch();
    }
  });

  document.getElementById('today').textContent =
    new Date().toLocaleDateString('en-PH', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

  // Load admin data from the server API.
  fetch('/api/admin', {
    method: 'GET',
    headers: {
      'Accept': 'application/json'
    },
    cache: 'no-store'
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`API responded ${response.status}`);
      }

      return response.json();
    })
    .then(data => {
      if (!data || !data.stats || !data.appointments) {
        throw new Error('Invalid admin API response.');
      }

      T.data = data;
      T.go('dashboard');
    })
    .catch(error => {
      console.error('Admin API Error:', error);

      T.loadError = error.message;
      content.innerHTML = loadError();
    });

  T.refreshIcons();
})();
