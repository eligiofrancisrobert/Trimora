(() => {
    const T = window.Trimora;
    const TABS = ['All', 'Pending', 'Verified', 'Rejected'];
    let tab = 'All';

    const list = () => T.data.payments.filter(p => (tab === 'All' || p.status === tab) && (!T.query || T.matches(p, T.query)));

    const draw = () => {
        const items = list();
        document.getElementById('payBody').innerHTML = items.length ? items.map(p => `
      <tr><td>${T.customerCell(p.customer)}</td><td>${p.service}</td><td><code>${p.ref}</code></td>
      <td>${T.peso(p.amount)}</td><td>${T.formatDate(p.date)}</td><td>${T.badge(p.status)}</td>
      <td>${p.status === 'Pending'
                ? `<button class="btn-sm" data-act="Verified" data-id="${p.id}">Verify</button><button class="btn-sm danger" data-act="Rejected" data-id="${p.id}">Reject</button>`
                : '<span class="muted-text">—</span>'}</td></tr>`).join('')
            : T.emptyRow(7, 'No payments found', 'Nothing matches this filter.');
    };

    T.pages.payments = {
        title: 'Payments',
        render() {
            const p = T.data.payments, n = s => p.filter(x => x.status === s).length;
            return `
        <section class="stats">
          ${T.statCard('hourglass', n('Pending'), 'Waiting for verification', 'Needs action', true)}
          ${T.statCard('badge-check', n('Verified'), 'Verified downpayments')}
          ${T.statCard('x-circle', n('Rejected'), 'Rejected payments')}
          ${T.statCard('wallet', T.peso(n('Verified') * T.data.settings.booking.downpayment), 'Downpayments collected')}
        </section>
        <section class="card">${T.cardHead('GCash Downpayments', `Fixed ${T.peso(T.data.settings.booking.downpayment)} per online booking, paid outside the system`)}
          ${T.tabs(TABS, tab)}
          <div class="table-wrap"><table>
            <thead><tr><th>Customer</th><th>Service</th><th>GCash Reference</th><th>Amount</th><th>Date</th><th>Status</th><th>Actions</th></tr></thead>
            <tbody id="payBody"></tbody></table></div></section>`;
        },
        mount() {
            draw();
            document.querySelector('.tabs').onclick = e => {
                const b = e.target.closest('.tab'); if (!b) return;
                tab = b.dataset.tab;
                document.querySelectorAll('.tab').forEach(t => t.classList.toggle('active', t === b));
                draw();
            };
            document.getElementById('payBody').onclick = e => {
                const b = e.target.closest('[data-act]'); if (!b) return;
                const p = T.data.payments.find(x => x.id == b.dataset.id);
                p.status = b.dataset.act;
                T.pages.payments.refresh();
                T.toast(`Payment ${p.ref} ${p.status.toLowerCase()}.`);
            };
        },
        refresh() { T.go('payments'); },
        onSearch: draw
    };
})();