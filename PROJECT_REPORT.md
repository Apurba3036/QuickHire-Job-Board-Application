# QuickHire Project Report

## Executive Summary
**QuickHire** is a modern, full-stack job board platform designed to bridge the gap between employers and job seekers. The application features a sleek, responsive UI with real-time analytics, secure role-based authentication, and a robust backend management system.

---

## 🏗️ System Architecture

The application follows a decoupled **MERN-like** architecture (using Node/Express instead of a full MERN stack for some parts) with a dedicated frontend and backend.

### High-Level Architecture
```mermaid
graph LR
    subgraph Frontend ["Frontend (React/Vite)"]
        UI[User Interface]
        Auth[Auth Context]
        API_Call[Axios Services]
    end
    
    subgraph Backend ["Backend (Node/Express)"]
        Routes[Express Routes]
        Middleware[Auth/Admin Middleware]
        Controllers[Business Logic]
    end
    
    subgraph Third_Party ["External Services"]
        FB[Firebase Auth]
        MB[MongoDB Atlas]
        Vercel[Vercel Hosting]
        Render[Render Hosting]
    end

    UI --> Auth
    Auth --> FB
    UI --> API_Call
    API_Call --> Routes
    Routes --> Middleware
    Middleware --> Controllers
    Controllers --> MB
    Vercel -.-> UI
    Render -.-> Routes
```

---

## 🛠️ Technical Stack

### Frontend
- **Framework:** React 18 (Vite)
- **Styling:** Tailwind CSS + DaisyUI
- **Icons:** Lucide React + FontAwesome
- **Animations:** Framer Motion
- **State Management:** React Context API (Auth)
- **Authentication:** Firebase (Google OAuth & Email/Password)
- **Notifications:** React-Toastify + SweetAlert2
- **Data Visualization:** Chart.js + React-Chartjs-2

### Backend
- **Environment:** Node.js + Express.js
- **Database:** MongoDB Atlas (Mongoose ODM)
- **Security:** JSON Web Tokens (JWT) + Cookie-parser
- **CORS:** Configuration for cross-origin resource sharing

---

## 🔐 Authentication & Security Flow

The system employs a multi-layered authentication strategy.

```mermaid
sequenceDiagram
    participant User
    participant Frontend
    participant Firebase
    participant Backend
    participant DB

    User->>Frontend: Login (Google/Email)
    Frontend->>Firebase: Authenticate
    Firebase-->>Frontend: Auth Token (UID, Email)
    Frontend->>Backend: POST /api/auth/sync (UID, Email)
    Backend->>DB: Find/Create User
    DB-->>Backend: User Record (Role: user/admin)
    Backend-->>Frontend: JWT Cookie (Role + ID)
    Frontend->>User: Redirect to Dashboard
```

### Key Security Features:
1. **JWT-protected Cookies:** Sessions are managed via secure cookies.
2. **Admin-only Routes:** Middleware verifies the 'admin' role before allowing job creation or deletion.
3. **Environment Isolation:** All sensitive keys (Firebase, MongoDB, JWT) are stored in `.env` files and never committed to version control.

---

## ✨ Key Features

### 1. Modern Job Discovery
- **Hero Section:** Animated headliner with Clash Display typography.
- **Search & Filter:** Functional search bar for job titles and locations.
- **Two-Column Listings:** Sleek, responsive grid for job cards.

### 2. Comprehensive Dashboards
- **Admin Dashboard:**
  - Real-time job statistics charts.
  - CRUD operations for job listings.
  - Applicant tracking.
- **User Dashboard:**
  - Personalized application tracking.
  - Profile management widgets.

### 3. Responsive Layout System
- **AppLayout:** Standard navbar/footer for public views.
- **AuthLayout:** Split-screen design using professional imagery for login/signup.
- **DashboardLayout:** Focused, sidebar-driven navigation for internal tools.

---

## 📂 Project Structure

### Backend Structure
```text
backend/
├── controllers/          # Business logic for auth, jobs, and applications
├── middleware/           # Auth and Admin protection logic
├── models/               # Mongoose schemas (User, Job, Application)
├── routes/               # API endpoint definitions
├── server.js             # Entry point: Express server and DB connection
├── seeder.js             # Script to populate initial job data
└── .env                  # Environment secrets (ignored by git)
```

### Frontend Structure
```text
frontend/
├── src/
│   ├── assets/           # Images, logos, and static visuals
│   ├── components/       # Reusable UI parts (Navbar, Footer, Modals)
│   ├── context/          # Auth context for global state management
│   ├── layouts/          # Tiered page structures (App, Auth, Dashboard)
│   ├── pages/            # Main screen components (Home, Dashboards, etc.)
│   ├── services/         # Axios API service configurations
│   ├── utils/            # Helper functions and dummy data
│   ├── App.jsx           # Main provider wrapper
│   └── router.jsx        # Navigation map and route protection
├── public/               # Public assets like favicon and banner
└── vercel.json           # Deployment configuration for Vercel
```

---

## 📊 Database Design (ERD)

The system manages three primary entities with the following relationships:

```mermaid
erDiagram
    USER ||--o{ APPLICATION : applies
    JOB ||--o{ APPLICATION : receives
    USER {
        string uid PK "Firebase UID"
        string email
        string name
        string role "admin | user"
    }
    JOB {
        string title
        string company
        string salary
        string location
        string[] tags
    }
    APPLICATION {
        string jobId FK
        string userId FK
        string status "pending | accepted | rejected"
        date createdAt
    }
```

---

## 🏗️ Software Component Diagram

Detailed look at how the layers interact:

```mermaid
graph TD
    subgraph Client ["Client Layer (Frontend)"]
        Router[React Router]
        AuthC[Auth Context]
        Pages[Views/Pages]
        Axios[Axios Services]
    end

    subgraph Logic ["Logic Layer (Backend)"]
        EndP[API Endpoints]
        MidW[Security Middleware]
        Ctrl[Controllers]
    end

    subgraph Data ["Data Layer (Storage)"]
        Mongo[(MongoDB Atlas)]
        FAuth[Firebase Auth]
    end

    Router --> Pages
    Pages --> AuthC
    AuthC --> FAuth
    Pages --> Axios
    Axios --> EndP
    EndP --> MidW
    MidW --> Ctrl
    Ctrl --> Mongo
```

---

## ✨ Project Visuals

![Homepage](C:/Users/BACBON COMPUTERS-01/.gemini/antigravity/brain/45b14a9d-1cf7-4e11-af16-eb8db0b196c6/homepage.png)
*Figure 1: High-fidelity Homepage Design*

![Admin Dashboard](C:/Users/BACBON COMPUTERS-01/.gemini/antigravity/brain/45b14a9d-1cf7-4e11-af16-eb8db0b196c6/admin_dashboard.png)
*Figure 2: Admin Dashboard - Job Management & Analytics*

![User Dashboard](C:/Users/BACBON COMPUTERS-01/.gemini/antigravity/brain/45b14a9d-1cf7-4e11-af16-eb8db0b196c6/user_dashboard.png)
*Figure 3: User Dashboard - Application Tracking & Profiles*

---

## 🚀 How to Run the Project

### Prerequisites
- Node.js installed
- MongoDB Atlas account
- Firebase Project setup

### 1. Setup Backend
1. Navigate to directory: `cd backend`
2. Install dependencies: `npm install`
3. Configure `.env` with `MONGO_URI` and `JWT_SECRET`.
4. Start server: `npm run dev`

### 2. Setup Frontend
1. Navigate to directory: `cd frontend`
2. Install dependencies: `npm install`
3. Configure `.env` with Firebase keys (VITE_X).
4. Start dev server: `npm run dev`

---

> [!NOTE]
> This project was developed with a focus on visual excellence and performance, utilizing modern CSS techniques like Glassmorphism and hardware-accelerated animations.
