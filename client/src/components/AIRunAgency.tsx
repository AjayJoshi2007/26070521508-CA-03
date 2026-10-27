"use client";

import { motion } from "framer-motion";
import { Bot, Cpu, Network, Zap, Shield, Rocket } from "lucide-react";

function AIRunVisual() {
  return (
    <div className="relative w-full h-[500px] flex items-center justify-center">
      <div className="relative z-20 w-full max-w-[500px] h-[400px] bg-background rounded-[2rem] shadow-2xl border border-foreground/10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(0,0,0,0.05),_transparent_70%)]" />

        {/* Network Nodes Visual */}
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="relative w-full h-full">
            {/* Center Node */}
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 m-auto w-20 h-20 bg-foreground rounded-full z-30 flex items-center justify-center border-4 border-background/20 shadow-[0_0_40px_rgba(0,0,0,0.2)]"
            >
              <Cpu size={32} className="text-background" />
            </motion.div>

            {/* Satellite Nodes */}
            {[...Array(6)].map((_, i) => {
              const angle = (i * 60) * (Math.PI / 180);
              const x = Math.cos(angle) * 130;
              const y = Math.sin(angle) * 130;

              return (
                <div key={i} className="absolute inset-0 m-auto w-full h-full flex items-center justify-center pointer-events-none">
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.1 }}
                    style={{ x, y }}
                    className={`w-12 h-12 bg-background rounded-xl border border-foreground/10 flex items-center justify-center backdrop-blur-md shadow-lg`}
                  >
                    <Bot size={20} className="text-foreground" />
                  </motion.div>

                  {/* Connector Lines */}
                  <svg className="absolute inset-0 w-full h-full overflow-visible">
                    <motion.line
                      x1="50%" y1="50%"
                      x2={`calc(50% + ${x}px)`} y2={`calc(50% + ${y}px)`}
                      stroke="currentColor"
                      strokeOpacity="0.1"
                      strokeWidth="2"
                      className="text-foreground"
                      initial={{ pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      transition={{ duration: 1, delay: i * 0.1 }}
                    />
                  </svg>
                </div>
              );
            })}

            {/* Data Particles */}
            {[...Array(12)].map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  x: [0, (Math.random() - 0.5) * 400],
                  y: [0, (Math.random() - 0.5) * 400],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0]
                }}
                transition={{ duration: 2 + Math.random() * 2, repeat: Infinity }}
                className={`absolute inset-0 m-auto w-1.5 h-1.5 rounded-full bg-foreground/20`}
              />
            ))}
          </div>
        </div>

        {/* Status Bar */}
        <div className="absolute bottom-0 inset-x-0 h-12 bg-foreground text-background flex items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-background/60 animate-pulse" />
            <span className="text-[8px] font-black tracking-[0.2em] text-background/80 uppercase">Core Ops Synchronized</span>
          </div>
          <Network size={14} className="text-background/60" />
        </div>
      </div>

      {/* Background Decorative */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="w-[600px] h-[600px] border border-foreground rounded-full"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
          className="absolute w-[800px] h-[800px] border border-foreground rounded-full"
        />
      </div>
      <div className="absolute inset-0 bg-foreground/5 blur-[120px] rounded-full pointer-events-none" />
    </div>
  );
}

export function AIRunOaaS() {
  return (
    <section className="relative py-24 bg-background overflow-hidden">
      <div className="mx-auto w-full px-4 sm:px-6 lg:px-8 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          {/* Content Side */}
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-foreground/5 border border-foreground/10 text-foreground text-sm font-bold mb-6"
            >
              <Rocket size={14} />
              <span>THE FUTURE OF SCALE</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-6xl lg:text-7xl font-heading font-black tracking-tight mb-8"
            >
              We are an <span className="text-foreground/40 underline decoration-foreground/20 underline-offset-8">AI-Run Operation</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="text-xl text-foreground/70 leading-relaxed mb-12 font-medium"
            >
              We don&apos;t just sell AI—we live it. Our entire internal infrastructure is operated by the exact same elite squad of operators we deploy for our clients.
            </motion.p>

            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="w-14 h-14 rounded-2xl bg-foreground flex items-center justify-center shrink-0 shadow-lg">
                  <Shield className="text-background" size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-heading font-black mb-2">Battle-Tested Models</h4>
                  <p className="text-foreground/70 font-medium">
                    Our operators handle our own lead gen, content, and outreach. If it&apos;s not good enough for us, it&apos;s not good enough for you.
                  </p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="w-14 h-14 rounded-2xl bg-foreground/5 border border-foreground/10 flex items-center justify-center shrink-0">
                  <Zap className="text-foreground" size={28} />
                </div>
                <div>
                  <h4 className="text-xl font-heading font-black mb-2">Maximum Efficiency</h4>
                  <p className="text-foreground/70 font-medium">
                    By removing human friction from core operations, we maintain a 24/7 high-velocity growth engine that never sleeps.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Visual Side */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <AIRunVisual />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
