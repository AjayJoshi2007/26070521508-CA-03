import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Book Your AI Workforce — Setup Request",
    description:
        "Request your autonomous AI workforce setup. Fill in your company details and deploy your AI operators in under 5 minutes. Choose from CORE, PRIME, or APEX plans.",
    openGraph: {
        title: "Deploy Your AI Workforce — SoloChief",
        description:
            "Request your AI operator setup. Deploy in under 5 minutes.",
        url: "https://solochief.com/book",
    },
    twitter: {
        card: "summary",
        title: "Deploy Your AI Workforce — SoloChief",
        description: "Setup your AI operators in under 5 minutes.",
    },
    alternates: {
        canonical: "https://solochief.com/book",
    },
    robots: {
        index: true,
        follow: true,
    },
};

export default function BookLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
