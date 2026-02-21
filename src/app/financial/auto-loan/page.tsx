"use client";
import { useState } from "react";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { Car } from "lucide-react";

export default function AutoLoanCalculator() {
  const [price, setPrice] = useState<string>("30000");
  const [downPayment, setDownPayment] = useState<string>("5000");
  const [rate, setRate] = useState<string>("6");
  const [term, setTerm] = useState<string>("60");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const p = (parseFloat(price) || 0) - (parseFloat(downPayment) || 0);
    const r = (parseFloat(rate) || 0) / 100 / 12;
    const n = parseFloat(term) || 60;
    const monthly = r > 0 ? p * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1) : p / n;
    const total = monthly * n;
    const interest = total - p;
    setResult({ monthly, total, interest, principal: p });
  };

  return (
    <CalculatorLayout title="Auto Loan Calculator" description="Calculate your monthly car payment and total loan cost." category="Financial" categoryHref="/financial" icon={<Car className="h-3 w-3 mr-1" />} promoContext="financial" relatedCalculators={[{ name: "Loan Calculator", href: "/financial/loan" }, { name: "Mortgage Calculator", href: "/financial/mortgage" }]}>
      <div className="space-y-6">
        <Input label="Vehicle Price" type="number" prefix="$" value={price} onChange={(e) => setPrice(e.target.value)} />
        <Input label="Down Payment" type="number" prefix="$" value={downPayment} onChange={(e) => setDownPayment(e.target.value)} />
        <Input label="Interest Rate (APR)" type="number" suffix="%" value={rate} onChange={(e) => setRate(e.target.value)} />
        <Input label="Loan Term (months)" type="number" suffix="mo" value={term} onChange={(e) => setTerm(e.target.value)} />
        <Button onClick={calculate} className="w-full brand-gradient text-white" size="lg">Calculate</Button>
        {result && (
          <div className="mt-8 pt-8 border-t">
            <div className="text-center mb-6">
              <div className="text-sm text-muted-foreground mb-1">Monthly Payment</div>
              <div className="text-5xl font-bold brand-gradient-text">{formatCurrency(result.monthly)}</div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="p-4 text-center"><div className="text-xs text-muted-foreground">Loan Amount</div><div className="font-semibold">{formatCurrency(result.principal)}</div></Card>
              <Card className="p-4 text-center"><div className="text-xs text-muted-foreground">Total Interest</div><div className="font-semibold">{formatCurrency(result.interest)}</div></Card>
              <Card className="p-4 text-center"><div className="text-xs text-muted-foreground">Total Cost</div><div className="font-semibold">{formatCurrency(result.total)}</div></Card>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
