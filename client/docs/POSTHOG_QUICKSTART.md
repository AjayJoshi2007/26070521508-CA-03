# PostHog Analytics - Quick Setup

## ✅ Integration Complete!

PostHog analytics has been successfully integrated into your website!

## 🎯 What's Tracking

### Automatic Tracking:
- ✅ **Page Views** - Every page visit
- ✅ **Route Changes** - Navigation between pages
- ✅ **User Sessions** - Session duration and behavior

### Custom Events:
- ✅ **Booking Submitted** - When users complete a booking (includes plan & company)
- ✅ **Contact Submitted** - When users send a contact message (includes subject)
- ✅ **User Signup** - When new users create an account
- ✅ **User Login** - When users sign in

## 🚀 Quick Setup (3 Steps)

### 1. Create PostHog Account
- Go to: https://app.posthog.com/signup
- Sign up (free tier available)
- Create a new project

### 2. Get Your API Key
- In PostHog dashboard → **Project Settings**
- Copy your **Project API Key** (starts with `phc_`)
- Copy your **Instance Address** (usually `https://app.posthog.com`)

### 3. Update Environment Variables
Edit `.env.local`:
```env
NEXT_PUBLIC_POSTHOG_KEY=phc_your_actual_key_here
NEXT_PUBLIC_POSTHOG_HOST=https://app.posthog.com
```

Then restart:
```bash
npm run dev
```

## 📊 View Your Analytics

1. Go to PostHog dashboard
2. Click **Events** to see all tracked events
3. Click **Insights** to create custom reports
4. Click **Dashboards** to visualize data

## 📁 Files Created

- `src/lib/posthog.ts` - Analytics helper functions
- `src/components/PostHogProvider.tsx` - Provider component
- `POSTHOG_INTEGRATION.md` - Full documentation

## 📈 Key Metrics You Can Track

### Conversion Funnel:
1. Homepage visit → Pricing page → Booking submitted
2. Track conversion rate at each step

### User Engagement:
- Most visited pages
- Time spent on site
- Return visitor rate

### Business Metrics:
- Bookings by plan (CORE vs PRIME vs APEX)
- Contact form conversion
- User signup rate

## 🔧 Files Updated

- ✅ `src/app/layout.tsx` - Added PostHogProvider
- ✅ `src/components/BookingForm.tsx` - Track bookings
- ✅ `src/app/contact/page.tsx` - Track contacts
- ✅ `src/app/login/page.tsx` - Track signups/logins
- ✅ `.env.local` - Added PostHog config

## ✨ That's It!

Just add your PostHog API key to `.env.local` and you're ready to track user behavior!

For detailed documentation, see: **POSTHOG_INTEGRATION.md**
