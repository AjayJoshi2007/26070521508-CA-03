"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { AnimatedSoloChiefLogo } from "@/components/AnimatedSoloChiefLogo";

// Minimum time (ms) the loader stays visible so the logo animation is appreciated
const MIN_DISPLAY_TIME = 1200;

export function PageTransitionLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [isVisible, setIsVisible] = useState(true);
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const prevPathRef = useRef(pathname);
  const showTimeRef = useRef<number>(Date.now());
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const initialLoadRef = useRef(true);

  // Helper to show the loader
  const showLoader = useCallback(() => {
    showTimeRef.current = Date.now();
    setIsLoading(true);
    setIsVisible(true);
  }, []);

  // Helper to hide the loader with min display time
  const hideLoader = useCallback(() => {
    const elapsed = Date.now() - showTimeRef.current;
    const remaining = Math.max(0, MIN_DISPLAY_TIME - elapsed);

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = setTimeout(() => {
        setIsLoading(false);
      }, 700); // Wait for blur-out animation
    }, remaining);
  }, []);

  // 1. INITIAL PAGE LOAD
  useEffect(() => {
    if (!initialLoadRef.current) return;
    initialLoadRef.current = false;

    const onReady = () => hideLoader();

    if (document.readyState === "complete") {
      onReady();
    } else {
      window.addEventListener("load", onReady, { once: true });
      const fallback = setTimeout(onReady, 3000);
      return () => {
        window.removeEventListener("load", onReady);
        clearTimeout(fallback);
      };
    }
  }, [hideLoader]);

  // 2. LINK CLICKS — intercept internal link clicks
  const handleLinkClick = useCallback(
    (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest("a");
      if (!target) return;

      const href = target.getAttribute("href");
      if (!href) return;

      if (
        href.startsWith("http") ||
        href.startsWith("mailto") ||
        href.startsWith("tel") ||
        href === "#" ||
        (href.startsWith("#") && !href.includes("/"))
      ) {
        return;
      }

      const targetPath = href.split("#")[0] || "/";
      if (targetPath === pathname) return;

      showLoader();
    },
    [pathname, showLoader]
  );

  useEffect(() => {
    document.addEventListener("click", handleLinkClick, true);
    return () => {
      document.removeEventListener("click", handleLinkClick, true);
    };
  }, [handleLinkClick]);

  // 3. BROWSER BACK/FORWARD
  useEffect(() => {
    const handlePopState = () => showLoader();
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [showLoader]);

  // When pathname changes, hide the loader
  useEffect(() => {
    if (prevPathRef.current !== pathname) {
      prevPathRef.current = pathname;
      hideLoader();
    }
  }, [pathname, searchParams, hideLoader]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, []);

  // Apply blur to the page content when loading
  useEffect(() => {
    const main = document.getElementById("main-content");
    if (main) {
      if (isLoading && isVisible) {
        main.style.transition = "filter 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
        main.style.filter = "blur(12px) saturate(0.7)";
        main.style.pointerEvents = "none";
      } else if (isLoading && !isVisible) {
        // Unblurring
        main.style.transition = "filter 0.5s cubic-bezier(0.16, 1, 0.3, 1)";
        main.style.filter = "blur(0px) saturate(1)";
        main.style.pointerEvents = "";
      } else {
        main.style.filter = "";
        main.style.transition = "";
        main.style.pointerEvents = "";
      }
    }
  }, [isLoading, isVisible]);

  if (!isLoading) return null;

  return (
    <div
      className={`ptr-loader ${isVisible ? "ptr-visible" : "ptr-hidden"}`}
      aria-live="polite"
      aria-label="Loading page"
    >
      <div className={`ptr-logo ${isVisible ? "ptr-logo-in" : "ptr-logo-out"}`}>
        <AnimatedSoloChiefLogo size={80} animate={true} loop={true} />
      </div>

      <style>{`
        .ptr-loader {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }

        .ptr-logo {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          will-change: transform, opacity;
        }

        .ptr-logo-in {
          animation: ptrLogoEnter 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }

        .ptr-logo-out {
          animation: ptrLogoExit 0.4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
        }

        @keyframes ptrLogoEnter {
          0% {
            opacity: 0;
            transform: scale(0.7) translateY(10px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes ptrLogoExit {
          0% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
          100% {
            opacity: 0;
            transform: scale(0.85) translateY(-8px);
          }
        }
      `}</style>
    </div>
  );
}
