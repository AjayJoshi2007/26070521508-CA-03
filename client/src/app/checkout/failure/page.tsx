"use client";

import { motion } from "framer-motion";
import { XCircle, ArrowLeft, RotateCcw, MessageCircle } from "lucide-react";
import Link from "next/link";
import { SoloChiefLogo } from "@/components/SoloChiefLogo";

export default function CheckoutFailurePage() {
    return (
        <div className="min-h-screen bg-background font-sans transition-colors duration-300">
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute left-[-10%] top-[-10%] h-[60%] w-[60%] rounded-full bg-red-500/5 blur-[120px]"></div>
                <div className="absolute right-[-5%] bottom-[-10%] h-[60%] w-[60%] rounded-full bg-foreground/5 blur-[120px]"></div>
            </div>

            <div className="relative z-10 flex flex-col min-h-screen">
                {/* Minimal top bar */}
                <div className="w-full px-4 sm:px-6 py-6">
                    <div className="mx-auto max-w-4xl flex items-center justify-between">
                        <Link
                            href="/"
                            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
                        >
                            <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                            <span className="text-sm font-medium">Back to Home</span>
                        </Link>
                        <Link href="/" className="flex items-center gap-2 group">
                            <SoloChiefLogo size={32} className="group-hover:scale-105 transition-transform duration-300" />
                            <span className="text-lg font-heading font-bold tracking-tight text-foreground">SoloChief</span>
                        </Link>
                    </div>
                </div>

                <main className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 pb-16">
                    <div className="mx-auto w-full max-w-2xl">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                            className="clay-card p-6 sm:p-10 md:p-12 text-center flex flex-col items-center gap-6 border-foreground/10 shadow-3xl bg-background relative overflow-hidden"
                        >
                            {/* Top accent bar */}
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-red-500 via-red-400 to-red-300" />

                            {/* Failure Icon */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                                className="w-24 h-24 rounded-full bg-red-500/10 border-2 border-red-500/20 flex items-center justify-center"
                            >
                                <XCircle size={48} className="text-red-500" />
                            </motion.div>

                            {/* Main Message */}
                            <div className="space-y-4 max-w-md">
                                <motion.h1
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-2xl sm:text-3xl md:text-4xl font-heading font-black text-foreground"
                                >
                                    Payment Failed
                                </motion.h1>
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-base text-foreground/60 font-medium leading-relaxed"
                                >
                                    Your payment could not be processed. This could be due to insufficient funds,
                                    an expired card, or a temporary network issue.
                                </motion.p>
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="text-sm text-foreground/50 font-medium leading-relaxed"
                                >
                                    Don&apos;t worry — no charges were made. You can try again or contact our support team for help.
                                </motion.p>
                            </div>

                            {/* CTA Buttons */}
                            <motion.div
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-md"
                            >
                                <Link href="/pricing" className="w-full">
                                    <button className="w-full clay-button-primary px-8 py-4 font-bold text-base flex items-center justify-center gap-2 group">
                                        <RotateCcw size={18} />
                                        Try Again
                                    </button>
                                </Link>
                                <Link href="/contact" className="w-full">
                                    <button className="w-full py-4 px-6 border-2 border-foreground/10 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-foreground/5 transition-colors flex items-center justify-center gap-2">
                                        <MessageCircle size={16} />
                                        Contact Support
                                    </button>
                                </Link>
                            </motion.div>
                        </motion.div>
                    </div>
                </main>

                <div className="w-full px-4 sm:px-6 py-6 text-center text-sm text-muted-foreground">
                    © {new Date().getFullYear()} SoloChief. All rights reserved.
                </div>
            </div>
        </div>
    );
}
