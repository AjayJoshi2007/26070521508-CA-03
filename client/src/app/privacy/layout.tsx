import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Privacy Policy",
    description:
        "SoloChief Privacy Policy — Learn how we collect, use, and protect your information. Zero-Integration model: we never require access to your internal passwords or accounts.",
    alternates: {
        canonical: "https://solochief.com/privacy",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function PrivacyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
