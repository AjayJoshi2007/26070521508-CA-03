'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home, Bug, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Application Error:', error);
    }, [error]);

    return (
        <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center p-4">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-20 left-10 w-64 h-64 bg-destructive/5 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.3, 0.5, 0.3],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute bottom-20 right-10 w-96 h-96 bg-destructive/10 rounded-full blur-3xl"
                    animate={{
                        scale: [1.2, 1, 1.2],
                        opacity: [0.4, 0.6, 0.4],
                    }}
                    transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                />
            </div>

            {/* Main Content */}
            <div className="relative z-10 max-w-4xl w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="clay-card p-8 md:p-12 lg:p-16 text-center"
                >
                    {/* Animated Icon */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                            type: "spring",
                            stiffness: 200,
                            damping: 15,
                            delay: 0.2,
                        }}
                        className="mb-8 flex justify-center"
                    >
                        <div className="relative">
                            <motion.div
                                animate={{
                                    rotate: [0, 5, -5, 0],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="w-32 h-32 md:w-40 md:h-40 bg-destructive/10 rounded-full flex items-center justify-center"
                            >
                                <AlertTriangle className="w-16 h-16 md:w-20 md:h-20 text-destructive" />
                            </motion.div>

                            {/* Pulsing Ring */}
                            <motion.div
                                animate={{
                                    scale: [1, 1.3, 1],
                                    opacity: [0.5, 0, 0.5],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeOut",
                                }}
                                className="absolute inset-0 border-4 border-destructive/30 rounded-full"
                            />
                        </div>
                    </motion.div>

                    {/* Error Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="mb-6"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
                            Oops! Something Went Wrong
                        </h1>
                        <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-destructive to-transparent rounded-full" />
                    </motion.div>

                    {/* Error Message */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="mb-8"
                    >
                        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
                            Don't worry! Even our AI operators encounter unexpected situations sometimes.
                            We've logged this error and our team will investigate.
                        </p>

                        {/* Error Details (Development Only) */}
                        {process.env.NODE_ENV === 'development' && (
                            <details className="mt-6 text-left">
                                <summary className="cursor-pointer text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors mb-2">
                                    <Bug className="w-4 h-4 inline mr-2" />
                                    Technical Details (Development Mode)
                                </summary>
                                <div className="mt-4 p-4 bg-muted/50 rounded-lg border border-border">
                                    <p className="text-sm font-mono text-destructive break-all">
                                        {error.message}
                                    </p>
                                    {error.digest && (
                                        <p className="text-xs text-muted-foreground mt-2">
                                            Error ID: {error.digest}
                                        </p>
                                    )}
                                    {error.stack && (
                                        <pre className="mt-4 text-xs text-muted-foreground overflow-x-auto max-h-40">
                                            {error.stack}
                                        </pre>
                                    )}
                                </div>
                            </details>
                        )}
                    </motion.div>

                    {/* What You Can Do */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="mb-10"
                    >
                        <h3 className="text-lg font-semibold text-foreground mb-4">
                            What you can do:
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
                            <div className="clay-card p-4 text-left">
                                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                                    <RefreshCw className="w-5 h-5 text-primary" />
                                </div>
                                <h4 className="font-semibold text-sm mb-2">Try Again</h4>
                                <p className="text-xs text-muted-foreground">
                                    Click the button below to retry the action
                                </p>
                            </div>

                            <div className="clay-card p-4 text-left">
                                <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center mb-3">
                                    <Home className="w-5 h-5 text-accent-foreground" />
                                </div>
                                <h4 className="font-semibold text-sm mb-2">Go Home</h4>
                                <p className="text-xs text-muted-foreground">
                                    Return to the homepage and start fresh
                                </p>
                            </div>

                            <div className="clay-card p-4 text-left">
                                <div className="w-10 h-10 bg-ring/10 rounded-lg flex items-center justify-center mb-3">
                                    <Bug className="w-5 h-5 text-ring" />
                                </div>
                                <h4 className="font-semibold text-sm mb-2">Report Issue</h4>
                                <p className="text-xs text-muted-foreground">
                                    Contact our support team if this persists
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Action Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.5 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                    >
                        <button
                            onClick={() => window.history.back()}
                            className="clay-button-secondary px-8 py-4 font-semibold text-base inline-flex items-center gap-2 group"
                        >
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                            Go Back
                        </button>
                        <button
                            onClick={reset}
                            className="clay-button-primary px-8 py-4 font-semibold text-base inline-flex items-center gap-2 group"
                        >
                            <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                            Try Again
                        </button>
                        <Link
                            href="/"
                            className="clay-button-secondary px-8 py-4 font-semibold text-base inline-flex items-center gap-2 group"
                        >
                            <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            Back to Home
                        </Link>
                    </motion.div>

                    {/* Support Link */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                        className="mt-12 pt-8 border-t border-border/50"
                    >
                        <p className="text-sm text-muted-foreground">
                            Still having issues?{' '}
                            <Link href="/contact" className="text-primary hover:underline font-semibold">
                                Contact our support team
                            </Link>
                        </p>
                    </motion.div>
                </motion.div>

                {/* Floating Elements */}
                <motion.div
                    animate={{
                        y: [0, -20, 0],
                        rotate: [0, 10, 0],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute -top-10 -left-10 w-20 h-20 bg-destructive/10 rounded-2xl blur-sm hidden lg:block"
                />
                <motion.div
                    animate={{
                        y: [0, 20, 0],
                        rotate: [0, -10, 0],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5,
                    }}
                    className="absolute -bottom-10 -right-10 w-24 h-24 bg-destructive/10 rounded-2xl blur-sm hidden lg:block"
                />
            </div>
        </div>
    );
}
