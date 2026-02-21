import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Financial Calculators - Mortgage, Loan, Investment & More",
  description:
    "Free financial calculators for mortgage, loans, investments, compound interest, tips, savings, retirement, and more. No signup required.",
  keywords: [
    "financial calculator",
    "mortgage calculator",
    "loan calculator",
    "investment calculator",
    "compound interest calculator",
    "tip calculator",
    "savings calculator",
  ],
  openGraph: {
    title: "Financial Calculators | CalcZipp",
    description: "Free financial calculators for mortgage, loans, investments, and more.",
    url: "https://www.calczipp.com/financial/",
  },
  alternates: {
    canonical: "https://www.calczipp.com/financial/",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
