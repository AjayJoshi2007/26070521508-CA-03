// Firebase Authentication Service - SoloChief
// Handles user sign up, sign in, sign out, and auth state management

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut as firebaseSignOut,
    onAuthStateChanged,
    updateProfile,
    sendPasswordResetEmail,
    User,
    UserCredential,
} from 'firebase/auth';
import { auth } from './firebase';

export type FirebaseUser = User;

// ============================================
// SIGN UP (Create new user)
// ============================================

/**
 * Create a new user account with email and password
 * Also sets the user's display name
 */
export async function signUp(
    email: string,
    password: string,
    displayName: string
): Promise<UserCredential> {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);

        // Set the user's display name
        await updateProfile(userCredential.user, {
            displayName: displayName,
        });

        return userCredential;
    } catch (error: any) {
        console.error('❌ Sign up error:', error);

        // Provide user-friendly error messages
        switch (error.code) {
            case 'auth/email-already-in-use':
                throw new Error('An account with this email already exists. Please sign in instead.');
            case 'auth/invalid-email':
                throw new Error('Please enter a valid email address.');
            case 'auth/weak-password':
                throw new Error('Password must be at least 6 characters long.');
            case 'auth/operation-not-allowed':
                throw new Error('Email/password sign up is not enabled. Please contact support.');
            default:
                throw new Error(error.message || 'Failed to create account. Please try again.');
        }
    }
}

// ============================================
// SIGN IN
// ============================================

/**
 * Sign in an existing user with email and password
 */
export async function signIn(
    email: string,
    password: string
): Promise<UserCredential> {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential;
    } catch (error: any) {
        console.error('❌ Sign in error:', error);

        // Provide user-friendly error messages
        switch (error.code) {
            case 'auth/user-not-found':
                throw new Error('No account found with this email. Please sign up first.');
            case 'auth/wrong-password':
                throw new Error('Incorrect password. Please try again.');
            case 'auth/invalid-email':
                throw new Error('Please enter a valid email address.');
            case 'auth/user-disabled':
                throw new Error('This account has been disabled. Please contact support.');
            case 'auth/too-many-requests':
                throw new Error('Too many failed attempts. Please try again later.');
            case 'auth/invalid-credential':
                throw new Error('Invalid email or password. Please check your credentials.');
            default:
                throw new Error(error.message || 'Failed to sign in. Please try again.');
        }
    }
}

// ============================================
// SIGN OUT
// ============================================

/**
 * Sign out the current user
 */
export async function signOut(): Promise<void> {
    try {
        await firebaseSignOut(auth);
    } catch (error: any) {
        console.error('❌ Sign out error:', error);
        throw new Error('Failed to sign out. Please try again.');
    }
}

// ============================================
// PASSWORD RESET
// ============================================

/**
 * Send a password reset email
 */
export async function resetPassword(email: string): Promise<void> {
    try {
        await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
        console.error('❌ Password reset error:', error);

        switch (error.code) {
            case 'auth/user-not-found':
                throw new Error('No account found with this email address.');
            case 'auth/invalid-email':
                throw new Error('Please enter a valid email address.');
            default:
                throw new Error(error.message || 'Failed to send reset email. Please try again.');
        }
    }
}

// ============================================
// AUTH STATE OBSERVER
// ============================================

/**
 * Subscribe to auth state changes
 * Returns an unsubscribe function
 */
export function onAuthStateChange(callback: (user: User | null) => void): () => void {
    return onAuthStateChanged(auth, callback);
}

/**
 * Get the current authenticated user
 */
export function getCurrentUser(): User | null {
    return auth.currentUser;
}
