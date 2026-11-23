const d = require('../data/sampleData');

exports.getAdminData = (req, res) => {
  const today = d.iso(0);
  const price = Object.fromEntries(d.services.map(s => [s.name, s.price]));
  const todays = d.appointments.filter(a => a.date === today);
  const revenue = d.reports.revenue.data.reduce((t, n) => t + n, 0);

  res.json({
    today,
    stats: {
      todayAppointments: todays.length,
      todayChange: 12,
      totalCustomers: 248,
      newCustomers: 9,
      pending: d.appointments.filter(a => a.status === 'Pending').length,
      revenue,
      revenueChange: 8
    },
    appointments: d.appointments.map(a => ({ ...a, price: price[a.service] || 0 })),
    customers: d.customers,
    services: d.services,
    payments: d.payments,
    activities: d.activities,
    reports: d.reports,
    settings: d.settings
  });
};