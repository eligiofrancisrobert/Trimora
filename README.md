# Trimora – Admin Dashboard (Phase 1)

Web-based appointment and customer management system for Backyard Barbershop, Barangay Langgam, San Pedro, Laguna.
This phase delivers the dashboard UI foundation only, using sample data.

## Run locally
```bash
npm install
npm start
```
Open http://localhost:3000

## Stack
Node.js + Express, HTML5, CSS3, vanilla JavaScript, Lucide Icons, Chart.js (both loaded from CDN, so an internet connection is needed).

## Structure
- `server.js` – Express app, static hosting, API mounting
- `routes/dashboard.js` – `GET /api/dashboard`
- `controllers/dashboardController.js` – sample data (swap for DB queries later)
- `public/` – `index.html`, `css/dashboard.css`, `js/dashboard.js`

## Notes
- Sidebar collapses on desktop and becomes a drawer on mobile.
- Appointments page shows the full table; other pages show a "coming soon" empty state.
