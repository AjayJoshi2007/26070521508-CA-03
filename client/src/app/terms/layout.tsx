import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Terms of Service",
    description:
        "SoloChief Terms of Service — Understand your rights and responsibilities when using our AI operators platform. Clear policies on subscriptions, IP, data, and liability.",
    alternates: {
        canonical: "https://solochief.com/terms",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function TermsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
