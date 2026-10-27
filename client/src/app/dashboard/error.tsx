'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

/**
 * Dashboard-specific error boundary.
 * Catches errors inside dashboard routes without losing the entire app layout.
 * Provides dashboard-themed recovery UI instead of a full-page crash.
 */
export default function DashboardError({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        console.error('Dashboard Error:', error);
    }, [error]);

    return (
        <div className="flex-1 flex items-center justify-center p-8" style={{ background: "oklch(0.96 0.015 185)" }}>
            <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-lg"
            >
                <div
                    className="rounded-[24px] p-8 md:p-10 text-center relative overflow-hidden"
                    style={{
                        background: "rgba(255,255,255,0.75)",
                        backdropFilter: "blur(24px)",
                        border: "1.5px solid oklch(0.90 0.04 185)",
                        boxShadow: "0 8px 32px rgba(32,50,60,0.08)",
                    }}
                >
                    {/* Icon */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.15 }}
                        className="mb-6 flex justify-center"
                    >
                        <div className="w-20 h-20 rounded-[18px] flex items-center justify-center" style={{ background: "oklch(0.95 0.06 15)" }}>
                            <AlertTriangle size={36} style={{ color: "oklch(0.55 0.20 15)" }} />
                        </div>
                    </motion.div>

                    <h2 className="text-xl font-black mb-2" style={{ color: "oklch(0.18 0.08 193)" }}>
                        Something went wrong
                    </h2>
                    <p className="text-[13px] font-medium mb-6" style={{ color: "oklch(0.55 0.08 185)" }}>
                        An unexpected error occurred in your dashboard. This is usually temporary.
                    </p>

                    {/* Dev-only error details */}
                    {process.env.NODE_ENV === 'development' && (
                        <details className="mb-6 text-left">
                            <summary className="cursor-pointer text-[11px] font-bold uppercase tracking-wider" style={{ color: "oklch(0.55 0.08 185)" }}>
                                Error Details
                            </summary>
                            <div className="mt-2 p-3 rounded-[12px] text-[11px] font-mono break-all" style={{ background: "oklch(0.97 0.01 185)", border: "1px solid oklch(0.92 0.04 185)", color: "oklch(0.55 0.20 15)" }}>
                                {error.message}
                                {error.digest && <p className="mt-1 opacity-60">Digest: {error.digest}</p>}
                            </div>
                        </details>
                    )}

                    {/* Actions */}
                    <div className="flex flex-wrap items-center justify-center gap-3">
                        <button
                            onClick={() => window.history.back()}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-[12px] text-[13px] font-bold transition-all hover:opacity-80"
                            style={{ background: "oklch(0.93 0.04 185)", color: "oklch(0.30 0.07 190)" }}
                        >
                            <ArrowLeft size={14} />
                            Go Back
                        </button>
                        <button
                            onClick={reset}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-[12px] text-[13px] font-bold text-white transition-all hover:opacity-90"
                            style={{ background: "oklch(0.30 0.07 190)" }}
                        >
                            <RefreshCw size={14} />
                            Try Again
                        </button>
                        <Link
                            href="/"
                            className="flex items-center gap-2 px-5 py-2.5 rounded-[12px] text-[13px] font-bold transition-all hover:opacity-80"
                            style={{ background: "oklch(0.93 0.04 185)", color: "oklch(0.30 0.07 190)" }}
                        >
                            <Home size={14} />
                            Home
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
