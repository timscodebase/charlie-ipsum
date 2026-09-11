import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Charlie Ipsum | The Conservative Lorem Ipsum Generator",
  description:
    "Generate bold, debate-ready placeholder text steeped in free enterprise and constitutional principles.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${inter.className} min-h-screen antialiased selection:bg-blue-600/35 selection:text-slate-100`}
      >
        {children}
      </body>
    </html>
  );
}
