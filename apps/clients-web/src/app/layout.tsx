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
  title: "DCompass – Clients Web",
  description:
    "Clients Web es la primera superficie pública premium de DCompass para discovery, eventos y datos de clientes.",
  openGraph: {
    title: "DCompass – Clients Web",
    description: "Una experiencia premium de discovery para partners y clientes.",
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
