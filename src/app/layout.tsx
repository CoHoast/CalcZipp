import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "CalcZipp — Free Online Calculators",
  description:
    "50+ free online calculators for finance, math, health, dates, and conversions. Fast, accurate, and easy to use. No signup required.",
  keywords: [
    "calculator",
    "online calculator",
    "free calculator",
    "mortgage calculator",
    "bmi calculator",
    "percentage calculator",
    "tip calculator",
    "age calculator",
    "loan calculator",
  ],
  openGraph: {
    title: "CalcZipp — Free Online Calculators",
    description:
      "50+ free online calculators. Fast, accurate, and easy to use.",
    url: "https://calczipp.com",
    siteName: "CalcZipp",
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
      <body className={`${inter.variable} font-sans antialiased`}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
