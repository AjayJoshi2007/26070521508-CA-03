import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/StructuredData";

export const metadata: Metadata = {
    title: "Contact Us — Get in Touch",
    description:
        "Have questions about SoloChief's AI operators? Need a custom solution for your business? Reach out to us and our team will respond within 24 hours.",
    openGraph: {
        title: "Contact SoloChief",
        description:
            "Questions about AI operators? Custom solutions? We respond within 24 hours.",
        url: "https://solochief.com/contact",
        images: [
            {
                url: "/solochief-logo-social.jpg",
                width: 1200,
                height: 630,
                alt: "Contact SoloChief",
            },
        ],
    },
    twitter: {
        card: "summary",
        title: "Contact SoloChief",
        description:
            "Reach out about AI operators and custom solutions. We respond within 24 hours.",
    },
    alternates: {
        canonical: "https://solochief.com/contact",
    },
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: "https://solochief.com" },
                    { name: "Contact", url: "https://solochief.com/contact" },
                ]}
            />
            {children}
        </>
    );
}
