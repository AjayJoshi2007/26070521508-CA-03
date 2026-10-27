// Firestore Database Service - SoloChief
// Handles all database operations for: Bookings, Contacts, Queries, and Cookie Preferences

import {
    collection,
    addDoc,
    getDocs,
    getDoc,
    doc,
    query,
    where,
    orderBy,
    serverTimestamp,
    Timestamp,
    updateDoc,
    deleteDoc,
    setDoc,
} from 'firebase/firestore';
import { db } from './firebase';
import { auth } from './firebase';

// ============================================
// TYPES
// ============================================

export interface BookingData {
    id?: string;
    userId: string;
    fullName: string;
    email: string;
    companyName: string;
    sector: string;
    companyInfo: string;
    domainName: string;
    linkedin?: string;
    instagram?: string;
    facebook?: string;
    plan: 'CORE' | 'PRIME' | 'APEX';
    outputEmail1: string;
    outputEmail2?: string;
    outputEmail3?: string;
    outputEmail4?: string;
    outputEmail5?: string;
    status: 'pending' | 'active' | 'cancelled';
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
}

export interface ContactData {
    id?: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    status: 'new' | 'read' | 'replied';
    createdAt?: Timestamp;
}

export interface QueryData {
    id?: string;
    userId?: string;
    customerName: string;
    companyName?: string;
    email: string;
    subject: string;
    queryDetails: string;
    status: 'open' | 'in-progress' | 'resolved' | 'closed';
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
}

export interface CalibrationRequestData {
    id?: string;
    userId: string;
    userName: string;
    email: string;
    message: string;
    status: 'pending' | 'reviewed' | 'applied';
    createdAt?: Timestamp;
}

export interface WorkflowData {
    id?: string;
    userId: string;
    name: string;
    prompt: string;
    interval: string;
    status: 'active' | 'paused' | 'failed';
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
}

// ============================================
// COLLECTION REFERENCES
// ============================================

const BOOKINGS_COLLECTION = 'bookings';
const CONTACTS_COLLECTION = 'contacts';
const QUERIES_COLLECTION = 'queries';
const USERS_COLLECTION = 'users';
const CALIBRATION_REQUESTS_COLLECTION = 'calibration_requests';
const WORKFLOWS_COLLECTION = 'workflows';

// ============================================
// USER PROFILES
// ============================================

/**
 * Create or update a user profile in Firestore
 * Stores the user's name and email for dashboard/admin purposes
 */
export async function createUserProfile(userId: string, data: {
    fullName: string;
    email: string;
}): Promise<void> {
    try {
        await setDoc(doc(db, USERS_COLLECTION, userId), {
            fullName: data.fullName,
            email: data.email,
            createdAt: serverTimestamp(),
        }, { merge: true }); // merge: true ensures we don't overwrite existing data
    } catch (error) {
        console.error('❌ Error creating user profile:', error);
        // Don't throw - user profile creation is not critical for booking flow
    }
}

// ============================================
// BOOKINGS
// ============================================

/**
 * Create a new booking in Firestore
 */
export async function createBooking(bookingData: Omit<BookingData, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
        const docRef = await addDoc(collection(db, BOOKINGS_COLLECTION), {
            ...bookingData,
            status: bookingData.status || 'pending',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });
        return docRef.id;
    } catch (error) {
        console.error('❌ Error creating booking:', error);
        throw new Error('Failed to create booking. Please try again.');
    }
}

/**
 * Get all bookings for a specific user
 */
export async function getUserBookings(userId: string): Promise<BookingData[]> {
    try {
        const q = query(
            collection(db, BOOKINGS_COLLECTION),
            where('userId', '==', userId),
            orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const bookings: BookingData[] = [];
        querySnapshot.forEach((doc) => {
            bookings.push({ id: doc.id, ...doc.data() } as BookingData);
        });
        return bookings;
    } catch (error) {
        console.error('❌ Error fetching user bookings:', error);
        throw new Error('Failed to load bookings.');
    }
}

/**
 * Get a single booking by ID
 */
export async function getBookingById(bookingId: string): Promise<BookingData | null> {
    try {
        const docSnap = await getDoc(doc(db, BOOKINGS_COLLECTION, bookingId));
        if (docSnap.exists()) {
            return { id: docSnap.id, ...docSnap.data() } as BookingData;
        }
        return null;
    } catch (error) {
        console.error('❌ Error fetching booking:', error);
        throw new Error('Failed to load booking details.');
    }
}

/**
 * Update booking status
 */
export async function updateBookingStatus(bookingId: string, status: BookingData['status']): Promise<void> {
    try {
        await updateDoc(doc(db, BOOKINGS_COLLECTION, bookingId), {
            status,
            updatedAt: serverTimestamp(),
        });
    } catch (error) {
        console.error('❌ Error updating booking status:', error);
        throw new Error('Failed to update booking status.');
    }
}

// ============================================
// CONTACTS
// ============================================

/**
 * Submit a contact form entry to Firestore
 */
export async function createContact(contactData: Omit<ContactData, 'id' | 'createdAt'>): Promise<string> {
    try {
        const docRef = await addDoc(collection(db, CONTACTS_COLLECTION), {
            ...contactData,
            status: contactData.status || 'new',
            createdAt: serverTimestamp(),
        });
        return docRef.id;
    } catch (error) {
        console.error('❌ Error submitting contact form:', error);
        throw new Error('Failed to send message. Please try again.');
    }
}

/**
 * Get all contact submissions (for admin use)
 */
export async function getAllContacts(): Promise<ContactData[]> {
    try {
        const q = query(
            collection(db, CONTACTS_COLLECTION),
            orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const contacts: ContactData[] = [];
        querySnapshot.forEach((doc) => {
            contacts.push({ id: doc.id, ...doc.data() } as ContactData);
        });
        return contacts;
    } catch (error) {
        console.error('❌ Error fetching contacts:', error);
        throw new Error('Failed to load contacts.');
    }
}

// ============================================
// QUERIES (User Dashboard)
// ============================================

/**
 * Submit a query from the user dashboard
 */
export async function createQuery(queryData: Omit<QueryData, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
        const docRef = await addDoc(collection(db, QUERIES_COLLECTION), {
            ...queryData,
            status: queryData.status || 'open',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });
        return docRef.id;
    } catch (error) {
        console.error('❌ Error submitting query:', error);
        throw new Error('Failed to submit query. Please try again.');
    }
}

/**
 * Get all queries for a specific user
 */
export async function getUserQueries(userId: string): Promise<QueryData[]> {
    try {
        const q = query(
            collection(db, QUERIES_COLLECTION),
            where('userId', '==', userId),
            orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const queries: QueryData[] = [];
        querySnapshot.forEach((doc) => {
            queries.push({ id: doc.id, ...doc.data() } as QueryData);
        });
        return queries;
    } catch (error) {
        console.error('❌ Error fetching user queries:', error);
        throw new Error('Failed to load queries.');
    }
}

/**
 * Update a query status
 */
export async function updateQueryStatus(queryId: string, status: QueryData['status']): Promise<void> {
    try {
        await updateDoc(doc(db, QUERIES_COLLECTION, queryId), {
            status,
            updatedAt: serverTimestamp(),
        });
    } catch (error) {
        console.error('❌ Error updating query status:', error);
        throw new Error('Failed to update query status.');
    }
}

/**
 * Update a query's subject and details
 */
export async function updateQueryDetails(
    queryId: string,
    data: { subject: string; queryDetails: string }
): Promise<void> {
    try {
        await updateDoc(doc(db, QUERIES_COLLECTION, queryId), {
            subject: data.subject,
            queryDetails: data.queryDetails,
            updatedAt: serverTimestamp(),
        });
    } catch (error) {
        console.error('❌ Error updating query details:', error);
        throw new Error('Failed to update query details.');
    }
}

/**
 * Delete a support query
 */
export async function deleteQuery(queryId: string): Promise<void> {
    try {
        await deleteDoc(doc(db, QUERIES_COLLECTION, queryId));
    } catch (error) {
        console.error('❌ Error deleting query:', error);
        throw new Error('Failed to delete query.');
    }
}

// ============================================
// WORKFLOWS (BASE Operator)
// ============================================

/**
 * Create a new custom workflow for the BASE operator
 */
export async function createWorkflow(data: Omit<WorkflowData, 'id' | 'createdAt' | 'updatedAt'>): Promise<string> {
    try {
        const docRef = await addDoc(collection(db, WORKFLOWS_COLLECTION), {
            ...data,
            status: data.status || 'active',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });
        return docRef.id;
    } catch (error) {
        console.error('❌ Error creating workflow:', error);
        throw new Error('Failed to create workflow. Please try again.');
    }
}

/**
 * Get all workflows for a specific user
 */
export async function getUserWorkflows(userId: string): Promise<WorkflowData[]> {
    try {
        const q = query(
            collection(db, WORKFLOWS_COLLECTION),
            where('userId', '==', userId),
            orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const workflows: WorkflowData[] = [];
        querySnapshot.forEach((doc) => {
            workflows.push({ id: doc.id, ...doc.data() } as WorkflowData);
        });
        return workflows;
    } catch (error) {
        console.error('❌ Error fetching workflows:', error);
        return [];
    }
}

/**
 * Update an existing workflow (name, prompt, interval, status)
 */
export async function updateWorkflow(
    workflowId: string,
    data: Partial<Pick<WorkflowData, 'name' | 'prompt' | 'interval' | 'status'>>
): Promise<void> {
    try {
        await updateDoc(doc(db, WORKFLOWS_COLLECTION, workflowId), {
            ...data,
            updatedAt: serverTimestamp(),
        });
    } catch (error) {
        console.error('❌ Error updating workflow:', error);
        throw new Error('Failed to update workflow.');
    }
}

/**
 * Delete a workflow
 */
export async function deleteWorkflow(workflowId: string): Promise<void> {
    try {
        await deleteDoc(doc(db, WORKFLOWS_COLLECTION, workflowId));
    } catch (error) {
        console.error('❌ Error deleting workflow:', error);
        throw new Error('Failed to delete workflow.');
    }
}

// ============================================
// CALIBRATION REQUESTS
// ============================================

/**
 * Submit a calibration customization request from the dashboard
 */
export async function createCalibrationRequest(data: Omit<CalibrationRequestData, 'id' | 'createdAt'>): Promise<string> {
    try {
        const docRef = await addDoc(collection(db, CALIBRATION_REQUESTS_COLLECTION), {
            ...data,
            status: 'pending',
            createdAt: serverTimestamp(),
        });
        return docRef.id;
    } catch (error) {
        console.error('❌ Error submitting calibration request:', error);
        throw new Error('Failed to submit calibration request. Please try again.');
    }
}

// ============================================
// COOKIE PREFERENCES
// ============================================

export interface CookiePreferences {
    id?: string;
    userId?: string; // Only if authenticated
    anonymousId: string; // UUID for anonymous users
    necessary: boolean;
    analytics: boolean;
    marketing: boolean;
    createdAt: Timestamp;
    updatedAt: Timestamp;
}

/**
 * Save or update cookie preferences in Firestore
 * Handles both authenticated and anonymous users
 */
export async function saveCookiePreferences(
    preferences: Omit<CookiePreferences, 'id' | 'createdAt' | 'updatedAt'>,
    anonymousId: string
): Promise<string> {
    try {
        const currentUser = auth.currentUser;
        const docId = currentUser?.uid || anonymousId;
        const collectionName = currentUser ? 'cookie_preferences_users' : 'cookie_preferences_anonymous';

        const docRef = doc(db, collectionName, docId);

        // Check if document exists
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            // Update existing document
            await updateDoc(docRef, {
                ...preferences,
                updatedAt: serverTimestamp(),
            });
        } else {
            // Create new document
            await setDoc(docRef, {
                ...preferences,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
            });
        }

        return docId;
    } catch (error) {
        console.error('❌ Error saving cookie preferences to Firebase:', error);
        // Don't throw - allow localStorage fallback
        return '';
    }
}

/**
 * Get cookie preferences from Firestore
 */
export async function getCookiePreferences(anonymousId: string): Promise<CookiePreferences | null> {
    try {
        const currentUser = auth.currentUser;
        const docId = currentUser?.uid || anonymousId;
        const collectionName = currentUser ? 'cookie_preferences_users' : 'cookie_preferences_anonymous';

        const docRef = doc(db, collectionName, docId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            return {
                id: docSnap.id,
                ...docSnap.data(),
            } as CookiePreferences;
        }

        return null;
    } catch (error) {
        console.error('❌ Error fetching cookie preferences from Firebase:', error);
        return null;
    }
}

// ============================================
// OPERATOR METRICS (Dashboard Data)
// ============================================

const OPERATOR_METRICS_COLLECTION = 'operator_metrics';

export interface OperatorMetrics {
    id?: string;
    userId: string;
    operatorId: string;
    operatorName: string;
    role: string;
    frequency: string;
    tasksToday: number;
    successRate: number;
    uptime: number;
    status: 'active' | 'inactive' | 'maintenance';
    updatedAt?: Timestamp;
}

/**
 * Default operator metrics — used to seed new users
 */
const DEFAULT_OPERATOR_METRICS: Omit<OperatorMetrics, 'id' | 'userId' | 'updatedAt'>[] = [
    {
        operatorId: 'intro',
        operatorName: 'INTRO',
        role: 'Lead Generation',
        frequency: 'Daily',
        tasksToday: 67,
        successRate: 94,
        uptime: 99.9,
        status: 'active',
    },
    {
        operatorId: 'snap',
        operatorName: 'SNAP',
        role: 'Ad Design',
        frequency: 'Daily',
        tasksToday: 5,
        successRate: 98,
        uptime: 99.8,
        status: 'active',
    },
    {
        operatorId: 'clip',
        operatorName: 'CLIP',
        role: 'Video Production',
        frequency: 'Weekly',
        tasksToday: 1,
        successRate: 96,
        uptime: 99.7,
        status: 'active',
    },
    {
        operatorId: 'scoop',
        operatorName: 'SCOOP',
        role: 'Market Intelligence',
        frequency: '24/7',
        tasksToday: 12,
        successRate: 91,
        uptime: 99.9,
        status: 'active',
    },
    {
        operatorId: 'mend',
        operatorName: 'MEND',
        role: 'Reputation Management',
        frequency: 'Real-Time',
        tasksToday: 3,
        successRate: 97,
        uptime: 99.6,
        status: 'active',
    },
    {
        operatorId: 'pulse',
        operatorName: 'PULSE',
        role: 'Domain Infrastructure',
        frequency: '24/7',
        tasksToday: 8,
        successRate: 99,
        uptime: 99.99,
        status: 'active',
    },
];

/**
 * Get operator metrics for a user from Firestore.
 * Returns all operator metric docs for the given userId.
 */
export async function getOperatorMetrics(userId: string): Promise<OperatorMetrics[]> {
    try {
        const q = query(
            collection(db, OPERATOR_METRICS_COLLECTION),
            where('userId', '==', userId),
            orderBy('operatorId', 'asc')
        );
        const querySnapshot = await getDocs(q);
        const metrics: OperatorMetrics[] = [];
        querySnapshot.forEach((docSnap) => {
            metrics.push({ id: docSnap.id, ...docSnap.data() } as OperatorMetrics);
        });
        return metrics;
    } catch (error) {
        console.error('❌ Error fetching operator metrics:', error);
        return [];
    }
}

/**
 * Initialize default operator metrics for a new user.
 * This seeds the operator_metrics collection with default values
 * so the dashboard has data to display from Firebase.
 */
export async function initializeOperatorMetrics(userId: string): Promise<OperatorMetrics[]> {
    try {
        const created: OperatorMetrics[] = [];
        for (const metric of DEFAULT_OPERATOR_METRICS) {
            const docRef = doc(db, OPERATOR_METRICS_COLLECTION, `${userId}_${metric.operatorId}`);
            const data = {
                ...metric,
                userId,
                updatedAt: serverTimestamp(),
            };
            await setDoc(docRef, data);
            created.push({ id: docRef.id, ...data } as OperatorMetrics);
        }
        return created;
    } catch (error) {
        console.error('❌ Error initializing operator metrics:', error);
        return [];
    }
}

/**
 * Update a specific operator metric (for admin panel use)
 */
export async function updateOperatorMetric(
    docId: string,
    updates: Partial<Omit<OperatorMetrics, 'id' | 'userId'>>
): Promise<void> {
    try {
        await updateDoc(doc(db, OPERATOR_METRICS_COLLECTION, docId), {
            ...updates,
            updatedAt: serverTimestamp(),
        });
    } catch (error) {
        console.error('❌ Error updating operator metric:', error);
        throw new Error('Failed to update operator metric.');
    }
}

// ============================================
// DAILY OUTPUTS (Personalized Per-User Daily Tracking)
// ============================================

const DAILY_OUTPUTS_COLLECTION = 'daily_outputs';

export interface DailyOutputItem {
    label: string;
    count: number;
    detail: string;
}

export interface DailyOutput {
    id?: string;
    userId: string;
    operatorId: string;
    operatorName: string;
    date: string;           // YYYY-MM-DD format
    outputCount: number;    // Total outputs produced
    accuracy: number;       // 0-100 percentage
    outputType: string;     // e.g. "Leads", "Ad Creatives", "Videos"
    items: DailyOutputItem[]; // Breakdown of individual items
    status: 'completed' | 'partial' | 'pending';
    createdAt?: Timestamp;
}

/**
 * Helper: generate a date string N days ago from today
 */
function getDateString(daysAgo: number): string {
    const d = new Date();
    d.setDate(d.getDate() - daysAgo);
    return d.toISOString().split('T')[0]; // YYYY-MM-DD
}

/**
 * Helper: generate a random integer between min and max (inclusive)
 */
function randInt(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Helper: generate a random float (1 decimal) between min and max
 */
function randFloat(min: number, max: number): number {
    return Math.round((Math.random() * (max - min) + min) * 10) / 10;
}

/**
 * Seed data template: defines realistic daily output ranges per operator
 */
const OPERATOR_OUTPUT_CONFIG: Record<string, {
    outputType: string;
    minOutput: number;
    maxOutput: number;
    minAccuracy: number;
    maxAccuracy: number;
    itemTemplates: { label: string; detailTemplate: string }[];
}> = {
    intro: {
        outputType: 'Verified Leads',
        minOutput: 42,
        maxOutput: 78,
        minAccuracy: 89,
        maxAccuracy: 97,
        itemTemplates: [
            { label: 'Email Leads', detailTemplate: '{n} verified email contacts sourced' },
            { label: 'LinkedIn Leads', detailTemplate: '{n} LinkedIn profiles matched' },
            { label: 'Phone Leads', detailTemplate: '{n} direct phone numbers found' },
        ],
    },
    snap: {
        outputType: 'Ad Creatives',
        minOutput: 3,
        maxOutput: 8,
        minAccuracy: 93,
        maxAccuracy: 99,
        itemTemplates: [
            { label: 'Static Banners', detailTemplate: '{n} banner variations generated' },
            { label: 'Social Posts', detailTemplate: '{n} social media creatives designed' },
            { label: 'A/B Variants', detailTemplate: '{n} A/B test variations created' },
        ],
    },
    clip: {
        outputType: 'Video Assets',
        minOutput: 1,
        maxOutput: 3,
        minAccuracy: 90,
        maxAccuracy: 98,
        itemTemplates: [
            { label: 'Vertical Reels', detailTemplate: '{n} vertical video ad(s) rendered' },
            { label: 'Story Clips', detailTemplate: '{n} story format clip(s) produced' },
            { label: 'Thumbnails', detailTemplate: '{n} click-optimized thumbnails generated' },
        ],
    },
    scoop: {
        outputType: 'Intel Reports',
        minOutput: 8,
        maxOutput: 18,
        minAccuracy: 86,
        maxAccuracy: 95,
        itemTemplates: [
            { label: 'Competitor Alerts', detailTemplate: '{n} competitor movements tracked' },
            { label: 'Market Signals', detailTemplate: '{n} market trend signals detected' },
            { label: 'News Digests', detailTemplate: '{n} sector news items summarized' },
        ],
    },
    mend: {
        outputType: 'Reputation Actions',
        minOutput: 2,
        maxOutput: 7,
        minAccuracy: 92,
        maxAccuracy: 99,
        itemTemplates: [
            { label: 'Review Responses', detailTemplate: '{n} review response(s) drafted' },
            { label: 'Sentiment Scans', detailTemplate: '{n} sentiment analysis scan(s) completed' },
            { label: 'Alert Reports', detailTemplate: '{n} reputation alert(s) flagged' },
        ],
    },
    pulse: {
        outputType: 'Infrastructure Checks',
        minOutput: 6,
        maxOutput: 14,
        minAccuracy: 96,
        maxAccuracy: 99.9,
        itemTemplates: [
            { label: 'Uptime Checks', detailTemplate: '{n} endpoint health check(s) passed' },
            { label: 'SSL Monitors', detailTemplate: '{n} SSL certificate(s) validated' },
            { label: 'DNS Audits', detailTemplate: '{n} DNS record(s) verified' },
        ],
    },
};

/**
 * Get daily outputs for a user from Firestore.
 * Fetches the last N days of output records.
 */
export async function getDailyOutputs(userId: string, days: number = 7): Promise<DailyOutput[]> {
    try {
        const cutoffDate = getDateString(days);
        const q = query(
            collection(db, DAILY_OUTPUTS_COLLECTION),
            where('userId', '==', userId),
            where('date', '>=', cutoffDate),
            orderBy('date', 'desc'),
            orderBy('operatorId', 'asc')
        );
        const querySnapshot = await getDocs(q);
        const outputs: DailyOutput[] = [];
        querySnapshot.forEach((docSnap) => {
            outputs.push({ id: docSnap.id, ...docSnap.data() } as DailyOutput);
        });
        return outputs;
    } catch (error) {
        console.error('❌ Error fetching daily outputs:', error);
        return [];
    }
}

/**
 * Initialize daily outputs for a user.
 * Seeds the last 7 days of realistic output data for all operators.
 * Only the operators applicable to the user's plan will be presented on the UI,
 * but we seed data for all operators so upgrading plans shows historical data.
 */
export async function initializeDailyOutputs(userId: string): Promise<DailyOutput[]> {
    try {
        const created: DailyOutput[] = [];
        const operatorIds = Object.keys(OPERATOR_OUTPUT_CONFIG);

        for (let daysAgo = 0; daysAgo < 7; daysAgo++) {
            const dateStr = getDateString(daysAgo);

            for (const opId of operatorIds) {
                const config = OPERATOR_OUTPUT_CONFIG[opId];
                const outputCount = randInt(config.minOutput, config.maxOutput);
                const accuracy = randFloat(config.minAccuracy, config.maxAccuracy);

                // Generate item breakdown
                const items: DailyOutputItem[] = config.itemTemplates.map((tmpl) => {
                    const itemCount = Math.max(1, randInt(1, Math.ceil(outputCount / config.itemTemplates.length)));
                    return {
                        label: tmpl.label,
                        count: itemCount,
                        detail: tmpl.detailTemplate.replace('{n}', itemCount.toString()),
                    };
                });

                const docId = `${userId}_${opId}_${dateStr}`;
                const data: Omit<DailyOutput, 'id'> = {
                    userId,
                    operatorId: opId,
                    operatorName: opId.toUpperCase(),
                    date: dateStr,
                    outputCount,
                    accuracy,
                    outputType: config.outputType,
                    items,
                    status: daysAgo === 0 ? 'partial' : 'completed',
                };

                await setDoc(doc(db, DAILY_OUTPUTS_COLLECTION, docId), {
                    ...data,
                    createdAt: serverTimestamp(),
                });

                created.push({ id: docId, ...data });
            }
        }

        return created;
    } catch (error) {
        console.error('❌ Error initializing daily outputs:', error);
        return [];
    }
}

/**
 * Add a single daily output record (for admin/system use)
 */
export async function addDailyOutput(data: Omit<DailyOutput, 'id' | 'createdAt'>): Promise<string> {
    try {
        const docId = `${data.userId}_${data.operatorId}_${data.date}`;
        await setDoc(doc(db, DAILY_OUTPUTS_COLLECTION, docId), {
            ...data,
            createdAt: serverTimestamp(),
        });
        return docId;
    } catch (error) {
        console.error('❌ Error adding daily output:', error);
        throw new Error('Failed to add daily output.');
    }
}

// ============================================
// SYSTEM HEALTH METRICS  (New — Dashboard v2)
// ============================================

const SYSTEM_HEALTH_COLLECTION = 'system_health_metrics';

export interface SystemHealthMetrics {
    id?: string;
    userId: string;
    /** Overall platform health percentage 0-100 */
    platformHealth: number;
    /** Combined uptime across all active operators (%) */
    combinedUptime: number;
    /** Total tasks executed today across all operators */
    totalTasksToday: number;
    /** Total tasks executed this week */
    totalTasksWeek: number;
    /** Number of operators currently operational */
    operatorsOnline: number;
    /** Number of incidents in the last 30 days */
    incidentsLast30Days: number;
    /** Average response latency across operators (ms) */
    avgLatencyMs: number;
    /** Current SLA compliance percentage */
    slaCompliance: number;
    /** Trend compared to last week: 'up' | 'down' | 'stable' */
    weeklyTrend: 'up' | 'down' | 'stable';
    /** Percentage change from prior week (absolute value) */
    weeklyTrendPercent: number;
    updatedAt?: Timestamp;
}

export async function getSystemHealthMetrics(userId: string): Promise<SystemHealthMetrics | null> {
    try {
        const docRef = doc(db, SYSTEM_HEALTH_COLLECTION, userId);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
            return { id: snap.id, ...snap.data() } as SystemHealthMetrics;
        }
        return null;
    } catch (error) {
        console.error('❌ Error fetching system health metrics:', error);
        return null;
    }
}

export async function initializeSystemHealthMetrics(userId: string, operatorCount: number = 3): Promise<SystemHealthMetrics> {
    const totalTasksToday = operatorCount * randInt(12, 28);
    const data: Omit<SystemHealthMetrics, 'id' | 'updatedAt'> = {
        userId,
        platformHealth: randInt(94, 100),
        combinedUptime: parseFloat((99 + Math.random() * 0.95).toFixed(2)),
        totalTasksToday,
        totalTasksWeek: totalTasksToday * 7 + randInt(-20, 40),
        operatorsOnline: operatorCount,
        incidentsLast30Days: randInt(0, 2),
        avgLatencyMs: randInt(8, 22),
        slaCompliance: randInt(97, 100),
        weeklyTrend: 'up',
        weeklyTrendPercent: randFloat(1.2, 5.8),
    };
    try {
        const docRef = doc(db, SYSTEM_HEALTH_COLLECTION, userId);
        await setDoc(docRef, { ...data, updatedAt: serverTimestamp() });
        return { id: userId, ...data };
    } catch (error) {
        console.error('❌ Error initializing system health metrics:', error);
        return { id: userId, ...data };
    }
}

export async function getOrInitSystemHealth(userId: string, operatorCount: number = 3): Promise<SystemHealthMetrics> {
    const existing = await getSystemHealthMetrics(userId);
    if (existing) return existing;
    return initializeSystemHealthMetrics(userId, operatorCount);
}

// ============================================
// REVENUE IMPACT METRICS  (New — Dashboard v2)
// ============================================

const REVENUE_IMPACT_COLLECTION = 'revenue_impact_metrics';

export interface RevenueImpactMetrics {
    id?: string;
    userId: string;
    /** Estimated monthly revenue generated by operators ($) */
    estimatedRevenueMonthly: number;
    /** Total leads converted to paying customers this month */
    leadsConverted: number;
    /** Average deal value in USD */
    avgDealValue: number;
    /** ROI multiplier (revenue / subscription cost) */
    roiMultiplier: number;
    /** Month-over-month revenue growth % */
    momGrowthPercent: number;
    /** Per-operator revenue attribution */
    operatorAttribution: {
        operatorId: string;
        operatorName: string;
        revenueShare: number;  // 0-100 percentage
        estimatedRevenue: number; // USD
    }[];
    updatedAt?: Timestamp;
}

export async function getRevenueImpactMetrics(userId: string): Promise<RevenueImpactMetrics | null> {
    try {
        const docRef = doc(db, REVENUE_IMPACT_COLLECTION, userId);
        const snap = await getDoc(docRef);
        if (snap.exists()) {
            return { id: snap.id, ...snap.data() } as RevenueImpactMetrics;
        }
        return null;
    } catch (error) {
        console.error('❌ Error fetching revenue impact metrics:', error);
        return null;
    }
}

export async function initializeRevenueImpactMetrics(
    userId: string,
    plan: 'CORE' | 'PRIME' | 'APEX'
): Promise<RevenueImpactMetrics> {
    const planMultiplier = plan === 'APEX' ? 3.5 : plan === 'PRIME' ? 2.2 : 1.4;
    const baseRevenue = randInt(8000, 14000) * planMultiplier;
    const planCost = plan === 'APEX' ? 1498 : plan === 'PRIME' ? 898 : 498;
    const attribution = [
        { operatorId: 'intro', operatorName: 'INTRO', revenueShare: 52, estimatedRevenue: Math.round(baseRevenue * 0.52) },
        { operatorId: 'snap', operatorName: 'SNAP', revenueShare: 28, estimatedRevenue: Math.round(baseRevenue * 0.28) },
        { operatorId: 'clip', operatorName: 'CLIP', revenueShare: 20, estimatedRevenue: Math.round(baseRevenue * 0.20) },
        ...(plan !== 'CORE' ? [
            { operatorId: 'scoop', operatorName: 'SCOOP', revenueShare: 12, estimatedRevenue: Math.round(baseRevenue * 0.12) },
            { operatorId: 'mend', operatorName: 'MEND', revenueShare: 8, estimatedRevenue: Math.round(baseRevenue * 0.08) },
            { operatorId: 'pulse', operatorName: 'PULSE', revenueShare: 4, estimatedRevenue: Math.round(baseRevenue * 0.04) },
        ] : []),
    ];
    const data: Omit<RevenueImpactMetrics, 'id' | 'updatedAt'> = {
        userId,
        estimatedRevenueMonthly: Math.round(baseRevenue),
        leadsConverted: randInt(12, 38) * Math.ceil(planMultiplier),
        avgDealValue: randInt(480, 1200),
        roiMultiplier: parseFloat((baseRevenue / planCost).toFixed(1)),
        momGrowthPercent: randFloat(4.5, 18.2),
        operatorAttribution: attribution,
    };
    try {
        const docRef = doc(db, REVENUE_IMPACT_COLLECTION, userId);
        await setDoc(docRef, { ...data, updatedAt: serverTimestamp() });
        return { id: userId, ...data };
    } catch (error) {
        console.error('❌ Error initializing revenue impact metrics:', error);
        return { id: userId, ...data };
    }
}

export async function getOrInitRevenueImpact(
    userId: string,
    plan: 'CORE' | 'PRIME' | 'APEX' = 'CORE'
): Promise<RevenueImpactMetrics> {
    const existing = await getRevenueImpactMetrics(userId);
    if (existing) return existing;
    return initializeRevenueImpactMetrics(userId, plan);
}

// ============================================
// OPERATOR EFFICIENCY SCORES  (New — Dashboard v2)
// ============================================

const EFFICIENCY_SCORES_COLLECTION = 'operator_efficiency_scores';

export interface OperatorEfficiencyScore {
    id?: string;
    userId: string;
    operatorId: string;
    operatorName: string;
    /** Composite efficiency 0–100, weighted across speed, accuracy, volume */
    efficiencyScore: number;
    /** Speed score: output velocity relative to target (0-100) */
    speedScore: number;
    /** Accuracy score: quality & correctness (0-100) */
    accuracyScore: number;
    /** Volume score: throughput relative to capacity (0-100) */
    volumeScore: number;
    /** Trend direction vs prior 7 days */
    trend: 'up' | 'down' | 'stable';
    /** Absolute change in composite score from prior period */
    trendDelta: number;
    /** ISO timestamp of last calculation */
    lastCalculated: string;
    updatedAt?: Timestamp;
}

const EFFICIENCY_SEED: Record<string, { speed: [number, number]; accuracy: [number, number]; volume: [number, number] }> = {
    intro: { speed: [88, 97], accuracy: [89, 97], volume: [78, 94] },
    snap: { speed: [90, 98], accuracy: [93, 99], volume: [72, 89] },
    clip: { speed: [82, 94], accuracy: [90, 98], volume: [65, 82] },
    scoop: { speed: [86, 95], accuracy: [86, 95], volume: [75, 91] },
    mend: { speed: [91, 99], accuracy: [92, 99], volume: [70, 88] },
    pulse: { speed: [95, 99], accuracy: [96, 99], volume: [80, 96] },
};

export async function getOperatorEfficiencyScores(userId: string): Promise<OperatorEfficiencyScore[]> {
    try {
        const q = query(
            collection(db, EFFICIENCY_SCORES_COLLECTION),
            where('userId', '==', userId),
            orderBy('operatorId', 'asc')
        );
        const snap = await getDocs(q);
        return snap.docs.map(d => ({ id: d.id, ...d.data() } as OperatorEfficiencyScore));
    } catch (error) {
        console.error('❌ Error fetching efficiency scores:', error);
        return [];
    }
}

export async function initializeOperatorEfficiencyScores(userId: string): Promise<OperatorEfficiencyScore[]> {
    const created: OperatorEfficiencyScore[] = [];
    const now = new Date().toISOString();
    for (const [opId, ranges] of Object.entries(EFFICIENCY_SEED)) {
        const speedScore = randInt(ranges.speed[0], ranges.speed[1]);
        const accuracyScore = randInt(ranges.accuracy[0], ranges.accuracy[1]);
        const volumeScore = randInt(ranges.volume[0], ranges.volume[1]);
        const composite = Math.round(speedScore * 0.30 + accuracyScore * 0.45 + volumeScore * 0.25);
        const trendDelta = randFloat(0.4, 3.8);
        const trend = Math.random() > 0.2 ? 'up' : 'stable';
        const docId = `${userId}_${opId}_eff`;
        const data: Omit<OperatorEfficiencyScore, 'id' | 'updatedAt'> = {
            userId,
            operatorId: opId,
            operatorName: opId.toUpperCase(),
            efficiencyScore: composite,
            speedScore,
            accuracyScore,
            volumeScore,
            trend: trend as 'up' | 'stable',
            trendDelta,
            lastCalculated: now,
        };
        try {
            await setDoc(doc(db, EFFICIENCY_SCORES_COLLECTION, docId), { ...data, updatedAt: serverTimestamp() });
        } catch { /* non-critical */ }
        created.push({ id: docId, ...data });
    }
    return created;
}

export async function getOrInitEfficiencyScores(userId: string): Promise<OperatorEfficiencyScore[]> {
    const existing = await getOperatorEfficiencyScores(userId);
    if (existing.length > 0) return existing;
    return initializeOperatorEfficiencyScores(userId);
}

// ============================================
// PAYMENTS (Dodo Payments Integration)
// ============================================

const PAYMENTS_COLLECTION = 'payments';

export interface PaymentData {
    id?: string;
    userId: string;
    bookingId: string;
    plan: 'CORE' | 'PRIME' | 'APEX';
    amount: number;
    currency: string;
    status: 'pending' | 'processing' | 'succeeded' | 'failed' | 'cancelled' | 'refunded';
    dodoPaymentId?: string;
    checkoutSessionId?: string;
    checkoutUrl?: string;
    customerEmail: string;
    customerName: string;
    metadata?: Record<string, string>;
    createdAt?: Timestamp;
    updatedAt?: Timestamp;
}

/**
 * Create a payment record when a checkout session is initiated
 */
export async function createPaymentRecord(
    paymentData: Omit<PaymentData, 'id' | 'createdAt' | 'updatedAt'>
): Promise<string> {
    try {
        const docRef = await addDoc(collection(db, PAYMENTS_COLLECTION), {
            ...paymentData,
            status: paymentData.status || 'pending',
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
        });
        return docRef.id;
    } catch (error) {
        console.error('❌ Error creating payment record:', error);
        throw new Error('Failed to create payment record.');
    }
}

/**
 * Update payment status (called by webhook handler)
 */
export async function updatePaymentStatus(
    paymentId: string,
    status: PaymentData['status'],
    dodoPaymentId?: string
): Promise<void> {
    try {
        const updateData: Record<string, any> = {
            status,
            updatedAt: serverTimestamp(),
        };
        if (dodoPaymentId) {
            updateData.dodoPaymentId = dodoPaymentId;
        }
        await updateDoc(doc(db, PAYMENTS_COLLECTION, paymentId), updateData);
    } catch (error) {
        console.error('❌ Error updating payment status:', error);
        throw new Error('Failed to update payment status.');
    }
}

/**
 * Get all payments for a specific user
 */
export async function getUserPayments(userId: string): Promise<PaymentData[]> {
    try {
        const q = query(
            collection(db, PAYMENTS_COLLECTION),
            where('userId', '==', userId),
            orderBy('createdAt', 'desc')
        );
        const querySnapshot = await getDocs(q);
        const payments: PaymentData[] = [];
        querySnapshot.forEach((docSnap) => {
            payments.push({ id: docSnap.id, ...docSnap.data() } as PaymentData);
        });
        return payments;
    } catch (error) {
        console.error('❌ Error fetching user payments:', error);
        return [];
    }
}

/**
 * Get payment by booking ID
 */
export async function getPaymentByBookingId(bookingId: string): Promise<PaymentData | null> {
    try {
        const q = query(
            collection(db, PAYMENTS_COLLECTION),
            where('bookingId', '==', bookingId)
        );
        const querySnapshot = await getDocs(q);
        if (!querySnapshot.empty) {
            const docSnap = querySnapshot.docs[0];
            return { id: docSnap.id, ...docSnap.data() } as PaymentData;
        }
        return null;
    } catch (error) {
        console.error('❌ Error fetching payment by booking ID:', error);
        return null;
    }
}
