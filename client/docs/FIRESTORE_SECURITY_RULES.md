## Firestore Security Rules for Cookie Preferences

Add these rules in your Firebase console to ensure GDPR/CCPA compliance:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Authenticated user preferences
    match /cookie_preferences_users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }

    // Anonymous user preferences
    match /cookie_preferences_anonymous/{docId} {
      allow read, write: if true;
    }
  }
}
```

**Instructions:**
1. Go to Firebase Console → Firestore Database → Rules
2. Replace your existing rules with the above
3. Click "Publish"

**Notes:**
- Authenticated users can only access their own preferences
- Anonymous preferences are non-sensitive and accessible for all
- Update rules as needed for stricter compliance
