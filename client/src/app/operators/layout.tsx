import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/StructuredData";

export const metadata: Metadata = {
    title: "AI Operators — Meet Your 10 Specialists",
    description:
        "Discover SoloChief's 10 hyper-specialized AI operators: INTRO (Lead Gen), SNAP (Ad Design), CLIP (Video Production), SCOOP (Market Intel), MEND (Reputation), PULSE (Domain Infrastructure), VIBE (Audio/Copy), CHIEF CMO (Strategy), TRACE (SEO), and BASE (Operations).",
    openGraph: {
        title: "Meet Your 10 AI Operators — SoloChief",
        description:
            "From lead generation to reputation management — 10 AI specialists working 24/7 for your business.",
        url: "https://solochief.com/operators",
        images: [
            {
                url: "/solochief-logo-social.jpg",
                width: 1200,
                height: 630,
                alt: "SoloChief AI Operators",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Meet Your 10 AI Operators — SoloChief",
        description:
            "10 hyper-specialized AI specialists for your business operations.",
    },
    alternates: {
        canonical: "https://solochief.com/operators",
    },
};

export default function OperatorsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: "https://solochief.com" },
                    { name: "AI Operators", url: "https://solochief.com/operators" },
                ]}
            />
            {children}
        </>
    );
}
