'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from 'lucide-react';

export default function GlobalError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error('Global Application Error:', error);
    }, [error]);

    return (
        <html>
            <body>
                <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden flex items-center justify-center p-4">
                    {/* Animated Background */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <motion.div
                            className="absolute top-20 left-10 w-64 h-64 bg-red-500/10 rounded-full blur-3xl"
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
                            className="absolute bottom-20 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"
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
                    <div className="relative z-10 max-w-2xl w-full">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="bg-[#FAFAFA]/90 dark:bg-gray-800/90 backdrop-blur-xl rounded-3xl shadow-2xl p-8 md:p-12 text-center border border-gray-200/50 dark:border-gray-700/50"
                        >
                            {/* Icon */}
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
                                    <div className="w-32 h-32 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                                        <AlertTriangle className="w-16 h-16 text-red-600 dark:text-red-400" />
                                    </div>

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
                                        className="absolute inset-0 border-4 border-red-500/30 rounded-full"
                                    />
                                </div>
                            </motion.div>

                            {/* Title */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                className="mb-6"
                            >
                                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                                    Critical Error
                                </h1>
                                <div className="h-1 w-32 mx-auto bg-gradient-to-r from-transparent via-red-500 to-transparent rounded-full" />
                            </motion.div>

                            {/* Message */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.5 }}
                                className="mb-8"
                            >
                                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-xl mx-auto">
                                    We encountered a critical error. Our team has been notified and is working to resolve this issue.
                                </p>
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
                                    className="px-8 py-4 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2 group border border-gray-300 dark:border-gray-600"
                                >
                                    <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                                    Go Back
                                </button>
                                <button
                                    onClick={reset}
                                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2 group"
                                >
                                    <RefreshCw className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                                    Try Again
                                </button>
                                <a
                                    href="/"
                                    className="px-8 py-4 bg-[#FAFAFA] dark:bg-gray-700 text-gray-900 dark:text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 inline-flex items-center gap-2 group border border-gray-200 dark:border-gray-600"
                                >
                                    <Home className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                    Back to Home
                                </a>
                            </motion.div>

                            {/* Error Details */}
                            {process.env.NODE_ENV === 'development' && (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.8, duration: 0.5 }}
                                    className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700"
                                >
                                    <details className="text-left">
                                        <summary className="cursor-pointer text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                                            Technical Details (Development Mode)
                                        </summary>
                                        <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-900 rounded-lg">
                                            <p className="text-sm font-mono text-red-600 dark:text-red-400 break-all">
                                                {error.message}
                                            </p>
                                            {error.digest && (
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                                                    Error ID: {error.digest}
                                                </p>
                                            )}
                                        </div>
                                    </details>
                                </motion.div>
                            )}
                        </motion.div>
                    </div>
                </div>
            </body>
        </html>
    );
}