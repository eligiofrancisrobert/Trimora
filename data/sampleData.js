// Sample data only. Replace with database queries in a later phase.
const iso = offset => { const d = new Date(); d.setDate(d.getDate() + offset); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };

const services = [
  { id: 1, name: 'Classic Haircut', category: 'Haircut', duration: 30, price: 150, bookings: 64, active: true },
  { id: 2, name: 'Fade Cut', category: 'Haircut', duration: 40, price: 180, bookings: 51, active: true },
  { id: 3, name: 'Haircut + Wash', category: 'Package', duration: 45, price: 200, bookings: 38, active: true },
  { id: 4, name: 'Haircut + Beard Trim', category: 'Package', duration: 55, price: 230, bookings: 42, active: true },
  { id: 5, name: 'Beard Trim', category: 'Grooming', duration: 20, price: 100, bookings: 27, active: true },
  { id: 6, name: 'Kids Haircut', category: 'Haircut', duration: 30, price: 120, bookings: 19, active: true },
  { id: 7, name: 'Hair Coloring', category: 'Treatment', duration: 90, price: 450, bookings: 6, active: false }
];

const customers = [
  { id: 1, name: 'Mark Villanueva', phone: '0917 123 4501', email: 'mark.v@email.com', visits: 14, last: iso(0), preferred: 'Haircut + Beard Trim', spent: 3220 },
  { id: 2, name: 'John Dela Cruz', phone: '0917 123 4502', email: 'john.dc@email.com', visits: 9, last: iso(0), preferred: 'Classic Haircut', spent: 1350 },
  { id: 3, name: 'Rico Manalo', phone: '0918 555 7710', email: 'rico.m@email.com', visits: 6, last: iso(-3), preferred: 'Fade Cut', spent: 1080 },
  { id: 4, name: 'Paolo Santos', phone: '0919 222 3345', email: 'paolo.s@email.com', visits: 11, last: iso(-5), preferred: 'Haircut + Wash', spent: 2200 },
  { id: 5, name: 'Kevin Bautista', phone: '0927 840 1122', email: 'kevin.b@email.com', visits: 3, last: iso(-9), preferred: 'Beard Trim', spent: 300 },
  { id: 6, name: 'Jayson Reyes', phone: '0935 611 9087', email: 'jayson.r@email.com', visits: 1, last: iso(-12), preferred: 'Kids Haircut', spent: 120 },
  { id: 7, name: 'Allan Mercado', phone: '0998 340 7765', email: 'allan.m@email.com', visits: 5, last: iso(-14), preferred: 'Classic Haircut', spent: 750 },
  { id: 8, name: 'Dennis Aquino', phone: '0917 908 2231', email: 'dennis.a@email.com', visits: 8, last: iso(-18), preferred: 'Fade Cut', spent: 1440 }
];

const appointments = [
  { id: 1, customer: 'Mark Villanueva', service: 'Haircut + Beard Trim', date: iso(0), time: '09:00 AM', barber: 'Migs', status: 'Completed', source: 'Online', payment: 'Verified' },
  { id: 2, customer: 'John Dela Cruz', service: 'Classic Haircut', date: iso(0), time: '10:00 AM', barber: 'Dan', status: 'Completed', source: 'Phone-in', payment: 'N/A' },
  { id: 3, customer: 'Rico Manalo', service: 'Fade Cut', date: iso(0), time: '11:00 AM', barber: 'Migs', status: 'Confirmed', source: 'Online', payment: 'Verified' },
  { id: 4, customer: 'Paolo Santos', service: 'Haircut + Wash', date: iso(0), time: '01:00 PM', barber: 'Dan', status: 'Confirmed', source: 'Online', payment: 'Verified' },
  { id: 5, customer: 'Kevin Bautista', service: 'Beard Trim', date: iso(0), time: '02:30 PM', barber: 'Migs', status: 'Pending', source: 'Online', payment: 'Pending' },
  { id: 6, customer: 'Jayson Reyes', service: 'Kids Haircut', date: iso(0), time: '03:30 PM', barber: 'Dan', status: 'Pending', source: 'Online', payment: 'Pending' },
  { id: 7, customer: 'Allan Mercado', service: 'Classic Haircut', date: iso(0), time: '04:30 PM', barber: 'Migs', status: 'Cancelled', source: 'Walk-in', payment: 'N/A' },
  { id: 8, customer: 'Dennis Aquino', service: 'Fade Cut', date: iso(1), time: '10:00 AM', barber: 'Dan', status: 'Confirmed', source: 'Online', payment: 'Verified' },
  { id: 9, customer: 'Mark Villanueva', service: 'Beard Trim', date: iso(1), time: '01:30 PM', barber: 'Migs', status: 'Pending', source: 'Online', payment: 'Pending' },
  { id: 10, customer: 'Paolo Santos', service: 'Classic Haircut', date: iso(2), time: '11:00 AM', barber: 'Dan', status: 'Confirmed', source: 'Phone-in', payment: 'N/A' },
  { id: 11, customer: 'Rico Manalo', service: 'Haircut + Wash', date: iso(-3), time: '03:00 PM', barber: 'Migs', status: 'Completed', source: 'Online', payment: 'Verified' },
  { id: 12, customer: 'Kevin Bautista', service: 'Fade Cut', date: iso(-9), time: '02:00 PM', barber: 'Dan', status: 'Completed', source: 'Walk-in', payment: 'N/A' }
];

const payments = [
  { id: 1, customer: 'Kevin Bautista', service: 'Beard Trim', ref: 'GC-48977', amount: 50, date: iso(0), status: 'Pending' },
  { id: 2, customer: 'Jayson Reyes', service: 'Kids Haircut', ref: 'GC-48990', amount: 50, date: iso(0), status: 'Pending' },
  { id: 3, customer: 'Mark Villanueva', service: 'Beard Trim', ref: 'GC-49012', amount: 50, date: iso(0), status: 'Pending' },
  { id: 4, customer: 'Rico Manalo', service: 'Fade Cut', ref: 'GC-48801', amount: 50, date: iso(0), status: 'Verified' },
  { id: 5, customer: 'Paolo Santos', service: 'Haircut + Wash', ref: 'GC-48755', amount: 50, date: iso(0), status: 'Verified' },
  { id: 6, customer: 'Dennis Aquino', service: 'Fade Cut', ref: 'GC-48702', amount: 50, date: iso(-1), status: 'Verified' },
  { id: 7, customer: 'Allan Mercado', service: 'Classic Haircut', ref: 'GC-48210', amount: 50, date: iso(-2), status: 'Rejected' }
];

const activities = [
  { type: 'payment', text: 'GCash downpayment of ₱50 verified for Rico Manalo', when: '5 min ago' },
  { type: 'appointment', text: 'Kevin Bautista booked a Beard Trim', when: '22 min ago' },
  { type: 'completed', text: 'Haircut + Beard Trim completed by Migs', when: '1 hr ago' },
  { type: 'confirmed', text: 'Appointment confirmed for Paolo Santos', when: '2 hrs ago' },
  { type: 'customer', text: 'New customer registered: Jayson Reyes', when: '3 hrs ago' }
];

const reports = {
  revenue: { labels: ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'], data: [31200, 34850, 33900, 38400, 41250, 44600] },
  weekly: { labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], data: [8, 11, 9, 12, 15, 21, 17] },
  barbers: [
    { name: 'Migs', completed: 118, noShows: 6, absences: 1 },
    { name: 'Dan', completed: 104, noShows: 9, absences: 2 }
  ],
  completed: 222, noShows: 15, absences: 3
};

const settings = {
  shop: { name: 'Backyard Barbershop', address: 'Barangay Langgam, San Pedro, Laguna', phone: '0917 000 0000', email: 'hello@trimora.shop' },
  hours: { open: '09:00', close: '18:00' },
  booking: { graceMinutes: 15, downpayment: 50, gcashNumber: '0917 000 0000' },
  notifications: { reminders: true, rescheduling: true, barberUnavailable: true, noShow: true }
};

module.exports = { services, customers, appointments, payments, activities, reports, settings, iso };