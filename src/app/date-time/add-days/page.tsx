"use client";
import { useState } from "react";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";

export default function AddDaysCalculator() {
  const [startDate, setStartDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [days, setDays] = useState<string>("30");
  const [operation, setOperation] = useState<"add" | "subtract">("add");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    if (!startDate) return;
    const start = new Date(startDate);
    const d = parseInt(days) || 0;
    const resultDate = new Date(start);
    resultDate.setDate(resultDate.getDate() + (operation === "add" ? d : -d));
    const dayOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][resultDate.getDay()];
    setResult({ date: resultDate.toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" }), dayOfWeek, iso: resultDate.toISOString().split('T')[0] });
  };

  return (
    <CalculatorLayout title="Add/Subtract Days Calculator" description="Add or subtract days from any date to find a future or past date." category="Date & Time" categoryHref="/date-time" icon={<Calendar className="h-3 w-3 mr-1" />} promoContext="general" relatedCalculators={[{ name: "Date Difference", href: "/date-time/date-difference" }, { name: "Days Until", href: "/date-time/countdown" }]}>
      <div className="space-y-6">
        <Input label="Start Date" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
        <div className="flex gap-2">
          <Button variant={operation === "add" ? "default" : "outline"} className={operation === "add" ? "brand-gradient text-white flex-1" : "flex-1"} onClick={() => setOperation("add")}>Add Days</Button>
          <Button variant={operation === "subtract" ? "default" : "outline"} className={operation === "subtract" ? "brand-gradient text-white flex-1" : "flex-1"} onClick={() => setOperation("subtract")}>Subtract Days</Button>
        </div>
        <Input label="Number of Days" type="number" value={days} onChange={(e) => setDays(e.target.value)} />
        <Button onClick={calculate} className="w-full brand-gradient text-white" size="lg">Calculate Date</Button>
        {result && (
          <Card className="p-6 mt-8 text-center">
            <div className="text-sm text-muted-foreground mb-1">Result Date</div>
            <div className="text-2xl font-bold brand-gradient-text">{result.date}</div>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  );
}
