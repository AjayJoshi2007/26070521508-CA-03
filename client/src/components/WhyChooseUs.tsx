"use client";

import { motion } from "framer-motion";
import { Zap, Shield, Sparkles, Target, CheckCircle2 } from "lucide-react";

export function WhyChooseUs() {
  return (
    <section className="relative w-full overflow-hidden py-20">
      {/* Background handled globally */}

      <div className="relative z-10 mx-auto grid w-full items-center gap-12 px-4 sm:px-6 lg:gap-16 lg:grid-cols-2 max-w-7xl lg:px-8">
        {/* Text Content - Left Side */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.12 }}
          className="flex flex-col items-start text-left"
        >
          <motion.div
            initial={{ opacity: 0, rotate: -8 }}
            whileInView={{ opacity: 1, rotate: -3 }}
            viewport={{ once: true }}
            transition={{ delay: 0.01, duration: 0.08 }}
            className="-rotate-3 bg-primary px-4 py-2 shadow-lg text-sm font-bold text-primary-foreground mb-6 transform hover:rotate-0 transition-transform cursor-default self-start inline-block"
            style={{ boxShadow: "4px 4px 0px rgba(0,0,0,0.15)" }}
          >
            Why Trust SoloChief
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.03, duration: 0.12 }}
            className="text-4xl font-heading font-black tracking-tight text-foreground mb-6"
          >
            Reliability, <span className="text-foreground/40 underline decoration-foreground/20 underline-offset-8">Not Just Hype</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.06, duration: 0.12 }}
            className="max-w-xl text-lg leading-relaxed text-foreground/70 font-medium"
          >
            We don&apos;t just sell software — we deploy a workforce. Our agents combine 24/7 autonomy with strategic execution to deliver the daily consistency that actually grows your revenue. No management, just results.
          </motion.p>

          <motion.ul
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08, duration: 0.12 }}
            className="mt-6 space-y-3"
          >
            {["Autonomous daily execution", "Consistent revenue growth", "Zero management required"].map((item, i) => (
              <li key={i} className="flex items-center gap-3 text-foreground/70 font-bold">
                <CheckCircle2 size={18} className="text-foreground flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Visual - Right Side */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.12 }}
          className="flex h-[500px] w-full items-center justify-center"
        >
          <div className="relative aspect-square w-full max-w-md perspective-1000">
            {/* Main Success Dashboard */}
            <motion.div
              animate={{ rotate: [0, -0.5, 0, 0.5, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, ease: "linear" }}
              className="clay-card absolute bottom-6 left-4 right-4 z-10 flex h-48 flex-col rounded-[2rem] border-l-4 border-l-primary/50 bg-background/50 backdrop-blur-md p-4 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-500"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-foreground uppercase tracking-wider">Performance</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-bold">Optimal</span>
              </div>
              <div className="flex gap-3 mb-3">
                <div className="flex-1 rounded-xl bg-foreground/5 p-2 text-center border border-foreground/5">
                  <Zap size={16} className="text-foreground mx-auto mb-1 opacity-70" />
                  <span className="text-[10px] text-foreground font-bold block">+89%</span>
                  <span className="text-[8px] text-foreground/50 font-bold uppercase tracking-tighter">Speed</span>
                </div>
                <div className="flex-1 rounded-xl bg-foreground/5 p-2 text-center border border-foreground/5">
                  <Shield size={16} className="text-foreground mx-auto mb-1 opacity-70" />
                  <span className="text-[10px] text-foreground font-bold block">99.9%</span>
                  <span className="text-[8px] text-foreground/50 font-bold uppercase tracking-tighter">Uptime</span>
                </div>
                <div className="flex-1 rounded-xl bg-foreground/5 p-2 text-center border border-foreground/5">
                  <Target size={16} className="text-foreground mx-auto mb-1 opacity-70" />
                  <span className="text-[10px] text-foreground font-bold block">3.2x</span>
                  <span className="text-[8px] text-foreground/50 font-bold uppercase tracking-tighter">ROI</span>
                </div>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-foreground/10">
                <motion.div
                  initial={{ width: "0%" }}
                  whileInView={{ width: "92%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
                  className="h-full bg-primary/60"
                />
              </div>
              <span className="text-[9px] text-foreground/70 mt-1.5 text-center font-bold uppercase tracking-widest">System Running Smoothly</span>
            </motion.div>

            {/* Success Block */}
            <motion.div
              animate={{ y: [0, -8, 0], rotate: [-3, -5, -3] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.1 }}
              className="clay-card absolute bottom-52 left-6 right-12 z-20 flex h-24 -rotate-[3deg] flex-col items-center justify-center gap-2 rounded-[1.5rem] border-t border-t-white/30 bg-background/60 shadow-xl backdrop-blur-md hover:rotate-0 transition-transform"
            >
              <div className="flex gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground/5 border border-foreground/5">
                  <Sparkles size={20} className="text-foreground/60" />
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground/5 border border-foreground/5">
                  <Zap size={20} className="text-foreground/60" />
                </div>
              </div>
              <span className="text-xs font-bold text-foreground/40 uppercase tracking-widest">AI-Powered Excellence</span>
            </motion.div>

            {/* Success badge */}
            <motion.div
              animate={{ y: [0, -10, 0], rotate: [8, 12, 8], scale: [1, 1.05, 1] }}
              transition={{ duration: 2.3, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
              className="clay-card absolute right-8 top-12 z-30 flex h-24 w-24 rotate-[8deg] flex-col items-center justify-center rounded-2xl bg-background/60 shadow-2xl border border-primary/10 hover:scale-110 transition-transform"
            >
              <CheckCircle2 size={28} strokeWidth={2.5} className="mb-1 text-primary" />
              <span className="text-xs font-black uppercase tracking-tighter text-primary">SUCCESS</span>
              <span className="text-[10px] font-bold text-foreground text-center leading-3">All tasks completed</span>
            </motion.div>

            {/* Floating metric */}
            <motion.div
              animate={{ y: [0, -20, 0], x: [0, 8, 0], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
              className="clay-card absolute left-8 top-24 z-20 flex h-16 w-16 -rotate-6 flex-col items-center justify-center rounded-xl border border-foreground/5 bg-background shadow-lg hover:rotate-0 transition-transform"
            >
              <span className="text-lg font-black text-foreground">A+</span>
              <span className="text-[9px] text-foreground font-bold uppercase tracking-tighter">Grade</span>
            </motion.div>

            {/* Trust indicator */}
            <motion.div
              animate={{ y: [0, 12, 0], x: [0, -6, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
              className="clay-card absolute bottom-40 right-2 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-background border border-foreground/10 shadow-lg"
            >
              <Shield size={20} className="text-foreground/60" />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
