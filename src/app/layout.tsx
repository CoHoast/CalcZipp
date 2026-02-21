import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";

const GA_MEASUREMENT_ID = "G-GCLHM7N4W6";
const GOOGLE_ADS_ID = "AW-17968525483";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.calczipp.com"),
  title: {
    default: "CalcZipp — Free Online Calculators for Finance, Health, Math & More",
    template: "%s | CalcZipp",
  },
  description:
    "55+ free online calculators for mortgage, BMI, percentage, age, loan, tip, and more. Fast, accurate, no signup required. Calculate anything instantly.",
  keywords: [
    "free online calculator",
    "calculator",
    "mortgage calculator",
    "BMI calculator",
    "percentage calculator",
    "tip calculator",
    "age calculator",
    "loan calculator",
    "calorie calculator",
    "GPA calculator",
    "compound interest calculator",
    "date calculator",
    "unit converter",
    "financial calculator",
    "health calculator",
    "math calculator",
  ],
  authors: [{ name: "CalcZipp" }],
  creator: "CalcZipp",
  publisher: "BLUPRYNT",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://www.calczipp.com",
    siteName: "CalcZipp",
    title: "CalcZipp — Free Online Calculators",
    description:
      "55+ free online calculators for finance, health, math, dates, and conversions. Fast, accurate, no signup required.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CalcZipp - Free Online Calculators",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CalcZipp — Free Online Calculators",
    description:
      "55+ free calculators for mortgage, BMI, percentage, and more. No signup required.",
    images: ["/og-image.png"],
    creator: "@calczipp",
  },
  alternates: {
    canonical: "https://www.calczipp.com",
  },
  category: "technology",
  verification: {
    // Add these when you have them
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

// JSON-LD Structured Data
const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "CalcZipp",
  url: "https://www.calczipp.com",
  description:
    "55+ free online calculators for finance, health, math, dates, and conversions.",
  applicationCategory: "UtilitiesApplication",
  operatingSystem: "Any",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "1250",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://www.calczipp.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {/* Google Analytics */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
            gtag('config', '${GOOGLE_ADS_ID}');
          `}
        </Script>
        
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
