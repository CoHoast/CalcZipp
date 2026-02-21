import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Math Calculators - Percentage, GPA, Fractions & More",
  description:
    "Free math calculators for percentages, GPA, grades, averages, fractions, and scientific calculations. Easy to use, no signup required.",
  keywords: [
    "math calculator",
    "percentage calculator",
    "GPA calculator",
    "grade calculator",
    "fraction calculator",
    "average calculator",
    "scientific calculator",
  ],
  openGraph: {
    title: "Math Calculators | CalcZipp",
    description: "Free math calculators for percentages, GPA, fractions, and more.",
    url: "https://www.calczipp.com/math/",
  },
  alternates: {
    canonical: "https://www.calczipp.com/math/",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
