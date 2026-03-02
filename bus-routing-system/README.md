# Smart Bus Routing & Management System

A full-stack starter implementation for managing buses, routes, trips, and live location updates for **Admin**, **Driver**, and **Passenger** roles.

## Tech Stack
- **Frontend:** React.js, Tailwind CSS, Axios, React Router, Socket.io Client
- **Backend:** Node.js, Express.js, JWT, bcryptjs, Socket.io
- **Database:** MySQL

## Folder Structure

```bash
bus-routing-system/
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── services/
│   ├── index.html
│   └── package.json
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── socket/
│   ├── .env.example
│   ├── index.js
│   └── package.json
└── database.sql
```

## Setup Instructions

### 1) Clone and install dependencies
```bash
cd bus-routing-system/server
npm install

cd ../client
npm install
```

### 2) Configure environment variables
```bash
cd ../server
cp .env.example .env
```

Update `.env` values for MySQL and JWT secret.

### 3) Create and seed database
```bash
mysql -u root -p < ../database.sql
```

### 4) Start backend
```bash
cd server
npm run dev
```

### 5) Start frontend
```bash
cd client
npm run dev
```

App URLs:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

## Authentication
- JWT-based auth with role-aware access control.
- Password hashing via bcryptjs.

## Sample API Endpoints

### Auth
- `POST /api/auth/register` — passenger registration
- `POST /api/auth/login` — login for admin/driver/passenger

### Admin
- `GET /api/admin/dashboard`
- `GET /api/admin/buses`
- `POST /api/admin/buses`
- `PUT /api/admin/buses/:id`
- `DELETE /api/admin/buses/:id`
- `POST /api/admin/routes`
- `POST /api/admin/stops`
- `GET /api/admin/trips/active`

### Driver
- `GET /api/driver/assignment`
- `POST /api/driver/trip/start`
- `PUT /api/driver/trip/:tripId/end`
- `PUT /api/driver/location`
- `POST /api/driver/stop/completed`

### Passenger
- `GET /api/passenger/routes`
- `GET /api/passenger/routes/:routeId/stops`
- `GET /api/passenger/routes/:routeId/live`
- `GET /api/passenger/eta/:tripId/:stopId`

## Feature Coverage

### Admin Module
- Login
- Add/Edit/Delete buses
- Create routes
- Add stops to routes
- Assign drivers to buses
- View active trips and dashboard stats
- Live location feed placeholder (integrate Google Maps easily)

### Driver Module
- Login
- View assigned bus and route
- Start/end trips
- Update live location (ready for 5-second polling)
- Mark stops completed

### Passenger Module
- Register/login
- View routes and route stops
- Live bus tracking (Socket.io supported)
- ETA endpoint for selected stop
- Near-stop notification can be implemented from live ETA thresholds

## Suggested Enhancements
- Google Maps route rendering
- Dijkstra-based route optimization service
- Seat booking microservice
- Traffic-aware ETA with external APIs
