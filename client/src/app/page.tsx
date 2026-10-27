import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { WhatIsOaaS } from "@/components/WhatIsOaaS";
import { SaaSvsOaaS } from "@/components/SaaSvsOaaS";
import { HowItWorks } from "@/components/HowItWorks";
import { SecuritySection } from "@/components/SecuritySection";
import { HeadquartersSystem } from "@/components/HeadquartersSystem";
import { AIOperations } from "@/components/AIOperations";
import { CTASection } from "@/components/CTASection";
import { Footer } from "@/components/Footer";
import { SoftwareApplicationSchema } from "@/components/StructuredData";

export const metadata: Metadata = {
  title: "SoloChief | Autonomous AI Workforce for Businesses",
  description:
    "Replace your entire team with 10 hyper-specialized AI operators. Lead generation, ad design, video production, market intelligence, reputation management & domain infrastructure. Starting at $498/mo.",
  openGraph: {
    title: "SoloChief — Your Autonomous AI Workforce",
    description:
      "10 AI operators working 24/7 to run your business. No employees, no overhead, no limits.",
    url: "https://solochief.com",
    images: [
      {
        url: "/solochief-logo-social.jpg",
        width: 1200,
        height: 630,
        alt: "SoloChief - Autonomous AI Workforce",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "SoloChief — Your Autonomous AI Workforce",
    description:
      "Replace your entire team with 10 AI operators. Starting at $498/mo.",
    images: ["/solochief-logo-social.jpg"],
  },
  alternates: {
    canonical: "https://solochief.com",
  },
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background font-sans transition-colors duration-300">
      {/* Structured Data for rich search results */}
      <SoftwareApplicationSchema />

      {/* Global Background is now in layout.tsx */}

      <div className="relative z-10 flex flex-col gap-10">
        <Header />
        <main className="flex-1 flex flex-col gap-10">
          <Hero />
          <WhatIsOaaS />

          <SaaSvsOaaS />
          <HowItWorks />
          <SecuritySection />
          <HeadquartersSystem />
          <AIOperations />

          <CTASection />
        </main>
        <Footer />
      </div>
    </div>
  );
}
