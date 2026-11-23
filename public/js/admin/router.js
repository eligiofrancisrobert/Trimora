// Page navigation, shell events, and app start-up.
(() => {
  const T = window.Trimora;
  const content = document.getElementById('content');

  T.go = name => {
    if (!T.data) return;
    const page = T.pages[name];
    if (!page) {
      content.innerHTML = `<section class="card"><div class="empty"><h3>Page not found</h3><p>Missing script: public/js/admin/pages/${name}-page.js</p></div></section>`;
      return;
    }
    T.destroyCharts();
    T.current = name;
    T.query = '';
    document.getElementById('search').value = '';
    document.querySelectorAll('.nav-item[data-view]').forEach(b => b.classList.toggle('active', b.dataset.view === name));
    document.getElementById('pageTitle').textContent = page.title;
    document.body.classList.remove('open');
    try {
      content.innerHTML = page.render();
      if (page.mount) page.mount();
    } catch (err) {
      console.error(err);
      content.innerHTML = `<section class="card"><div class="empty"><h3>This page failed to load</h3><p>${T.esc(err.message)}</p></div></section>`;
    }
    T.refreshIcons();
    window.scrollTo(0, 0);
  };

  document.getElementById('nav').addEventListener('click', e => { const b = e.target.closest('[data-view]'); if (b) T.go(b.dataset.view); });
  document.getElementById('toggle').onclick = () => window.innerWidth <= 860 ? document.body.classList.toggle('open') : document.body.classList.toggle('collapsed');
  document.getElementById('overlay').onclick = () => document.body.classList.remove('open');
  document.getElementById('logout').onclick = () => T.toast('Logout will be connected once authentication is built.');
  document.getElementById('search').addEventListener('input', e => {
    T.query = e.target.value.trim();
    const page = T.pages[T.current];
    if (page.onSearch) page.onSearch();
  });
  document.getElementById('today').textContent = new Date().toLocaleDateString('en-PH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  fetch('/api/admin')
    .then(r => { if (!r.ok) throw new Error('API responded ' + r.status); return r.json(); })
    .catch(err => { console.warn('API unavailable, using built-in sample data.', err); return window.TrimoraSampleData.buildAdminPayload(); })
    .then(d => { T.data = d; T.go('dashboard'); })
    .catch(err => { console.error(err); content.innerHTML = `<section class="card"><div class="empty"><h3>Could not load data</h3><p>Open the site through http://localhost:3000 after running npm start. (${T.esc(err.message)})</p></div></section>`; });
  T.refreshIcons();
})();