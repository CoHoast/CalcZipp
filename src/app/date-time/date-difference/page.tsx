"use client";
import { useState } from "react";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";

export default function DateDifferenceCalculator() {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    if (!startDate || !endDate) return;
    
    // Parse dates - add time to avoid timezone issues
    const start = new Date(startDate + 'T00:00:00');
    const end = new Date(endDate + 'T00:00:00');
    
    // Ensure start is before end for consistent calculation
    const earlier = start <= end ? start : end;
    const later = start <= end ? end : start;
    
    // Calculate years, months, days properly using calendar logic
    let years = later.getFullYear() - earlier.getFullYear();
    let months = later.getMonth() - earlier.getMonth();
    let days = later.getDate() - earlier.getDate();
    
    // Adjust for negative days
    if (days < 0) {
      months--;
      // Get days in the previous month of the later date
      const lastMonth = new Date(later.getFullYear(), later.getMonth(), 0);
      days += lastMonth.getDate();
    }
    
    // Adjust for negative months
    if (months < 0) {
      years--;
      months += 12;
    }
    
    // Calculate total days for other metrics
    const diffTime = Math.abs(later.getTime() - earlier.getTime());
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(totalDays / 7);
    const hours = totalDays * 24;
    const minutes = hours * 60;
    
    setResult({ totalDays, years, months, days, weeks, hours, minutes });
  };

  return (
    <CalculatorLayout title="Date Difference Calculator" description="Calculate the number of days, weeks, months, and years between two dates." category="Date & Time" categoryHref="/date-time" icon={<Calendar className="h-3 w-3 mr-1" />} promoContext="general" relatedCalculators={[{ name: "Age Calculator", href: "/date-time/age" }, { name: "Days Until", href: "/date-time/countdown" }]}>
      <div className="space-y-6">
        <Input label="Start Date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <Input label="End Date" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        <Button onClick={calculate} className="w-full brand-gradient text-white" size="lg">Calculate Difference</Button>
        {result && (
          <div className="mt-8 pt-8 border-t">
            <div className="text-center mb-6">
              <div className="text-sm text-muted-foreground mb-1">Total Days</div>
              <div className="text-5xl font-bold brand-gradient-text">{result.totalDays.toLocaleString()}</div>
              <div className="text-muted-foreground mt-2">{result.years > 0 && `${result.years} years, `}{result.months > 0 && `${result.months} months, `}{result.days} days</div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="p-4 text-center"><div className="text-2xl font-bold brand-gradient-text">{result.weeks.toLocaleString()}</div><div className="text-xs text-muted-foreground">Weeks</div></Card>
              <Card className="p-4 text-center"><div className="text-2xl font-bold brand-gradient-text">{result.totalDays.toLocaleString()}</div><div className="text-xs text-muted-foreground">Days</div></Card>
              <Card className="p-4 text-center"><div className="text-2xl font-bold brand-gradient-text">{result.hours.toLocaleString()}</div><div className="text-xs text-muted-foreground">Hours</div></Card>
              <Card className="p-4 text-center"><div className="text-2xl font-bold brand-gradient-text">{result.minutes.toLocaleString()}</div><div className="text-xs text-muted-foreground">Minutes</div></Card>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
