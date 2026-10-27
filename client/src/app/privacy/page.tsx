import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowLeft, Shield } from "lucide-react";
import Link from "next/link";

export default function PrivacyPage() {
    return (
        <div className="min-h-screen bg-background font-sans transition-colors duration-300 relative">
            <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                <div className="absolute left-[-10%] top-[-10%] h-[60%] w-[60%] rounded-full bg-zinc-500/10 blur-[120px]"></div>
                <div className="absolute right-[-5%] bottom-[-10%] h-[60%] w-[60%] rounded-full bg-zinc-500/10 blur-[120px]"></div>
                <div className="absolute left-[20%] top-[40%] h-[40%] w-[40%] rounded-full bg-zinc-500/5 blur-[100px]"></div>
            </div>

            <div className="relative z-10 flex flex-col min-h-screen">
                <Header />

                <main className="flex-1 py-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-4xl mx-auto">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 transition-colors group"
                        >
                            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                            <span className="font-medium">Back to Home</span>
                        </Link>

                        <div className="clay-card p-6 sm:p-10 md:p-16 border-foreground/5">
                            <div className="flex items-start justify-between gap-6 mb-12 pb-8 border-b border-foreground/10">
                                <div className="space-y-4">

                                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-heading font-black tracking-tight text-foreground">
                                        Privacy Policy
                                    </h1>
                                    <p className="text-lg text-muted-foreground">
                                        Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                                    </p>
                                </div>
                            </div>

                            <div className="prose prose-lg dark:prose-invert max-w-none text-foreground/80">
                                <p className="lead text-xl text-foreground font-medium mb-8">
                                    At SoloChief, we believe that autonomy shouldn&apos;t come at the cost of privacy. This Privacy Policy explains how we collect, use, and protect your information when you use our AI Operations services (&quot;The Service&quot;).
                                </p>

                                <p>
                                    By using SoloChief, you agree to the collection and use of information in accordance with this policy.
                                </p>

                                <h2 className="text-2xl font-heading font-bold text-foreground mt-10 mb-4">1. The &quot;Zero-Integration&quot; Promise</h2>
                                <p>
                                    Unlike other AI tools, SoloChief operates on a &quot;Zero-Integration&quot; model.
                                </p>
                                <ul className="list-disc pl-6 space-y-2 mb-6">
                                    <li>We <strong>DO NOT</strong> require access to your internal passwords, CRM logins, or social media accounts.</li>
                                    <li>We <strong>DO NOT</strong> read your personal emails (unless you explicitly forward them to us for processing by an Agent).</li>
                                    <li>Our Operators operate using public data and the specific inputs you provide via email or onboarding forms.</li>
                                </ul>

                                <h2 className="text-2xl font-heading font-bold text-foreground mt-10 mb-4">2. Information We Collect</h2>

                                <h3 className="text-xl font-bold text-foreground mt-6 mb-3">A. Information You Provide to Us</h3>
                                <ul className="list-disc pl-6 space-y-2 mb-6">
                                    <li><strong>Account Information:</strong> Name, email address, company name, and billing details (processed securely by our payment provider).</li>
                                    <li><strong>Operator Inputs:</strong> Data you provide to configure your Operators (e.g., target customer profiles for Intro, brand guidelines for Snap, or competitor URLs for Scoop).</li>
                                    <li><strong>Correspondence:</strong> If you email us or our Operators, we retain the content of your messages to provide the Service.</li>
                                </ul>

                                <h3 className="text-xl font-bold text-foreground mt-6 mb-3">B. Information Collected Automatically</h3>
                                <ul className="list-disc pl-6 space-y-2 mb-6">
                                    <li><strong>Usage Data:</strong> We collect minimal data on how you interact with our website (e.g., pages visited) to improve our user experience.</li>
                                    <li><strong>Cookies:</strong> We use essential cookies to keep you logged in and functional cookies to remember your preferences.</li>
                                </ul>

                                <h2 className="text-2xl font-heading font-bold text-foreground mt-10 mb-4">3. How We Use Your Information</h2>
                                <p>We use your data strictly to execute the operations you have hired us to do:</p>
                                <ul className="list-disc pl-6 space-y-2 mb-6">
                                    <li><strong>To Deliver Services:</strong> For example, using your &quot;Target Audience&quot; input to generate Lead Lists via the Intro agent.</li>
                                    <li><strong>To Improve Our Models:</strong> We analyze successful outputs to refine the quality of our Operators (e.g., improving the subject lines generated by Intro).</li>
                                    <li><strong>To Communicate:</strong> To send you the Daily Reports, Operator Outputs, and billing notifications.</li>
                                </ul>

                                <h2 className="text-2xl font-heading font-bold text-foreground mt-10 mb-4">4. AI & Third-Party Processing</h2>
                                <p>SoloChief utilizes advanced Artificial Intelligence (LLMs) to generate content, analyze data, and perform tasks.</p>
                                <ul className="list-disc pl-6 space-y-2 mb-6">
                                    <li><strong>Data Processing:</strong> Your inputs (e.g., a blog topic) may be processed by third-party AI providers (such as OpenAI or Anthropic) via Enterprise APIs.</li>
                                    <li><strong>Data Privacy:</strong> We use Enterprise-grade settings where possible to ensure your proprietary data is not used to train public AI models.</li>
                                    <li><strong>No Ownership of Outputs:</strong> You retain full ownership of all work produced by SoloChief operators (images, leads, copy, video).</li>
                                </ul>

                                <h2 className="text-2xl font-heading font-bold text-foreground mt-10 mb-4">5. Data Sharing and Disclosure</h2>
                                <p>We never sell your data to third parties. We only share data in the following limited circumstances:</p>
                                <ul className="list-disc pl-6 space-y-2 mb-6">
                                    <li><strong>Service Providers:</strong> With trusted third parties who assist in operating our website, conducting our business, or serving our users (e.g., Dodo Payments for payments, Cloud hosting providers), so long as those parties agree to keep this information confidential.</li>
                                    <li><strong>Legal Compliance:</strong> If required by law or to protect the rights and safety of SoloChief or our users.</li>
                                </ul>

                                <h2 className="text-2xl font-heading font-bold text-foreground mt-10 mb-4">6. Data Security</h2>
                                <p>We implement industry-standard security measures to protect your data:</p>
                                <ul className="list-disc pl-6 space-y-2 mb-6">
                                    <li>All data is encrypted in transit (SSL) and at rest.</li>
                                    <li>Access to user data is strictly limited to authorized personnel and automated operators required to fulfill your requests.</li>
                                </ul>
                                <p>While we strive to use commercially acceptable means to protect your data, no method of transmission over the Internet is 100% secure.</p>

                                <h2 className="text-2xl font-heading font-bold text-foreground mt-10 mb-4">7. Your Rights</h2>
                                <p>Depending on your location, you may have the right to:</p>
                                <ul className="list-disc pl-6 space-y-2 mb-6">
                                    <li><strong>Access:</strong> Request a copy of the personal data we hold about you.</li>
                                    <li><strong>Correction:</strong> Request that we correct any inaccurate data.</li>
                                    <li><strong>Deletion:</strong> Request that we delete your account and associated data (&quot;Right to be Forgotten&quot;).</li>
                                </ul>
                                <p>To exercise these rights, please contact us at <a href="mailto:hello@solochief.com" className="text-primary hover:underline">hello@solochief.com</a>.</p>

                                <h2 className="text-2xl font-heading font-bold text-foreground mt-10 mb-4">8. Cancellation & Refund Policy</h2>
                                <p>
                                    You can cancel your subscription at any time directly from your dashboard or by contacting support.
                                </p>
                                <ul className="list-disc pl-6 space-y-2 mb-6">
                                    <li><strong>Cancellation:</strong> Upon cancellation, your service will remain active until the end of the current billing cycle.</li>
                                    <li><strong>Refunds:</strong> If you request a refund for a cancelled subscription, please note that <strong>only 70% of the payment is refundable</strong>. The remaining 30% covers administrative and setup costs incurred by our AI infrastructure.</li>
                                </ul>

                                <h2 className="text-2xl font-heading font-bold text-foreground mt-10 mb-4">9. Changes to This Policy</h2>
                                <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last Updated&quot; date.</p>

                                <h2 className="text-2xl font-heading font-bold text-foreground mt-10 mb-4">10. Contact Us</h2>
                                <p>If you have any questions about this Privacy Policy, please contact us:</p>
                                <p className="font-medium">
                                    Email: <a href="mailto:hello@solochief.com" className="text-primary hover:underline">hello@solochief.com</a>
                                </p>
                            </div>
                        </div>
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    );
}
