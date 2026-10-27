// ============================================
// CUSTOMER PORTAL API ROUTE HANDLER
// ============================================
// Allows customers to manage their subscriptions and payment details
// via the Dodo Payments hosted customer portal

import { CustomerPortal } from "@dodopayments/nextjs";

/**
 * GET /api/customer-portal?customer_id=cus_xxx&send_email=true
 * 
 * Opens/sends the customer portal link for managing subscriptions
 */
export const GET = CustomerPortal({
    bearerToken: process.env.DODO_PAYMENTS_API_KEY!,
    environment: (process.env.DODO_PAYMENTS_ENVIRONMENT as "test_mode" | "live_mode") || "test_mode",
});
