import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "DCompass | Descubre tu siguiente plan",
  description:
    "Descubre eventos, encuentra tu siguiente plan y vive una mejor experiencia desde el inicio.",
  openGraph: {
    title: "DCompass | Descubre tu siguiente plan",
    description: "Descubre eventos, encuentra tu siguiente plan y vive una mejor experiencia desde el inicio.",
    type: "website"
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-MX">
      <body className={`${geistSans.variable} ${geistMono.variable} bg-[#03050a] text-white antialiased`}>
        {children}
      </body>
    </html>
  );
}
