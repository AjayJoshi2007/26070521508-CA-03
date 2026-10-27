"use client";

import { motion } from "framer-motion";
import { Activity, XCircle, ZapOff, AlertTriangle, TrendingDown, Clock, DollarSign } from "lucide-react";

export function PainSection() {
  return (
    <section className="relative w-full overflow-hidden py-20">
      {/* Background handled globally */}

      <div className="relative z-10 mx-auto grid w-full items-center gap-12 px-4 sm:px-6 lg:gap-16 lg:grid-cols-2 max-w-7xl lg:px-8">
        {/* Visual - enters from left */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.15 }}
          className="order-2 flex h-[500px] w-full items-center justify-center lg:order-1"
        >
          <div className="relative aspect-square w-full max-w-md perspective-1000">
            {/* Main Dashboard Card */}
            <motion.div
              animate={{ rotate: [0, 1, 0, -0.5, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="clay-card absolute bottom-6 left-4 right-4 z-10 flex h-44 flex-col rounded-[2rem] border-l-4 border-l-destructive/50 bg-background/50 backdrop-blur-md p-4 shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-500"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-foreground uppercase tracking-wider">System Status</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-destructive/10 text-destructive font-bold">Critical</span>
              </div>
              <div className="flex gap-3 mb-3">
                <div className="flex-1 rounded-xl bg-foreground/5 p-2 text-center border border-foreground/5">
                  <TrendingDown size={16} className="text-foreground mx-auto mb-1 opacity-70" />
                  <span className="text-[10px] text-foreground font-bold block">-47%</span>
                  <span className="text-[8px] text-foreground/50 font-bold uppercase tracking-tighter">Efficiency</span>
                </div>
                <div className="flex-1 rounded-xl bg-foreground/5 p-2 text-center border border-foreground/5">
                  <Clock size={16} className="text-foreground mx-auto mb-1 opacity-70" />
                  <span className="text-[10px] text-foreground font-bold block">+3.2h</span>
                  <span className="text-[8px] text-foreground/50 font-bold uppercase tracking-tighter">Delay</span>
                </div>
                <div className="flex-1 rounded-xl bg-foreground/5 p-2 text-center border border-foreground/5">
                  <DollarSign size={16} className="text-foreground mx-auto mb-1 opacity-70" />
                  <span className="text-[10px] text-foreground font-bold block">$12K</span>
                  <span className="text-[8px] text-foreground/50 font-bold uppercase tracking-tighter">Lost/mo</span>
                </div>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-foreground/10">
                <motion.div
                  animate={{ width: ["20%", "60%", "30%", "45%", "20%"] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="h-full bg-destructive/60"
                />
              </div>
              <span className="text-[9px] text-foreground/70 mt-1.5 text-center font-bold uppercase tracking-widest">Unstable Performance detected</span>
            </motion.div>

            {/* Tilted Warning Block */}
            <motion.div
              animate={{ y: [0, -8, 0], rotate: [5, 7, 5] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.15 }}
              className="clay-card absolute bottom-48 left-10 right-8 z-20 flex h-24 rotate-[5deg] flex-col items-center justify-center gap-2 rounded-[1.5rem] border-t border-t-white/30 bg-background/60 shadow-xl backdrop-blur-md hover:rotate-3 transition-transform"
            >
              <div className="flex gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground/5 border border-foreground/5">
                  <ZapOff size={20} className="text-foreground/60" />
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-foreground/5 border border-foreground/5">
                  <AlertTriangle size={20} className="text-foreground/60" />
                </div>
              </div>
              <span className="text-xs font-bold text-foreground/40 uppercase tracking-widest">Automation Breakdown</span>
            </motion.div>

            {/* Error badge */}
            <motion.div
              animate={{ y: [0, 12, 0], rotate: [-10, -14, -10], scale: [1, 1.05, 1] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.25 }}
              className="clay-card absolute right-6 top-10 z-30 flex h-24 w-24 -rotate-[10deg] flex-col items-center justify-center rounded-2xl bg-background/60 shadow-xl border border-rose-500/10 hover:scale-110 transition-transform"
            >
              <XCircle size={28} strokeWidth={2.5} className="mb-1 text-rose-500" />
              <span className="text-xs font-black uppercase tracking-tighter text-rose-500">FAILED</span>
              <span className="text-[10px] font-bold text-foreground">23 tasks today</span>
            </motion.div>

            {/* Activity spike */}
            <motion.div
              animate={{ y: [0, -25, 0], x: [0, 12, 0], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="clay-card absolute left-6 top-20 z-20 flex h-16 w-16 rotate-12 flex-col items-center justify-center rounded-xl border border-foreground/5 bg-background shadow-lg hover:rotate-0 transition-transform"
            >
              <Activity size={20} className="text-foreground/60" />
              <span className="text-[9px] text-foreground font-bold mt-0.5 uppercase tracking-tighter">SPIKE</span>
            </motion.div>

            {/* Confused indicator */}
            <motion.div
              animate={{ y: [0, 15, 0], x: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              className="clay-card absolute bottom-36 right-0 z-10 flex h-14 w-14 items-center justify-center rounded-full bg-background border border-foreground/10 shadow-lg"
            >
              <span className="text-sm font-black text-foreground group-hover:scale-125 transition-transform">?!</span>
              <div className="absolute inset-0 bg-destructive/5 rounded-full animate-ping opacity-20" />
            </motion.div>
          </div>
        </motion.div>

        {/* Text Content - enters from right */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.15 }}
          className="order-1 flex flex-col items-start text-left lg:order-2"
        >
          {/* Sticky Note */}
          <motion.div
            initial={{ opacity: 0, rotate: 8 }}
            whileInView={{ opacity: 1, rotate: 3 }}
            viewport={{ once: true }}
            transition={{ delay: 0.02, duration: 0.1 }}
            className="rotate-3 bg-foreground px-4 py-2 shadow-lg text-sm font-bold text-background mb-6 transform hover:rotate-0 transition-transform cursor-default inline-block"
            style={{ boxShadow: "4px 4px 0px rgba(0,0,0,0.15)" }}
          >
            Time to Fix This
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.05, duration: 0.15 }}
            className="text-4xl font-heading font-black tracking-tight text-foreground mb-6 leading-tight"
          >
            You are too valuable to be <span className="text-foreground/40 underline decoration-foreground/20 underline-offset-8">this busy.</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.08, duration: 0.15 }}
            className="max-w-xl text-lg leading-relaxed text-foreground/70 font-medium"
          >
            The hidden cost of manual operations. You didn&apos;t start a business to spend your day managing freelancers and putting out fires. Every hour lost to operational lag—slow ad designs, missed leads, or ignored reviews—is revenue left on the table.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.15 }}
            className="mt-8 space-y-4"
          >
            <h3 className="text-lg font-bold text-foreground">THE REALITY CHECK:</h3>
            <ul className="space-y-3">
              <li className="flex gap-3">
                <div className="h-2 w-2 mt-2 rounded-full bg-primary shrink-0" />
                <p className="text-foreground/80 font-medium">
                  <span className="font-bold text-foreground">The Human Bottleneck:</span> Your growth is currently limited by how many hours you can work.
                </p>
              </li>
              <li className="flex gap-3">
                <div className="h-2 w-2 mt-2 rounded-full bg-primary shrink-0" />
                <p className="text-foreground/80 font-medium">
                  <span className="font-bold text-foreground">The Consistency Gap:</span> Freelancers have off days. Algorithms don&apos;t.
                </p>
              </li>
              <li className="flex gap-3">
                <div className="h-2 w-2 mt-2 rounded-full bg-primary shrink-0" />
                <p className="text-foreground/80 font-medium">
                  <span className="font-bold text-foreground">The Opportunity Cost:</span> While you are busy managing tasks, you aren&apos;t managing strategy.
                </p>
              </li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
