"use client";

import { motion } from "framer-motion";

function FloatingShape({ className, delay = 0 }: { className?: string; delay?: number }) {
    return (
        <motion.div
            animate={{
                y: [0, -20, 0],
                rotate: [0, 5, -5, 0],
            }}
            transition={{
                duration: 6,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
                delay: delay,
            }}
            className={`absolute pointer-events-none opacity-20 ${className}`}
        />
    );
}

export function GlobalBackground() {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Primary Blob */}
            <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[120px] -translate-x-1/4 -translate-y-1/4" />

            {/* Secondary Blob */}
            <div className="absolute bottom-0 right-0 w-[800px] h-[800px] bg-secondary/5 rounded-full blur-[120px] translate-x-1/4 translate-y-1/4" />

            {/* Accent Blob */}
            <div className="absolute top-1/2 left-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2" />

            {/* Floating Shapes for Extra Dynamics */}
            <FloatingShape
                className="w-64 h-64 rounded-full bg-gradient-to-br from-primary/10 to-transparent top-[10%] left-[10%]"
                delay={0}
            />
            <FloatingShape
                className="w-96 h-96 rounded-[3rem] bg-gradient-to-tr from-secondary/10 to-transparent bottom-[10%] right-[5%] rotate-12"
                delay={2}
            />
            <FloatingShape
                className="w-48 h-48 rounded-full bg-gradient-to-bl from-accent/10 to-transparent top-[40%] right-[20%]"
                delay={4}
            />
        </div>
    );
}
