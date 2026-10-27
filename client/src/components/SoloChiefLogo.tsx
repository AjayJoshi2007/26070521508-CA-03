"use client";

import { AnimatedSoloChiefLogo } from "@/components/AnimatedSoloChiefLogo";

interface SoloChiefLogoProps {
    size?: number;
    className?: string;
    animate?: boolean;
}

export function SoloChiefLogo({ size = 40, className = "", animate = true }: SoloChiefLogoProps) {
    return (
        <AnimatedSoloChiefLogo
            size={size}
            className={className}
            animate={animate}
        />
    );
}
