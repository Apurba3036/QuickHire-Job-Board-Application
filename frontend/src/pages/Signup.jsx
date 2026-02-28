import React, { useState } from 'react';
import { auth, googleProvider } from '../firebase';
import { signInWithPopup, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { useNavigate, Link } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { ArrowLeft } from 'lucide-react';
import loginImg from '../assets/login.jpg';

export default function Signup() {
    const navigate = useNavigate();
    const [nameInput, setNameInput] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [error, setError] = useState(null);

    const handleGoogleSignup = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            navigate('/');
        } catch (error) {
            console.error("Google Signup failed:", error);
            setError("Failed to sign up with Google.");
        }
    };

    const handleEmailSignup = async (e) => {
        e.preventDefault();
        setError(null);
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, emailInput, passwordInput);

            // Update profile with name so it syncs correctly to backend
            await updateProfile(userCredential.user, {
                displayName: nameInput
            });

            // AuthContext will automatically trigger the backend sync passing this new display name
            navigate('/');
        } catch (error) {
            console.error("Email Signup failed:", error);
            if (error.code === 'auth/email-already-in-use') {
                setError("Email is already registered. Please login.");
            } else if (error.code === 'auth/weak-password') {
                setError("Password is too weak. Must be at least 6 characters.");
            } else {
                setError("Failed to create account.");
            }
        }
    };

    return (
        <div className="flex h-screen w-full bg-white">
            {/* Left Image Side (Hidden on Mobile) */}
            <div className="hidden lg:flex w-1/2 bg-gray-100 relative items-center justify-center">
                <img
                    src={loginImg}
                    alt="Signup Background"
                    className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="relative z-10 text-white p-12 text-center">
                    <h2 className="text-4xl font-extrabold mb-4 drop-shadow-lg">Join QuickHire Today</h2>
                    <p className="text-xl font-medium drop-shadow-md">Connect with top companies worldwide.</p>
                </div>
            </div>

            {/* Right Form Side */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12 lg:p-24 overflow-y-auto relative">
                {/* Back Button */}
                <Link to="/" className="absolute top-8 left-8 flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors font-medium">
                    <ArrowLeft className="w-5 h-5" />
                    Back to Home
                </Link>

                <div className="w-full max-w-md mt-10 lg:mt-0">
                    <div className="text-center mb-10">
                        <h1 className=" mt-32 text-3xl font-bold text-gray-900 mb-2">Create an account</h1>
                        <p className="text-gray-500">Enter your details below to create your account and get started.</p>
                    </div>

                    {error && (
                        <div className="bg-red-50 text-red-500 p-3 rounded-lg mb-6 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleEmailSignup} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                            <input
                                type="text"
                                value={nameInput}
                                onChange={(e) => setNameInput(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#3b82f6] focus:border-[#3b82f6] outline-none transition-colors"
                                placeholder="Jane Doe"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                            <input
                                type="email"
                                value={emailInput}
                                onChange={(e) => setEmailInput(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#3b82f6] focus:border-[#3b82f6] outline-none transition-colors"
                                placeholder="Enter your email"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                            <input
                                type="password"
                                value={passwordInput}
                                onChange={(e) => setPasswordInput(e.target.value)}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#3b82f6] focus:border-[#3b82f6] outline-none transition-colors"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button type="submit" className="w-full bg-[#3b82f6] hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-lg shadow-blue-500/30 transition-all mt-4">
                            Create account
                        </button>
                    </form>

                    <div className="mt-8 flex items-center justify-between">
                        <span className="border-b w-1/5 lg:w-1/4"></span>
                        <span className="text-xs text-center text-gray-500 uppercase">or sign up with</span>
                        <span className="border-b w-1/5 lg:w-1/4"></span>
                    </div>

                    <div className="mt-6">
                        <button onClick={handleGoogleSignup} type="button" className="w-full flex items-center justify-center gap-2 border border-gray-300 rounded-lg p-3 hover:bg-gray-50 transition-colors font-medium text-gray-700">
                            <FcGoogle className="text-xl" /> Google
                        </button>
                    </div>

                    <p className="mt-8 text-center text-sm text-gray-600">
                        Already have an account? <Link to="/login" className="text-[#3b82f6] font-semibold hover:underline">Log in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
