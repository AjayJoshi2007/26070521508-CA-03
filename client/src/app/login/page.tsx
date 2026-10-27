"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { LogIn, UserPlus, Loader2, AlertCircle, KeyRound, Shield, Zap, Database, Sparkles } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { trackUserSignup, trackUserLogin } from "@/lib/posthog";

export default function LoginPage() {
    const router = useRouter();
    const { user, loading: authLoading, signIn, signUp, resetPassword } = useAuth();
    const [isLogin, setIsLogin] = useState(true);
    const [showForgotPassword, setShowForgotPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        name: "",
    });

    // If user is already logged in, redirect appropriately
    useEffect(() => {
        if (!authLoading && user) {
            if (user.role === "admin") {
                router.replace("/admin");
            } else {
                router.replace("/dashboard");
            }
        }
    }, [user, authLoading, router]);

    const handleQuickLogin = async (role: "admin" | "customer") => {
        setError("");
        setLoading(true);
        const email = role === "admin" ? "admin@solochief.com" : "alex@techstartup.io";
        const password = "admin123";
        setFormData({ email, password, name: "" });

        try {
            const res = await signIn(email, password);
            trackUserLogin(email);
            toast.success(`Welcome ${res.fullName}! Signed in as ${role === "admin" ? "Admin" : "Customer"}.`);
            if (res.role === "admin") {
                router.push("/admin");
            } else {
                router.push("/dashboard");
            }
        } catch (err: any) {
            console.error("Quick login error:", err);
            setError(err.message || "Failed to sign in. Please verify the local MongoDB backend is running on port 5000.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            if (showForgotPassword) {
                await resetPassword(formData.email);
                toast.success("Password reset email sent! Check your inbox.");
                setShowForgotPassword(false);
                setFormData({ email: "", password: "", name: "" });
            } else if (isLogin) {
                const res = await signIn(formData.email, formData.password);
                trackUserLogin(formData.email);
                toast.success(`Welcome back, ${res.fullName}!`);
                if (res.role === "admin") {
                    router.push("/admin");
                } else {
                    router.push("/dashboard");
                }
            } else {
                const res = await signUp(formData.email, formData.password, formData.name);
                trackUserSignup(formData.email);
                toast.success("Account created successfully! Welcome aboard! 🚀");
                if (res.role === "admin") {
                    router.push("/admin");
                } else {
                    router.push("/dashboard");
                }
            }
        } catch (err: any) {
            console.error("Authentication error:", err);
            setError(err.message || "An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    // Show loading spinner while checking initial auth state
    if (authLoading) {
        return (
            <div className="min-h-screen bg-background flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background transition-colors duration-300">
            <Header />
            <main className="pt-32 pb-20 px-4">
                <div className="mx-auto max-w-md">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="clay-card p-8"
                    >
                        {/* Header */}
                        <div className="text-center mb-8">
                            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                                {showForgotPassword ? (
                                    <KeyRound size={32} className="text-primary" />
                                ) : isLogin ? (
                                    <LogIn size={32} className="text-primary" />
                                ) : (
                                    <UserPlus size={32} className="text-primary" />
                                )}
                            </div>
                            <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                                {showForgotPassword
                                    ? "Reset Password"
                                    : isLogin
                                        ? "Welcome Back"
                                        : "Create Account"}
                            </h1>
                            <p className="text-foreground/60 font-medium">
                                {showForgotPassword
                                    ? "Enter your email to receive a reset link"
                                    : isLogin
                                        ? "Sign in to your SoloChief account"
                                        : "Start your AI workforce journey"}
                            </p>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="mb-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-start gap-3"
                            >
                                <AlertCircle size={20} className="text-red-500 flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                            </motion.div>
                        )}

                        {/* Test Accounts Quick Select (MongoDB Local) */}
                        {isLogin && !showForgotPassword && (
                            <div className="mb-6">
                                <div className="flex items-center gap-2 border-b border-foreground/10 pb-3">
                                    <div className="flex items-center gap-1.5">
                                        <Database size={14} className="text-primary" />
                                        <span className="text-xs font-bold uppercase tracking-wider text-primary">
                                            Local demo accounts
                                        </span>
                                    </div>
                                    <span className="ml-auto text-[10px] font-medium text-foreground/45">MongoDB</span>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-3">
                                    {/* Admin Test Button */}
                                    <button
                                        type="button"
                                        disabled={loading}
                                        onClick={() => handleQuickLogin("admin")}
                                        className="min-w-0 rounded-xl border border-foreground/10 bg-foreground/[0.025] p-3 text-left transition-colors hover:border-primary/30 hover:bg-primary/[0.04] disabled:opacity-50"
                                    >
                                        <div className="flex items-start gap-2.5">
                                            <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                                <Shield size={15} className="text-primary" />
                                            </span>
                                            <span className="min-w-0">
                                                <span className="block text-xs font-bold text-foreground">Admin Portal</span>
                                                <span className="mt-1 block truncate text-[10px] text-foreground/50">admin@solochief.com</span>
                                            </span>
                                        </div>
                                        <span className="mt-2 block pl-[42px] text-[10px] font-semibold text-primary">Admin &amp; analytics</span>
                                    </button>

                                    {/* Customer Test Button */}
                                    <button
                                        type="button"
                                        disabled={loading}
                                        onClick={() => handleQuickLogin("customer")}
                                        className="min-w-0 rounded-xl border border-foreground/10 bg-foreground/[0.025] p-3 text-left transition-colors hover:border-primary/30 hover:bg-primary/[0.04] disabled:opacity-50"
                                    >
                                        <div className="flex items-start gap-2.5">
                                            <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10">
                                                <Zap size={15} className="text-primary" />
                                            </span>
                                            <span className="min-w-0">
                                                <span className="block text-xs font-bold text-foreground">Customer App</span>
                                                <span className="mt-1 block truncate text-[10px] text-foreground/50">alex@techstartup.io</span>
                                            </span>
                                        </div>
                                        <span className="mt-2 block pl-[42px] text-[10px] font-semibold text-primary">Alex Chen · APEX</span>
                                    </button>
                                </div>

                                <div className="pt-2.5 text-[10px] text-foreground/45">
                                    Demo password: <strong className="font-semibold text-foreground/65">admin123</strong>
                                </div>
                            </div>
                        )}

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Full Name - Only for sign up */}
                            {!isLogin && !showForgotPassword && (
                                <div>
                                    <label className="block text-sm font-semibold text-foreground mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={formData.name}
                                        onChange={(e) =>
                                            setFormData({ ...formData, name: e.target.value })
                                        }
                                        className="w-full px-4 py-3 rounded-xl bg-foreground/5 border border-foreground/10 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                        placeholder="John Doe"
                                    />
                                </div>
                            )}

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-semibold text-foreground mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) =>
                                        setFormData({ ...formData, email: e.target.value })
                                    }
                                    className="w-full px-4 py-3 rounded-xl bg-foreground/5 border border-foreground/10 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                    placeholder="you@example.com"
                                />
                            </div>

                            {/* Password - Not for forgot password */}
                            {!showForgotPassword && (
                                <div>
                                    <label className="block text-sm font-semibold text-foreground mb-2">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        required
                                        value={formData.password}
                                        onChange={(e) =>
                                            setFormData({ ...formData, password: e.target.value })
                                        }
                                        className="w-full px-4 py-3 rounded-xl bg-foreground/5 border border-foreground/10 text-foreground placeholder:text-foreground/40 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                                        placeholder="••••••••"
                                        minLength={6}
                                    />
                                </div>
                            )}

                            {/* Forgot Password Link (only on login) */}
                            {isLogin && !showForgotPassword && (
                                <div className="text-right">
                                    <button
                                        type="button"
                                        onClick={() => {
                                            setShowForgotPassword(true);
                                            setError("");
                                        }}
                                        className="text-sm text-primary hover:text-primary/80 font-medium transition-colors"
                                    >
                                        Forgot Password?
                                    </button>
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={loading}
                                className="clay-button-primary w-full py-3 font-semibold font-heading flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        {showForgotPassword
                                            ? "Sending Reset Link..."
                                            : isLogin
                                                ? "Signing In..."
                                                : "Creating Account..."}
                                    </>
                                ) : (
                                    <>
                                        {showForgotPassword ? (
                                            <>
                                                <KeyRound size={20} />
                                                Send Reset Link
                                            </>
                                        ) : isLogin ? (
                                            <>
                                                <LogIn size={20} />
                                                Sign In
                                            </>
                                        ) : (
                                            <>
                                                <UserPlus size={20} />
                                                Create Account
                                            </>
                                        )}
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Toggle / Back */}
                        <div className="mt-6 text-center">
                            {showForgotPassword ? (
                                <button
                                    onClick={() => {
                                        setShowForgotPassword(false);
                                        setError("");
                                    }}
                                    className="text-sm text-foreground/60 hover:text-foreground font-medium transition-colors"
                                >
                                    ← Back to{" "}
                                    <span className="text-primary font-semibold">Sign In</span>
                                </button>
                            ) : (
                                <button
                                    onClick={() => {
                                        setIsLogin(!isLogin);
                                        setError("");
                                    }}
                                    className="text-sm text-foreground/60 hover:text-foreground font-medium transition-colors"
                                >
                                    {isLogin ? (
                                        <>
                                            Don&apos;t have an account?{" "}
                                            <span className="text-primary font-semibold">Sign Up</span>
                                        </>
                                    ) : (
                                        <>
                                            Already have an account?{" "}
                                            <span className="text-primary font-semibold">Sign In</span>
                                        </>
                                    )}
                                </button>
                            )}
                        </div>
                    </motion.div>

                    {/* Info */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                        className="mt-8 text-center"
                    >
                        <p className="text-sm text-foreground/60">
                            By continuing, you agree to our{" "}
                            <a href="/terms" className="text-primary hover:underline">
                                Terms of Service
                            </a>{" "}
                            and{" "}
                            <a href="/privacy" className="text-primary hover:underline">
                                Privacy Policy
                            </a>
                        </p>
                    </motion.div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
