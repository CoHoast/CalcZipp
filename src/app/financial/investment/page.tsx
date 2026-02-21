"use client";
import { useState } from "react";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { TrendingUp } from "lucide-react";

export default function InvestmentCalculator() {
  const [initial, setInitial] = useState<string>("10000");
  const [monthly, setMonthly] = useState<string>("500");
  const [rate, setRate] = useState<string>("8");
  const [years, setYears] = useState<string>("20");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const p = parseFloat(initial) || 0;
    const pmt = parseFloat(monthly) || 0;
    const r = (parseFloat(rate) || 0) / 100 / 12;
    const n = (parseFloat(years) || 0) * 12;
    let fv = p * Math.pow(1 + r, n);
    if (r > 0) fv += pmt * ((Math.pow(1 + r, n) - 1) / r);
    else fv += pmt * n;
    const totalInvested = p + pmt * n;
    const earnings = fv - totalInvested;
    setResult({ futureValue: fv, totalInvested, earnings, yearsNum: parseFloat(years) });
  };

  return (
    <CalculatorLayout title="Investment Calculator" description="Project your investment growth over time with compound interest." category="Financial" categoryHref="/financial" icon={<TrendingUp className="h-3 w-3 mr-1" />} promoContext="financial" relatedCalculators={[{ name: "Compound Interest", href: "/financial/compound-interest" }, { name: "Retirement Calculator", href: "/financial/retirement" }]}>
      <div className="space-y-6">
        <Input label="Initial Investment" type="number" prefix="$" value={initial} onChange={(e) => setInitial(e.target.value)} />
        <Input label="Monthly Contribution" type="number" prefix="$" value={monthly} onChange={(e) => setMonthly(e.target.value)} />
        <Input label="Expected Annual Return" type="number" suffix="%" value={rate} onChange={(e) => setRate(e.target.value)} />
        <Input label="Investment Period" type="number" suffix="years" value={years} onChange={(e) => setYears(e.target.value)} />
        <Button onClick={calculate} className="w-full brand-gradient text-white" size="lg">Calculate Returns</Button>
        {result && (
          <div className="mt-8 pt-8 border-t">
            <div className="text-center mb-6">
              <div className="text-sm text-muted-foreground mb-1">Future Value in {result.yearsNum} Years</div>
              <div className="text-5xl font-bold brand-gradient-text">{formatCurrency(result.futureValue)}</div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="p-4 text-center"><div className="text-xs text-muted-foreground">Total Invested</div><div className="font-semibold text-lg">{formatCurrency(result.totalInvested)}</div></Card>
              <Card className="p-4 text-center border-green-200 bg-green-50"><div className="text-xs text-green-600">Investment Earnings</div><div className="font-semibold text-lg text-green-600">{formatCurrency(result.earnings)}</div></Card>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
