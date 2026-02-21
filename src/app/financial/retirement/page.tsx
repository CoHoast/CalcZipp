"use client";
import { useState } from "react";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { Clock } from "lucide-react";

export default function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState<string>("30");
  const [retireAge, setRetireAge] = useState<string>("65");
  const [currentSavings, setCurrentSavings] = useState<string>("50000");
  const [monthlyContrib, setMonthlyContrib] = useState<string>("500");
  const [rate, setRate] = useState<string>("7");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const years = (parseFloat(retireAge) || 65) - (parseFloat(currentAge) || 30);
    const p = parseFloat(currentSavings) || 0;
    const pmt = parseFloat(monthlyContrib) || 0;
    const r = (parseFloat(rate) || 7) / 100 / 12;
    const n = years * 12;
    let fv = p * Math.pow(1 + r, n);
    if (r > 0) fv += pmt * ((Math.pow(1 + r, n) - 1) / r);
    else fv += pmt * n;
    const totalContrib = p + pmt * n;
    const earnings = fv - totalContrib;
    const monthlyRetirement = fv * 0.04 / 12; // 4% rule
    setResult({ total: fv, contributed: totalContrib, earnings, monthly: monthlyRetirement, years });
  };

  return (
    <CalculatorLayout title="Retirement Calculator" description="Calculate how much you'll have saved for retirement and monthly income potential." category="Financial" categoryHref="/financial" icon={<Clock className="h-3 w-3 mr-1" />} promoContext="financial" howItWorks="Projects retirement savings using compound interest. The 4% rule estimates sustainable monthly withdrawals." relatedCalculators={[{ name: "Investment Calculator", href: "/financial/investment" }, { name: "Compound Interest", href: "/financial/compound-interest" }]}>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Current Age" type="number" value={currentAge} onChange={(e) => setCurrentAge(e.target.value)} />
          <Input label="Retirement Age" type="number" value={retireAge} onChange={(e) => setRetireAge(e.target.value)} />
        </div>
        <Input label="Current Savings" type="number" prefix="$" value={currentSavings} onChange={(e) => setCurrentSavings(e.target.value)} />
        <Input label="Monthly Contribution" type="number" prefix="$" value={monthlyContrib} onChange={(e) => setMonthlyContrib(e.target.value)} />
        <Input label="Expected Annual Return" type="number" suffix="%" value={rate} onChange={(e) => setRate(e.target.value)} />
        <Button onClick={calculate} className="w-full brand-gradient text-white" size="lg">Calculate Retirement</Button>
        {result && (
          <div className="mt-8 pt-8 border-t">
            <div className="text-center mb-6">
              <div className="text-sm text-muted-foreground mb-1">Retirement Savings in {result.years} Years</div>
              <div className="text-5xl font-bold brand-gradient-text">{formatCurrency(result.total)}</div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="p-4 text-center"><div className="text-xs text-muted-foreground">Total Contributed</div><div className="font-semibold">{formatCurrency(result.contributed)}</div></Card>
              <Card className="p-4 text-center"><div className="text-xs text-muted-foreground">Investment Growth</div><div className="font-semibold text-green-500">{formatCurrency(result.earnings)}</div></Card>
              <Card className="p-4 text-center border-primary bg-primary/5"><div className="text-xs text-primary">Monthly Retirement Income*</div><div className="font-semibold text-primary">{formatCurrency(result.monthly)}</div></Card>
            </div>
            <p className="text-xs text-muted-foreground mt-4 text-center">*Based on 4% annual withdrawal rate</p>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
