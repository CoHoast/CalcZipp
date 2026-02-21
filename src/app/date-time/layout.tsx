import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Date & Time Calculators - Age, Countdown, Date Difference",
  description:
    "Free date and time calculators for age, date difference, countdown, add days, week number, and time zones. Accurate calculations, no signup required.",
  keywords: [
    "date calculator",
    "age calculator",
    "date difference calculator",
    "countdown calculator",
    "days between dates",
    "time calculator",
    "week number calculator",
  ],
  openGraph: {
    title: "Date & Time Calculators | CalcZipp",
    description: "Free calculators for age, date difference, countdown, and more.",
    url: "https://www.calczipp.com/date-time/",
  },
  alternates: {
    canonical: "https://www.calczipp.com/date-time/",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
