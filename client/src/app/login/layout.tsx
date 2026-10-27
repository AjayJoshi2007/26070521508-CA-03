import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Login — Access Your Dashboard",
    description:
        "Sign in or create your SoloChief account to access your AI operator dashboard, manage your workforce, and track performance.",
    robots: {
        index: false,
        follow: false,
    },
};

export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
