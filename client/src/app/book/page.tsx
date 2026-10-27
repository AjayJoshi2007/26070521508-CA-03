"use client";

import { BookingForm } from "@/components/BookingForm";
import { SoloChiefLogo } from "@/components/SoloChiefLogo";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function BookPage() {
  return (
    <div className="min-h-screen bg-background font-sans transition-colors duration-300">
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute left-[-10%] top-[-10%] h-[60%] w-[60%] rounded-full bg-foreground/5 blur-[120px]"></div>
        <div className="absolute right-[-5%] bottom-[-10%] h-[60%] w-[60%] rounded-full bg-foreground/5 blur-[120px]"></div>
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Minimal top bar — logo + back link, no full header */}
        <div className="w-full px-4 sm:px-6 py-6">
          <div className="mx-auto max-w-4xl flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors group"
            >
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              <span className="text-sm font-medium">Back to Home</span>
            </Link>
            <Link href="/" className="flex items-center gap-2 group">
              <SoloChiefLogo size={32} className="group-hover:scale-105 transition-transform duration-300" />
              <span className="text-lg font-heading font-bold tracking-tight text-foreground">SoloChief</span>
            </Link>
          </div>
        </div>

        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-8 pb-16">
          <div className="mx-auto w-full max-w-4xl px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <motion.div
                initial={{ opacity: 0, rotate: -8 }}
                animate={{ opacity: 1, rotate: -3 }}
                className="inline-block -rotate-3 bg-foreground px-4 py-2 shadow-lg text-sm font-bold text-background mb-6 transform hover:rotate-0 transition-transform cursor-default"
                style={{ boxShadow: "4px 4px 0px rgba(0,0,0,0.1)" }}
              >
                Setup Request
              </motion.div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black text-foreground mb-4">
                Request Your <span className="text-foreground/40">AI Operators</span>
              </h1>
              <p className="text-lg text-foreground/60 max-w-2xl mx-auto font-medium">
                Fill in your company details to request your autonomous workforce setup.
              </p>
            </motion.div>

            <BookingForm />
          </div>
        </main>

        {/* Minimal footer — just copyright, no full footer */}
        <div className="w-full px-4 sm:px-6 py-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} SoloChief. All rights reserved.
        </div>
      </div>
    </div>
  );
}
