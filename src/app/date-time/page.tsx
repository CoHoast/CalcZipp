import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Timer, CalendarDays, Baby, Hourglass, Globe, Sunrise } from "lucide-react";

export const metadata = {
  title: "Date & Time Calculators - CalcZipp",
  description: "Free date calculators for age, date difference, countdown, time zones, and more.",
};

const calculators = [
  { name: "Age Calculator", href: "/date-time/age", icon: CalendarDays, description: "Calculate exact age in years, months, days" },
  { name: "Date Difference", href: "/date-time/date-difference", icon: Calendar, description: "Days between two dates" },
  { name: "Days Until", href: "/date-time/countdown", icon: Hourglass, description: "Countdown to a future date" },
  { name: "Add/Subtract Days", href: "/date-time/add-days", icon: Calendar, description: "Add or subtract days from a date" },
  { name: "Time Zone Converter", href: "/date-time/timezone", icon: Globe, description: "Convert between time zones" },
  { name: "Hours Calculator", href: "/date-time/hours", icon: Clock, description: "Calculate work hours and overtime" },
  { name: "Birthday Calculator", href: "/date-time/birthday", icon: CalendarDays, description: "Day of week, zodiac sign, and more" },
  { name: "Pregnancy Due Date", href: "/date-time/due-date", icon: Baby, description: "Calculate expected delivery date" },
  { name: "Sunrise & Sunset", href: "/date-time/sunrise", icon: Sunrise, description: "Sun times for any location" },
  { name: "Week Number", href: "/date-time/week-number", icon: Calendar, description: "Find the week number of a date" },
];

export default function DateTimePage() {
  return (
    <div className="min-h-screen">
      <section className="border-b border-border/50 bg-gradient-to-b from-purple-500/5 to-transparent">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-purple-500/10 text-purple-600 border-purple-500/20">
              <Calendar className="h-3 w-3 mr-1" />
              Date & Time
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">📅 Date & Time Calculators</h1>
            <p className="text-xl text-muted-foreground">
              Free calculators for age, dates, countdowns, and time zones.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {calculators.map((calc) => (
            <Link key={calc.href} href={calc.href}>
              <Card className="calculator-card p-5 h-full">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                    <calc.icon className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{calc.name}</h3>
                    <p className="text-sm text-muted-foreground">{calc.description}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
