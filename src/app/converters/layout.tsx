import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unit Converters - Temperature, Length, Weight, Volume & More",
  description:
    "Free unit converters for temperature, length, weight, area, volume, speed, data, time, and currency. Instant conversions, no signup required.",
  keywords: [
    "unit converter",
    "temperature converter",
    "length converter",
    "weight converter",
    "volume converter",
    "currency converter",
    "metric converter",
  ],
  openGraph: {
    title: "Unit Converters | CalcZipp",
    description: "Free unit converters for temperature, length, weight, and more.",
    url: "https://www.calczipp.com/converters/",
  },
  alternates: {
    canonical: "https://www.calczipp.com/converters/",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
