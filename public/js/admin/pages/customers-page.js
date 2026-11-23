(() => {
    const T = window.Trimora;
    const list = () => T.data.customers.filter(c => !T.query || T.matches(c, T.query));

    const draw = () => {
        const items = list();
        document.getElementById('custBody').innerHTML = items.length ? items.map(c => `
      <tr><td>${T.customerCell(c.name)}</td>
      <td>${c.phone}<br><small class="muted-text">${c.email}</small></td>
      <td>${c.preferred}</td><td>${c.visits}</td><td>${T.formatDate(c.last)}</td>
      <td><strong>${T.peso(c.spent)}</strong></td></tr>`).join('')
            : T.emptyRow(6, 'No customers found', 'Try a different name or number.');
    };

    T.pages.customers = {
        title: 'Customers',
        render() {
            const cs = T.data.customers, top = [...cs].sort((a, b) => b.visits - a.visits)[0];
            return `
        <section class="stats">
          ${T.statCard('users', T.data.stats.totalCustomers, 'Registered customers')}
          ${T.statCard('user-plus', T.data.stats.newCustomers, 'New this week')}
          ${T.statCard('repeat', Math.round(cs.reduce((t, c) => t + c.visits, 0) / cs.length), 'Average visits per customer')}
          ${T.statCard('crown', top.name.split(' ')[0], `Most visits (${top.visits})`)}
        </section>
        <section class="card">${T.cardHead('Customer Records', 'Profiles, haircut preferences, and service history')}
          <div class="table-wrap"><table>
            <thead><tr><th>Customer</th><th>Contact</th><th>Preferred Service</th><th>Visits</th><th>Last Visit</th><th>Total Spent</th></tr></thead>
            <tbody id="custBody"></tbody></table></div></section>`;
        },
        mount: draw,
        onSearch: draw
    };
})();