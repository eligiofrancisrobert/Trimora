(() => {
    const T = window.Trimora;
    const TABS = ['All', 'Pending', 'Confirmed', 'Completed', 'Cancelled'];
    let tab = 'All';

    const actions = a => {
        const btn = (act, label, cls = '') => `<button class="btn-sm ${cls}" data-act="${act}" data-id="${a.id}">${label}</button>`;
        if (a.status === 'Pending') return btn('Confirmed', 'Confirm') + btn('Cancelled', 'Cancel', 'danger');
        if (a.status === 'Confirmed') return btn('Completed', 'Complete') + btn('Cancelled', 'Cancel', 'danger');
        return '<span class="muted-text">—</span>';
    };

    const list = () => T.data.appointments
        .filter(a => (tab === 'All' || a.status === tab) && (!T.query || T.matches(a, T.query)))
        .sort((x, y) => (x.date + x.time).localeCompare(y.date + y.time));

    const draw = () => {
        const items = list();
        document.getElementById('apptBody').innerHTML = items.length ? items.map(a => `
      <tr><td>${T.customerCell(a.customer)}</td><td>${a.service}</td>
      <td>${T.formatDate(a.date)}<br><small class="muted-text">${a.time}</small></td>
      <td>${a.barber}</td><td><span class="chip">${a.source}</span></td>
      <td>${a.payment === 'N/A' ? '<span class="muted-text">—</span>' : T.badge(a.payment)}</td>
      <td>${T.badge(a.status)}</td><td>${actions(a)}</td></tr>`).join('')
            : T.emptyRow(8, 'No appointments found', 'Nothing matches this filter yet.');
        document.getElementById('apptCount').textContent = `${items.length} appointment${items.length === 1 ? '' : 's'}`;
    };

    T.pages.appointments = {
        title: 'Appointments',
        render() {
            return `<section class="card">
        ${T.cardHead('All Appointments', '<span id="apptCount"></span>')}
        ${T.tabs(TABS, tab)}
        <div class="table-wrap"><table>
          <thead><tr><th>Customer</th><th>Service</th><th>Date & Time</th><th>Barber</th><th>Source</th><th>Payment</th><th>Status</th><th>Actions</th></tr></thead>
          <tbody id="apptBody"></tbody></table></div></section>`;
        },
        mount() {
            draw();
            document.querySelector('.tabs').onclick = e => {
                const b = e.target.closest('.tab'); if (!b) return;
                tab = b.dataset.tab;
                document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t === b));
                draw();
            };
            document.getElementById('apptBody').onclick = e => {
                const b = e.target.closest('[data-act]'); if (!b) return;
                const a = T.data.appointments.find(x => x.id == b.dataset.id);
                a.status = b.dataset.act; draw();
                T.toast(`${a.customer}'s appointment marked ${a.status.toLowerCase()}.`);
            };
        },
        onSearch: draw
    };
})();