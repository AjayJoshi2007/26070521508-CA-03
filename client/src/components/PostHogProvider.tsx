'use client';

import { Suspense, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { initPostHog, trackPageView } from '@/lib/posthog';

function PostHogTracker({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        // Initialize PostHog on mount
        initPostHog();
    }, []);

    useEffect(() => {
        // Track page views on route change
        if (pathname) {
            trackPageView(pathname);
        }
    }, [pathname, searchParams]);

    return <>{children}</>;
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
    return (
        <Suspense fallback={null}>
            <PostHogTracker>{children}</PostHogTracker>
        </Suspense>
    );
}
