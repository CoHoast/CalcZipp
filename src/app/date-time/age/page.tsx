"use client";

import { useState } from "react";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CalendarDays, Cake, Clock, Star } from "lucide-react";

export default function AgeCalculator() {
  const [birthDate, setBirthDate] = useState<string>("");
  const [targetDate, setTargetDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    if (!birthDate) return;

    const birth = new Date(birthDate);
    const target = new Date(targetDate || new Date());

    // Calculate years, months, days
    let years = target.getFullYear() - birth.getFullYear();
    let months = target.getMonth() - birth.getMonth();
    let days = target.getDate() - birth.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += lastMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }

    // Total calculations
    const diffTime = Math.abs(target.getTime() - birth.getTime());
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const totalWeeks = Math.floor(totalDays / 7);
    const totalMonths = years * 12 + months;
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;

    // Next birthday
    const nextBirthday = new Date(target.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBirthday <= target) {
      nextBirthday.setFullYear(nextBirthday.getFullYear() + 1);
    }
    const daysUntilBirthday = Math.ceil((nextBirthday.getTime() - target.getTime()) / (1000 * 60 * 60 * 24));

    // Day of week born
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const dayBorn = daysOfWeek[birth.getDay()];

    // Zodiac sign
    const zodiac = getZodiacSign(birth.getMonth() + 1, birth.getDate());

    setResult({
      years,
      months,
      days,
      totalDays,
      totalWeeks,
      totalMonths,
      totalHours,
      totalMinutes,
      daysUntilBirthday,
      dayBorn,
      zodiac,
      nextAge: years + 1,
    });
  };

  const getZodiacSign = (month: number, day: number): string => {
    const signs = [
      { name: "Capricorn", start: [1, 1], end: [1, 19] },
      { name: "Aquarius", start: [1, 20], end: [2, 18] },
      { name: "Pisces", start: [2, 19], end: [3, 20] },
      { name: "Aries", start: [3, 21], end: [4, 19] },
      { name: "Taurus", start: [4, 20], end: [5, 20] },
      { name: "Gemini", start: [5, 21], end: [6, 20] },
      { name: "Cancer", start: [6, 21], end: [7, 22] },
      { name: "Leo", start: [7, 23], end: [8, 22] },
      { name: "Virgo", start: [8, 23], end: [9, 22] },
      { name: "Libra", start: [9, 23], end: [10, 22] },
      { name: "Scorpio", start: [10, 23], end: [11, 21] },
      { name: "Sagittarius", start: [11, 22], end: [12, 21] },
      { name: "Capricorn", start: [12, 22], end: [12, 31] },
    ];
    
    for (const sign of signs) {
      if ((month === sign.start[0] && day >= sign.start[1]) ||
          (month === sign.end[0] && day <= sign.end[1])) {
        return sign.name;
      }
    }
    return "Unknown";
  };

  return (
    <CalculatorLayout
      title="Age Calculator"
      description="Calculate your exact age in years, months, and days. Also shows total days lived, zodiac sign, and more."
      category="Date & Time"
      categoryHref="/date-time"
      icon={<CalendarDays className="h-3 w-3 mr-1" />}
      promoContext="general"
      howItWorks={`Enter your birth date to calculate your exact age.

The calculator shows:
• Your age in years, months, and days
• Total days, weeks, and months lived
• What day of the week you were born
• Your zodiac sign
• Days until your next birthday`}
      faqs={[
        { question: "How is age calculated?", answer: "Age is calculated by finding the difference between the birth date and today (or a target date) in years, months, and days." },
        { question: "Does it account for leap years?", answer: "Yes, the calculator properly accounts for leap years and varying month lengths." },
      ]}
      relatedCalculators={[
        { name: "Date Difference", href: "/date-time/date-difference" },
        { name: "Birthday Calculator", href: "/date-time/birthday" },
        { name: "Days Until", href: "/date-time/countdown" },
      ]}
    >
      <div className="space-y-6">
        <Input
          label="Birth Date"
          type="date"
          value={birthDate}
          onChange={(e) => setBirthDate(e.target.value)}
        />
        <Input
          label="Calculate Age On (optional)"
          type="date"
          value={targetDate}
          onChange={(e) => setTargetDate(e.target.value)}
        />

        <Button onClick={calculate} className="w-full brand-gradient text-white" size="lg">
          Calculate Age
        </Button>

        {result && (
          <div className="mt-8 pt-8 border-t border-border">
            {/* Main Result */}
            <div className="text-center mb-8">
              <div className="text-sm text-muted-foreground mb-2">Your Age</div>
              <div className="text-4xl md:text-5xl font-bold">
                <span className="brand-gradient-text">{result.years}</span>
                <span className="text-muted-foreground text-2xl"> years </span>
                <span className="brand-gradient-text">{result.months}</span>
                <span className="text-muted-foreground text-2xl"> months </span>
                <span className="brand-gradient-text">{result.days}</span>
                <span className="text-muted-foreground text-2xl"> days</span>
              </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold brand-gradient-text">{result.totalDays.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Total Days</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold brand-gradient-text">{result.totalWeeks.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Total Weeks</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold brand-gradient-text">{result.totalMonths.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Total Months</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-2xl font-bold brand-gradient-text">{result.totalHours.toLocaleString()}</div>
                <div className="text-xs text-muted-foreground">Total Hours</div>
              </Card>
            </div>

            {/* Fun Facts */}
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <CalendarDays className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Born On</span>
                </div>
                <div className="text-lg font-semibold">{result.dayBorn}</div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Zodiac Sign</span>
                </div>
                <div className="text-lg font-semibold">{result.zodiac}</div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Cake className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium">Next Birthday</span>
                </div>
                <div className="text-lg font-semibold">{result.daysUntilBirthday} days</div>
                <div className="text-xs text-muted-foreground">You'll turn {result.nextAge}</div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
