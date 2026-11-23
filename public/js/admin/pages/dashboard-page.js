(() => {
    const T = window.Trimora;
    const icons = { payment: 'wallet', appointment: 'calendar-plus', completed: 'scissors', confirmed: 'check-circle-2', customer: 'user-plus' };

    const rows = list => list.length ? list.map(a => `
    <tr><td>${T.customerCell(a.customer)}</td><td>${a.service}</td><td>${a.time}</td><td>${a.barber}</td><td>${T.badge(a.status)}</td></tr>`).join('')
        : T.emptyRow(5, 'No appointments found', 'Try a different search.');

    const todays = () => T.data.appointments.filter(a => a.date === T.data.today && (!T.query || T.matches(a, T.query)));

    T.pages.dashboard = {
        title: 'Dashboard',
        render() {
            const s = T.data.stats;
            return `
        <section class="stats">
          ${T.statCard('calendar-check', s.todayAppointments, "Today's Appointments", `▲ ${s.todayChange}% vs yesterday`)}
          ${T.statCard('users', s.totalCustomers, 'Total Customers', `+${s.newCustomers} this week`)}
          ${T.statCard('clock', s.pending, 'Pending Appointments', 'Needs action', true)}
          ${T.statCard('banknote', T.peso(s.revenue), 'Total Revenue', `▲ ${s.revenueChange}% this month`)}
        </section>
        <section class="grid-2">
          <article class="card">${T.cardHead('Appointment Overview', 'Appointments per day this week')}
            <div class="chart-box"><canvas id="weekChart" role="img" aria-label="Weekly appointments chart"></canvas></div></article>
          <article class="card">${T.cardHead('Recent Activities')}
            <ul class="activity">${T.data.activities.map(a => `<li><span class="act-icon"><i data-lucide="${icons[a.type]}"></i></span><div><p>${a.text}</p><small>${a.when}</small></div></li>`).join('')}</ul></article>
        </section>
        <section class="card">${T.cardHead("Today's Appointments", '', '<button class="btn" id="viewAll">View All</button>')}
          <div class="table-wrap"><table>
            <thead><tr><th>Customer</th><th>Service</th><th>Appointment Time</th><th>Barber</th><th>Status</th></tr></thead>
            <tbody id="todayBody">${rows(todays())}</tbody></table></div>
        </section>`;
        },
        mount() {
            document.getElementById('viewAll').onclick = () => T.go('appointments');
            const w = T.data.reports.weekly, c = T.chartColors;
            T.drawChart('weekChart', {
                type: 'bar',
                data: { labels: w.labels, datasets: [{ label: 'Appointments', data: w.data, backgroundColor: c.secondary, hoverBackgroundColor: c.primary, borderRadius: 8, borderSkipped: false, maxBarThickness: 38 }] },
                options: {
                    responsive: true, maintainAspectRatio: false,
                    plugins: { legend: { display: false }, tooltip: { backgroundColor: '#181614', padding: 10, cornerRadius: 8, callbacks: { label: x => ` ${x.parsed.y} appointments` } } },
                    scales: { x: { grid: { display: false }, ticks: { font: T.chartFont, color: c.muted } }, y: { beginAtZero: true, grid: { color: c.grid }, border: { display: false }, ticks: { precision: 0, font: T.chartFont, color: c.muted } } }
                }
            });
        },
        onSearch() { document.getElementById('todayBody').innerHTML = rows(todays()); }
    };
})();