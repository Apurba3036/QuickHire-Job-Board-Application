import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logoImg from '../assets/image copy.png';

export default function Navbar() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logout();
        navigate('/');
    };

    // Shared nav link style
    const navLinkClass = ({ isActive }) =>
        `transition-colors ${isActive ? 'text-[#4640DE]' : 'text-[#515B6F] hover:text-[#4640DE]'}`;

    return (
        <div className="navbar bg-white py-0 px-4 lg:px-[40px] fixed top-0 w-full z-50 shadow-sm border-b border-gray-100 h-[72px]"
            style={{ fontFamily: 'Epilogue, sans-serif' }}>

            {/* Logo area */}
            <div className="navbar-start">
                <Link to="/" className="flex items-center gap-2" style={{ top: '21px', left: '40px' }}>
                    <img src={logoImg} alt="QuickHire Logo" className="h-8 w-8 object-contain" />
                    <span className="md:inline-block" style={{
                        fontFamily: 'Red Hat Display, sans-serif',
                        fontWeight: 700,
                        fontSize: '24px',
                        lineHeight: '150%',
                        letterSpacing: '-1%',
                        color: '#25324B',
                        whiteSpace: 'nowrap'
                    }}>
                        QuickHire
                    </span>
                </Link>
            </div>

            {/* Center Nav Links (Desktop) */}
            <div className="navbar-center hidden lg:flex">
                <ul className="flex gap-8" style={{ fontFamily: 'Epilogue, sans-serif', fontWeight: 500, fontSize: '16px', lineHeight: '160%' }}>
                    <li><NavLink to="/" className={navLinkClass}>Find Jobs</NavLink></li>
                    <li><NavLink to="/people" className={navLinkClass}>People</NavLink></li>
                    <li><NavLink to="/hiring-sites" className={navLinkClass}>Hiring sites</NavLink></li>
                    <li><NavLink to="/resumes" className={navLinkClass}>Resumes</NavLink></li>
                </ul>
            </div>

            {/* Right Side: Auth & Mobile Menu */}
            <div className="navbar-end gap-2 lg:gap-4">
                {user ? (
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar border-2 border-gray-100 placeholder">
                            <div className="w-10 rounded-full bg-gray-100 flex items-center justify-center">
                                {user.profilePic ? (
                                    <img alt="User avatar" src={user.profilePic} />
                                ) : (
                                    <span className="text-xl text-gray-500">{user.name ? user.name.charAt(0).toUpperCase() : 'U'}</span>
                                )}
                            </div>
                        </div>
                        <ul tabIndex={0} className="mt-3 z-[2] p-2 shadow-xl menu menu-sm dropdown-content bg-white rounded-box w-52 text-gray-600 font-medium border border-gray-100">
                            <li className="px-4 py-2 border-b border-gray-100 mb-2">
                                <div className="flex flex-col gap-1 px-0 pointer-events-none">
                                    <span className="font-bold text-gray-800">{user.name}</span>
                                    <span className="text-xs text-gray-400 font-normal">{user.email}</span>
                                </div>
                            </li>
                            <li>
                                <Link to={user.role === 'admin' ? '/admin' : '/dashboard'} className="py-3 hover:text-[#4640DE] hover:bg-blue-50">
                                    {user.role === 'admin' ? 'Admin Dashboard' : 'My Dashboard'}
                                </Link>
                            </li>
                            <li><button onClick={handleLogout} className="py-3 text-red-500 hover:bg-red-50">Logout</button></li>
                        </ul>
                    </div>
                ) : (
                    <>
                        <Link to="/login" className="hidden sm:block transition-colors hover:text-[#4640DE] font-bold text-[#4640DE]">Login</Link>
                        <Link to="/signup" className="border border-[#CCCCF5] hover:bg-[#4640DE] hover:text-white transition-colors px-4 lg:px-5 py-2 rounded font-bold text-[#4640DE] text-sm lg:text-base">Sign Up</Link>
                    </>
                )}

                {/* Mobile Hamburger on the right */}
                <div className="dropdown dropdown-end lg:hidden">
                    <div tabIndex={0} role="button" className="btn btn-ghost px-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-[#25324B]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-16 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[2] p-2 shadow-xl bg-white rounded-box w-52 gap-2 text-[#515B6F] font-bold border border-gray-100">
                        <li><Link to="/">Find Jobs</Link></li>
                        <li><Link to="/people">People</Link></li>
                        <li><Link to="/hiring-sites">Hiring Sites</Link></li>
                        <li><Link to="/resumes">Resumes</Link></li>
                        {!user && (
                            <li className="sm:hidden border-t mt-2 pt-2">
                                <Link to="/login" className="text-[#4640DE]">Login</Link>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
        </div>
    );
}
