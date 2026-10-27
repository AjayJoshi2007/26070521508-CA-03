'use client';

import { AnimatedSoloChiefLogo } from '@/components/AnimatedSoloChiefLogo';

/**
 * Dashboard loading state — shown while the dashboard layout + page hydrate.
 * Prevents hydration crashes from showing as Internal Server Errors.
 */
export default function DashboardLoading() {
    return (
        <div className="min-h-screen flex items-center justify-center" style={{ background: "oklch(0.96 0.015 185)" }}>
            <div className="flex flex-col items-center gap-5">
                <AnimatedSoloChiefLogo size={64} animate={true} loop={true} />
                <p className="text-sm font-medium" style={{ color: "oklch(0.55 0.08 185)" }}>Loading dashboard…</p>
            </div>
        </div>
    );
}
