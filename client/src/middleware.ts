import { NextRequest, NextResponse } from 'next/server';

// ============================================
// PROTECTED ROUTE PATTERNS
// ============================================
const PROTECTED_ROUTES = ['/dashboard', '/admin'];

/**
 * Checks whether the incoming request path starts with any protected prefix.
 */
function isProtectedRoute(pathname: string): boolean {
    return PROTECTED_ROUTES.some((route) => pathname.startsWith(route));
}

// ============================================
// CONTENT SECURITY POLICY
// ============================================
function buildCSP(): string {
    const localApi = process.env.NODE_ENV === 'production'
        ? ''
        : ' http://localhost:5000 http://127.0.0.1:5000';
    const directives = [
        // Default: only allow same-origin
        "default-src 'self'",

        // Scripts: self, inline (for Next.js hydration), eval (for dev), GA, PostHog, Firebase
        `script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://*.posthog.com https://apis.google.com https://*.firebaseio.com`,

        // Styles: self + inline (Tailwind injects inline styles)
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://db.onlinewebfonts.com",

        // Images: self + data URIs + any HTTPS source (for remote images)
        "img-src 'self' data: blob: https: http:",

        // Fonts: self + Google Fonts CDN
        "font-src 'self' https://fonts.gstatic.com https://db.onlinewebfonts.com data:",

        // Connect (XHR/fetch): self + analytics + Firebase + Dodo Payments
        `connect-src 'self'${localApi} https://www.google-analytics.com https://analytics.google.com https://*.posthog.com https://*.googleapis.com https://*.firebaseio.com https://*.firebaseapp.com wss://*.firebaseio.com https://firestore.googleapis.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://*.dodopayments.com https://checkout.dodopayments.com https://test.dodopayments.com https://api.dodopayments.com`,

        // Frames: only Firebase auth popups + Dodo Payments checkout
        "frame-src 'self' https://*.firebaseapp.com https://accounts.google.com https://checkout.dodopayments.com https://*.dodopayments.com",

        // Object/media
        "object-src 'none'",
        "media-src 'self'",

        // Base URI restriction
        "base-uri 'self'",

        // Form action
        "form-action 'self'",

        // Frame ancestors — prevents clickjacking
        "frame-ancestors 'self'",

        // Upgrade insecure requests in production
        ...(process.env.NODE_ENV === 'production' ? ['upgrade-insecure-requests'] : []),
    ];

    return directives.join('; ');
}

// ============================================
// SECURITY HEADERS
// ============================================
function applySecurityHeaders(response: NextResponse): void {
    const csp = buildCSP();

    // Content-Security-Policy
    response.headers.set('Content-Security-Policy', csp);

    // Prevent MIME-type sniffing
    response.headers.set('X-Content-Type-Options', 'nosniff');

    // Clickjacking protection (legacy, CSP frame-ancestors is the modern replacement)
    response.headers.set('X-Frame-Options', 'SAMEORIGIN');

    // XSS protection (legacy but still useful for older browsers)
    response.headers.set('X-XSS-Protection', '1; mode=block');

    // Referrer policy
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

    // Permissions policy — disable unused browser features
    response.headers.set(
        'Permissions-Policy',
        'camera=(), microphone=(), geolocation=(), interest-cohort=()'
    );

    // HSTS — force HTTPS (only in production)
    if (process.env.NODE_ENV === 'production') {
        response.headers.set(
            'Strict-Transport-Security',
            'max-age=63072000; includeSubDomains; preload'
        );
    }
}

// ============================================
// MIDDLEWARE HANDLER
// ============================================
export function middleware(request: NextRequest) {
    try {
        const { pathname } = request.nextUrl;

        // --- Route Protection ---
        if (isProtectedRoute(pathname)) {
            // The JWT is kept client-side; this cookie is only a lightweight
            // indicator set after successful login for the middleware gate.
            // This is a "best-effort gate" — the real auth check still happens 
            // client-side via AuthProvider. The middleware prevents the initial 
            // HTML from being served to bots / direct URL visitors without a session.
            const sessionCookie = request.cookies.get('__session')?.value;

            if (!sessionCookie) {
                const loginUrl = new URL('/login', request.url);
                loginUrl.searchParams.set('redirect', pathname);
                const redirectResponse = NextResponse.redirect(loginUrl);
                applySecurityHeaders(redirectResponse);
                return redirectResponse;
            }
        }

        // --- Apply Security Headers to every response ---
        const response = NextResponse.next();
        applySecurityHeaders(response);
        return response;
    } catch {
        // If ANYTHING fails in middleware (malformed cookie, CSP build, URL parse),
        // let the request through rather than returning a 500 Internal Server Error.
        return NextResponse.next();
    }
}

// ============================================
// MATCHER — run middleware on all routes except static assets
// ============================================
export const config = {
    matcher: [
        /*
         * Match all request paths EXCEPT:
         * - _next/static  (static files)
         * - _next/image   (image optimization)
         * - favicon.ico   (favicon)
         * - public files  (SVGs, images, etc.)
         */
        '/((?!_next/static|_next/image|favicon\\.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)',
    ],
};
