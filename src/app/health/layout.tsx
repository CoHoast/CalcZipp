import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Health & Fitness Calculators - BMI, Calories, Macros & More",
  description:
    "Free health calculators for BMI, calories, body fat, macros, ideal weight, pregnancy, and more. Science-based formulas, no signup required.",
  keywords: [
    "health calculator",
    "BMI calculator",
    "calorie calculator",
    "body fat calculator",
    "macro calculator",
    "fitness calculator",
    "TDEE calculator",
  ],
  openGraph: {
    title: "Health & Fitness Calculators | CalcZipp",
    description: "Free health calculators for BMI, calories, body fat, and more.",
    url: "https://www.calczipp.com/health/",
  },
  alternates: {
    canonical: "https://www.calczipp.com/health/",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
