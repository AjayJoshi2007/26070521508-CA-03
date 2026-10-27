"use client";

import { motion } from "framer-motion";
import { ShieldAlert, Mail, Globe, Info, Zap, ShieldCheck, Lock } from "lucide-react";

export function SecuritySection() {
  return (
    <section className="relative w-full overflow-hidden py-24 px-4 sm:px-6 lg:px-8">
      {/* Background Architectural Elements - simplified */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.03]">
        {/* Kept grid as it is subtle and architectural */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, var(--primary) 1px, transparent 1px), linear-gradient(to bottom, var(--primary) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="mx-auto w-full relative z-10 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">

          {/* Left Side: Content */}
          <div className="flex flex-col space-y-8">
            <motion.div
              initial={{ opacity: 0, rotate: -8 }}
              whileInView={{ opacity: 1, rotate: -3 }}
              viewport={{ once: true }}
              transition={{ delay: 0.01, duration: 0.08 }}
              className="-rotate-3 bg-primary px-4 py-2 shadow-lg text-sm font-black text-primary-foreground mb-2 transform hover:rotate-0 transition-transform cursor-default self-start inline-block uppercase tracking-widest"
              style={{ boxShadow: "4px 4px 0px rgba(0,0,0,0.15)" }}
            >
              Security Protocol
            </motion.div>

            <div className="space-y-4">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.14 }}
                className="text-4xl font-heading font-black tracking-tighter text-foreground sm:text-5xl"
              >
                External by Design<br />
                <span className="text-foreground/40">The ultimate security is zero access.</span>
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.02, duration: 0.12 }}
                className="max-w-xl text-lg font-medium text-foreground/60 leading-relaxed"
              >
                We built SoloChief to work for you, not inside your systems. Our operators function as external consultants, delivering high-value assets without ever touching your internal infrastructure.
              </motion.p>
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: <Zap size={20} />,
                  title: "Air-Gapped Execution",
                  desc: "We operate strictly outside your firewall. No API keys. No 'Login with Google'. We never ask for access to your CRM or sensitive internal databases."
                },
                {
                  icon: <Mail size={20} />,
                  title: "Push-Only Delivery",
                  desc: "We don't pull data; we push results. Final assets—leads, designs, and intel—are delivered directly to your inbox. Session data is purged immediately."
                },
                {
                  icon: <Globe size={20} />,
                  title: "Public Context Only",
                  desc: "We only require what is already visible: Your Domain, your Market Niche, and your Delivery Email. Your proprietary data remains 100% private."
                }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.04 + i * 0.015, duration: 0.08 }}
                  className="flex gap-4 group"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-lg group-hover:scale-110 transition-transform border border-white/20">
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

          {/* Right Side: The Vault Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.28 }}
            className="relative flex items-center justify-center py-12"
          >
            {/* Architectural Rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-[300px] h-[300px] border border-primary/[0.15] rounded-full animate-[spin_20s_linear_infinite]" />
              <div className="w-[450px] h-[450px] border border-primary/[0.10] rounded-full animate-[spin_30s_linear_infinite_reverse]" />
            </div>

            {/* The Vault Monolith */}
            <div className="relative z-10">
              <motion.div
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-64 h-80 bg-primary rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] border border-white/20 flex flex-col items-center justify-center p-8 overflow-hidden"
              >
                {/* Internal Sweep Effect */}
                <motion.div
                  animate={{ x: ['-100%', '200%'] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "linear", repeatDelay: 1.5 }}
                  className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                />

                <div className="relative z-10 flex flex-col items-center text-center space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center shadow-xl border border-white/20">
                    <Lock size={32} className="text-white" strokeWidth={2.5} />
                  </div>
                  <div className="space-y-2">
                    <div className="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">Encryption Status</div>
                    <div className="text-xl font-heading font-black text-white tracking-tighter">SECURE NODE</div>
                  </div>

                  {/* Digital Pulse */}
                  <div className="flex gap-1.5 h-4 items-end">
                    {[0.4, 0.7, 0.5, 0.9, 0.6].map((h, i) => (
                      <motion.div
                        key={i}
                        animate={{ height: ['20%', '100%', '20%'] }}
                        transition={{ duration: 1 + i * 0.2, repeat: Infinity }}
                        className="w-1 bg-white/40 rounded-full"
                      />
                    ))}
                  </div>
                </div>

                {/* Bottom Status Bar */}
                <div className="absolute bottom-6 w-full px-8 flex justify-between items-center text-[8px] font-black text-white/40 uppercase tracking-widest">
                  <span>v1.0.4</span>
                  <div className="flex gap-1">
                    <div className="w-1 h-1 rounded-full bg-white/60 animate-pulse" />
                    <div className="w-1 h-1 rounded-full bg-white/60 animate-pulse [animation-delay:0.2s]" />
                  </div>
                  <span>Isolated</span>
                </div>
              </motion.div>

              {/* Secure Delivery Packets (Animations) */}
              <motion.div
                animate={{
                  x: [0, 150],
                  y: [0, -100],
                  opacity: [0, 1, 0]
                }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
              >
                <div className="p-2 bg-primary border border-white/20 rounded-lg shadow-xl">
                  <Mail size={16} className="text-white" />
                </div>
              </motion.div>

              <motion.div
                animate={{
                  x: [0, -150],
                  y: [0, 100],
                  opacity: [0, 1, 0]
                }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeOut", delay: 0.75 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
              >
                <div className="p-2 bg-primary border border-white/20 rounded-lg shadow-xl">
                  <ShieldCheck size={16} className="text-white" />
                </div>
              </motion.div>
            </div>

            {/* Floaties */}
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute top-1/4 right-0 bg-primary text-white border border-white/20 px-3 py-1.5 rounded-full shadow-lg z-20 flex items-center gap-2"
            >
              <div className="w-2 h-2 rounded-full bg-white" />
              <span className="text-[10px] font-black uppercase tracking-widest">Inbox-Only</span>
            </motion.div>

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
              className="absolute bottom-1/4 left-0 bg-primary text-white px-3 py-1.5 rounded-full shadow-lg z-20 flex items-center gap-2 border border-white/20"
            >
              <span className="text-[10px] font-black uppercase tracking-widest">Air-Gapped</span>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
