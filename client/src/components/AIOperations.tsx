"use client";

import { motion } from "framer-motion";
import { Cpu, UserCheck, Activity, CheckCircle2, Shield, Zap, Eye, Mail, ArrowDown } from "lucide-react";

/* ────────────────────────────────────────────
   VISUAL: Hybrid Pipeline – Layered Clay Cards
   Three stacked claymorphic cards representing
   AI → Firewall → Human verified output,
   with animated flow dots between them.
   ──────────────────────────────────────────── */

function FlowDots({ count = 3, delay = 0 }: { count?: number; delay?: number }) {
  return (
    <div className="flex flex-col items-center gap-1 py-2">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          animate={{ opacity: [0.1, 0.6, 0.1], y: [0, 6, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: delay + i * 0.3,
            ease: "easeInOut",
          }}
          className="w-1 h-1 rounded-full bg-foreground/25"
        />
      ))}
    </div>
  );
}

function HybridPipelineVisual() {
  return (
    <div className="relative flex flex-col items-center gap-0 w-full max-w-sm mx-auto">

      {/* ── CARD 1: AI Execution Layer ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.1, duration: 0.5 }}
        className="w-full"
      >
        <div className="clay-card rounded-2xl border border-foreground/[0.06] p-5 relative overflow-hidden">
          {/* Subtle accent line at top */}
          <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />

          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-8 h-8 rounded-xl bg-foreground/[0.05] border border-foreground/[0.06] flex items-center justify-center">
              <Cpu size={14} className="text-foreground/40" />
            </div>
            <div>
              <div className="text-[10px] font-black text-foreground uppercase tracking-[0.15em]">Layer 1</div>
              <div className="text-[8px] font-medium text-foreground/30">AI Execution Engine</div>
            </div>
            <div className="ml-auto flex items-center gap-1">
              <Zap size={8} className="text-foreground/20" />
              <span className="text-[7px] font-bold text-foreground/20">24/7</span>
            </div>
          </div>

          {/* Mini operator rows */}
          <div className="space-y-1.5">
            {[
              { name: "Sales Operator", status: "Executing", acc: "96.2%" },
              { name: "Design Operator", status: "Generating", acc: "94.8%" },
              { name: "Intel Operator", status: "Analyzing", acc: "97.5%" },
            ].map((op, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25 + i * 0.08, duration: 0.3 }}
                className="flex items-center gap-2 py-1.5 px-2.5 rounded-lg bg-foreground/[0.02]"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0" />
                <span className="text-[8px] font-bold text-foreground flex-1">{op.name}</span>
                <span className="text-[7px] font-medium text-foreground/25">{op.status}</span>
                <span className="text-[7px] font-bold text-foreground/20">{op.acc}</span>
              </motion.div>
            ))}
          </div>

          {/* Volume bar */}
          <div className="mt-3 flex items-center gap-2">
            <span className="text-[6.5px] font-bold text-foreground/20">Processing volume</span>
            <div className="flex-1 h-1 rounded-full bg-foreground/[0.04] overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: "85%" }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
                className="h-full rounded-full bg-foreground/15"
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Flow indicator 1→2 ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5 }}
        className="flex flex-col items-center -my-1 z-10"
      >
        <FlowDots delay={0} />
        <div className="w-6 h-6 rounded-full bg-foreground/[0.04] border border-foreground/[0.06] flex items-center justify-center">
          <ArrowDown size={10} className="text-foreground/25" />
        </div>
        <FlowDots delay={0.5} />
      </motion.div>

      {/* ── CARD 2: Quality Firewall ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="w-[92%]"
      >
        <div className="clay-card rounded-2xl border border-foreground/[0.06] p-5 relative overflow-hidden">
          <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />

          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-xl bg-foreground/[0.05] border border-foreground/[0.06] flex items-center justify-center">
              <Shield size={14} className="text-foreground/40" />
            </div>
            <div>
              <div className="text-[10px] font-black text-foreground uppercase tracking-[0.15em]">Quality Firewall</div>
              <div className="text-[8px] font-medium text-foreground/30">Human oversight checkpoint</div>
            </div>
            <div className="ml-auto">
              <div className="flex items-center gap-1 bg-foreground/[0.03] border border-foreground/[0.06] rounded-full px-2 py-0.5">
                <Eye size={7} className="text-foreground/25" />
                <span className="text-[6.5px] font-bold text-foreground/25">3 reviewers</span>
              </div>
            </div>
          </div>

          {/* Review checklist */}
          <div className="space-y-1.5">
            {[
              "Brand consistency verified",
              "Hallucination scan passed",
              "Quality threshold met",
            ].map((check, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.55 + i * 0.1, duration: 0.3 }}
                className="flex items-center gap-2 py-1 px-2.5"
              >
                <CheckCircle2 size={10} className="text-green-500/50 flex-shrink-0" />
                <span className="text-[8px] font-medium text-foreground/50">{check}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* ── Flow indicator 2→3 ── */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.7 }}
        className="flex flex-col items-center -my-1 z-10"
      >
        <FlowDots delay={1} />
        <div className="w-6 h-6 rounded-full bg-foreground/[0.04] border border-foreground/[0.06] flex items-center justify-center">
          <ArrowDown size={10} className="text-foreground/25" />
        </div>
        <FlowDots delay={1.5} />
      </motion.div>

      {/* ── CARD 3: Verified Output ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="w-[84%]"
      >
        <div className="clay-card rounded-2xl border border-foreground/[0.06] p-5 relative overflow-hidden">
          <div className="absolute top-0 left-6 right-6 h-[2px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />

          <div className="flex items-center gap-2.5 mb-3">
            <div className="w-8 h-8 rounded-xl bg-foreground/[0.05] border border-foreground/[0.06] flex items-center justify-center">
              <Mail size={14} className="text-foreground/40" />
            </div>
            <div>
              <div className="text-[10px] font-black text-foreground uppercase tracking-[0.15em]">Verified Output</div>
              <div className="text-[8px] font-medium text-foreground/30">Delivered to your inbox</div>
            </div>
          </div>

          <div className="flex items-center justify-between py-1.5 px-2.5 rounded-lg bg-foreground/[0.02]">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={10} className="text-green-500/50" />
              <span className="text-[8px] font-bold text-foreground">Clean, actionable results</span>
            </div>
            <span className="text-[7px] font-bold text-foreground/20">0% hallucination</span>
          </div>
        </div>
      </motion.div>

      {/* ── Floating ambient badges ── */}
      <motion.div
        animate={{ y: [0, -5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-2 -right-2 z-20"
      >
        <div className="flex items-center gap-1.5 bg-background/95 backdrop-blur-sm border border-foreground/[0.06] rounded-full px-2.5 py-1.5 shadow-lg">
          <Zap size={9} className="text-foreground/40" />
          <span className="text-[7px] font-black text-foreground/50">3,200+ tasks/cycle</span>
        </div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-8 -left-2 z-20"
      >
        <div className="flex items-center gap-1.5 bg-foreground text-background rounded-full px-3 py-1.5 shadow-xl border border-foreground/80">
          <Shield size={9} />
          <span className="text-[7px] font-black uppercase tracking-wider">Human-verified</span>
        </div>
      </motion.div>
    </div>
  );
}

export function AIOperations() {
  return (
    <section className="relative w-full overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full relative z-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">

          {/* Left Side: Pipeline Visual */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative flex items-center justify-center py-4 scale-[0.85] sm:scale-100 origin-center"
          >
            <HybridPipelineVisual />
          </motion.div>

          {/* Right Side: Content */}
          <div className="flex flex-col space-y-8">
            <motion.div
              initial={{ opacity: 0, rotate: 8 }}
              whileInView={{ opacity: 1, rotate: 3 }}
              viewport={{ once: true }}
              transition={{ delay: 0.02, duration: 0.1 }}
              className="rotate-3 bg-foreground px-4 py-2 shadow-lg text-sm font-black text-background mb-2 transform hover:rotate-0 transition-transform cursor-default self-start inline-block uppercase tracking-widest"
              style={{ boxShadow: "4px 4px 0px rgba(0,0,0,0.15)" }}
            >
              Operational Structure
            </motion.div>

            <div className="space-y-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.15 }}
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-black tracking-tighter text-foreground leading-tight"
              >
                The Hybrid Engine<br />
                <span className="text-foreground/40">AI Speed, Human Precision.</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05, duration: 0.15 }}
                className="max-w-xl text-lg font-medium text-foreground/60 leading-relaxed"
              >
                We don&apos;t believe in unsupervised AI. Your workforce operates on a strict dual-layer system: Autonomous agents execute the heavy lifting 24/7, while human specialists verify the quality before it ever hits your inbox.
              </motion.p>
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: <Cpu size={20} />,
                  title: "Relentless Execution",
                  desc: "The Speed Layer. Your AI Operators handle the volume—sourcing thousands of leads, drafting ad variations, and monitoring metrics around the clock without fatigue."
                },
                {
                  icon: <UserCheck size={20} />,
                  title: "The Quality Firewall",
                  desc: "The Safety Layer. High-stakes outputs pass through human oversight. We filter out hallucinations, brand inconsistencies, and noise so you only see actionable, professional results."
                },
                {
                  icon: <Activity size={20} />,
                  title: "Adaptive Calibration",
                  desc: "The Growth Layer. Your team gets smarter every week. We continuously fine-tune your operator parameters based on performance data and your specific feedback."
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.05, duration: 0.1 }}
                  className="flex gap-4 group"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-foreground/[0.04] flex items-center justify-center text-foreground/40 border border-foreground/[0.08] group-hover:bg-foreground group-hover:text-background transition-all duration-300">
                    {item.icon}
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-heading font-black text-lg text-foreground tracking-tight">{item.title}</h3>
                    <p className="text-sm font-medium text-foreground/50">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="pt-4"
            >
              <div className="inline-flex items-center gap-3 px-6 py-4 rounded-3xl clay-card">
                <CheckCircle2 size={20} className="text-green-500" />
                <span className="text-sm font-black uppercase tracking-widest text-foreground/60">No Hallucinations. Guaranteed.</span>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
