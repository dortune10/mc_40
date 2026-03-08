import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Marien's 40th | A Celebration of Magnificence",
    description: "Join us for a weekend celebration in paradise as we honor 40 years of magnificence. July 23-26, 2026 in Panama City, Panama.",
    keywords: ["40th birthday", "celebration", "Marien", "party", "RSVP"],
    openGraph: {
        title: "Marien's 40th | A Celebration of Magnificence",
        description: "Join us for a weekend celebration in paradise",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="font-sans antialiased">{children}</body>
        </html>
    );
}
