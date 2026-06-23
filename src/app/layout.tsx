import type { Metadata } from "next";
import { DM_Sans, DM_Mono } from "next/font/google";
import "./globals.css";

// 1. Configure DM Sans (Sans-serif)
const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
});

// 2. Configure DM Mono (Monospace)
const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-dm-mono",
});

// 3. App Metadata
export const metadata: Metadata = {
  title: "Collabnotes",
  description: "Your personalized note-taking app",
};

// 4. THE ONLY RootLayout Function Allowed
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${dmMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}