(() => {
    const T = window.Trimora;

    T.pages.reports = {
        title: 'Reports',
        render() {
            const r = T.data.reports;
            return `
        <section class="stats">
          ${T.statCard('scissors', r.completed, 'Completed services')}
          ${T.statCard('user-x', r.noShows, 'Customer no-shows', 'Last 6 months', true)}
          ${T.statCard('calendar-off', r.absences, 'Barber absences')}
          ${T.statCard('banknote', T.peso(r.revenue.data.reduce((a, b) => a + b, 0)), 'Revenue (6 months)')}
        </section>
        <section class="grid-2">
          <article class="card">${T.cardHead('Monthly Revenue', 'Income from completed services')}<div class="chart-box"><canvas id="revenueChart" role="img" aria-label="Monthly revenue"></canvas></div></article>
          <article class="card">${T.cardHead('Services Booked', 'Share by service')}<div class="chart-box"><canvas id="serviceChart" role="img" aria-label="Services share"></canvas></div></article>
        </section>
        <section class="card">${T.cardHead('Barber Performance', 'Completed services, no-shows, and absences per barber')}
          <div class="chart-box short"><canvas id="barberChart" role="img" aria-label="Barber performance"></canvas></div></section>`;
        },
        mount() {
            const c = T.chartColors, r = T.data.reports;
            const axes = { x: { grid: { display: false }, ticks: { font: T.chartFont, color: c.muted } }, y: { beginAtZero: true, grid: { color: c.grid }, border: { display: false }, ticks: { font: T.chartFont, color: c.muted } } };
            const base = { responsive: true, maintainAspectRatio: false };
            const tip = { backgroundColor: '#181614', padding: 10, cornerRadius: 8 };

            T.drawChart('revenueChart', {
                type: 'line',
                data: { labels: r.revenue.labels, datasets: [{ label: 'Revenue', data: r.revenue.data, borderColor: c.primary, backgroundColor: 'rgba(223,203,171,.45)', fill: true, tension: .35, pointBackgroundColor: c.primary, pointRadius: 4 }] },
                options: { ...base, plugins: { legend: { display: false }, tooltip: { ...tip, callbacks: { label: x => ' ' + T.peso(x.parsed.y) } } }, scales: axes }
            });

            T.drawChart('serviceChart', {
                type: 'doughnut',
                data: { labels: T.data.services.map(s => s.name), datasets: [{ data: T.data.services.map(s => s.bookings), backgroundColor: ['#8C5F28', '#B58A4E', '#DFCBAB', '#6B9472', '#D49A45', '#C75D50', '#89847D'], borderWidth: 2, borderColor: '#fff' }] },
                options: { ...base, cutout: '62%', plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, font: { ...T.chartFont, size: 11 } } }, tooltip: tip } }
            });

            T.drawChart('barberChart', {
                type: 'bar',
                data: {
                    labels: r.barbers.map(b => b.name), datasets: [
                        { label: 'Completed', data: r.barbers.map(b => b.completed), backgroundColor: c.primary, borderRadius: 6 },
                        { label: 'No-shows', data: r.barbers.map(b => b.noShows), backgroundColor: c.danger, borderRadius: 6 },
                        { label: 'Absences', data: r.barbers.map(b => b.absences), backgroundColor: c.warning, borderRadius: 6 }]
                },
                options: { ...base, plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, font: T.chartFont } }, tooltip: tip }, scales: axes }
            });
        }
    };
})();