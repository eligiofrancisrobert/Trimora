<<<<<<< HEAD
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
=======
Trimora 💈

Web-Based Appointment and Customer Management System

Trimora is a web-based appointment and customer management system developed for Backyard Barbershop, located in Barangay Langgam, San Pedro, Laguna.

The system aims to streamline appointment scheduling, customer management, and business operations through a centralized and user-friendly platform.

🎯 Project Objectives

Simplify appointment scheduling and management.

Maintain centralized customer records and appointment history.

Monitor barber availability and appointment schedules.

Manage appointment payments and transaction records.

Provide business reports and appointment analytics.

Improve the overall customer booking experience.

🛠️ Technology Stack

Technology

Purpose

Node.js

Backend JavaScript runtime

Express.js

Web application framework

HTML5

Frontend structure

CSS3

Styling and responsive layout

JavaScript

Frontend functionality

Supabase

Database and backend services

Chart.js

Data visualization

Lucide Icons

Interface icons

🎨 Design System

Trimora uses an earthy brown and beige color palette to create a clean, modern, and professional barbershop aesthetic.

Color

Hex Code

Primary Brown

#8C5F28

Light Beige

#DFCBAB

Background

#F8F4EC

Dark Sidebar

#181614

White Cards

#FFFFFF

Main Text

#24211E

Typography: Poppins

📌 Planned System Modules

Dashboard

Appointment Management

Customer Management

Service Management

Payment Management

Reports and Analytics

Account Settings

📂 Project Structure

Trimora/
├── server.js
├── package.json
├── routes/
├── controllers/
├── public/
│   ├── css/
│   │   └── dashboard.css
│   ├── js/
│   │   └── dashboard.js
│   ├── images/
│   └── index.html
└── README.md

🚀 Installation and Setup

Prerequisites

Node.js

npm

Git

1. Clone the repository

git clone https://github.com/YOUR_USERNAME/Trimora.git

2. Navigate to the project directory

cd Trimora

3. Install dependencies

npm install

4. Start the development server

npm start

5. Open in your browser

http://localhost:3000

📍 Project Information

Detail

Description

Project Name

Trimora

Establishment

Backyard Barbershop

Location

Barangay Langgam, San Pedro, Laguna

Project Type

Web-Based Management System

Academic Year

2026–2027

Development Status

In Development

👨‍💻 Development

Trimora is developed as an academic capstone project with the goal of providing Backyard Barbershop with a centralized and efficient appointment and customer management solution.

Trimora — Simplifying Appointments, Enhancing Every Cut. 💈
>>>>>>> 55742fde4de3770c306ee18b7b805a8b8d9d4ef1
