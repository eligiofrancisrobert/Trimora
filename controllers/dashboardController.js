// Sample data only. Replace with database queries in a later phase.
const appointments = [
  { id: 1, customer: 'Mark Villanueva', service: 'Haircut + Beard Trim', time: '09:00 AM', barber: 'Migs', status: 'Completed', price: 230 },
  { id: 2, customer: 'John Dela Cruz', service: 'Classic Haircut', time: '10:00 AM', barber: 'Dan', status: 'Completed', price: 150 },
  { id: 3, customer: 'Rico Manalo', service: 'Fade Cut', time: '11:00 AM', barber: 'Migs', status: 'Confirmed', price: 180 },
  { id: 4, customer: 'Paolo Santos', service: 'Haircut + Wash', time: '01:00 PM', barber: 'Dan', status: 'Confirmed', price: 200 },
  { id: 5, customer: 'Kevin Bautista', service: 'Beard Trim', time: '02:30 PM', barber: 'Migs', status: 'Pending', price: 100 },
  { id: 6, customer: 'Jayson Reyes', service: 'Kids Haircut', time: '03:30 PM', barber: 'Dan', status: 'Pending', price: 120 },
  { id: 7, customer: 'Allan Mercado', service: 'Classic Haircut', time: '04:30 PM', barber: 'Migs', status: 'Cancelled', price: 150 }
];

const activities = [
  { type: 'payment', text: 'GCash downpayment of ₱50 verified for Rico Manalo', when: '5 min ago' },
  { type: 'appointment', text: 'Kevin Bautista booked a Beard Trim', when: '22 min ago' },
  { type: 'completed', text: 'Haircut + Beard Trim completed by Migs', when: '1 hr ago' },
  { type: 'confirmed', text: 'Appointment confirmed for Paolo Santos', when: '2 hrs ago' },
  { type: 'customer', text: 'New customer registered: Jayson Reyes', when: '3 hrs ago' }
];

exports.getDashboard = (req, res) => {
  const revenue = appointments.filter(a => a.status === 'Completed').reduce((t, a) => t + a.price, 0) + 48650;
  res.json({
    stats: {
      todayAppointments: appointments.length,
      todayChange: 12,
      totalCustomers: 248,
      newCustomers: 9,
      pending: appointments.filter(a => a.status === 'Pending').length,
      revenue,
      revenueChange: 8
    },
    weekly: { labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], data: [8, 11, 9, 12, 15, 21, 17] },
    appointments,
    activities
  });
};
