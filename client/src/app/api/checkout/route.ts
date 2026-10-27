// ============================================
// CHECKOUT API ROUTE HANDLER
// ============================================
// Handles checkout creation using @dodopayments/nextjs adaptor
// Supports both static (GET) and dynamic/session (POST) checkout

import { Checkout } from "@dodopayments/nextjs";

/**
 * GET /api/checkout?productId=pdt_xxx
 * Static checkout — redirects to Dodo Payments hosted checkout
 */
export const GET = Checkout({
    bearerToken: process.env.DODO_PAYMENTS_API_KEY!,
    returnUrl: process.env.DODO_PAYMENTS_RETURN_URL || "https://solochief.com/checkout/success",
    environment: (process.env.DODO_PAYMENTS_ENVIRONMENT as "test_mode" | "live_mode") || "test_mode",
    type: "static",
});

/**
 * POST /api/checkout
 * Dynamic checkout — creates a checkout session with customer details
 * 
 * Request body:
 * {
 *   product_id: string,
 *   customer: { email: string, name: string },
 *   quantity?: number,
 *   metadata?: Record<string, string>,
 *   return_url?: string
 * }
 */
export const POST = Checkout({
    bearerToken: process.env.DODO_PAYMENTS_API_KEY!,
    returnUrl: process.env.DODO_PAYMENTS_RETURN_URL || "https://solochief.com/checkout/success",
    environment: (process.env.DODO_PAYMENTS_ENVIRONMENT as "test_mode" | "live_mode") || "test_mode",
    type: "dynamic",
});
