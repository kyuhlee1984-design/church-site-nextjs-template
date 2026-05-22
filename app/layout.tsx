/* eslint-disable @next/next/no-page-custom-font */
import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { LanguageProvider } from "./contexts/LanguageContext";

export const metadata: Metadata = {
    title: "Westside Presbyterian Church | 서부장로교회",
    description:
        "A welcoming Korean-Canadian church community in Vancouver. Join us for worship services, ministries, and events.",
    keywords:
        "Westside Presbyterian Church, 서부장로교회, Vancouver church, Korean church, Presbyterian, worship, community, faith, sermons",
    openGraph: {
        title: "Westside Presbyterian Church | 서부장로교회",
        description: "A welcoming Korean-Canadian church community in Vancouver",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Sans+KR:wght@400;500;600;700&family=Outfit:wght@400;500;600;700&display=swap" rel="stylesheet" />
            </head>
            <body>
                <LanguageProvider>
                    <Header />
                    <main>{children}</main>
                    <Footer />
                </LanguageProvider>
            </body>
        </html>
    );
}
