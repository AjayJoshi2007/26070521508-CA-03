import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/StructuredData";

export const metadata: Metadata = {
    title: "Pricing — AI Workforce Plans from $498/mo",
    description:
        "Choose from 3 SoloChief plans: CORE ($498/mo), PRIME ($898/mo), or APEX ($1,498/mo). Replace an entire team for less than the cost of one mid-level employee. Save over $50,000/month.",
    openGraph: {
        title: "SoloChief Pricing — Save Up to 97% vs Hiring",
        description:
            "Three plans, ten AI operators, zero overhead. CORE from $498/mo, PRIME from $898/mo, APEX from $1,498/mo.",
        url: "https://solochief.com/pricing",
        images: [
            {
                url: "/solochief-logo-social.jpg",
                width: 1200,
                height: 630,
                alt: "SoloChief Pricing Plans",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "SoloChief Pricing — Save Up to 97% vs Hiring",
        description:
            "Replace your entire team from $498/mo. Save over $50,000/month.",
    },
    alternates: {
        canonical: "https://solochief.com/pricing",
    },
};

export default function PricingLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: "https://solochief.com" },
                    { name: "Pricing", url: "https://solochief.com/pricing" },
                ]}
            />
            {children}
        </>
    );
}
