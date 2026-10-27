"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { SoloChiefLogo } from "@/components/SoloChiefLogo";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full px-4 sm:px-6 py-2 sm:py-4 transition-all duration-300">
      <nav className="mx-auto flex h-16 sm:h-20 w-full items-center justify-between rounded-3xl clay-card px-4 sm:px-10 border-foreground/10">
        <Link href="/" className="flex items-center gap-2 group">
          <SoloChiefLogo size={32} className="sm:w-[42px] sm:h-[42px] group-hover:scale-105 transition-transform duration-300" />
          <span className="text-xl sm:text-2xl font-heading font-bold tracking-tight text-foreground">SoloChief</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 lg:flex">
          <Link href="/#how-it-works" className="font-medium text-muted-foreground transition-colors hover:text-foreground">
            How It Works
          </Link>
          <Link href="/operators" className="font-medium text-muted-foreground transition-colors hover:text-foreground">
            Operators
          </Link>
          <Link href="/pricing" className="font-medium text-muted-foreground transition-colors hover:text-foreground">
            Pricing
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <button className="clay-button-secondary px-6 py-2.5 font-semibold font-heading tracking-wide">
                Access Terminal
              </button>
            </Link>
            <Link href="/book">
              <button className="clay-button-primary px-6 py-2.5 font-semibold font-heading tracking-wide">
                Deploy Workforce
              </button>
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full bg-background/50 backdrop-blur-md lg:hidden shadow-sm"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={20} className="text-foreground" /> : <Menu size={20} className="text-foreground" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute left-4 right-4 sm:left-6 sm:right-6 lg:left-8 lg:right-8 top-20 sm:top-28 mx-auto max-w-7xl origin-top rounded-3xl clay-card p-6 lg:hidden animate-in fade-in zoom-in-95 duration-200 z-50">
          <div className="flex flex-col space-y-4 text-center">
            <Link
              href="/#how-it-works"
              className="rounded-xl py-3 text-lg font-medium text-foreground hover:bg-foreground/5"
              onClick={() => setIsMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="/operators"
              className="rounded-xl py-3 text-lg font-medium text-foreground hover:bg-foreground/5"
              onClick={() => setIsMenuOpen(false)}
            >
              Operators
            </Link>
            <Link
              href="/pricing"
              className="rounded-xl py-3 text-lg font-medium text-foreground hover:bg-foreground/5"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </Link>
            <div className="flex flex-col gap-3 mt-4">
              <Link href="/login" onClick={() => setIsMenuOpen(false)}>
                <button className="clay-button-secondary w-full py-3 font-semibold font-heading">
                  Access Terminal
                </button>
              </Link>
              <Link href="/book" onClick={() => setIsMenuOpen(false)}>
                <button className="clay-button-primary w-full py-3 font-semibold font-heading">
                  Deploy Workforce
                </button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
