'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Search, ArrowLeft, AlertCircle } from 'lucide-react';

export default function NotFound() {
    return (
        <div className="min-h-screen bg-background relative overflow-hidden flex items-center justify-center p-4">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute top-20 left-10 w-64 h-64 bg-primary/5 rounded-full blur-3xl"
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
                    className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
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
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-ring/5 rounded-full blur-3xl"
                    animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 180, 360],
                    }}
                    transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
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
                                    rotate: [0, 10, -10, 0],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                                className="w-32 h-32 md:w-40 md:h-40 bg-destructive/10 rounded-full flex items-center justify-center"
                            >
                                <AlertCircle className="w-16 h-16 md:w-20 md:h-20 text-destructive" />
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

                    {/* 404 Text */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="mb-6"
                    >
                        <h1 className="text-8xl md:text-9xl font-bold text-gradient-premium mb-2">
                            404
                        </h1>
                        <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-primary to-transparent rounded-full" />
                    </motion.div>

                    {/* Error Message */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.5 }}
                        className="mb-8"
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                            Page Not Found
                        </h2>
                        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                            Oops! The page you're looking for seems to have wandered off into the digital void.
                            Our AI operators are searching for it, but in the meantime, let's get you back on track.
                        </p>
                    </motion.div>

                    {/* Suggestions */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5, duration: 0.5 }}
                        className="mb-10"
                    >
                        <p className="text-sm text-muted-foreground mb-4">
                            Here are some helpful links instead:
                        </p>
                        <div className="flex flex-wrap gap-3 justify-center">
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 px-4 py-2 clay-card hover:scale-105 transition-transform text-sm font-medium"
                            >
                                <Home className="w-4 h-4" />
                                Home
                            </Link>
                            <Link
                                href="/operators"
                                className="inline-flex items-center gap-2 px-4 py-2 clay-card hover:scale-105 transition-transform text-sm font-medium"
                            >
                                <Search className="w-4 h-4" />
                                Operators
                            </Link>
                            <Link
                                href="/book"
                                className="inline-flex items-center gap-2 px-4 py-2 clay-card hover:scale-105 transition-transform text-sm font-medium"
                            >
                                <Search className="w-4 h-4" />
                                Book Now
                            </Link>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-2 px-4 py-2 clay-card hover:scale-105 transition-transform text-sm font-medium"
                            >
                                <Search className="w-4 h-4" />
                                Contact
                            </Link>
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
                        <Link
                            href="/"
                            className="clay-button-primary px-8 py-4 font-semibold text-base inline-flex items-center gap-2 group"
                        >
                            <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            Back to Home
                        </Link>
                    </motion.div>

                    {/* Fun Message */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.5 }}
                        className="mt-12 pt-8 border-t border-border/50"
                    >
                        <p className="text-sm text-muted-foreground italic">
                            💡 Pro tip: Our AI operators never get lost. Maybe it's time to let them handle your navigation too?
                        </p>
                    </motion.div>
                </motion.div>

                {/* Floating Elements */}
                <motion.div
                    animate={{
                        y: [0, -20, 0],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                    }}
                    className="absolute -top-10 -left-10 w-20 h-20 bg-primary/10 rounded-2xl rotate-12 blur-sm hidden lg:block"
                />
                <motion.div
                    animate={{
                        y: [0, 20, 0],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: 0.5,
                    }}
                    className="absolute -bottom-10 -right-10 w-24 h-24 bg-accent/10 rounded-2xl -rotate-12 blur-sm hidden lg:block"
                />
            </div>
        </div>
    );
}
