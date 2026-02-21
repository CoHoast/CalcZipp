"use client";
import { useState } from "react";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { Home } from "lucide-react";

export default function DownPaymentCalculator() {
  const [homePrice, setHomePrice] = useState<string>("350000");
  const [percentage, setPercentage] = useState<string>("20");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const price = parseFloat(homePrice) || 0;
    const pct = parseFloat(percentage) || 0;
    const downPayment = price * (pct / 100);
    const loanAmount = price - downPayment;
    const pmi = pct < 20;
    const commonDowns = [5, 10, 15, 20, 25].map(p => ({ percent: p, amount: price * (p / 100), loan: price - price * (p / 100), pmi: p < 20 }));
    setResult({ downPayment, loanAmount, pmi, percentage: pct, commonDowns });
  };

  return (
    <CalculatorLayout title="Down Payment Calculator" description="Calculate your home down payment and see how different amounts affect your loan." category="Financial" categoryHref="/financial" icon={<Home className="h-3 w-3 mr-1" />} promoContext="financial" howItWorks="A 20% down payment avoids PMI (Private Mortgage Insurance). Lower down payments require PMI, adding to monthly costs." relatedCalculators={[{ name: "Mortgage Calculator", href: "/financial/mortgage" }, { name: "Savings Goal", href: "/financial/savings" }]}>
      <div className="space-y-6">
        <Input label="Home Price" type="number" prefix="$" value={homePrice} onChange={(e) => setHomePrice(e.target.value)} />
        <Input label="Down Payment %" type="number" suffix="%" value={percentage} onChange={(e) => setPercentage(e.target.value)} />
        <Button onClick={calculate} className="w-full brand-gradient text-white" size="lg">Calculate</Button>
        {result && (
          <div className="mt-8 pt-8 border-t">
            <div className="text-center mb-6">
              <div className="text-sm text-muted-foreground mb-1">Down Payment ({result.percentage}%)</div>
              <div className="text-5xl font-bold brand-gradient-text">{formatCurrency(result.downPayment)}</div>
              {result.pmi && <div className="text-amber-500 text-sm mt-2">⚠️ PMI likely required (under 20%)</div>}
            </div>
            <Card className="p-4 text-center mb-6">
              <div className="text-xs text-muted-foreground">Loan Amount</div>
              <div className="font-semibold text-xl">{formatCurrency(result.loanAmount)}</div>
            </Card>
            <div className="text-sm font-medium mb-2">Compare Down Payments</div>
            <div className="grid grid-cols-5 gap-2">
              {result.commonDowns.map((d: any) => (
                <Card key={d.percent} className={`p-3 text-center text-xs ${d.percent === result.percentage ? 'border-primary bg-primary/5' : ''}`}>
                  <div className="font-bold">{d.percent}%</div>
                  <div className="text-muted-foreground">{formatCurrency(d.amount)}</div>
                  {d.pmi && <div className="text-amber-500 text-[10px]">+PMI</div>}
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
