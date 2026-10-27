# PostHog Analytics Integration Guide

## 🎯 What is PostHog?

PostHog is an open-source product analytics platform that helps you understand how users interact with your website. It tracks:
- Page views
- User events (bookings, contacts, signups)
- User behavior and funnels
- Session recordings
- Feature flags

## ✅ What's Been Integrated

### 1. **Automatic Page Tracking**
- Every page view is automatically tracked
- Route changes are captured
- No manual tracking needed for navigation

### 2. **Event Tracking**
We're tracking these key events:
- ✅ **Booking Submissions** - When users complete a booking
- ✅ **Contact Form Submissions** - When users send a message
- ✅ **User Signups** - When new users create accounts
- ✅ **User Logins** - When users sign in

### 3. **User Identification**
- Users are identified after login
- Track user journey across sessions
- Link events to specific users

## 🚀 Setup Instructions

### Step 1: Create PostHog Account

1. Go to [https://app.posthog.com/signup](https://app.posthog.com/signup)
2. Sign up for a free account
3. Create a new project
4. Choose "Web" as your platform

### Step 2: Get Your API Key

1. In PostHog dashboard, go to **Project Settings**
2. Click on **Project API Key**
3. Copy your **Project API Key**
4. Copy your **Instance Address** (usually `https://app.posthog.com`)

### Step 3: Configure Environment Variables

Update your `.env.local` file:

```env
# PostHog Configuration
NEXT_PUBLIC_POSTHOG_KEY=phc_your_actual_api_key_here
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

**Important:** 
- Replace `phc_your_actual_api_key_here` with your real API key
- If you're self-hosting PostHog, update the HOST URL

### Step 4: Restart Dev Server

```bash
# Stop current server (Ctrl+C)
npm run dev
```

### Step 5: Verify It's Working

1. Open your website in browser
2. Navigate to a few pages
3. Submit a test booking or contact form
4. Go to PostHog dashboard → **Events**
5. You should see events appearing!

## 📊 Events Being Tracked

### Automatic Events:
- `$pageview` - Every page visit
- `$pageleave` - When user leaves a page
- Auto-captured clicks and interactions

### Custom Events:

#### 1. Booking Submitted
```javascript
Event: "booking_submitted"
Properties:
  - plan: "CORE" | "PRIME" | "APEX"
  - company_name: string
```

#### 2. Contact Submitted
```javascript
Event: "contact_submitted"
Properties:
  - subject: string
```

#### 3. User Signup
```javascript
Event: "user_signup"
Properties:
  - email: string
```

#### 4. User Login
```javascript
Event: "user_login"
Properties:
  - email: string
```

## 📁 Files Created

- ✅ `src/lib/posthog.ts` - PostHog helper functions
- ✅ `src/components/PostHogProvider.tsx` - Provider component
- ✅ `.env.posthog.template` - Environment template

## 📈 Using PostHog Dashboard

### View Events
1. Go to PostHog dashboard
2. Click **Events** in sidebar
3. See all tracked events in real-time

### Create Insights
1. Click **Insights** → **New Insight**
2. Choose event type (e.g., "booking_submitted")
3. Add filters and breakdowns
4. Save to dashboard

### Track Conversions
1. Click **Funnels** → **New Funnel**
2. Add steps:
   - Step 1: Page view `/pricing`
   - Step 2: Event `booking_submitted`
3. See conversion rate!

### Session Recordings
1. Go to **Session Recordings**
2. Enable recordings in project settings
3. Watch how users interact with your site

## 🔧 Advanced Features

### Track Custom Events

Add to any component:

```typescript
import { trackEvent } from '@/lib/posthog';

// Track custom event
trackEvent('button_clicked', {
  button_name: 'Get Started',
  page: '/pricing'
});
```

### Identify Users

```typescript
import { identifyUser } from '@/lib/posthog';

// After user logs in
identifyUser(user.id, {
  email: user.email,
  name: user.name,
  plan: 'CORE'
});
```

### Reset on Logout

```typescript
import { resetUser } from '@/lib/posthog';

// When user logs out
resetUser();
```

## 🎯 Key Metrics to Track

### Conversion Funnel:
1. Homepage visit
2. Pricing page visit
3. Booking form started
4. Booking submitted

### Engagement Metrics:
- Pages per session
- Time on site
- Bounce rate
- Return visitors

### Business Metrics:
- Bookings by plan (CORE vs PRIME vs APEX)
- Contact form submissions
- User signups
- Login frequency

## 🔒 Privacy & GDPR

PostHog is GDPR compliant and privacy-friendly:
- ✅ Self-hosting option available
- ✅ No third-party data sharing
- ✅ User data control
- ✅ Cookie consent integration available

### Add Cookie Consent (Optional)

If you need cookie consent, you can:
1. Install a consent manager
2. Initialize PostHog only after consent
3. Use PostHog's opt-out features

## 🐛 Troubleshooting

### Events Not Showing Up?

1. **Check API Key**
   - Make sure it's correct in `.env.local`
   - Should start with `phc_`

2. **Check Browser Console**
   - Open DevTools → Console
   - Look for PostHog initialization message
   - Check for errors

3. **Verify Environment Variables**
   ```bash
   # Restart dev server
   npm run dev
   ```

4. **Check PostHog Dashboard**
   - Go to Project Settings
   - Verify project is active
   - Check if events are being received

### PostHog Not Initializing?

- Make sure `.env.local` has the correct variables
- Check that variables start with `NEXT_PUBLIC_`
- Restart your development server

## 📚 Additional Resources

- **PostHog Docs**: [https://posthog.com/docs](https://posthog.com/docs)
- **Event Tracking Guide**: [https://posthog.com/docs/integrate/client/js](https://posthog.com/docs/integrate/client/js)
- **Tutorials**: [https://posthog.com/tutorials](https://posthog.com/tutorials)

## ✅ Integration Checklist

- [ ] Created PostHog account
- [ ] Got API key from dashboard
- [ ] Updated `.env.local` with real credentials
- [ ] Restarted dev server
- [ ] Verified events in PostHog dashboard
- [ ] Set up key insights/funnels
- [ ] Configured session recordings (optional)

---

**Status**: ✅ PostHog is fully integrated and ready to use!

Just add your API key to `.env.local` and restart the server to start tracking!
