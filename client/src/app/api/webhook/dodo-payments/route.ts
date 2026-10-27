// ============================================
// DODO PAYMENTS WEBHOOK HANDLER
// ============================================
// Receives and processes webhook events from Dodo Payments
// Handles payment success/failure and subscription lifecycle events
//
// Configure in Dodo Dashboard: Developer > Webhooks
// Set URL to: https://yourdomain.com/api/webhook/dodo-payments

import { Webhooks } from "@dodopayments/nextjs";
import { NextRequest } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";

// Dummy fallback for Next.js static build step where env vars might be missing
const webhookKeyFallback = "whsec_dummyBase64KeyString=";
export const dynamic = "force-dynamic";

async function webhookHandler(req: NextRequest) {
    if (!process.env.DODO_PAYMENTS_WEBHOOK_KEY) {
        return new Response("Webhook not configured", { status: 500 });
    }

    const handler = Webhooks({
        webhookKey: process.env.DODO_PAYMENTS_WEBHOOK_KEY || webhookKeyFallback,

        /**
         * Generic handler — fires for ALL webhook events
         * Use for logging, analytics, or catch-all processing
         */
        onPayload: async (payload) => {
            console.log("[Dodo Webhook] Received event:", (payload as any).type || "unknown");
        },

        // ─── PAYMENT EVENTS ──────────────────────────────────────

        /**
         * Payment succeeded — mark booking as paid, activate services
         */
        onPaymentSucceeded: async (payload) => {
            console.log("[Dodo Webhook] ✅ Payment succeeded");
            const db = getAdminDb();
            if (!db) return;

            try {
                const metadata = (payload.data as any)?.metadata || {};

                // 1. Update booking status
                if (metadata.bookingId) {
                    await db.collection("bookings").doc(metadata.bookingId).update({
                        paymentStatus: "paid",
                        status: "active",
                        updatedAt: new Date(),
                    });
                }

                // 2. Create payment record
                await db.collection("payments").add({
                    paymentId: (payload.data as any).payment_id || "unknown",
                    status: "succeeded",
                    amount: (payload.data as any).total_amount || 0,
                    metadata,
                    createdAt: new Date()
                });

                console.log("[Dodo Webhook] Payment processed and saved to Firestore.");
            } catch (error) {
                console.error("[Dodo Webhook] Error saving payment success:", error);
            }
        },

        /**
         * Payment failed — notify user, log the failure
         */
        onPaymentFailed: async (payload) => {
            console.log("❌ Payment failed");
            const db = getAdminDb();
            if (!db) return;

            try {
                const metadata = (payload.data as any)?.metadata || {};

                if (metadata.bookingId) {
                    await db.collection("bookings").doc(metadata.bookingId).update({
                        paymentStatus: "failed",
                        updatedAt: new Date(),
                    });
                }

                await db.collection("payments").add({
                    paymentId: (payload.data as any).payment_id || "unknown",
                    status: "failed",
                    amount: (payload.data as any).total_amount || 0,
                    metadata,
                    createdAt: new Date()
                });
                console.log("[Dodo Webhook] Payment failure recorded.");
            } catch (error) {
                console.error("[Dodo Webhook] Error saving payment failure:", error);
            }
        },

        /**
         * Payment is processing — update status
         */
        onPaymentProcessing: async (payload) => {
            console.log("[Dodo Webhook] ⏳ Payment processing");
        },

        /**
         * Payment was cancelled
         */
        onPaymentCancelled: async (payload) => {
            console.log("[Dodo Webhook] 🚫 Payment cancelled");
        },

        // ─── SUBSCRIPTION EVENTS ─────────────────────────────────

        /**
         * Subscription activated — operator deployment confirmed
         */
        onSubscriptionActive: async (payload) => {
            console.log("[Dodo Webhook] 🟢 Subscription active");
            const db = getAdminDb();
            if (!db) return;

            try {
                const metadata = (payload.data as any)?.metadata || {};
                if (metadata.userId) {
                    await db.collection("users").doc(metadata.userId).update({
                        subscriptionStatus: "active",
                        operatorSuiteStatus: "active",
                        updatedAt: new Date()
                    });
                }
            } catch (error) {
                console.error("[Dodo Webhook] Error activating subscription:", error);
            }
        },

        /**
         * Subscription renewed — monthly billing cycle
         */
        onSubscriptionRenewed: async (payload) => {
            console.log("[Dodo Webhook] 🔄 Subscription renewed");
        },

        /**
         * Subscription plan changed — upgrade/downgrade
         */
        onSubscriptionPlanChanged: async (payload) => {
            console.log("[Dodo Webhook] 🔀 Plan changed");
            const db = getAdminDb();
            if (!db) return;

            try {
                const metadata = (payload.data as any)?.metadata || {};
                if (metadata.userId) {
                    await db.collection("users").doc(metadata.userId).update({
                        plan: metadata.plan || 'unknown',
                        updatedAt: new Date()
                    });
                }
            } catch (error) {
                console.error("[Dodo Webhook] Error updating plan:", error);
            }
        },

        /**
         * Subscription cancelled — deactivate services
         */
        onSubscriptionCancelled: async (payload) => {
            console.log("[Dodo Webhook] ⛔ Subscription cancelled");
            const db = getAdminDb();
            if (!db) return;

            try {
                const metadata = (payload.data as any)?.metadata || {};
                if (metadata.userId) {
                    await db.collection("users").doc(metadata.userId).update({
                        subscriptionStatus: "cancelled",
                        scheduledDeactivation: new Date() // Normally end of billing cycle
                    });
                }
            } catch (error) {
                console.error("[Dodo Webhook] Error cancelling subscription:", error);
            }
        },

        /**
         * Subscription failed — payment issue
         */
        onSubscriptionFailed: async (payload) => {
            console.log("[Dodo Webhook] 💔 Subscription payment failed");
            const db = getAdminDb();
            if (!db) return;

            try {
                const metadata = (payload.data as any)?.metadata || {};
                if (metadata.bookingId) {
                    await db.collection("bookings").doc(metadata.bookingId).update({
                        paymentStatus: "on_hold",
                        updatedAt: new Date()
                    });
                }
            } catch (error) {
                console.error("[Dodo Webhook] Error handling subscription failure:", error);
            }
        },

        /**
         * Subscription expired
         */
        onSubscriptionExpired: async (payload) => {
            console.log("[Dodo Webhook] ⏰ Subscription expired");
            const db = getAdminDb();
            if (!db) return;

            try {
                const metadata = (payload.data as any)?.metadata || {};
                if (metadata.userId) {
                    await db.collection("users").doc(metadata.userId).update({
                        operatorSuiteStatus: "deactivated",
                        subscriptionStatus: "expired",
                        updatedAt: new Date()
                    });
                }
            } catch (error) {
                console.error("[Dodo Webhook] Error handling subscription expiration:", error);
            }
        },

        // ─── REFUND EVENTS ────────────────────────────────────────

        /**
         * Refund succeeded
         */
        onRefundSucceeded: async (payload) => {
            console.log("[Dodo Webhook] 💰 Refund succeeded");
        },

        /**
         * Refund failed
         */
        onRefundFailed: async (payload) => {
            console.log("[Dodo Webhook] ❗ Refund failed");
        },

        // ─── DISPUTE EVENTS ──────────────────────────────────────

        onDisputeOpened: async (payload) => {
            console.log("[Dodo Webhook] ⚠️ Dispute opened");
        },

        onDisputeWon: async (payload) => {
            console.log("[Dodo Webhook] ✅ Dispute won");
        },

        onDisputeLost: async (payload) => {
            console.log("[Dodo Webhook] ❌ Dispute lost");
        },
    });

    return handler(req);
}

export { webhookHandler as POST };
