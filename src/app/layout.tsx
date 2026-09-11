import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { PwaRegister } from "@/components/pwa-register";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  themeColor: "#060a14",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://charlie-ipsum.vercel.app"),
  title: {
    default: "Charlie Ipsum | The Conservative Lorem Ipsum & Debate Copy Engine",
    template: "%s | Charlie Ipsum",
  },
  description:
    "Generate bold, debate-ready placeholder text and conservative rhetoric steeped in free enterprise and constitutional principles across four rhetorical lenses.",
  keywords: [
    "Charlie Kirk",
    "Lorem Ipsum",
    "Charlie Ipsum",
    "Kirk Ipsum",
    "TPUSA",
    "Turning Point USA",
    "Conservative Lorem Ipsum",
    "Debate Copy Generator",
    "Campus Clash",
    "Constitutional Republicanism",
    "Free Enterprise",
    "Placeholder Text",
  ],
  authors: [{ name: "Charlie Ipsum Team", url: "https://charlie-ipsum.vercel.app" }],
  creator: "Charlie Ipsum",
  publisher: "Charlie Ipsum",
  applicationName: "Charlie Ipsum",
  generator: "Next.js",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Charlie Ipsum",
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://charlie-ipsum.vercel.app",
    siteName: "Charlie Ipsum",
    title: "Charlie Ipsum | The Conservative Lorem Ipsum Generator",
    description:
      "Generate debate-ready placeholder copy across 4 distinct rhetorical lenses: Campus Clash, Constitutional, Free Enterprise, and TPUSA Rally speeches.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Charlie Ipsum | The Conservative Lorem Ipsum Generator",
    description:
      "Generate debate-ready placeholder copy across 4 distinct rhetorical lenses: Campus Clash, Constitutional, Free Enterprise, and TPUSA Rally speeches.",
    creator: "@charlieipsum",
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
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Charlie Ipsum",
  url: "https://charlie-ipsum.vercel.app",
  description:
    "An interactive, responsive Lorem Ipsum text generator dedicated to the rhetorical themes of Charlie Kirk and Turning Point USA (TPUSA).",
  applicationCategory: "UtilityApplication",
  operatingSystem: "All",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  author: {
    "@type": "Person",
    name: "Charlie Kirk Enthusiasts",
  },
  featureList: [
    "Campus Debate generator",
    "Constitutional Republicanism generator",
    "Free-Market Economics copy",
    "TPUSA Rally speech copy",
    "Dual-mode clipboard export with confetti celebration",
    "One-click TXT export",
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${inter.className} min-h-screen antialiased selection:bg-red-600 selection:text-white`}
      >
        <PwaRegister />
        {children}
      </body>
    </html>
  );
}
