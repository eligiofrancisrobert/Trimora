(() => {
    const T = window.Trimora;
    const iconFor = { Haircut: 'scissors', Package: 'package', Grooming: 'sparkles', Treatment: 'droplets' };

    const grid = () => {
        const max = Math.max(...T.data.services.map(s => s.bookings));
        const items = T.data.services.filter(s => !T.query || T.matches(s, T.query));
        document.getElementById('serviceGrid').innerHTML = items.length ? items.map(s => `
      <article class="card service ${s.active ? '' : 'inactive'}">
        <div class="stat-top"><span class="stat-icon"><i data-lucide="${iconFor[s.category] || 'scissors'}"></i></span><span class="chip">${s.category}</span></div>
        <h3>${s.name}</h3>
        <div class="service-meta"><strong>${T.peso(s.price)}</strong><span><i data-lucide="clock"></i>${s.duration} min</span></div>
        <div class="progress" title="${s.bookings} bookings"><span style="width:${s.bookings / max * 100}%"></span></div>
        <small class="muted-text">${s.bookings} bookings this month</small>
        <label class="switch-row"><span>${s.active ? 'Available' : 'Hidden from booking'}</span>
          <span class="switch"><input type="checkbox" data-id="${s.id}" ${s.active ? 'checked' : ''}><span class="slider"></span></span></label>
      </article>`).join('') : '<div class="card empty"><h3>No services found</h3><p>Try a different search.</p></div>';
        T.refreshIcons();
    };

    T.pages.services = {
        title: 'Services',
        render() {
            const s = T.data.services;
            return `
        <section class="stats">
          ${T.statCard('brush', s.length, 'Total services')}
          ${T.statCard('check-circle-2', s.filter(x => x.active).length, 'Available for booking')}
          ${T.statCard('flame', s.reduce((a, b) => a.bookings > b.bookings ? a : b).name, 'Most booked service')}
          ${T.statCard('tag', T.peso(Math.round(s.reduce((t, x) => t + x.price, 0) / s.length)), 'Average price')}
        </section>
        <div class="service-grid" id="serviceGrid"></div>`;
        },
        mount() {
            grid();
            document.getElementById('serviceGrid').onchange = e => {
                const s = T.data.services.find(x => x.id == e.target.dataset.id);
                s.active = e.target.checked; grid();
                T.toast(`${s.name} is now ${s.active ? 'available' : 'hidden'}.`);
            };
        },
        onSearch: grid
    };
})();