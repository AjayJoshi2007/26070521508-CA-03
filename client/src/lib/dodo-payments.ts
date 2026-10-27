// ============================================
// DODO PAYMENTS CONFIGURATION
// ============================================
// Centralized configuration for Dodo Payments integration
// Provides product IDs, environment detection, and helper types

/**
 * Dodo Payments environment mode
 * 'test_mode' for development/testing, 'live_mode' for production
 */
export const DODO_ENV = process.env.DODO_PAYMENTS_ENVIRONMENT || 'test_mode';

/**
 * Whether we're in test mode
 */
export const IS_TEST_MODE = DODO_ENV === 'test_mode';

/**
 * Product IDs for each plan — configured in Dodo Payments Dashboard
 * 
 * IMPORTANT: Replace these placeholder IDs with actual product IDs
 * from your Dodo Payments Dashboard (app.dodopayments.com)
 * 
 * Navigate to: Products > Create Product > Copy Product ID
 */
export const PLAN_PRODUCT_IDS = {
    CORE: process.env.NEXT_PUBLIC_DODO_PRODUCT_CORE || 'pdt_0NZtCUzKHdTTzJprcHUAN',
    PRIME: process.env.NEXT_PUBLIC_DODO_PRODUCT_PRIME || 'pdt_0NZtCV39Uf5HuiDj8Imfp',
    APEX: process.env.NEXT_PUBLIC_DODO_PRODUCT_APEX || 'pdt_0NZtCV4VLxZIDs60iu3mm',
} as const;

/**
 * Plan type
 */
export type PlanType = keyof typeof PLAN_PRODUCT_IDS;

/**
 * Plan pricing (in cents for API, display in dollars)
 */
export const PLAN_PRICING: Record<PlanType, { priceCents: number; priceDisplay: string; period: string }> = {
    CORE: { priceCents: 49800, priceDisplay: '$498', period: '/month' },
    PRIME: { priceCents: 89800, priceDisplay: '$898', period: '/month' },
    APEX: { priceCents: 149800, priceDisplay: '$1,498', period: '/month' },
};

/**
 * Checkout return URLs
 */
export const CHECKOUT_URLS = {
    success: process.env.DODO_PAYMENTS_RETURN_URL || `https://solochief.com/checkout/success`,
    failure: `https://solochief.com/checkout/failure`,
};

/**
 * Payment status types from Dodo Payments
 */
export type PaymentStatus = 'succeeded' | 'failed' | 'processing' | 'cancelled' | 'refunded';

/**
 * Webhook event types we handle
 */
export type WebhookEventType =
    | 'payment.succeeded'
    | 'payment.failed'
    | 'payment.processing'
    | 'payment.cancelled'
    | 'subscription.active'
    | 'subscription.cancelled'
    | 'subscription.renewed'
    | 'subscription.failed'
    | 'subscription.expired'
    | 'refund.succeeded'
    | 'refund.failed';

/**
 * Payment record stored in Firestore
 */
export interface PaymentRecord {
    id?: string;
    userId: string;
    bookingId: string;
    plan: PlanType;
    amount: number;
    currency: string;
    status: PaymentStatus;
    dodopaymentId?: string;
    checkoutSessionId?: string;
    customerEmail: string;
    customerName: string;
    metadata?: Record<string, string>;
    createdAt?: any; // Firestore Timestamp
    updatedAt?: any; // Firestore Timestamp
}
