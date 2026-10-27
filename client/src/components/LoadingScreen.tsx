'use client';

import { AnimatedSoloChiefLogo } from '@/components/AnimatedSoloChiefLogo';
import { useEffect } from 'react';

/**
 * Shared loading screen — blurs the underlying page and shows the logo.
 * No frosted glass overlay. The actual page content gets blurred.
 */
export function LoadingScreen() {
    useEffect(() => {
        const main = document.getElementById('main-content');
        if (main) {
            main.style.transition = 'filter 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
            main.style.filter = 'blur(12px) saturate(0.7)';
            main.style.pointerEvents = 'none';
        }
        return () => {
            if (main) {
                main.style.transition = 'filter 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
                main.style.filter = '';
                main.style.pointerEvents = '';
            }
        };
    }, []);

    return (
        <div className="fixed inset-0 z-[9998] flex items-center justify-center pointer-events-none">
            <div style={{
                animation: 'loadingEnter 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
            }}>
                <AnimatedSoloChiefLogo size={80} animate={true} loop={true} />
            </div>

            <style>{`
                @keyframes loadingEnter {
                    0% {
                        opacity: 0;
                        transform: scale(0.7) translateY(10px);
                    }
                    100% {
                        opacity: 1;
                        transform: scale(1) translateY(0);
                    }
                }
            `}</style>
        </div>
    );
}
