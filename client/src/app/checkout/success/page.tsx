"use client";

import { motion } from "framer-motion";
import { CheckCircle2, ChevronRight, ArrowLeft, Shield } from "lucide-react";
import Link from "next/link";
import { SoloChiefLogo } from "@/components/SoloChiefLogo";
import { Suspense } from "react";
import { useSearchParams } from "next/navigation";

function SuccessContent() {
    const searchParams = useSearchParams();
    const plan = searchParams.get("plan") || "your selected";

    return (
        <div className="min-h-screen bg-background font-sans transition-colors duration-300">
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute left-[-10%] top-[-10%] h-[60%] w-[60%] rounded-full bg-green-500/5 blur-[120px]"></div>
                <div className="absolute right-[-5%] bottom-[-10%] h-[60%] w-[60%] rounded-full bg-primary/5 blur-[120px]"></div>
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
                            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-green-500 via-green-400 to-primary" />

                            {/* Success Icon */}
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.2 }}
                                className="w-24 h-24 rounded-full bg-green-500/10 border-2 border-green-500/20 flex items-center justify-center"
                            >
                                <CheckCircle2 size={48} className="text-green-500" />
                            </motion.div>

                            {/* Main Message */}
                            <div className="space-y-4 max-w-md">
                                <motion.h1
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-2xl sm:text-3xl md:text-4xl font-heading font-black text-foreground"
                                >
                                    Payment Successful!
                                </motion.h1>
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-base text-foreground/60 font-medium leading-relaxed"
                                >
                                    Your <span className="text-foreground font-bold">{plan} Plan</span> has been activated.
                                    Your AI operators are now being calibrated to your business.
                                </motion.p>
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                    className="text-sm text-foreground/50 font-medium leading-relaxed"
                                >
                                    Operators will begin deployment within <span className="font-bold text-foreground">7 hours</span>.
                                    You&apos;ll receive a confirmation email shortly with your setup details.
                                </motion.p>
                            </div>

                            {/* Security Badge */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.6 }}
                                className="flex items-center gap-2 text-xs text-foreground/40 font-medium"
                            >
                                <Shield size={14} className="text-green-500" />
                                <span>Secured by Dodo Payments</span>
                            </motion.div>

                            {/* CTA Buttons */}
                            <motion.div
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.7 }}
                                className="flex flex-col sm:flex-row items-center gap-3 w-full max-w-sm"
                            >
                                <Link href="/dashboard" className="w-full">
                                    <button className="w-full clay-button-primary px-8 py-4 font-bold text-base flex items-center justify-center gap-2 group">
                                        Go to Dashboard <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </Link>
                            </motion.div>

                            <p className="text-[10px] text-foreground/30 font-bold">
                                Track your operator deployment progress from the dashboard
                            </p>
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

export default function CheckoutSuccessPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="animate-pulse text-foreground/40 font-medium">Loading...</div>
            </div>
        }>
            <SuccessContent />
        </Suspense>
    );
}
