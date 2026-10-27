import type { Metadata } from "next";
import { BreadcrumbSchema } from "@/components/StructuredData";

export const metadata: Metadata = {
    title: "About — The Patient Zero Philosophy",
    description:
        "SoloChief is not just a product — it's a proof of concept. Built by a solo founder who runs the entire company with the same AI operators you're about to hire. Meet the manifesto behind the post-employee era.",
    openGraph: {
        title: "About SoloChief — The Manifesto",
        description:
            "I am the only human employee at SoloChief. Every email, every lead, every marketing post — all run by the same Operators you're about to hire.",
        url: "https://solochief.com/about",
        images: [
            {
                url: "/solochief-logo-social.jpg",
                width: 1200,
                height: 630,
                alt: "About SoloChief - The Patient Zero Philosophy",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "About SoloChief — The Manifesto",
        description:
            "One founder, ten AI operators, zero employees. The proof of concept for the post-employee era.",
    },
    alternates: {
        canonical: "https://solochief.com/about",
    },
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <>
            <BreadcrumbSchema
                items={[
                    { name: "Home", url: "https://solochief.com" },
                    { name: "About", url: "https://solochief.com/about" },
                ]}
            />
            {children}
        </>
    );
}
