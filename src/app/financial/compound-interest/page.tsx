"use client";
import { useState } from "react";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { TrendingUp } from "lucide-react";

export default function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState<string>("10000");
  const [rate, setRate] = useState<string>("7");
  const [time, setTime] = useState<string>("10");
  const [compound, setCompound] = useState<string>("12");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const p = parseFloat(principal) || 0;
    const r = (parseFloat(rate) || 0) / 100;
    const t = parseFloat(time) || 0;
    const n = parseFloat(compound) || 1;
    const amount = p * Math.pow(1 + r / n, n * t);
    const interest = amount - p;
    setResult({ amount, interest, principal: p });
  };

  return (
    <CalculatorLayout title="Compound Interest Calculator" description="Calculate how your money grows with compound interest over time." category="Financial" categoryHref="/financial" icon={<TrendingUp className="h-3 w-3 mr-1" />} promoContext="financial" formula="A = P(1 + r/n)^(nt)" relatedCalculators={[{ name: "Savings Calculator", href: "/financial/savings" }, { name: "Investment Calculator", href: "/financial/investment" }]}>
      <div className="space-y-6">
        <Input label="Principal Amount" type="number" prefix="$" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
        <Input label="Annual Interest Rate" type="number" suffix="%" value={rate} onChange={(e) => setRate(e.target.value)} />
        <Input label="Time Period (years)" type="number" value={time} onChange={(e) => setTime(e.target.value)} />
        <div>
          <label className="block text-sm font-medium mb-1.5">Compound Frequency</label>
          <select className="flex h-12 w-full rounded-lg border border-input bg-background px-4 py-2" value={compound} onChange={(e) => setCompound(e.target.value)}>
            <option value="1">Annually</option>
            <option value="2">Semi-annually</option>
            <option value="4">Quarterly</option>
            <option value="12">Monthly</option>
            <option value="365">Daily</option>
          </select>
        </div>
        <Button onClick={calculate} className="w-full brand-gradient text-white" size="lg">Calculate</Button>
        {result && (
          <div className="mt-8 pt-8 border-t">
            <div className="text-center mb-6">
              <div className="text-sm text-muted-foreground mb-1">Final Amount</div>
              <div className="text-5xl font-bold brand-gradient-text">{formatCurrency(result.amount)}</div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="p-4 text-center"><div className="text-xs text-muted-foreground">Principal</div><div className="font-semibold text-lg">{formatCurrency(result.principal)}</div></Card>
              <Card className="p-4 text-center"><div className="text-xs text-muted-foreground">Interest Earned</div><div className="font-semibold text-lg text-green-500">{formatCurrency(result.interest)}</div></Card>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
