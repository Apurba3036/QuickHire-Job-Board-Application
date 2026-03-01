import React, { useState } from 'react';
import { Outlet, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { FiHome, FiMessageSquare, FiBriefcase, FiUsers, FiList, FiCalendar, FiSettings, FiHelpCircle, FiBell, FiPlus, FiChevronDown, FiMenu, FiX } from 'react-icons/fi';
import { BsHexagonFill } from "react-icons/bs";
import { useAuth } from '../context/AuthContext';
import { useNotifications } from '../context/NotificationContext';
import LoadingSpinner from '../components/LoadingSpinner';

export default function DashboardLayout() {
    const location = useLocation();
    const navigate = useNavigate();
    const { user, logout, loading } = useAuth();
    const { notifications, unreadCount, markAllAsRead } = useNotifications();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isNotificationOpen, setIsNotificationOpen] = useState(false);

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

    const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

    if (loading) {
        return <LoadingSpinner fullScreen />;
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex font-sans overflow-x-hidden">
            {/* Mobile Backdrop */}
            {isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black/50 z-20 md:hidden transition-opacity duration-300"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`w-64 bg-white border-r border-gray-100 flex flex-col h-screen fixed z-30 transition-transform duration-300 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
                {/* Logo Area */}
                <div className="h-20 flex items-center justify-between px-6 border-b border-gray-100">
                    <Link to="/" className="text-xl flex items-center gap-2 font-extrabold text-slate-800 tracking-tight">
                        <div className="text-[#3b82f6] text-2xl shrink-0">
                            <BsHexagonFill />
                        </div>
                        QuickHire
                    </Link>
                    <button onClick={toggleSidebar} className="md:hidden text-gray-500 hover:text-gray-800 p-2">
                        <FiX className="text-xl" />
                    </button>
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
                                        onClick={() => setIsSidebarOpen(false)}
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
                                        onClick={() => setIsSidebarOpen(false)}
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
            <main className="flex-1 md:ml-64 flex flex-col min-h-screen relative z-10 w-full">
                {/* Dashboard Header */}
                <header className="h-20 bg-white border-b border-gray-100 flex justify-between items-center px-4 md:px-8 z-10 sticky top-0">
                    <div className="flex items-center gap-4">
                        <button onClick={toggleSidebar} className="md:hidden text-gray-500 hover:text-gray-800 p-2">
                            <FiMenu className="text-2xl" />
                        </button>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-emerald-100 text-emerald-500 rounded-lg overflow-hidden flex items-center justify-center border border-gray-100 shrink-0">
                                {user?.profilePic ? (
                                    <img src={user.profilePic} alt="Profile" className="w-full h-full object-cover" />
                                ) : (
                                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" /></svg>
                                )}
                            </div>
                            <div className="hidden sm:block">
                                <p className="text-xs text-gray-400 font-medium capitalize">{user?.role || 'User'}</p>
                                <div className="text-base font-bold text-gray-800 flex items-center gap-1 cursor-pointer">
                                    {user?.name || 'Loading'} <FiChevronDown className="text-gray-400" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 md:gap-6 relative">
                        <div className="relative">
                            <button 
                                onClick={() => {
                                    console.log('Notification bell clicked, current state:', isNotificationOpen);
                                    setIsNotificationOpen(!isNotificationOpen);
                                    if (!isNotificationOpen) markAllAsRead();
                                }}
                                className="text-gray-400 hover:text-gray-600 relative p-1"
                            >
                                <FiBell className="text-xl" />
                                {unreadCount > 0 && (
                                    <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-[10px] flex items-center justify-center rounded-full border-2 border-white font-bold">
                                        {unreadCount}
                                    </span>
                                )}
                            </button>

                            {/* Notification Dropdown */}
                            {isNotificationOpen && (
                                <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden">
                                    <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50">
                                        <h3 className="font-bold text-gray-800">Notifications</h3>
                                        <button onClick={() => setIsNotificationOpen(false)} className="text-gray-400 hover:text-gray-600">
                                            <FiX />
                                        </button>
                                    </div>
                                    <div className="max-h-96 overflow-y-auto">
                                        {notifications.length === 0 ? (
                                            <div className="p-8 text-center text-gray-400">
                                                <p className="text-sm">No new notifications</p>
                                            </div>
                                        ) : (
                                            <div className="divide-y divide-gray-50">
                                                {notifications.map((notif, idx) => (
                                                    <div key={idx} className="p-4 hover:bg-gray-50 transition-colors">
                                                        <p className="text-sm text-gray-800 font-medium">{notif.message}</p>
                                                        <p className="text-xs text-gray-400 mt-1">Just now</p>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                        {user?.role === 'admin' && (
                            <Link to="/admin/post-job" className="btn bg-[#4834D4] hover:bg-[#392eb0] text-white border-none h-10 min-h-0 px-4 md:px-6 font-bold flex items-center gap-2 rounded-lg normal-case shadow-lg shadow-[#4834D4]/30 text-sm">
                                <FiPlus className="text-lg" /> <span className="hidden xs:inline">Post job</span>
                            </Link>
                        )}
                        <button onClick={handleLogout} className="text-xs md:text-sm text-red-500 font-bold hover:bg-red-50 px-2 md:px-3 py-2 rounded-lg transition-colors">
                            Logout
                        </button>
                    </div>
                </header>

                {/* Dashboard Body / Outlet */}
                <div className="p-4 md:p-8 flex-1 overflow-x-hidden">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
