import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientLayoutShell from "@/components/ClientLayoutShell";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Barangay Information System (BIS v2.5) | Barangay Sta. Lucia",
  description:
    "Official Barangay Information System and Administrative Management Portal for Barangay Sta. Lucia, Lungsod Quezon.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="h-full bg-slate-50 text-slate-900 font-sans">
        <ClientLayoutShell>{children}</ClientLayoutShell>
      </body>
    </html>
  );
}
