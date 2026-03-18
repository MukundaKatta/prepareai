import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PrepareAI - AI Risk Assessment Platform",
  description: "Comprehensive AI risk assessment covering cyber, bio, CBRN and catastrophic risks",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
