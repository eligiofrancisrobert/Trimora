(() => {
  const peso = n => new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', maximumFractionDigits: 0 }).format(n);
  const initials = n => n.split(' ').map(w => w[0]).slice(0, 2).join('');
  const content = document.getElementById('content');
  const titles = { dashboard: 'Dashboard', appointments: 'Appointments', customers: 'Customers', services: 'Services', payments: 'Payments', reports: 'Reports', settings: 'Settings' };
  const icons = { payment: 'wallet', appointment: 'calendar-plus', completed: 'scissors', confirmed: 'check-circle-2', customer: 'user-plus' };
  let data = null, chart = null, query = '';

  const refreshIcons = () => lucide.createIcons();

  /* Components */
  const statCard = (icon, value, label, trend, warn) => `
    <article class="card stat">
      <div class="stat-top"><span class="stat-icon"><i data-lucide="${icon}"></i></span>${trend ? `<span class="trend ${warn ? 'warn' : ''}">${trend}</span>` : ''}</div>
      <div class="stat-value">${value}</div><div class="stat-label">${label}</div>
    </article>`;

  const rows = list => list.length ? list.map(a => `
    <tr>
      <td><div class="cust"><span class="avatar">${initials(a.customer)}</span>${a.customer}</div></td>
      <td>${a.service}</td><td>${a.time}</td><td>${a.barber}</td>
      <td><span class="badge ${a.status}">${a.status}</span></td>
    </tr>`).join('') : `<tr><td colspan="5"><div class="empty"><h3>No appointments found</h3><p>Try a different search.</p></div></td></tr>`;

  const table = list => `
    <div class="table-wrap"><table>
      <thead><tr><th>Customer</th><th>Service</th><th>Appointment Time</th><th>Barber</th><th>Status</th></tr></thead>
      <tbody id="apptBody">${rows(list)}</tbody>
    </table></div>`;

  const filtered = () => data.appointments.filter(a => `${a.customer} ${a.service} ${a.barber} ${a.status}`.toLowerCase().includes(query));

  /* Views */
  function dashboardView() {
    const s = data.stats;
    content.innerHTML = `
      <section class="stats">
        ${statCard('calendar-check', s.todayAppointments, "Today's Appointments", `▲ ${s.todayChange}% vs yesterday`)}
        ${statCard('users', s.totalCustomers, 'Total Customers', `+${s.newCustomers} this week`)}
        ${statCard('clock', s.pending, 'Pending Appointments', 'Needs action', true)}
        ${statCard('banknote', peso(s.revenue), 'Total Revenue', `▲ ${s.revenueChange}% this month`)}
      </section>
      <section class="grid-2">
        <article class="card">
          <div class="card-head"><div><h2>Appointment Overview</h2><p>Appointments per day this week</p></div></div>
          <div class="chart-box"><canvas id="weekChart" aria-label="Weekly appointments chart" role="img"></canvas></div>
        </article>
        <article class="card">
          <div class="card-head"><h2>Recent Activities</h2></div>
          <ul class="activity">${data.activities.map(a => `
            <li><span class="act-icon"><i data-lucide="${icons[a.type]}"></i></span><div><p>${a.text}</p><small>${a.when}</small></div></li>`).join('')}
          </ul>
        </article>
      </section>
      <section class="card">
        <div class="card-head"><div><h2>Today's Appointments</h2><p>${data.appointments.length} scheduled</p></div><button class="btn" id="viewAll">View All</button></div>
        ${table(filtered())}
      </section>`;
    document.getElementById('viewAll').onclick = () => go('appointments');
    drawChart();
  }

  function appointmentsView() {
    content.innerHTML = `<section class="card"><div class="card-head"><div><h2>All Appointments</h2><p>Full management tools are coming in the next phase.</p></div></div>${table(filtered())}</section>`;
  }

  function placeholderView(name) {
    content.innerHTML = `<section class="card"><div class="empty"><span class="stat-icon"><i data-lucide="hammer"></i></span><h3>${titles[name]} is coming soon</h3><p>This page will be built after the dashboard design is approved.</p></div></section>`;
  }

  function drawChart() {
    if (chart) chart.destroy();
    chart = new Chart(document.getElementById('weekChart'), {
      type: 'bar',
      data: { labels: data.weekly.labels, datasets: [{ label: 'Appointments', data: data.weekly.data, backgroundColor: '#DFCBAB', hoverBackgroundColor: '#8C5F28', borderRadius: 8, borderSkipped: false, maxBarThickness: 38 }] },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: { legend: { display: false }, tooltip: { backgroundColor: '#181614', padding: 10, cornerRadius: 8, callbacks: { label: c => ` ${c.parsed.y} appointments` } } },
        scales: { x: { grid: { display: false }, ticks: { font: { family: 'Poppins' }, color: '#89847D' } }, y: { beginAtZero: true, grid: { color: '#F0E9DC' }, border: { display: false }, ticks: { precision: 0, font: { family: 'Poppins' }, color: '#89847D' } } }
      }
    });
  }

  /* Navigation */
  function go(name) {
    document.querySelectorAll('.nav-item[data-view]').forEach(b => b.classList.toggle('active', b.dataset.view === name));
    document.getElementById('pageTitle').textContent = titles[name];
    document.body.classList.remove('open');
    if (name !== 'dashboard' && chart) { chart.destroy(); chart = null; }
    ({ dashboard: dashboardView, appointments: appointmentsView }[name] || (() => placeholderView(name)))();
    refreshIcons();
  }

  /* Events */
  document.getElementById('nav').addEventListener('click', e => { const b = e.target.closest('[data-view]'); if (b) go(b.dataset.view); });
  document.getElementById('toggle').onclick = () => window.innerWidth <= 860 ? document.body.classList.toggle('open') : document.body.classList.toggle('collapsed');
  document.getElementById('overlay').onclick = () => document.body.classList.remove('open');
  document.getElementById('logout').onclick = () => alert('Logout will be connected once authentication is built.');
  document.getElementById('search').addEventListener('input', e => {
    query = e.target.value.trim().toLowerCase();
    const body = document.getElementById('apptBody');
    if (body) body.innerHTML = rows(filtered());
  });
  document.getElementById('today').textContent = new Date().toLocaleDateString('en-PH', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  /* Init */
  fetch('/api/dashboard').then(r => r.json()).then(d => { data = d; go('dashboard'); })
    .catch(() => { content.innerHTML = '<section class="card"><div class="empty"><h3>Could not load dashboard data</h3><p>Make sure the server is running with npm start.</p></div></section>'; });
  refreshIcons();
})();
