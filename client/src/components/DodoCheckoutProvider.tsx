"use client";

// ============================================
// DODO CHECKOUT PROVIDER
// ============================================
// Initializes Dodo Payments overlay checkout SDK globally
// Must be rendered in the app layout to make checkout available everywhere

import { useEffect, useRef } from "react";

interface DodoCheckoutProviderProps {
    children: React.ReactNode;
}

/**
 * Provider component that initializes the Dodo Payments checkout SDK
 * Place this in your root layout to enable checkout across the entire app
 */
export function DodoCheckoutProvider({ children }: DodoCheckoutProviderProps) {
    const initialized = useRef(false);

    useEffect(() => {
        if (initialized.current) return;
        initialized.current = true;

        const initCheckout = async () => {
            try {
                const { DodoPayments } = await import("dodopayments-checkout");

                const mode = process.env.NEXT_PUBLIC_DODO_PAYMENTS_MODE === "live" ? "live" : "test";

                DodoPayments.Initialize({
                    mode,
                    displayType: "overlay",
                    onEvent: (event: any) => {
                        switch (event.event_type) {
                            case "checkout.opened":
                                console.log("[DodoCheckout] Checkout opened");
                                break;
                            case "checkout.closed":
                                console.log("[DodoCheckout] Checkout closed");
                                break;
                            case "checkout.status":
                                const status = event.data?.message?.status;
                                console.log("[DodoCheckout] Status:", status);
                                if (status === "succeeded") {
                                    // Payment succeeded — redirect is handled by Dodo
                                    console.log("[DodoCheckout] ✅ Payment succeeded");
                                }
                                break;
                            case "checkout.error":
                                console.error("[DodoCheckout] Error:", event.data?.message);
                                break;
                            case "checkout.link_expired":
                                console.warn("[DodoCheckout] Checkout link expired");
                                break;
                        }
                    },
                });

                console.log(`[DodoCheckout] SDK initialized in ${mode} mode`);
            } catch (error) {
                console.error("[DodoCheckout] Failed to initialize SDK:", error);
            }
        };

        initCheckout();
    }, []);

    return <>{children}</>;
}

/**
 * Helper function to open the Dodo checkout overlay
 * Can be called from any component after the provider has initialized
 * 
 * @param checkoutUrl - The checkout URL returned from the /api/checkout endpoint
 */
export async function openDodoCheckout(checkoutUrl: string) {
    try {
        const { DodoPayments } = await import("dodopayments-checkout");
        DodoPayments.Checkout.open({
            checkoutUrl,
            options: {
                showTimer: true,
                showSecurityBadge: true,
            },
        });
    } catch (error) {
        console.error("[DodoCheckout] Failed to open checkout:", error);
        // Fallback: redirect to checkout URL
        window.location.href = checkoutUrl;
    }
}

/**
 * Helper function to close the overlay checkout
 */
export async function closeDodoCheckout() {
    try {
        const { DodoPayments } = await import("dodopayments-checkout");
        DodoPayments.Checkout.close();
    } catch (error) {
        console.error("[DodoCheckout] Failed to close checkout:", error);
    }
}
