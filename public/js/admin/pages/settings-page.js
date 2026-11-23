(() => {
    const T = window.Trimora;
    const field = (id, label, value, type = 'text') => `<div class="field"><label for="${id}">${label}</label><input id="${id}" name="${id}" type="${type}" value="${T.esc(value)}"></div>`;

    T.pages.settings = {
        title: 'Settings',
        render() {
            const s = T.data.settings;
            return `<form id="settingsForm" class="settings-grid">
        <section class="card">${T.cardHead('Shop Profile', 'Shown to customers on the booking page')}
          ${field('name', 'Shop name', s.shop.name)}${field('address', 'Address', s.shop.address)}
          <div class="field-row">${field('phone', 'Contact number', s.shop.phone)}${field('email', 'Email', s.shop.email, 'email')}</div></section>
        <section class="card">${T.cardHead('Business Hours & Booking Rules')}
          <div class="field-row">${field('open', 'Opening time', s.hours.open, 'time')}${field('close', 'Closing time', s.hours.close, 'time')}</div>
          <div class="field-row">${field('graceMinutes', 'No-show grace period (minutes)', s.booking.graceMinutes, 'number')}${field('downpayment', 'GCash downpayment (₱)', s.booking.downpayment, 'number')}</div>
          ${field('gcashNumber', 'GCash number', s.booking.gcashNumber)}</section>
        <section class="card">${T.cardHead('Email Notifications', 'Automatic emails sent to customers')}
          ${T.toggle('reminders', s.notifications.reminders, 'Appointment reminders')}
          ${T.toggle('rescheduling', s.notifications.rescheduling, 'Rescheduling updates')}
          ${T.toggle('barberUnavailable', s.notifications.barberUnavailable, 'Barber unavailability')}
          ${T.toggle('noShow', s.notifications.noShow, 'No-show notices')}</section>
        <section class="card">${T.cardHead('Admin Account')}
          ${field('adminName', 'Display name', 'Admin')}${field('adminEmail', 'Login email', 'admin@trimora.shop', 'email')}
          <button type="button" class="btn-outline" id="changePw"><i data-lucide="key-round"></i>Change password</button></section>
        <div class="form-actions"><button type="submit" class="btn">Save changes</button></div>
      </form>`;
        },
        mount() {
            document.getElementById('settingsForm').onsubmit = e => { e.preventDefault(); T.toast('Settings saved (sample data only).'); };
            document.getElementById('changePw').onclick = () => T.toast('Password change will be added with authentication.');
        }
    };
})();