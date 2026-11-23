// Reusable UI building blocks (return HTML strings).
(() => {
    const T = window.Trimora;

    T.statCard = (icon, value, label, trend, warn) => `
    <article class="card stat">
      <div class="stat-top"><span class="stat-icon"><i data-lucide="${icon}"></i></span>${trend ? `<span class="trend ${warn ? 'warn' : ''}">${trend}</span>` : ''}</div>
      <div class="stat-value">${value}</div><div class="stat-label">${label}</div>
    </article>`;

    T.cardHead = (title, subtitle, actionHtml = '') => `
    <div class="card-head"><div><h2>${title}</h2>${subtitle ? `<p>${subtitle}</p>` : ''}</div>${actionHtml}</div>`;

    T.badge = status => `<span class="badge ${status.replace(/\s/g, '-')}">${status}</span>`;

    T.customerCell = name => `<div class="cust"><span class="avatar">${T.initials(name)}</span>${T.esc(name)}</div>`;

    T.emptyRow = (cols, title, text) => `<tr><td colspan="${cols}"><div class="empty"><h3>${title}</h3><p>${text}</p></div></td></tr>`;

    T.tabs = (items, active) => `<div class="tabs" role="tablist">${items.map(i => `<button class="tab ${i === active ? 'active' : ''}" data-tab="${i}">${i}</button>`).join('')}</div>`;

    T.toggle = (name, checked, label) => `
    <label class="switch-row"><span>${label}</span>
      <span class="switch"><input type="checkbox" name="${name}" ${checked ? 'checked' : ''}><span class="slider"></span></span>
    </label>`;
})();