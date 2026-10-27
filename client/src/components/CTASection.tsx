"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export function CTASection() {
  return (
    <section id="cta" className="relative w-full px-4 sm:px-6 lg:px-8 py-20 overflow-hidden">
      {/* Background accents handled globally */}

      <div className="mx-auto w-full relative z-10 max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3 }}
          className="clay-card p-6 sm:p-10 md:p-16 flex flex-col lg:flex-row items-center justify-between gap-10 border-foreground/10 relative overflow-hidden"
        >
          {/* Sticky Note Replacement for any potential badge */}


          <div className="flex flex-col gap-6 text-center lg:text-left max-w-2xl">
            <motion.div
              initial={{ opacity: 0, rotate: 8 }}
              whileInView={{ opacity: 1, rotate: 3 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.15 }}
              className="inline-block rotate-3 bg-primary px-4 py-2 shadow-lg text-sm font-black text-primary-foreground self-center lg:self-start mb-2 transform hover:rotate-0 transition-transform cursor-default uppercase tracking-widest"
              style={{ boxShadow: "4px 4px 0px rgba(0,0,0,0.1)" }}
            >
              The Next Step
            </motion.div>
            <h2 className="text-3xl md:text-5xl font-heading font-extrabold text-foreground leading-tight">
              Your New Executive Team is Ready.
            </h2>
            <p className="text-lg text-foreground/60 font-medium">
              Stop trading your time for growth. Deploy a fully autonomous workforce today and reclaim your role as the CEO. Setup takes less than 5 minutes.
            </p>
          </div>

          <div className="flex-shrink-0">
            <Link href="/book">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="clay-button-primary group flex items-center gap-3 px-10 py-5 text-xl font-bold font-heading"
              >
                DEPLOY WORKFORCE
                <ArrowRight size={22} className="transition-transform group-hover:translate-x-1" />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
