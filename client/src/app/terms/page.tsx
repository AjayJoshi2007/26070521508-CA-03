import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ArrowLeft, FileText } from "lucide-react";
import Link from "next/link";

export default function TermsPage() {
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
                                        Terms of Service
                                    </h1>
                                    <p className="text-lg text-muted-foreground">
                                        Last updated: February 13, 2026
                                    </p>
                                </div>
                            </div>

                            <div className="prose prose-lg dark:prose-invert max-w-none text-foreground/80">
                                <p className="lead text-xl text-foreground font-medium mb-8">
                                    Welcome to SoloChief (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). By accessing or using our website and AI Operations services (the &quot;Service&quot;), you agree to be bound by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, please do not use the Service.
                                </p>

                                <h2 className="text-2xl font-heading font-bold text-foreground mt-10 mb-4">1. Nature of Service</h2>
                                <p>SoloChief provides AI-powered autonomous operators designed to assist businesses with operations such as lead generation, content creation, and market analysis.</p>
                                <ul className="list-disc pl-6 space-y-2 mb-6">
                                    <li><strong>AI Assistance:</strong> You acknowledge that the Service utilizes Artificial Intelligence (AI) and Machine Learning technologies. While we strive for accuracy, AI systems can occasionally produce incorrect, offensive, or biased information (&quot;Hallucinations&quot;).</li>
                                    <li><strong>Human-in-the-Loop:</strong> You agree that SoloChief is an assistant, not a final decision-maker. You are responsible for reviewing, verifying, and approving all outputs (e.g., emails, posts, videos, leads) before using, posting, or sending them.</li>
                                </ul>

                                <h2 className="text-2xl font-heading font-bold text-foreground mt-10 mb-4">2. Account & Registration</h2>
                                <ul className="list-disc pl-6 space-y-2 mb-6">
                                    <li><strong>Eligibility:</strong> You must be at least 18 years old and capable of forming a binding contract to use the Service.</li>
                                    <li><strong>Account Security:</strong> You are responsible for maintaining the confidentiality of your account credentials. You agree to notify us immediately of any unauthorized use of your account.</li>
                                    <li><strong>Accuracy:</strong> You agree to provide accurate, current, and complete information during the onboarding process to ensure the Operators function correctly.</li>
                                </ul>

                                <h2 className="text-2xl font-heading font-bold text-foreground mt-10 mb-4">3. Subscriptions & Payments</h2>
                                <ul className="list-disc pl-6 space-y-2 mb-6">
                                    <li><strong>Billing:</strong> The Service is billed on a recurring monthly or annual subscription basis. Payments are processed securely via our third-party payment provider (e.g., Dodo Payments).</li>
                                    <li><strong>Credit System:</strong> Some plans utilize a &quot;Credit&quot; or &quot;Resource&quot; budget. Unused credits at the end of a billing cycle do not roll over.</li>
                                    <li><strong>Cancellation:</strong> You may cancel your subscription at any time. Your access will continue until the end of the current billing period. We do not offer refunds for partial months or unused credits.</li>
                                    <li><strong>Setup Fees:</strong> For all new subscriptions, a 30% non-refundable setup fee is applied to the first month&apos;s billing.</li>
                                    <li><strong>Price Changes:</strong> We reserve the right to modify pricing with 30 days&apos; notice. Continued use after the price change constitutes agreement to the new pricing.</li>
                                </ul>

                                <h2 className="text-2xl font-heading font-bold text-foreground mt-10 mb-4">4. Intellectual Property (IP)</h2>
                                <ul className="list-disc pl-6 space-y-2 mb-6">
                                    <li><strong>Your Content:</strong> You retain all rights to the data and inputs you provide to us.</li>
                                    <li><strong>Generated Output:</strong> Subject to your compliance with these Terms and payment of fees, you own the Intellectual Property rights to the outputs generated for you by the Operators (e.g., the images created by Snap, the videos by Clip, or the copy by Intro).</li>
                                    <li><strong>Our IP:</strong> SoloChief retains all rights to the underlying software, algorithms, agent personas, methodologies, and branding.</li>
                                </ul>

                                <h2 className="text-2xl font-heading font-bold text-foreground mt-10 mb-4">5. User Conduct & Acceptable Use</h2>
                                <p>You agree NOT to use the Service to:</p>
                                <ul className="list-disc pl-6 space-y-2 mb-6">
                                    <li>Generate content that is illegal, defamatory, hateful, or promotes violence.</li>
                                    <li>Send unsolicited spam in violation of CAN-SPAM, GDPR, or other anti-spam laws. (You are solely responsible for the compliance of emails sent using lists provided by the Intro agent).</li>
                                    <li>Reverse engineer, decompile, or attempt to extract the source code of our Operators.</li>
                                    <li>Resell the Service without a formal White-Label/Partnership agreement.</li>
                                </ul>

                                <h2 className="text-2xl font-heading font-bold text-foreground mt-10 mb-4">6. Disclaimers & Limitation of Liability</h2>
                                <ul className="list-disc pl-6 space-y-2 mb-6">
                                    <li><strong>&quot;As Is&quot; Basis:</strong> The Service is provided &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; without warranties of any kind, express or implied.</li>
                                    <li><strong>No Professional Advice:</strong> Information provided by operators like Scoop (Market Intel) or Pulse (Domain Health) is for informational purposes only and does not constitute professional legal, financial, or technical advice.</li>
                                    <li><strong>Liability Cap:</strong> To the maximum extent permitted by law, SoloChief&apos;s liability for any claims arising out of these Terms shall be limited to the amount you paid us in the 12 months preceding the incident. We are not liable for any indirect, incidental, or consequential damages (including loss of profits or data).</li>
                                </ul>

                                <h2 className="text-2xl font-heading font-bold text-foreground mt-10 mb-4">7. Third-Party Services</h2>
                                <p>Our Operators may interact with or rely on third-party platforms (e.g., LinkedIn, Google, Open AI). We are not responsible for the availability, accuracy, or policies of these third-party services. If a third-party platform changes its API or rules (e.g., LinkedIn changes its algorithm), the functionality of our Operators may change without notice.</p>

                                <h2 className="text-2xl font-heading font-bold text-foreground mt-10 mb-4">8. Termination</h2>
                                <p>We reserve the right to suspend or terminate your account at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason.</p>

                                <h2 className="text-2xl font-heading font-bold text-foreground mt-10 mb-4">9. Governing Law</h2>
                                <p>These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.</p>

                                <h2 className="text-2xl font-heading font-bold text-foreground mt-10 mb-4">10. Contact Information</h2>
                                <p>If you have any questions about these Terms, please contact us at:</p>
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
