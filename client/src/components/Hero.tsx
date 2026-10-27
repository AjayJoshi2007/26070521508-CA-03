"use client";

import { ArrowRight, Zap, TrendingUp, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { HERO_CONTENT, METRICS } from "@/lib/config";

export function Hero() {
  return (
    <section className="relative w-full overflow-hidden px-4 sm:px-6 pb-24 pt-32 lg:pt-48">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        {/* Global background handles blobs */}
      </div>

      <div className="mx-auto grid w-full gap-12 lg:grid-cols-2 lg:gap-12 relative z-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          className="flex flex-col justify-center space-y-8 text-center lg:text-left"
        >
          {/* OaaS Pioneer Badge - Sticky Note Style */}
          <motion.div
            initial={{ opacity: 0, rotate: -8 }}
            animate={{ opacity: 1, rotate: -3 }}
            transition={{ delay: 0.12, duration: 0.4 }}
            className="-rotate-3 bg-primary px-5 py-2.5 shadow-lg text-sm font-bold text-primary-foreground mb-6 transform hover:rotate-0 transition-transform cursor-default self-center lg:self-start inline-flex items-center gap-2"
            style={{ boxShadow: "4px 4px 0px rgba(0,0,0,0.15)" }}
          >
            <Sparkles size={14} className="text-primary-foreground/80" />
            <span>World&apos;s First OaaS Platform</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.55 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl font-heading font-extrabold tracking-tight text-foreground leading-[1.1]"
          >
            <span className="block text-foreground">{HERO_CONTENT.headline.split(',')[0]},</span>
            <span className="relative inline-block">
              <span className="text-foreground/40">
                {HERO_CONTENT.headline.split(',')[1].trim()}
              </span>
              <motion.svg
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{ delay: 0.55, duration: 0.45 }}
                className="absolute -bottom-2 left-0 h-3 w-full"
                viewBox="0 0 200 12"
                preserveAspectRatio="none"
              >
                <motion.path
                  d="M2 8 Q 100 2 198 8"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                  className="text-primary/40"
                />
              </motion.svg>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.55 }}
            className="text-lg text-foreground/70 max-w-lg mx-auto lg:mx-0 font-medium"
          >
            {HERO_CONTENT.subheadline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.55 }}
            className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start"
          >
            <Link href={HERO_CONTENT.cta.primary.href}>
              <button className="clay-button-primary flex items-center gap-2 px-8 py-4 text-lg font-bold font-heading group">
                {HERO_CONTENT.cta.primary.label}
                <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
          </motion.div>


        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto flex min-h-[400px] sm:min-h-[500px] w-full max-w-[600px] items-center justify-center lg:h-auto"
        >
          {/* Architectural Grid Background */}
          <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
                maskImage: 'radial-gradient(circle at center, black, transparent 80%)'
              }}
            />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
              className="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 border border-primary/[0.05] rounded-full"
            />
          </div>

          <div className="relative z-10 w-full flex items-center justify-center py-10 sm:py-20 scale-[0.85] sm:scale-100">
            {/* The Monolith - Central Premium Element */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
              className="relative group"
            >
              {/* Monolith Body */}
              <div className="relative w-64 h-80 bg-primary rounded-2xl shadow-[40px_60px_100px_-20px_rgba(0,0,0,0.5)] border border-white/20 overflow-hidden flex flex-col p-6">
                {/* Light reflection effect */}
                <motion.div
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
                  className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-12"
                  aria-hidden="true"
                />

                <div className="relative z-10 flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center border border-white/20">
                      <Zap size={18} className="text-white" />
                    </div>
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-2 py-1 text-[9px] font-black tracking-[0.14em] text-white/70 uppercase">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-60" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-300" />
                      </span>
                      System active
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div className="space-y-1">
                      <div className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/45">Autonomous workforce</div>
                      <div className="h-1 w-12 bg-white/20 rounded-full" />
                      <div className="text-3xl font-heading font-black text-white tracking-tighter">PREMIUM</div>
                      <div className="text-3xl font-heading font-black text-white tracking-tighter leading-none">AI OPS.</div>
                    </div>

                    <div className="grid grid-cols-2 gap-3 border-t border-white/10 pt-3">
                      <div className="space-y-1">
                        <div className="text-[8px] font-bold text-white/45 uppercase tracking-[0.14em]">{METRICS.efficiency.label}</div>
                        <div className="text-lg font-black text-white">{METRICS.efficiency.value}</div>
                      </div>
                      <div className="space-y-1">
                        <div className="text-[8px] font-bold text-white/45 uppercase tracking-[0.14em]">{METRICS.latency.label}</div>
                        <div className="text-lg font-black text-white">{METRICS.latency.value}</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Micro-interface details */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-white/5 overflow-hidden">
                  <motion.div
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{ duration: 1.3, repeat: Infinity, ease: "linear" }}
                    className="h-full w-1/3 bg-white/40"
                  />
                </div>
              </div>

              {/* Satellite Elements */}
              {/* 1. Precision Metric Overlay */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 }}
                className="hidden md:block absolute -right-12 top-10 bg-[#FAFAFA] border border-primary/10 p-4 rounded-xl shadow-2xl z-20 w-48"
                aria-hidden="true"
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-[10px] font-extrabold uppercase tracking-tighter text-foreground">Live Deployment</span>
                </div>
                <div className="flex items-end gap-1 h-8">
                  {[30, 60, 45, 90, 70, 85, 40, 95].map((h, i) => (
                    <motion.div
                      key={i}
                      initial={{ height: 0 }}
                      animate={{ height: `${h}%` }}
                      transition={{ delay: 0.2 + i * 0.015 }}
                      className="flex-1 bg-primary/20 rounded-t-[1px]"
                    />
                  ))}
                </div>
              </motion.div>

              {/* 2. Abstract Data Node */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -left-16 bottom-12 w-32 h-32 border border-primary/[0.15] border-dashed rounded-full flex items-center justify-center z-0"
                aria-hidden="true"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="w-20 h-20 border border-primary/10 rounded-full flex items-center justify-center"
                >
                  <div className="w-1.5 h-1.5 bg-primary rounded-full" />
                </motion.div>
              </motion.div>

              {/* 3. Minimalist Status Tag */}
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                className="absolute left-[-20%] top-20 bg-primary text-white px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] shadow-xl z-20 border border-white/20"
                aria-hidden="true"
              >
                Enterprise V1.0
              </motion.div>

              {/* Connecting Lines (Neural Web) */}
              <svg
                className="absolute inset-[-100px] w-[calc(100%+200px)] h-[calc(100%+200px)] pointer-events-none z-0 opacity-20"
                aria-hidden="true"
              >
                <motion.path
                  d="M 100 150 L 50 250 M 550 100 L 500 200 M 150 500 L 250 450"
                  stroke="var(--primary)"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.7, delay: 0.3 }}
                />
                <circle cx="100" cy="150" r="2" fill="var(--primary)" />
                <circle cx="550" cy="100" r="2" fill="var(--primary)" />
                <circle cx="150" cy="500" r="2" fill="var(--primary)" />
              </svg>
            </motion.div>

            {/* Orbital Circles */}
            <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[450px] h-[450px] border border-primary/[0.05] rounded-full" />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-primary/[0.03] rounded-full" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
