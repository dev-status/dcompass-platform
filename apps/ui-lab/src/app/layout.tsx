import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { colors } from "@dcompass/ui";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "DCompass UI Lab",
  description: "Visual playground for the DCompass design system."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} antialiased`}
        style={{
          backgroundColor: colors.background,
          color: colors.textPrimary,
          fontFamily: "var(--font-inter)"
        }}
      >
        {children}
      </body>
    </html>
  );
}
