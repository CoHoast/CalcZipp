"use client";
import { useState, useEffect } from "react";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Hourglass } from "lucide-react";

export default function CountdownCalculator() {
  const [targetDate, setTargetDate] = useState<string>("");
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    if (!targetDate) { setResult(null); return; }
    const update = () => {
      const now = new Date();
      const target = new Date(targetDate);
      const diff = target.getTime() - now.getTime();
      if (diff <= 0) { setResult({ days: 0, hours: 0, minutes: 0, seconds: 0, passed: true }); return; }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setResult({ days, hours, minutes, seconds, passed: false });
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <CalculatorLayout title="Days Until / Countdown Calculator" description="Count down the days, hours, minutes, and seconds until a future date." category="Date & Time" categoryHref="/date-time" icon={<Hourglass className="h-3 w-3 mr-1" />} promoContext="general" relatedCalculators={[{ name: "Date Difference", href: "/date-time/date-difference" }, { name: "Age Calculator", href: "/date-time/age" }]}>
      <div className="space-y-6">
        <Input label="Target Date" type="date" value={targetDate} onChange={(e) => setTargetDate(e.target.value)} />
        {result && (
          <div className="mt-8">
            {result.passed ? (
              <div className="text-center text-xl text-muted-foreground">This date has passed!</div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="p-6 text-center"><div className="text-4xl md:text-5xl font-bold brand-gradient-text">{result.days}</div><div className="text-sm text-muted-foreground">Days</div></Card>
                <Card className="p-6 text-center"><div className="text-4xl md:text-5xl font-bold brand-gradient-text">{result.hours}</div><div className="text-sm text-muted-foreground">Hours</div></Card>
                <Card className="p-6 text-center"><div className="text-4xl md:text-5xl font-bold brand-gradient-text">{result.minutes}</div><div className="text-sm text-muted-foreground">Minutes</div></Card>
                <Card className="p-6 text-center"><div className="text-4xl md:text-5xl font-bold brand-gradient-text">{result.seconds}</div><div className="text-sm text-muted-foreground">Seconds</div></Card>
              </div>
            )}
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
