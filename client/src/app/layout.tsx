import type { Metadata, Viewport } from "next";
// Removed unused Google Fonts
import "./globals.css";
import { VisualEditsMessenger } from "orchids-visual-edits";
import ErrorReporter from "@/components/ErrorReporter";
import { GlobalBackground } from "@/components/GlobalBackground";
import { AuthProvider } from "@/contexts/AuthContext";
import { Toaster } from "sonner";
import { PostHogProvider } from "@/components/PostHogProvider";
import { OrganizationSchema, WebsiteSchema } from "@/components/StructuredData";
import { Suspense } from "react";
import { PageTransitionLoader } from "@/components/PageTransitionLoader";
import { CookieConsent } from "@/components/CookieConsent";
import { DodoCheckoutProvider } from "@/components/DodoCheckoutProvider";

// ============================================
// GLOBAL SEO METADATA
// ============================================
const BASE_URL = "https://solochief.com";
const getBaseUrl = () => {
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}`;
  return BASE_URL;
};

export const metadata: Metadata = {
  // Base URL for resolving relative URLs in metadata
  metadataBase: new URL(getBaseUrl()),

  // Title template — every page title will follow this pattern
  title: {
    default: "SoloChief | Autonomous AI Workforce for Businesses",
    template: "%s | SoloChief",
  },

  // Primary meta description (155 chars max for Google)
  description:
    "Replace your entire team with 10 hyper-specialized AI operators. Lead generation, ad design, video production, market intelligence & more. Starting at $498/mo.",

  // SEO keywords
  keywords: [
    "AI operators",
    "AI workforce",
    "business automation tools",
    "AI automation",
    "lead generation AI",
    "AI ad design",
    "AI video production",
    "market intelligence AI",
    "business automation",
    "SoloChief",
    "autonomous AI",
    "AI agents",
    "replace employees with AI",
    "business growth",
    "automation tools",
    "AI business tools",
  ],

  // Author and creator
  authors: [{ name: "SoloChief", url: getBaseUrl() }],
  creator: "SoloChief",
  publisher: "SoloChief",

  // Canonical URL
  alternates: {
    canonical: getBaseUrl(),
  },

  // Robots
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  // Open Graph (Facebook, LinkedIn, etc.)
  openGraph: {
    type: "website",
    locale: "en_US",
    url: getBaseUrl(),
    siteName: "SoloChief",
    title: "SoloChief — Your Autonomous AI Workforce",
    description:
      "10 hyper-specialized AI operators replacing your entire team. Lead generation, content creation, video production, market intelligence, reputation management & domain security. From $498/mo.",
    images: [
      {
        url: "/solochief-logo-social.jpg",
        width: 1200,
        height: 630,
        alt: "SoloChief - Autonomous AI Workforce for Businesses",
        type: "image/jpeg",
      },
    ],
  },

  // Twitter Card
  twitter: {
    card: "summary",
    title: "SoloChief — Your Autonomous AI Workforce",
    description:
      "Replace your entire team with 10 AI operators. Lead gen, ads, videos, intel, reputation & infrastructure. Starting at $498/mo.",
    images: ["/solochief-logo-social.jpg"],
    creator: "@solochief",
  },

  // Favicon & Icons
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: { url: "/solochief-logo.svg", type: "image/svg+xml" },
  },

  // PWA Manifest
  manifest: "/manifest.json",

  // Search Engine Verification (add your IDs when ready)
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
    // yandex: '',
    // yahoo: '',
  },

  // App category
  category: "technology",
};

// Viewport configuration (separated from metadata in Next.js 15)
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAFA" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <head>
        {/* Structured Data for rich search results */}
        <OrganizationSchema />
        <WebsiteSchema />
        {/* Mongolian Baiti Premium Font */}
        <link href="https://db.onlinewebfonts.com/c/0734e5a95f037617b7b1342672a9ee2b?family=Mongolian+Baiti" rel="stylesheet" />
      </head>
      <body
        className={`antialiased font-sans`}
      >

        <ErrorReporter />
        <GlobalBackground />
        <Suspense fallback={null}>
          <PageTransitionLoader />
        </Suspense>
        <PostHogProvider>
          <AuthProvider>
            <DodoCheckoutProvider>
              <div id="main-content">
                {children}
              </div>
              <Toaster position="top-right" richColors />
              <CookieConsent />
            </DodoCheckoutProvider>
          </AuthProvider>
        </PostHogProvider>
        {process.env.NODE_ENV === "development" && <VisualEditsMessenger />}
      </body>
    </html>
  );
}
