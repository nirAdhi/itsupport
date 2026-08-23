import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://prasanit.org"),
  title: {
    default: "Prasan IT | Trusted IT Support & Solutions",
    template: "%s | Prasan IT",
  },
  description: "Your Dedicated Partners for Seamless, High-Performance IT and Secure Infrastructure. Managed IT Support, Cybersecurity, Cloud Services, and IT Consulting.",
  openGraph: {
    title: "Prasan IT | Trusted IT Support & Solutions",
    description: "Managed IT Support, Cybersecurity, Cloud Services, and IT Consulting for businesses in Dublin, Ireland.",
    url: "https://prasanit.org",
    siteName: "Prasan IT",
    locale: "en_IE",
    type: "website",
    images: [{ url: "/hero.png" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prasan IT | Trusted IT Support & Solutions",
    description: "Managed IT Support, Cybersecurity, Cloud Services, and IT Consulting for businesses in Dublin, Ireland.",
    images: ["/hero.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
