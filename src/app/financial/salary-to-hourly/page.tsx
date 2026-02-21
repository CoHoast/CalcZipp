"use client";
import { useState } from "react";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { Coins } from "lucide-react";

export default function SalaryToHourlyCalculator() {
  const [salary, setSalary] = useState<string>("50000");
  const [hoursPerWeek, setHoursPerWeek] = useState<string>("40");
  const [weeksPerYear, setWeeksPerYear] = useState<string>("52");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const annual = parseFloat(salary) || 0;
    const hours = parseFloat(hoursPerWeek) || 40;
    const weeks = parseFloat(weeksPerYear) || 52;
    const hourly = annual / (hours * weeks);
    const daily = hourly * (hours / 5);
    const weekly = annual / weeks;
    const monthly = annual / 12;
    setResult({ hourly, daily, weekly, monthly, annual });
  };

  return (
    <CalculatorLayout title="Salary to Hourly Converter" description="Convert annual salary to hourly rate, or hourly to salary. See daily, weekly, and monthly breakdowns." category="Financial" categoryHref="/financial" icon={<Coins className="h-3 w-3 mr-1" />} promoContext="financial" formula="Hourly = Annual Salary / (Hours per Week × Weeks per Year)" relatedCalculators={[{ name: "Tip Calculator", href: "/financial/tip" }, { name: "Loan Calculator", href: "/financial/loan" }]}>
      <div className="space-y-6">
        <Input label="Annual Salary" type="number" prefix="$" value={salary} onChange={(e) => setSalary(e.target.value)} />
        <div className="grid grid-cols-2 gap-4">
          <Input label="Hours per Week" type="number" value={hoursPerWeek} onChange={(e) => setHoursPerWeek(e.target.value)} />
          <Input label="Weeks per Year" type="number" value={weeksPerYear} onChange={(e) => setWeeksPerYear(e.target.value)} />
        </div>
        <Button onClick={calculate} className="w-full brand-gradient text-white" size="lg">Calculate</Button>
        {result && (
          <div className="mt-8 pt-8 border-t">
            <div className="text-center mb-6">
              <div className="text-sm text-muted-foreground mb-1">Hourly Rate</div>
              <div className="text-5xl font-bold brand-gradient-text">{formatCurrency(result.hourly)}/hr</div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="p-4 text-center"><div className="text-xs text-muted-foreground">Daily</div><div className="font-semibold">{formatCurrency(result.daily)}</div></Card>
              <Card className="p-4 text-center"><div className="text-xs text-muted-foreground">Weekly</div><div className="font-semibold">{formatCurrency(result.weekly)}</div></Card>
              <Card className="p-4 text-center"><div className="text-xs text-muted-foreground">Monthly</div><div className="font-semibold">{formatCurrency(result.monthly)}</div></Card>
              <Card className="p-4 text-center"><div className="text-xs text-muted-foreground">Annual</div><div className="font-semibold">{formatCurrency(result.annual)}</div></Card>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
