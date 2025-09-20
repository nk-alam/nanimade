import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Layout from "@/components/layout/Layout";
import { auth } from "@/lib/auth";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  title: {
    default: "NaniMade - Authentic Malda Mango Pickles",
    template: "%s | NaniMade"
  },
  description: "Discover the authentic taste of Malda's finest mango pickles. Handcrafted with traditional recipes, delivered fresh to your doorstep.",
  keywords: ["mango pickles", "Malda", "authentic pickles", "handmade", "traditional", "Bengali pickles"],
  authors: [{ name: "NaniMade" }],
  creator: "NaniMade",
  publisher: "NaniMade",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://nanimade.com",
    siteName: "NaniMade",
    title: "NaniMade - Authentic Malda Mango Pickles",
    description: "Discover the authentic taste of Malda's finest mango pickles. Handcrafted with traditional recipes, delivered fresh to your doorstep.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "NaniMade - Authentic Malda Mango Pickles",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "NaniMade - Authentic Malda Mango Pickles",
    description: "Discover the authentic taste of Malda's finest mango pickles. Handcrafted with traditional recipes, delivered fresh to your doorstep.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SEARCH_CONSOLE_VERIFICATION,
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased">
        <Layout session={session}>
          {children}
        </Layout>
      </body>
    </html>
  );
}
