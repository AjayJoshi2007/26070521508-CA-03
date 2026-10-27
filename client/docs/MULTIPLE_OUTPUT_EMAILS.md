# Multiple Output Emails Feature

## ✅ Feature Implemented!

Users can now select multiple output emails based on their plan tier!

## 📧 Email Limits by Plan

### CORE Plan
- **1 Email** (Required)
- Primary output email only

### PRIME Plan
- **3 Emails Total**
  - 1 Required (Primary)
  - 2 Optional (Secondary & Third)

### APEX Plan
- **5 Emails Total**
  - 1 Required (Primary)
  - 4 Optional (Secondary, Third, Fourth, Fifth)

## 🎯 How It Works

### User Experience:
1. User selects a plan (CORE, PRIME, or APEX)
2. Form dynamically shows email fields based on plan:
   - **CORE**: Shows 1 email field
   - **PRIME**: Shows 3 email fields (1 required, 2 optional)
   - **APEX**: Shows 5 email fields (1 required, 4 optional)
3. User fills in email addresses
4. All emails are saved to the database

### Database Storage:
- `output_email` - Primary email (required for all plans)
- `output_email_2` - Secondary email (optional)
- `output_email_3` - Third email (optional)
- `output_email_4` - Fourth email (optional)
- `output_email_5` - Fifth email (optional)

## 📁 Files Updated

### 1. **Booking Form** (`src/components/BookingForm.tsx`)
- ✅ Updated form schema to include 5 email fields
- ✅ Added conditional rendering based on selected plan
- ✅ Updated validation logic
- ✅ Updated database save to include all emails
- ✅ Added visual indicators (required/optional labels)

### 2. **Database Migration** (`supabase/migrations/20260212_add_multiple_output_emails.sql`)
- ✅ Added 4 new columns to `bookings` table
- ✅ Added column comments for documentation

### 3. **TypeScript Interface** (`src/lib/supabase.ts`)
- ✅ Updated `Booking` interface with new email fields

## 🗄️ Database Schema Update

Run this SQL in your Supabase dashboard:

```sql
-- Add additional output email columns to bookings table
ALTER TABLE bookings 
ADD COLUMN IF NOT EXISTS output_email_2 TEXT,
ADD COLUMN IF NOT EXISTS output_email_3 TEXT,
ADD COLUMN IF NOT EXISTS output_email_4 TEXT,
ADD COLUMN IF NOT EXISTS output_email_5 TEXT;
```

**Location**: `supabase/migrations/20260212_add_multiple_output_emails.sql`

## 🎨 UI Features

### Visual Indicators:
- **Required fields**: Red asterisk (*)
- **Optional fields**: Gray "(Optional)" label
- **Plan-based visibility**: Fields appear/disappear based on plan selection

### Form Behavior:
- Switching plans dynamically shows/hides email fields
- All fields have proper validation
- Clear placeholder text for each email
- Error messages for invalid emails

## 📊 Example Usage

### CORE Plan Booking:
```
Output Email 1: primary@company.com (Required)
```

### PRIME Plan Booking:
```
Output Email 1: primary@company.com (Required)
Output Email 2: secondary@company.com (Optional)
Output Email 3: third@company.com (Optional)
```

### APEX Plan Booking:
```
Output Email 1: primary@company.com (Required)
Output Email 2: secondary@company.com (Optional)
Output Email 3: third@company.com (Optional)
Output Email 4: fourth@company.com (Optional)
Output Email 5: fifth@company.com (Optional)
```

## 🔧 Technical Details

### Form Validation:
- Email 1: Always required
- Emails 2-5: Optional, but validated if filled
- Empty optional emails are stored as `null` in database

### Database Columns:
```typescript
interface Booking {
  output_email: string;      // Required
  output_email_2?: string;   // Optional
  output_email_3?: string;   // Optional
  output_email_4?: string;   // Optional
  output_email_5?: string;   // Optional
}
```

## 🚀 Next Steps

1. **Run the Migration**:
   - Go to Supabase Dashboard → SQL Editor
   - Copy from: `supabase/migrations/20260212_add_multiple_output_emails.sql`
   - Run the SQL

2. **Test the Feature**:
   - Visit `/pricing`
   - Select CORE plan → See 1 email field
   - Select PRIME plan → See 3 email fields
   - Select APEX plan → See 5 email fields
   - Submit a booking and verify all emails are saved

## ✨ Benefits

- **Flexible**: Users can add as many emails as their plan allows
- **User-Friendly**: Clear labels and optional indicators
- **Validated**: All emails are properly validated
- **Scalable**: Easy to add more emails in the future

---

**Status**: ✅ Feature complete and ready to use!

Just run the database migration and test the booking form!
