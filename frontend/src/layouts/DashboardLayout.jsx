import React from 'react';
import { Outlet, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { FiHome, FiMessageSquare, FiBriefcase, FiUsers, FiList, FiCalendar, FiSettings, FiHelpCircle, FiBell, FiPlus, FiChevronDown } from 'react-icons/fi';
import { BsHexagonFill } from "react-icons/bs";
import { useAuth } from '../context/AuthContext';

export default function DashboardLayout() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout, loading } = useAuth();

    // Helper to check active route
    const isActive = (path) => location.pathname.startsWith(path);

    const navItems = [
        { name: 'Dashboard', icon: FiHome, path: user?.role === 'admin' ? '/admin' : '/dashboard' },
        { name: 'Messages', icon: FiMessageSquare, path: '/messages', badge: '1' },
        { name: 'Company Profile', icon: FiBriefcase, path: '/profile' },
        { name: 'All Applicants', icon: FiUsers, path: '/applicants', adminOnly: true },
        { name: 'Job Listing', icon: FiList, path: '/jobs', adminOnly: true },
        { name: 'My Schedule', icon: FiCalendar, path: '/schedule' },
    ];

    const bottomItems = [
        { name: 'Settings', icon: FiSettings, path: '/settings' },
        { name: 'Help Center', icon: FiHelpCircle, path: '/help' },
    ];

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center bg-[#F8FAFC]"><span className="loading loading-spinner text-[#4834D4] w-12 h-12"></span></div>;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-gray-100 flex flex-col h-screen fixed z-20">
                {/* Logo Area */}
                <div className="h-20 flex items-center px-6 border-b border-gray-100">
                    <Link to="/" className="text-xl flex items-center gap-2 font-extrabold text-slate-800 tracking-tight">
                        <div className="text-[#3b82f6] text-2xl shrink-0">
                            <BsHexagonFill />
                        </div>
                        QuickHire
                    </Link>
                </div>

                {/* Main Navigation */}
                <div className="flex-1 overflow-y-auto py-6 px-4">
                    <ul className="space-y-2 text-[15px] font-medium text-gray-500">
                        {navItems.map((item) => {
                            if (item.adminOnly && (!user || user.role !== 'admin')) return null;

                            return (
                                <li key={item.name}>
                                    <Link
                                        to={item.path}
                                        className={`flex items-center justify-between px-4 py-3 rounded-lg transition-colors ${isActive(item.path) && item.path !== '/'
                                            ? 'bg-[#F2F5FF] text-[#4834D4]'
                                            : 'hover:bg-gray-50 hover:text-gray-800'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <item.icon className="text-lg" />
                                            {item.name}
                                        </div>
                                        {item.badge && (
                                            <span className="bg-[#4834D4] text-white text-[10px] w-5 h-5 flex items-center justify-center rounded-full font-bold">
                                                {item.badge}
                                            </span>
                                        )}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    {/* Bottom Settings Navigation */}
                    <div className="mt-8">
                        <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Settings</p>
                        <ul className="space-y-2 text-[15px] font-medium text-gray-500">
                            {bottomItems.map((item) => (
                                <li key={item.name}>
                                    <Link
                                        to={item.path}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive(item.path)
                                            ? 'bg-blue-50 text-[#3b82f6]'
                                            : 'hover:bg-gray-50 hover:text-gray-800'
                                            }`}
                                    >
                                        <item.icon className="text-lg" />
                                        {item.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Dashboard Bottom Decoration (Purple Angle) */}
                <div className="relative h-20 w-full overflow-hidden mt-auto">
                    <div className="absolute bottom-[-20px] left-[-20px] w-full h-full border-[3px] border-[#4834D4]/20 rounded-tr-[50px] transform rotate-12 bg-transparent pointer-events-none"></div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 ml-64 flex flex-col min-h-screen relative z-10">
                {/* Dashboard Header */}
                <header className="h-20 bg-white border-b border-gray-100 flex justify-between items-center px-8 z-10 sticky top-0">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-100 text-emerald-500 rounded-lg overflow-hidden flex items-center justify-center border border-gray-100">
                            {user?.profilePic ? (
                                <img src={user.profilePic} alt="Profile" className="w-full h-full object-cover" />
                            ) : (
                                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" /></svg>
                            )}
                        </div>
                        <div>
                            <p className="text-xs text-gray-400 font-medium capitalize">{user?.role || 'User'}</p>
                            <div className="text-base font-bold text-gray-800 flex items-center gap-1 cursor-pointer">
                                {user?.name || 'Loading'} <FiChevronDown className="text-gray-400" />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <button className="text-gray-400 hover:text-gray-600 relative">
                            <FiBell className="text-xl" />
                            <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>
                        {user?.role === 'admin' && (
                            <Link to="/admin/post-job" className="btn bg-[#4834D4] hover:bg-[#392eb0] text-white border-none h-10 min-h-0 px-6 font-bold flex items-center gap-2 rounded-lg normal-case shadow-lg shadow-[#4834D4]/30">
                                <FiPlus className="text-lg" /> Post a job
                            </Link>
                        )}
                        <button onClick={handleLogout} className="text-sm text-red-500 font-bold hover:bg-red-50 px-3 py-2 rounded-lg transition-colors">
                            Logout
                        </button>
                    </div>
                </header>

                {/* Dashboard Body / Outlet */}
                <div className="p-8 flex-1">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
