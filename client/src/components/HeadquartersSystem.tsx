"use client";

import { motion } from "framer-motion";
import { Server, BrainCircuit, Cpu, UserPlus, Package, Search, PenTool } from "lucide-react";

function HeadquartersVisual() {
  return (
    <div className="relative w-full max-w-md mx-auto h-[440px] flex items-center justify-center perspective-1000">
      
      {/* Background ambient light */}
      <div className="absolute inset-0 bg-primary/10 blur-[120px] rounded-full z-0 pointer-events-none" />

      {/* Main Base Card */}
      <motion.div
        animate={{ rotateY: [-2, 2, -2], rotateX: [1, -1, 1] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="w-full relative z-10"
      >
        <div className="clay-card rounded-[2rem] border border-foreground/10 p-6 flex flex-col gap-6 shadow-2xl bg-background/60 backdrop-blur-2xl overflow-hidden relative">
          
          {/* Header */}
          <div className="flex justify-between items-center border-b border-foreground/5 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-foreground flex items-center justify-center text-background shadow-lg shadow-foreground/20">
                <BrainCircuit size={24} />
              </div>
              <div>
                <h4 className="text-sm font-black text-foreground uppercase tracking-widest">Headquarters</h4>
                <div className="flex items-center gap-1.5 mt-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                  <span className="text-[9px] font-bold text-foreground/40 uppercase tracking-widest">10 AI Employees Active</span>
                </div>
              </div>
            </div>
            {/* Status dot in top right */}
            <div className="w-2 h-2 rounded-full bg-primary animate-ping" />
          </div>

          {/* Body: Connected Nodes */}
          <div className="relative h-48 w-full border border-foreground/5 rounded-2xl bg-foreground/[0.02] overflow-hidden">
            {/* Grid pattern background */}
            <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(currentColor 1.5px, transparent 1.5px)", backgroundSize: "16px 16px" }} />

            {/* Central Node */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-foreground rounded-2xl flex items-center justify-center shadow-xl z-20 shadow-foreground/20 border border-white/10">
              <Server size={24} className="text-background" />
            </div>

            {/* Connecting lines & Employee Nodes */}
            {[
              { label: "Acquisition", icon: <UserPlus size={14}/>, pos: "top-4 left-4", delay: 0 },
              { label: "Fulfillment", icon: <Package size={14}/>, pos: "top-4 right-4", delay: 0.2 },
              { label: "Intelligence", icon: <Search size={14}/>, pos: "bottom-4 left-4", delay: 0.4 },
              { label: "Creative", icon: <PenTool size={14}/>, pos: "bottom-4 right-4", delay: 0.6 }
            ].map((node, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + node.delay, duration: 0.5 }}
                className={`absolute ${node.pos} flex flex-col items-center gap-2 z-20`}
              >
                <div className="w-10 h-10 rounded-full bg-background border border-foreground/10 flex items-center justify-center shadow-md">
                  <div className="text-foreground/60">{node.icon}</div>
                </div>
                <div className="bg-foreground/[0.05] border border-foreground/[0.05] px-2 py-1 rounded-md text-[8px] font-black uppercase text-foreground/60 shadow-sm backdrop-blur-md">
                  {node.label}
                </div>
              </motion.div>
            ))}

            {/* SVG Connecting Paths */}
            <svg className="absolute inset-0 w-full h-full z-10 opacity-20" preserveAspectRatio="none">
              <path d="M 40,40 C 100,40 80,96 150,96" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
              <path d="M 330,40 C 270,40 290,96 220,96" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
              <path d="M 40,150 C 100,150 80,96 150,96" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
              <path d="M 330,150 C 270,150 290,96 220,96" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 4" fill="none" />
            </svg>

            {/* Animated particles flowing to center */}
            {[
              { path: { x: ["10%", "45%"], y: ["20%", "45%"] }, delay: 0 },
              { path: { x: ["90%", "55%"], y: ["20%", "45%"] }, delay: 1.2 },
              { path: { x: ["10%", "45%"], y: ["80%", "55%"] }, delay: 0.8 },
              { path: { x: ["90%", "55%"], y: ["80%", "55%"] }, delay: 2.1 },
            ].map((particle, i) => (
              <motion.div
                key={i}
                animate={{
                  left: particle.path.x,
                  top: particle.path.y,
                  opacity: [0, 1, 0],
                  scale: [1, 1.5, 1]
                }}
                transition={{ duration: 2.5, repeat: Infinity, delay: particle.delay, ease: "easeInOut" }}
                className="absolute w-2 h-2 rounded-full bg-cyan-400 z-10 shadow-[0_0_10px_rgba(34,211,238,0.8)]"
              />
            ))}
          </div>

          {/* Footer Metrics */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Efficiency", value: "99.9%" },
              { label: "Latency", value: "11ms" },
              { label: "Overhead", value: "ZERO" },
            ].map((metric, i) => (
              <div key={i} className="bg-foreground/[0.03] rounded-xl p-3 text-center border border-foreground/[0.04] shadow-inner">
                <div className="text-[8px] font-black text-foreground/30 uppercase tracking-widest mb-1.5">{metric.label}</div>
                <div className="text-sm font-black text-foreground">{metric.value}</div>
              </div>
            ))}
          </div>

        </div>
      </motion.div>
    </div>
  );
}

export function HeadquartersSystem() {
  return (
    <section className="relative w-full overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto w-full relative z-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Left Side: Content */}
          <div className="flex flex-col space-y-8 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, rotate: -8 }}
              whileInView={{ opacity: 1, rotate: -3 }}
              viewport={{ once: true }}
              transition={{ delay: 0.02, duration: 0.1 }}
              className="-rotate-3 bg-primary px-4 py-2 shadow-lg text-sm font-black text-primary-foreground mb-2 transform hover:rotate-0 transition-transform cursor-default self-start inline-block uppercase tracking-widest"
              style={{ boxShadow: "4px 4px 0px rgba(0,0,0,0.15)" }}
            >
              Headquarters System
            </motion.div>

            <div className="space-y-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.15 }}
                className="text-4xl font-heading font-black tracking-tighter text-foreground sm:text-5xl"
              >
                The Virtual Company<br />
                <span className="text-foreground/40">Powered by AI Employees.</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05, duration: 0.15 }}
                className="max-w-xl text-lg font-medium text-foreground/60 leading-relaxed"
              >
                The Headquarters System operates exactly like a traditional human company, but it exists entirely in the cloud. Instead of human staff, your workforce consists of hyper-specialized, fine-tuned AI models acting as your full-time employees—executing complex tasks with zero overhead.
              </motion.p>
            </div>
            
            <div className="space-y-6">
              {[
                {
                  icon: <Cpu size={20} />,
                  title: "A Fully Virtual Company",
                  desc: "It operates with familiar corporate structures—departments, workflows, and supervisors—while running completely autonomously."
                },
                {
                  icon: <BrainCircuit size={20} />,
                  title: "Fine-Tuned AI Employees",
                  desc: "Your staff are not generic bots. They are custom AI models trained meticulously for their exact roles in your pipeline."
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
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
          </div>

          {/* Right Side: Visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative flex items-center justify-center py-4 order-1 lg:order-2"
          >
            <HeadquartersVisual />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
