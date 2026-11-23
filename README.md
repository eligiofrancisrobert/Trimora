<<<<<<< HEAD
# Trimora 💈

### Web-Based Appointment and Customer Management System

Trimora is a web-based appointment and customer management system developed for **Backyard Barbershop**, located in Barangay Langgam, San Pedro, Laguna.
=======
<<<<<<< HEAD
# Trimora – Admin Panel (Phase 1)

Web-based appointment and customer management system for Backyard Barbershop, Barangay Langgam, San Pedro, Laguna.
This phase delivers the admin pages with sample data.

## Run locally
```bash
npm install
npm start
```
Open http://localhost:3000 (redirects to `/admin.html`). Fonts, Lucide, and Chart.js load from CDNs, so internet is required.

## Structure
```
server.js
routes/adminRoutes.js              GET /api/admin
controllers/adminController.js     builds the response
data/sampleData.js                 sample data (swap for DB later)
public/
  admin.html
  css/admin-layout.css             sidebar, topbar, cards, tables
  css/admin-pages.css              styles for page-specific parts
  js/admin/
    utils.js                       namespace + helpers
    components.js                  reusable HTML pieces
    router.js                      navigation and start-up
    pages/dashboard-page.js, appointments-page.js, customers-page.js,
          services-page.js, payments-page.js, reports-page.js, settings-page.js
```
Changes made on the pages (confirm, verify, toggles) only live in the browser until the next refresh.
Trimora 💈

Web-Based Appointment and Customer Management System

Trimora is a web-based appointment and customer management system developed for Backyard Barbershop, located in Barangay Langgam, San Pedro, Laguna.
>>>>>>> 44d670e (Phase1_Prototype)

The system aims to streamline appointment scheduling, customer management, and business operations through a centralized and user-friendly platform.

## 🎯 Project Objectives

- Simplify appointment scheduling and management.
- Maintain centralized customer records and appointment history.
- Monitor barber availability and appointment schedules.
- Manage appointment payments and transaction records.
- Provide business reports and appointment analytics.
- Improve the overall customer booking experience.

## 🛠️ Technology Stack

| Technology | Purpose |
|---|---|
| Node.js | Backend JavaScript runtime |
| Express.js | Web application framework |
| HTML5 | Frontend structure |
| CSS3 | Styling and responsive layout |
| JavaScript | Frontend functionality |
| Supabase | Database and backend services |
| Chart.js | Data visualization |
| Lucide Icons | Interface icons |

## 🎨 Design System

Trimora uses an earthy brown and beige color palette.

| Color | Hex Code |
|---|---|
| Primary Brown | `#8C5F28` |
| Light Beige | `#DFCBAB` |
| Background | `#F8F4EC` |
| Dark Sidebar | `#181614` |
| White Cards | `#FFFFFF` |
| Main Text | `#24211E` |

**Typography:** Poppins

## 📌 Planned System Modules

- Dashboard
- Appointment Management
- Customer Management
- Service Management
- Payment Management
- Reports and Analytics
- Account Settings

## 📂 Project Structure

```text
Trimora/
├── server.js
├── package.json
├── routes/
│   └── dashboard.js
├── controllers/
│   └── dashboardController.js
├── public/
│   ├── css/
│   │   └── dashboard.css
│   ├── js/
│   │   └── dashboard.js
│   ├── images/
│   └── index.html
└── README.md
```

## 🚀 Installation and Setup

### Prerequisites

- Node.js
- npm
- Git

### 1. Clone the repository

```bash
git clone https://github.com/eligiofrancisrobert/Trimora.git
```

### 2. Navigate to the project directory

```bash
cd Trimora
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm start
```

### 5. Open in your browser

```text
http://localhost:3000
```

## 📍 Project Information

| Detail | Description |
|---|---|
| Project Name | Trimora |
| Establishment | Backyard Barbershop |
| Location | Barangay Langgam, San Pedro, Laguna |
| Project Type | Web-Based Management System |
| Academic Year | 2026–2027 |
| Development Status | In Development |

## 👨‍💻 Development

Trimora is developed as an academic capstone project with the goal of providing Backyard Barbershop with a centralized and efficient appointment and customer management solution.

---

**Trimora — Simplifying Appointments, Enhancing Every Cut. 💈**
