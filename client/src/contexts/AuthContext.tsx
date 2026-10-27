"use client";

import { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/api';

// ============================================
// SESSION COOKIE HELPERS (for middleware)
// ============================================
function setSessionCookie() {
    if (typeof document !== 'undefined') {
        const secure = window.location.protocol === 'https:' ? '; Secure' : '';
        document.cookie = `__session=1; path=/; max-age=${60 * 60 * 24 * 30}; SameSite=Lax${secure}`;
    }
}

function clearSessionCookie() {
    if (typeof document !== 'undefined') {
        document.cookie = '__session=; path=/; max-age=0; SameSite=Lax; Secure';
    }
}

// User interface — backed by MongoDB
export interface User {
    id: string;
    email: string;
    fullName: string;
    role: 'user' | 'admin';
    plan: 'CORE' | 'PRIME' | 'APEX' | null;
    status: string;
    companyName?: string;
    companyInfo?: string;
    domainName?: string;
    sector?: string;
    linkedin?: string;
    instagram?: string;
    facebook?: string;
    outputEmails?: string[];
    bookingStatus?: string;
    // Legacy compat for existing components
    user_metadata: {
        full_name: string;
    };
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    signIn: (email: string, password: string) => Promise<User>;
    signUp: (email: string, password: string, name: string) => Promise<User>;
    signOut: () => Promise<void>;
    resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    loading: true,
    signIn: async () => { throw new Error('AuthProvider not found'); },
    signUp: async () => { throw new Error('AuthProvider not found'); },
    signOut: async () => { },
    resetPassword: async () => { },
});

/**
 * Transform backend user to our app's User format
 */
function transformUser(apiUser: any): User {
    return {
        id: apiUser.id || apiUser._id,
        email: apiUser.email,
        fullName: apiUser.fullName || 'User',
        role: apiUser.role || 'user',
        plan: apiUser.plan || 'CORE',
        status: apiUser.status || 'active',
        companyName: apiUser.companyName || '',
        companyInfo: apiUser.companyInfo || '',
        domainName: apiUser.domainName || '',
        sector: apiUser.sector || '',
        linkedin: apiUser.linkedin || '',
        instagram: apiUser.instagram || '',
        facebook: apiUser.facebook || '',
        outputEmails: apiUser.outputEmails || [],
        bookingStatus: apiUser.bookingStatus || 'active',
        user_metadata: {
            full_name: apiUser.fullName || 'User',
        },
    };
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    // Check for existing session on mount (JWT in localStorage)
    useEffect(() => {
        async function checkAuth() {
            if (!authApi.isAuthenticated()) {
                setLoading(false);
                return;
            }

            try {
                const res = await authApi.getMe();
                const appUser = transformUser(res.user);
                setUser(appUser);
                setSessionCookie();
            } catch {
                // Token expired or invalid — clear it
                authApi.signOut();
                clearSessionCookie();
            }
            setLoading(false);
        }

        // Safety timeout: if backend doesn't respond in 10s, stop loading
        const timeout = setTimeout(() => {
            if (loading) setLoading(false);
        }, 10000);

        checkAuth().finally(() => clearTimeout(timeout));
    }, []);

    const signIn = useCallback(async (email: string, password: string): Promise<User> => {
        try {
            const data = await authApi.signIn(email, password);
            const appUser = transformUser(data.user);
            setUser(appUser);
            setSessionCookie();
            return appUser;
        } catch (error: any) {
            console.error('🔐 AuthContext.signIn: FAILED -', error.message);
            throw error;
        }
    }, []);

    const signUp = useCallback(async (email: string, password: string, name: string): Promise<User> => {
        try {
            const data = await authApi.signUp(email, password, name);
            const appUser = transformUser(data.user);
            setUser(appUser);
            setSessionCookie();
            return appUser;
        } catch (error: any) {
            console.error('🔐 AuthContext.signUp: FAILED -', error.message);
            throw error;
        }
    }, []);

    const signOut = useCallback(async () => {
        try {
            authApi.signOut();
            setUser(null);
            clearSessionCookie();
            router.push('/');
        } catch (error: any) {
            console.error('🔐 AuthContext.signOut: FAILED -', error.message);
            throw error;
        }
    }, [router]);

    const resetPassword = useCallback(async (_email: string) => {
        // Password reset via email is not implemented in the local MongoDB backend
        // The user can change password via Settings page
        throw new Error('Password reset is available in Settings. Please log in first.');
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading, signIn, signUp, signOut, resetPassword }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
