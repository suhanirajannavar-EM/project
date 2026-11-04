import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "The AdSphere Awards | Where Ideas Become Icons",
  description:
    "The AdSphere Awards recognises outstanding achievements in advertising, branding, marketing and creative communication. 20–21 February 2027, Bengaluru.",
  keywords: "advertising awards, creative awards, branding awards, AdSphere, Bengaluru",
  openGraph: {
    title: "The AdSphere Awards",
    description: "Where Ideas Become Icons. 20–21 February 2027, Bengaluru.",
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
      <body className="min-h-screen bg-charcoal-950 text-white antialiased">
        <Navbar />
        <main className="min-h-[70vh]">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
