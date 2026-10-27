import posthog from 'posthog-js';

export function initPostHog() {
    if (typeof window !== 'undefined') {
        const posthogKey = process.env.NEXT_PUBLIC_POSTHOG_KEY;
        const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://app.posthog.com';

        if (posthogKey) {
            posthog.init(posthogKey, {
                api_host: posthogHost,
                loaded: (posthog) => {
                    // initialization completed
                },
                capture_pageview: false, // We'll manually capture pageviews
                capture_pageleave: true,
                autocapture: true,
            });
        } else {
            console.warn('PostHog key not found. Analytics disabled.');
        }
    }
}

// Track page view
export function trackPageView(pageName?: string) {
    if (typeof window !== 'undefined') {
        try {
            posthog.capture('$pageview', {
                page_name: pageName,
            });
        } catch (error) {
            console.warn('PostHog pageview tracking failed:', error);
        }
    }
}

// Track custom event
export function trackEvent(eventName: string, properties?: Record<string, any>) {
    if (typeof window !== 'undefined') {
        try {
            posthog.capture(eventName, properties);
        } catch (error) {
            console.warn('PostHog event tracking failed:', error);
        }
    }
}

// Identify user
export function identifyUser(userId: string, properties?: Record<string, any>) {
    if (typeof window !== 'undefined') {
        try {
            posthog.identify(userId, properties);
        } catch (error) {
            console.warn('PostHog user identification failed:', error);
        }
    }
}

// Reset user (on logout)
export function resetUser() {
    if (typeof window !== 'undefined') {
        try {
            posthog.reset();
        } catch (error) {
            console.warn('PostHog reset failed:', error);
        }
    }
}

// Track booking submission
export function trackBookingSubmission(plan: string, companyName: string) {
    trackEvent('booking_submitted', {
        plan,
        company_name: companyName,
    });
}

// Track contact form submission
export function trackContactSubmission(subject: string) {
    trackEvent('contact_submitted', {
        subject,
    });
}

// Track user signup
export function trackUserSignup(email: string) {
    trackEvent('user_signup', {
        email,
    });
}

// Track user login
export function trackUserLogin(email: string) {
    trackEvent('user_login', {
        email,
    });
}

// Track checkout initiation
export function trackCheckoutInitiated(plan: string, amount: number) {
    trackEvent('checkout_initiated', {
        plan,
        amount,
        currency: 'USD',
        payment_provider: 'dodo_payments',
    });
}

// Track payment success
export function trackPaymentSuccess(plan: string, amount: number) {
    trackEvent('payment_succeeded', {
        plan,
        amount,
        currency: 'USD',
        payment_provider: 'dodo_payments',
    });
}

// Track payment failure
export function trackPaymentFailed(plan: string, reason?: string) {
    trackEvent('payment_failed', {
        plan,
        reason: reason || 'unknown',
        payment_provider: 'dodo_payments',
    });
}

export default posthog;
