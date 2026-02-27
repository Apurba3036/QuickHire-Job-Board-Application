# QuickHire – Job Board Platform

![QuickHire Homepage Banner](./frontend/public/Homepage.png)

> A full-stack job board application built with **React + Node.js + MongoDB + Firebase**, featuring role-based authentication, admin dashboards, and animated UI.

---

## 🚀 Demo Credentials

| Role  | Email                     | Password     |
|-------|---------------------------|--------------|
| User  | `testuser@example.com`    | `password123`|
| Admin | `admin@gmail.com`         | `12345678`   |

> **Note:** Admin access is set manually in the MongoDB database (`role: "admin"` field on the User document). All new signups default to the `user` role.

---

## 📁 Project Structure

```
Qtech Project/
├── frontend/           # React (Vite) application
└── backend/            # Node.js + Express API
```

---

## 🖥️ Frontend

**Framework:** React 18 (Vite)  
**Directory:** `frontend/src/`

### Pages
| Page | Path | Description |
|------|------|-------------|
| Home | `/` | Hero, category cards, CTA, featured jobs |
| All Jobs | `/jobs` | Full 2-column job listing |
| Job Details | `/jobs/:id` | Single job view |
| People | `/people` | Placeholder page |
| Hiring Sites | `/hiring-sites` | Placeholder page |
| Resumes | `/resumes` | Placeholder page |
| Login | `/login` | Email/password + Google OAuth |
| Signup | `/signup` | New account registration |
| Admin Dashboard | `/admin` | Admin-only analytics & job management |
| User Dashboard | `/dashboard` | User activity, application tracking |
| Messages | `/messages` | Dashboard sub-page |
| Company Profile | `/profile` | Dashboard sub-page |
| All Applicants | `/applicants` | Admin-only dashboard page |
| My Schedule | `/schedule` | Dashboard sub-page |
| Settings | `/settings` | Dashboard sub-page |
| Help Center | `/help` | Dashboard sub-page |

### Layouts
- **`AppLayout`** — Public pages with Navbar + Footer
- **`AuthLayout`** — Login/Signup with split-screen image (`login.jpg`)
- **`DashboardLayout`** — Protected sidebar-only dashboard (redirects to `/login` if unauthenticated)

### Key Frontend Libraries

| Library | Version | Purpose |
|---------|---------|---------|
| `react` | ^18 | Core UI framework |
| `react-dom` | ^18 | DOM rendering |
| `react-router-dom` | ^6 | Client-side routing, nested layouts, `Outlet`, `NavLink` |
| `firebase` | ^10 | Authentication (Google OAuth + Email/Password) |
| `axios` | latest | HTTP requests to the backend API |
| `framer-motion` | latest | Smooth entrance animations on all pages |
| `lucide-react` | latest | Modern icon library (replaces react-icons in most places) |
| `react-icons` | latest | Legacy icon support (BsHexagonFill, FcGoogle) |
| `chart.js` | ^4 | Chart data engine |
| `react-chartjs-2` | ^5 | React wrapper for Chart.js (Bar & Line charts in dashboards) |
| `sweetalert2` | latest | Stylish blocking confirmation dialogs (delete job) |
| `react-toastify` | latest | Non-blocking toast notifications globally |
| `tailwindcss` | ^3 | Utility-first CSS styling |
| `daisyui` | ^3 | Tailwind CSS component library (badges, dropdowns, modals) |

### Google Fonts Used
- **Red Hat Display** (700) — Brand name "QuickHire" in Navbar
- **Epilogue** (400, 500, 700) — Nav links, body text, CTA, forms
- **Clash Display** (600) — Hero headline "5000+ Jobs"

### Firebase Configuration
Located in `frontend/src/firebase.js`. Supports:
- Google Sign-In
- Email/Password Sign-In & Registration
- `onAuthStateChanged` listener for persistent session management

### Auth Context (`frontend/src/context/AuthContext.jsx`)
- Wraps the entire app in `AuthProvider`
- Exposes `user`, `setUser`, `loading`, `logout`
- On Firebase auth state change → calls backend `syncUser` API to retrieve role & persist session

---

## ⚙️ Backend

**Framework:** Node.js + Express  
**Database:** MongoDB (via Mongoose)  
**Directory:** `backend/`

### Folder Structure & How It Works

```
backend/
├── server.js                   # Entry point — sets up Express, middleware, routes
├── .env                        # Secret config (MONGO_URI, JWT_SECRET)
├── models/
│   ├── User.js                 # Mongoose schema: uid, email, name, profilePic, role
│   ├── Job.js                  # Mongoose schema: title, company, location, tags, salary, etc.
│   └── Application.js          # Mongoose schema: jobId, userId, status
├── controllers/
│   ├── authController.js       # syncUser: creates/finds user, issues JWT cookie
│   ├── jobController.js        # getJobs, createJob, deleteJob
│   └── applicationController.js # applyToJob, getApplicationsByJob
├── routes/
│   ├── authRoutes.js           # POST /api/auth/sync-user
│   ├── jobRoutes.js            # GET /api/jobs, POST /api/jobs (admin), DELETE /api/jobs/:id (admin)
│   └── applicationRoutes.js   # POST /api/applications, GET /api/applications/job/:jobId (admin)
└── middleware/
    └── authMiddleware.js       # authMiddleware (verifies JWT), adminMiddleware (checks role)
```

### How the Backend Request Flow Works

```
Client → Express Router → Middleware → Controller → MongoDB (Mongoose) → Response
```

1. `server.js` registers all routes under `/api/`
2. Each route file maps HTTP methods to controller functions
3. Protected routes pass through `authMiddleware` (validates JWT from cookie)
4. Admin-only routes additionally pass through `adminMiddleware`
5. Controllers interact with Mongoose models and return JSON

### API Endpoints

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| POST | `/api/auth/sync-user` | No | Create/find user, return JWT in cookie |
| GET | `/api/jobs` | No | Fetch all active job listings |
| POST | `/api/jobs` | Admin | Create a new job |
| DELETE | `/api/jobs/:id` | Admin | Delete a job |
| POST | `/api/applications` | User | Apply to a job |
| GET | `/api/applications/job/:jobId` | Admin | View applicants for a job |

### Environment Variables (`.env`)

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_super_secret_jwt_key
```

### Role-Based Access Control
- `role: "user"` — Default for all new signups
- `role: "admin"` — Must be manually set in MongoDB
- The `authMiddleware` reads the JWT and attaches `req.user`
- The `adminMiddleware` checks `req.user.role === "admin"`, otherwise returns `403 Forbidden`

---

## 🔧 Running Locally

### Backend
```bash
cd backend
npm install
npm run dev
# Runs on http://localhost:5000
```

### Frontend
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:5173
```

---

## 🎨 Design System

| Element | Spec |
|---------|------|
| Primary Brand Color | `#4640DE` |
| Accent Blue | `#26A4FF` |
| Text Dark | `#25324B` |
| Text Body | `#515B6F` |
| Hero Headline Font | Clash Display, 600, 72px |
| Brand Name Font | Red Hat Display, 700, 24px |
| Body / Nav Font | Epilogue, 400/500/700 |
