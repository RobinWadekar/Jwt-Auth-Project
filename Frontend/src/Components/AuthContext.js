import { createContext, useContext, useEffect, useState, useRef } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({
        name: '',
        userName: '',
        password: '',
        role: '',
        token: ''
    });
    const timerRef = useRef(null);

    const getTokenRemainingTime = (token) => {
        if (!token) return 0;
        try {
            const parts = token.split('.');
            if (parts.length < 2) return 0;
            const payload = JSON.parse(atob(parts[1]));
            if (!payload.exp) return 0;
            const expMs = payload.exp * 1000;
            return expMs - Date.now();
        } catch (e) {
            return 0;
        }
    };

    const logout = () => {
        setUser({
            name: '',
            userName: '',
            password: '',
            role: '',
            token: ''
        });
        localStorage.removeItem("user");
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
    };

    useEffect(() => {
        const saved = localStorage.getItem("user");
        if (saved) {
            const parsed = JSON.parse(saved);
            const remaining = getTokenRemainingTime(parsed.token);
            if (remaining > 0) {
                setUser(parsed);
            } else {
                // token already expired, clear stored user
                localStorage.removeItem("user");
            }
        }
    }, []);

    useEffect(() => {
        // clear previous timeout when user changes
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }

        if (user.token) {
            localStorage.setItem("user", JSON.stringify(user));
            const remaining = getTokenRemainingTime(user.token);

            if (remaining <= 0) {
                // token expired (or invalid) — log out immediately
                logout();
                return;
            }

            // schedule logout when token actually expires
            timerRef.current = setTimeout(() => {
                logout();
            }, remaining);
        } else {
            // no token — ensure localStorage cleared
            localStorage.removeItem("user");
        }

        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
                timerRef.current = null;
            }
        };
    }, [user]);


    return (
        <AuthContext.Provider value={{ user, setUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);