import React, { createContext, useContext, useState, useEffect } from "react";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut as firebaseSignOut } from "firebase/auth";
import { syncUser } from "../services/api";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            if (currentUser) {
                try {
                    // Call syncUser for ALL firebase logins (Google and Email)
                    const res = await syncUser({
                        uid: currentUser.uid,
                        email: currentUser.email,
                        name: currentUser.displayName,
                        profilePic: currentUser.photoURL
                    });
                    setUser(res.user);
                } catch (err) {
                    console.error("Error syncing user with backend:", err);
                    setUser(null);
                }
            } else {
                setUser(null);
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const logout = async () => {
        try {
            await firebaseSignOut(auth);
            // also logout backend (clear cookie)
            // await api.post('/auth/logout'); // we should add this to api.js
            setUser(null);
        } catch (error) {
            console.error("Logout error", error);
        }
    };

    const value = {
        user,
        setUser,
        loading,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}
