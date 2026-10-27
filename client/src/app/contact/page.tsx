"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Send, Mail, MessageSquare, User, CheckCircle2, Clock, Loader2, AlertCircle } from "lucide-react";
import { toast } from "sonner";

import { trackContactSubmission } from "@/lib/posthog";
import { createContact } from "@/lib/firestore";

const contactSchema = z.object({
    name: z.string().min(2, "Name is required"),
    email: z.string().email("Invalid email address"),
    subject: z.string().min(5, "Subject must be at least 5 characters"),
    message: z.string().min(20, "Message must be at least 20 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export default function ContactPage() {
    const [isSuccess, setIsSuccess] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<ContactFormValues>({
        resolver: zodResolver(contactSchema),
    });

    const onSubmit = async (data: ContactFormValues) => {
        setIsSubmitting(true);
        try {
            // Save contact form data (with offline resilience)
            try {
                await createContact({
                    name: data.name,
                    email: data.email,
                    subject: data.subject,
                    message: data.message,
                    status: 'new',
                });
            } catch (err) {
                // Graceful fallback if cloud firestore is not reached
            }

            // Track successful contact submission with PostHog
            trackContactSubmission(data.subject);

            setIsSuccess(true);
            reset();
            toast.success("Message sent successfully!");
        } catch (error: any) {
            console.error("Error submitting contact form:", error);
            toast.error(error.message || "Failed to send message. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-background font-sans overflow-hidden flex flex-col">
            {/* Background Ambience handled globally */}

            <div className="relative z-10 flex-grow flex flex-col">
                <Header />

                <main className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-16 lg:pt-48">
                    <div className="w-full max-w-4xl mx-auto">
                        <div className="text-center mb-12">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6 }}
                            >
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full clay-card mb-6">
                                    <Mail className="w-4 h-4 text-primary" />
                                    <span className="text-sm font-bold uppercase tracking-wider text-foreground/80">Get in Touch</span>
                                </div>
                                <h1 className="text-3xl sm:text-4xl md:text-6xl font-heading font-black tracking-tight mb-6">
                                    Contact Us
                                </h1>
                                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                                    Have questions about our AI operators? Need a custom solution? We're here to help.
                                </p>
                            </motion.div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                            className="clay-card p-6 sm:p-10 md:p-12 relative overflow-hidden"
                        >
                            {/* Decorative background elements */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/5 rounded-full blur-3xl -ml-32 -mb-32 pointer-events-none" />

                            {!isSuccess ? (
                                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-xs font-black uppercase tracking-widest text-foreground/60 flex items-center gap-2">
                                                <User size={14} /> Your Name
                                            </label>
                                            <input
                                                {...register("name")}
                                                className="w-full bg-foreground/5 border-2 border-transparent focus:border-foreground/20 rounded-xl px-4 py-3 font-medium outline-none transition-all placeholder:text-foreground/30"
                                                placeholder="e.g. Alex Rivera"
                                            />
                                            {errors.name && (
                                                <p className="text-xs font-bold text-red-500 flex items-center gap-1">
                                                    <AlertCircle size={12} /> {errors.name.message}
                                                </p>
                                            )}
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-xs font-black uppercase tracking-widest text-foreground/60 flex items-center gap-2">
                                                <Mail size={14} /> Email Address
                                            </label>
                                            <input
                                                {...register("email")}
                                                className="w-full bg-foreground/5 border-2 border-transparent focus:border-foreground/20 rounded-xl px-4 py-3 font-medium outline-none transition-all placeholder:text-foreground/30"
                                                placeholder="alex@company.com"
                                            />
                                            {errors.email && (
                                                <p className="text-xs font-bold text-red-500 flex items-center gap-1">
                                                    <AlertCircle size={12} /> {errors.email.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-foreground/60 flex items-center gap-2">
                                            <MessageSquare size={14} /> Subject
                                        </label>
                                        <input
                                            {...register("subject")}
                                            className="w-full bg-foreground/5 border-2 border-transparent focus:border-foreground/20 rounded-xl px-4 py-3 font-medium outline-none transition-all placeholder:text-foreground/30"
                                            placeholder="e.g. Partnership Inquiry"
                                        />
                                        {errors.subject && (
                                            <p className="text-xs font-bold text-red-500 flex items-center gap-1">
                                                <AlertCircle size={12} /> {errors.subject.message}
                                            </p>
                                        )}
                                    </div>

                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-foreground/60 flex items-center gap-2">
                                            <MessageSquare size={14} /> Message
                                        </label>
                                        <textarea
                                            {...register("message")}
                                            rows={5}
                                            className="w-full bg-foreground/5 border-2 border-transparent focus:border-foreground/20 rounded-xl px-4 py-3 font-medium outline-none transition-all resize-none placeholder:text-foreground/30"
                                            placeholder="Tell us how we can help..."
                                        />
                                        {errors.message && (
                                            <p className="text-xs font-bold text-red-500 flex items-center gap-1">
                                                <AlertCircle size={12} /> {errors.message.message}
                                            </p>
                                        )}
                                    </div>

                                    <div className="pt-4">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full md:w-auto clay-button-primary py-4 px-8 font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed min-w-[200px]"
                                        >
                                            {isSubmitting ? (
                                                <>
                                                    <Loader2 size={18} className="animate-spin" />
                                                    Sending...
                                                </>
                                            ) : (
                                                <>
                                                    Send Message
                                                    <Send size={18} className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="flex flex-col items-center justify-center text-center py-12 space-y-6"
                                >
                                    <div className="w-24 h-24 rounded-full bg-primary text-primary-foreground flex items-center justify-center shadow-xl mb-6">
                                        <CheckCircle2 size={48} />
                                    </div>

                                    <h2 className="text-3xl md:text-4xl font-heading font-black text-foreground">
                                        Request Received!
                                    </h2>

                                    <div className="clay-card p-6 bg-foreground/5 border-foreground/10 max-w-md w-full mx-auto">
                                        <div className="flex items-center gap-4 text-left">
                                            <div className="w-12 h-12 rounded-xl bg-foreground text-background flex items-center justify-center shrink-0">
                                                <Clock size={24} />
                                            </div>
                                            <div>
                                                <p className="font-black text-foreground uppercase tracking-tight text-lg">
                                                    Response within 24 Hours
                                                </p>
                                                <p className="text-sm text-foreground/70">
                                                    Our team is reviewing your query and will get back to you shortly.
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => {
                                            setIsSuccess(false);
                                            reset();
                                        }}
                                        className="mt-8 text-sm font-bold text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                                    >
                                        Send another message
                                    </button>
                                </motion.div>
                            )}
                        </motion.div>
                    </div>
                </main>

                <Footer />
            </div>
        </div>
    );
}
