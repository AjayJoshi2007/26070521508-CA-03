"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowRight, CheckCircle2, Sparkles, Mail, UserPlus, CreditCard, Zap, TrendingUp, ShieldCheck, Globe, MessageSquare, Cpu } from "lucide-react";
import { useRef } from "react";

const steps = [
  {
    number: "01",
    title: "Choose the Plan",
    description: "Choose the tier that matches your operational capacity. Your autonomous workforce structure is already defined and ready to boot up.",
    details: [
      "Pre-packaged operational pipelines",
      "Scalable daily output limits",
      "Zero-friction monthly terms",
    ],
    color: "from-teal-900 to-teal-950",
    accent: "text-foreground",
    bgAccent: "bg-foreground",
  },
  {
    number: "02",
    title: "AI Employees Train Themselves",
    description: "Our AI employees ingest your brand DNA and autonomously train themselves as per your company to match your exact market niche.",
    details: [
      "Deep-dive brand alignment",
      "Precision parameter locking",
      "Guaranteed 7-hour activation",
    ],
    color: "from-cyan-900 to-cyan-950",
    accent: "text-foreground",
    bgAccent: "bg-foreground",
  },
  {
    number: "03",
    title: "Delivery & Supervisor Engine",
    description: "They deliver the results directly to you, while our internal Supervisor Engine manages all the AI employees and maintains strict accuracy through continuous quality audits.",
    details: [
      "Autonomous quality control audits",
      "Self-correcting workflow loops",
      "Flawless assets delivered directly to you",
    ],
    color: "from-teal-800 to-teal-950",
    accent: "text-foreground",
    bgAccent: "bg-foreground",
  },
];

function PlanVisual() {
  return (
    <div className="relative w-full h-[400px] flex items-center justify-center">
      <motion.div
        animate={{ y: [-10, 10, -10], rotate: [0, 1, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="relative z-20"
      >
        <div className="flex gap-4 items-end">
          <div className="w-32 h-48 bg-background rounded-2xl border border-foreground/10 shadow-xl p-4 flex flex-col justify-between">
            <div className="w-8 h-8 rounded-lg bg-foreground/5 flex items-center justify-center">
              <Zap size={16} className="text-foreground" />
            </div>
            <div className="space-y-2">
              <div className="h-2 w-full bg-foreground/10 rounded-full" />
              <div className="h-2 w-2/3 bg-foreground/10 rounded-full" />
            </div>
          </div>

          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            className="w-40 h-64 bg-foreground rounded-3xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] p-6 flex flex-col justify-between relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-3">
              <Sparkles className="text-background/40" size={20} />
            </div>
            <div className="w-12 h-12 rounded-xl bg-background/10 flex items-center justify-center">
              <CreditCard size={24} className="text-background" />
            </div>
            <div className="space-y-3">
              <div className="h-3 w-full bg-background/20 rounded-full" />
              <div className="h-3 w-3/4 bg-background/20 rounded-full" />
              <div className="h-8 w-full bg-background rounded-xl" />
            </div>
          </motion.div>

          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-24 h-24 rounded-full border border-foreground/10 absolute -right-12 top-0"
          />
        </div>
      </motion.div>

      <motion.div
        animate={{ x: [0, 20, 0], y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-10 left-10 p-4 bg-background rounded-xl shadow-lg border border-foreground/10"
      >
        <ShieldCheck className="text-foreground" size={24} />
      </motion.div>

      <motion.div
        animate={{ x: [0, -20, 0], y: [0, 20, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1 }}
        className="absolute bottom-10 right-10 p-4 bg-background rounded-xl shadow-lg border border-foreground/10"
      >
        <Globe className="text-foreground" size={24} />
      </motion.div>

      <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full" />
    </div>
  );
}

function OperatorsVisual() {
  return (
    <div className="relative w-full h-[400px] flex items-center justify-center">
      <div className="relative w-72 h-72">
        {[0, 120, 240].map((angle, i) => (
          <motion.div
            key={i}
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear", delay: i * 2 }}
            className="absolute inset-0"
          >
            <motion.div
              style={{ top: 0, left: '50%', x: '-50%' }}
              className="absolute w-16 h-16"
            >
              <div className="w-16 h-16 bg-background rounded-2xl shadow-xl border border-foreground/10 flex items-center justify-center">
                {i === 0 ? <MessageSquare className="text-foreground" /> : i === 1 ? <Cpu className="text-foreground" /> : <Zap className="text-foreground" />}
              </div>
            </motion.div>
          </motion.div>
        ))}

        <div className="absolute inset-0 m-auto w-32 h-32 flex items-center justify-center">
          <motion.div
            animate={{
              scale: [1, 1.1, 1],
              boxShadow: ["0 0 20px rgba(0, 0, 0, 0.1)", "0 0 40px rgba(0, 0, 0, 0.2)", "0 0 20px rgba(0, 0, 0, 0.1)"]
            }}
            transition={{ duration: 3, repeat: Infinity }}
            className="w-24 h-24 bg-foreground rounded-[2rem] flex items-center justify-center relative z-10"
          >
            <UserPlus size={40} className="text-background" />
          </motion.div>

          <motion.div
            animate={{ scale: [1, 2], opacity: [0.3, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
            className="absolute inset-0 w-24 h-24 m-auto border-2 border-foreground/10 rounded-[2rem]"
          />
        </div>

        <svg className="absolute inset-0 w-full h-full opacity-10" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 4" className="text-foreground" />
        </svg>
      </div>
      <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full" />
    </div>
  );
}

function ResultsVisual() {
  return (
    <div className="relative w-full h-[400px] flex items-center justify-center">
      <div className="relative w-80 h-48 bg-background rounded-[2rem] shadow-2xl border border-foreground/10 p-8 overflow-hidden">
        <div className="flex justify-between items-start mb-6">
          <div>
            <div className="text-xs font-bold text-foreground/40 uppercase tracking-wider mb-1">Weekly Growth</div>
            <div className="text-2xl font-bold text-foreground">+124%</div>
          </div>
          <div className="p-2 bg-foreground/5 rounded-lg">
            <TrendingUp size={20} className="text-foreground" />
          </div>
        </div>

        <div className="flex items-end justify-between h-16 gap-2">
          {[40, 60, 45, 90, 65, 80, 100].map((height, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              whileInView={{ height: `${height}%` }}
              transition={{ delay: i * 0.02, duration: 0.2, ease: "easeOut" }}
              className="w-full bg-foreground/10 rounded-t-sm relative"
            >
              {i === 6 && <div className="absolute top-0 left-0 w-full h-full bg-foreground rounded-t-sm" />}
            </motion.div>
          ))}
        </div>

        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-4 right-20 py-2 px-4 bg-foreground text-background rounded-full text-[10px] font-bold shadow-lg"
        >
          RESULT DELIVERED
        </motion.div>
      </div>

      <motion.div
        animate={{ x: [0, -10, 0], y: [0, 20, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-10 right-10 p-4 bg-background rounded-2xl shadow-xl border border-foreground/10 flex items-center gap-3"
      >
        <div className="w-8 h-8 rounded-full bg-foreground/5 flex items-center justify-center">
          <Mail size={14} className="text-foreground" />
        </div>
        <div className="h-2 w-20 bg-foreground/10 rounded-full" />
      </motion.div>

      <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full" />
    </div>
  );
}

export function HowItWorks() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section id="how-it-works" className="relative scroll-mt-24 py-24 overflow-hidden">
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Header */}
        <div className="max-w-3xl mb-32">
          <motion.div
            initial={{ opacity: 0, rotate: 8 }}
            whileInView={{ opacity: 1, rotate: 3 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="rotate-3 bg-primary px-4 py-2 shadow-lg text-sm font-bold text-primary-foreground mb-6 transform hover:rotate-0 transition-transform cursor-default inline-block uppercase tracking-wider"
            style={{ boxShadow: "4px 4px 0px rgba(0,0,0,0.15)" }}
          >
            The Protocol
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.18, duration: 0.55 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-black tracking-tight mb-8"
          >
            From Setup to <span className="text-foreground/40 underline decoration-foreground/20 underline-offset-8">Scale</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.28, duration: 0.55 }}
            className="text-xl text-foreground/70 leading-relaxed font-medium"
          >
            We stripped away the hiring friction and the management bloat. No interviews. No onboarding. No babysitting. Just a pre-configured, self-policing executive team, fine-tuned to your business and ready to deploy.
          </motion.p>
        </div>

        {/* Process Container */}
        <div ref={containerRef} className="relative">
          {/* Background Line */}
          <div className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-px bg-foreground/5 -translate-x-1/2" />

          {/* Progress Line */}
          <motion.div
            style={{ scaleY, originY: 0 }}
            className="absolute left-6 lg:left-1/2 top-0 bottom-0 w-px bg-foreground -translate-x-1/2 z-10"
          />

          <div className="space-y-32 lg:space-y-48">
            {steps.map((step, index) => (
              <div key={step.number} className="relative">
                {/* The "Near Step" Indicator */}
                <div className="absolute left-6 lg:left-1/2 -translate-x-1/2 top-0 z-20">
                  <div className="sticky top-48 flex items-center justify-center">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ margin: "-20%" }}
                      className={`w-12 h-12 rounded-2xl bg-background border-2 border-foreground/10 shadow-xl flex items-center justify-center font-black text-xl text-foreground`}
                    >
                      {step.number}
                    </motion.div>
                  </div>
                </div>

                <div className="grid lg:grid-cols-2 gap-12 lg:gap-24 items-center">
                  <div className={`${index % 2 === 1 ? 'lg:order-2' : ''} pl-16 sm:pl-20 lg:pl-0`}>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-100px" }}
                      className="max-w-md"
                    >
                      <h3 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black mb-6">{step.title}</h3>
                      <p className="text-lg text-foreground/70 mb-8 leading-relaxed font-medium">
                        {step.description}
                      </p>
                      <div className="divide-y divide-foreground/10 border-t border-foreground/10">
                        {step.details.map((detail, i) => (
                          <motion.div
                            key={detail}
                            initial={{ opacity: 0, x: -8 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ delay: i * 0.08, duration: 0.35 }}
                            className="flex items-center gap-3 py-3.5"
                          >
                            <span className="w-6 flex-shrink-0 text-[10px] font-black tabular-nums text-foreground/35">0{i + 1}</span>
                            <CheckCircle2 className="flex-shrink-0 text-foreground/70" size={16} />
                            <span className="text-sm sm:text-base font-bold text-foreground/80">{detail}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  <div className={`${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true, margin: "-100px" }}
                      className="scale-[0.8] sm:scale-100 origin-center"
                    >
                      {index === 0 ? <PlanVisual /> : index === 1 ? <OperatorsVisual /> : <ResultsVisual />}
                    </motion.div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
