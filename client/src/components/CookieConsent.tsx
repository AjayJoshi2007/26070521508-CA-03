"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X } from "lucide-react";
import { saveCookiePreferences, getCookiePreferences } from "@/lib/firestore";
import { v4 as uuidv4 } from "uuid";

// Extend Window interface for Google Analytics dataLayer
declare global {
  interface Window {
    dataLayer?: any[];
  }
}

const COOKIE_NAME = "__cookie_consent";
const ANONYMOUS_ID_NAME = "__anonymous_id";

interface CookiePreferences {
  analytics: boolean;
  marketing: boolean;
  necessary: boolean;
}

export function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [anonymousId, setAnonymousId] = useState("");

  useEffect(() => {
    initializeCookieConsent();
  }, []);

  const initializeCookieConsent = async () => {
    try {
      // Get or create anonymous ID
      let id = localStorage.getItem(ANONYMOUS_ID_NAME);
      if (!id) {
        id = uuidv4();
        localStorage.setItem(ANONYMOUS_ID_NAME, id);
      }
      setAnonymousId(id ?? "");

      // Check localStorage first (for quick load)
      const consent = localStorage.getItem(COOKIE_NAME);
      if (consent) {
        try {
          const saved = JSON.parse(consent);
          applyConsent(saved);
          return;
        } catch (e) {
          console.error("Failed to parse localStorage consent:", e);
        }
      }

      // Try to fetch from Firebase
      const fbPreferences = await getCookiePreferences(id ?? "");
      if (fbPreferences) {
        const prefs = {
          necessary: fbPreferences.necessary,
          analytics: fbPreferences.analytics,
          marketing: fbPreferences.marketing,
        };
        localStorage.setItem(COOKIE_NAME, JSON.stringify(prefs));
        applyConsent(prefs);
      } else {
        // First time user - show banner
        setIsVisible(true);
      }
    } catch (error) {
      console.error("Failed to initialize cookie consent:", error);
      setIsVisible(true);
    }
  };

  const applyConsent = (prefs: CookiePreferences) => {
    // Update Google Analytics consent
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      function gtag(...args: any[]) {
        window.dataLayer?.push(arguments);
      }
      gtag("consent", "update", {
        analytics_storage: prefs.analytics ? "granted" : "denied",
        ad_storage: prefs.marketing ? "granted" : "denied",
      });
    }

    // Update PostHog consent
    if (typeof window !== "undefined" && (window as any).posthog) {
      if (prefs.analytics) {
        (window as any).posthog.opt_in_capturing();
      } else {
        (window as any).posthog.opt_out_capturing();
      }
    }
  };

  const saveAndClose = async (prefs: CookiePreferences) => {
    try {
      localStorage.setItem(COOKIE_NAME, JSON.stringify(prefs));

      // Save to Firebase
      if (anonymousId) {
        await saveCookiePreferences(
          {
            anonymousId,
            necessary: true,
            analytics: prefs.analytics,
            marketing: prefs.marketing,
          },
          anonymousId
        );
      }

      applyConsent(prefs);
      setIsVisible(false);
    } catch (error) {
      console.error("Failed to save preferences:", error);
      setIsVisible(false);
    }
  };

  const handleAcceptAll = () => {
    saveAndClose({ necessary: true, analytics: true, marketing: true });
  };

  const handleRejectNonEssential = () => {
    saveAndClose({ necessary: true, analytics: false, marketing: false });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 80 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-6 z-50"
        >
          <div className="mx-auto max-w-3xl rounded-2xl bg-background/95 backdrop-blur-md border border-foreground/10 shadow-2xl px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            {/* Icon + Text */}
            <div className="flex items-start gap-3 flex-1 min-w-0">
              <div className="p-2 rounded-lg bg-primary/10 shrink-0 mt-0.5">
                <Cookie size={16} className="text-primary" />
              </div>
              <p className="text-xs text-foreground/70 font-medium leading-relaxed">
                We use cookies to improve your experience and analyze site usage.
                Read our{" "}
                <a
                  href="/privacy"
                  className="text-primary font-bold hover:underline"
                >
                  privacy policy
                </a>
                .
              </p>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-2 shrink-0 w-full sm:w-auto">
              <button
                onClick={handleRejectNonEssential}
                className="flex-1 sm:flex-none px-4 py-2 text-xs font-bold rounded-xl border border-foreground/15 text-foreground/70 hover:bg-foreground/5 transition-colors"
              >
                Reject
              </button>
              <button
                onClick={handleAcceptAll}
                className="flex-1 sm:flex-none px-4 py-2 text-xs font-bold rounded-xl bg-foreground text-background hover:bg-foreground/90 transition-colors"
              >
                Accept All
              </button>
              <button
                onClick={() => setIsVisible(false)}
                className="p-1.5 rounded-lg hover:bg-foreground/5 transition-colors sm:hidden"
                aria-label="Close"
              >
                <X size={14} className="text-foreground/40" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
