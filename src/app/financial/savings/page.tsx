"use client";

import { useState } from "react";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { PiggyBank } from "lucide-react";

export default function SavingsCalculator() {
  const [initial, setInitial] = useState<string>("1000");
  const [monthly, setMonthly] = useState<string>("200");
  const [rate, setRate] = useState<string>("5");
  const [years, setYears] = useState<string>("10");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const p = parseFloat(initial) || 0;
    const pmt = parseFloat(monthly) || 0;
    const r = (parseFloat(rate) || 0) / 100 / 12;
    const n = (parseFloat(years) || 0) * 12;

    let futureValue = p * Math.pow(1 + r, n);
    if (r > 0) {
      futureValue += pmt * ((Math.pow(1 + r, n) - 1) / r);
    } else {
      futureValue += pmt * n;
    }

    const totalContributions = p + (pmt * n);
    const totalInterest = futureValue - totalContributions;

    setResult({ futureValue, totalContributions, totalInterest });
  };

  return (
    <CalculatorLayout
      title="Savings Calculator"
      description="Calculate how your savings will grow over time with compound interest."
      category="Financial"
      categoryHref="/financial"
      icon={<PiggyBank className="h-3 w-3 mr-1" />}
      promoContext="financial"
      formula="FV = P(1+r)^n + PMT × ((1+r)^n - 1) / r"
      relatedCalculators={[
        { name: "Compound Interest", href: "/financial/compound-interest" },
        { name: "Investment Calculator", href: "/financial/investment" },
        { name: "Retirement Calculator", href: "/financial/retirement" },
      ]}
    >
      <div className="space-y-6">
        <Input label="Initial Deposit" type="number" prefix="$" value={initial} onChange={(e) => setInitial(e.target.value)} />
        <Input label="Monthly Contribution" type="number" prefix="$" value={monthly} onChange={(e) => setMonthly(e.target.value)} />
        <Input label="Annual Interest Rate" type="number" suffix="%" value={rate} onChange={(e) => setRate(e.target.value)} />
        <Input label="Time Period" type="number" suffix="years" value={years} onChange={(e) => setYears(e.target.value)} />
        
        <Button onClick={calculate} className="w-full brand-gradient text-white" size="lg">Calculate Savings</Button>

        {result && (
          <div className="mt-8 pt-8 border-t border-border">
            <div className="text-center mb-6">
              <div className="text-sm text-muted-foreground mb-1">Future Value</div>
              <div className="text-5xl font-bold brand-gradient-text">{formatCurrency(result.futureValue)}</div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="p-4 text-center">
                <div className="text-xs text-muted-foreground mb-1">Total Contributions</div>
                <div className="font-semibold text-lg">{formatCurrency(result.totalContributions)}</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-xs text-muted-foreground mb-1">Total Interest Earned</div>
                <div className="font-semibold text-lg text-green-500">{formatCurrency(result.totalInterest)}</div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
