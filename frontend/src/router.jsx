import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home";
import JobDetails from "./pages/JobDetails";
import AllJobs from "./pages/AllJobs";
import People from "./pages/People";
import HiringSites from "./pages/HiringSites";
import Resumes from "./pages/Resumes";
import AdminPanel from "./pages/AdminPanel";
import UserDashboard from "./pages/UserDashboard";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Messages from "./pages/dashboard/Messages";
import Profile from "./pages/dashboard/Profile";
import Applicants from "./pages/dashboard/Applicants";
import Schedule from "./pages/dashboard/Schedule";
import SettingsPage from "./pages/dashboard/Settings";
import HelpCenter from "./pages/dashboard/HelpCenter";

// Layouts
import AppLayout from "./layouts/AppLayout";
import AuthLayout from "./layouts/AuthLayout";
import DashboardLayout from "./layouts/DashboardLayout";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            // Standard Pages (Navbar + Footer)
            {
                element: <AppLayout />,
                children: [
                    { path: "/", element: <Home /> },
                    { path: "/jobs", element: <AllJobs /> },
                    { path: "/jobs/:id", element: <JobDetails /> },
                    { path: "/people", element: <People /> },
                    { path: "/hiring-sites", element: <HiringSites /> },
                    { path: "/resumes", element: <Resumes /> },
                ]
            },
            // Auth Pages (Split Form)
            {
                element: <AuthLayout />,
                children: [
                    { path: "/login", element: <Login /> },
                    { path: "/signup", element: <Signup /> },
                ]
            },
            // Dashboard Pages (Sidebar only)
            {
                element: <DashboardLayout />,
                children: [
                    { path: "/admin", element: <AdminPanel /> },
                    { path: "/dashboard", element: <UserDashboard /> },
                    { path: "/messages", element: <Messages /> },
                    { path: "/profile", element: <Profile /> },
                    { path: "/applicants", element: <Applicants /> },
                    { path: "/schedule", element: <Schedule /> },
                    { path: "/settings", element: <SettingsPage /> },
                    { path: "/help", element: <HelpCenter /> },
                ]
            }
        ]
    }
]);

export default router;
