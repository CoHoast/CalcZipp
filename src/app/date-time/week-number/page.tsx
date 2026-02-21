"use client";
import { useState } from "react";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";

function getWeekNumber(d: Date): number {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  return Math.ceil((((date.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
}

export default function WeekNumberCalculator() {
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const d = new Date(date);
    const weekNum = getWeekNumber(d);
    const year = d.getFullYear();
    const dayOfYear = Math.floor((d.getTime() - new Date(year, 0, 0).getTime()) / 86400000);
    const quarter = Math.ceil((d.getMonth() + 1) / 3);
    const dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][d.getDay()];
    const daysLeft = Math.ceil((new Date(year, 11, 31).getTime() - d.getTime()) / 86400000);
    const weeksLeft = Math.ceil(daysLeft / 7);
    
    setResult({ weekNum, year, dayOfYear, quarter, dayOfWeek, daysLeft, weeksLeft, isLeapYear: (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0 });
  };

  return (
    <CalculatorLayout title="Week Number Calculator" description="Find the week number, quarter, and day of year for any date." category="Date & Time" categoryHref="/date-time" icon={<Calendar className="h-3 w-3 mr-1" />} promoContext="general" howItWorks="Uses ISO week numbering (ISO 8601). Week 1 is the week containing January 4th." relatedCalculators={[{ name: "Date Difference", href: "/date-time/date-difference" }, { name: "Days Until", href: "/date-time/countdown" }]}>
      <div className="space-y-6">
        <Input label="Select Date" type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        <Button onClick={calculate} className="w-full brand-gradient text-white" size="lg">Calculate</Button>
        {result && (
          <div className="mt-8 pt-8 border-t">
            <div className="text-center mb-6">
              <div className="text-sm text-muted-foreground mb-1">Week Number</div>
              <div className="text-5xl font-bold brand-gradient-text">Week {result.weekNum}</div>
              <div className="text-muted-foreground">{result.year}</div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="p-4 text-center"><div className="text-xs text-muted-foreground">Day of Week</div><div className="font-semibold">{result.dayOfWeek}</div></Card>
              <Card className="p-4 text-center"><div className="text-xs text-muted-foreground">Day of Year</div><div className="font-semibold">{result.dayOfYear} / {result.isLeapYear ? 366 : 365}</div></Card>
              <Card className="p-4 text-center"><div className="text-xs text-muted-foreground">Quarter</div><div className="font-semibold">Q{result.quarter}</div></Card>
              <Card className="p-4 text-center"><div className="text-xs text-muted-foreground">Days Left in Year</div><div className="font-semibold">{result.daysLeft}</div></Card>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
