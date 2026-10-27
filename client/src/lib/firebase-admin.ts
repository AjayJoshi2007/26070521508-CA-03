import * as admin from 'firebase-admin';

let db: admin.firestore.Firestore | null = null;

export function getAdminDb() {
    if (db) return db;

    if (!admin.apps.length) {
        try {
            if (process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID && process.env.FIREBASE_CLIENT_EMAIL && process.env.FIREBASE_PRIVATE_KEY) {
                admin.initializeApp({
                    credential: admin.credential.cert({
                        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
                        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                        privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, '\n'),
                    }),
                });
                console.log('Firebase Admin SDK initialized successfully.');
                db = admin.firestore();
            } else {
                console.warn('Firebase Admin SDK initialization skipped: Missing environment variables.');
            }
        } catch (error) {
            console.error('Firebase Admin SDK initialization error:', error);
        }
    } else {
        db = admin.firestore();
    }

    return db;
}
