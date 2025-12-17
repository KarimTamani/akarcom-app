"use client";
import { User, UserSignIn, UserSignUp } from "@/lib/user";
import { api } from "@/services/api";
import { createContext, unstable_startGestureTransition, useContext, useEffect, useState } from "react";


interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (signInInput: UserSignIn) => Promise<void>;
    signup: (signInInput: UserSignUp) => Promise<void>;
    logout: () => void;
    getToken : () => string | undefined 
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(true);


    useEffect(() => {
        setLoading(true);
        const user = localStorage.getItem("user");
        if (user) {
            try {
                setUser(JSON.parse(user));
            } catch (error) {
                setUser(null);
            }
        }
        setLoading(false);
    }, [])


    const login = async (signInInput: UserSignIn) => {
        setLoading(true);
        const response = await api.post("/auth/signin", signInInput);
        const { data } = response.data

        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);

        setUser(data.user);
        setLoading(false);
    };

    const signup = async (signUpInput: UserSignUp) => {
        setLoading(true) ; 
        const response = await api.post("/auth/signup", signUpInput);
        const { data } = response.data

        localStorage.setItem("user", JSON.stringify(data.user));
        localStorage.setItem("token", data.token);

        setUser(data.user);
        setLoading(false) ; 
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setUser(null);
    };

    const getToken = () : string | undefined  => { 
        return localStorage.getItem("token") as string | undefined 
    }
    return (
        <AuthContext.Provider value={{ user, loading, login, signup, logout , getToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext)!;
