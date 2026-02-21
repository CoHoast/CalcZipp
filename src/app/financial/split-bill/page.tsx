"use client";
import { useState } from "react";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { Users } from "lucide-react";

export default function SplitBillCalculator() {
  const [total, setTotal] = useState<string>("120");
  const [people, setPeople] = useState<string>("4");
  const [tipPercent, setTipPercent] = useState<string>("18");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const t = parseFloat(total) || 0;
    const p = parseInt(people) || 1;
    const tip = parseFloat(tipPercent) || 0;
    const tipAmount = t * (tip / 100);
    const totalWithTip = t + tipAmount;
    const perPerson = totalWithTip / p;
    setResult({ total: t, tipAmount, totalWithTip, perPerson, people: p });
  };

  return (
    <CalculatorLayout title="Split Bill Calculator" description="Easily split a bill among friends, with or without tip." category="Financial" categoryHref="/financial" icon={<Users className="h-3 w-3 mr-1" />} promoContext="financial" relatedCalculators={[{ name: "Tip Calculator", href: "/financial/tip" }, { name: "Discount Calculator", href: "/financial/discount" }]}>
      <div className="space-y-6">
        <Input label="Total Bill" type="number" prefix="$" value={total} onChange={(e) => setTotal(e.target.value)} />
        <Input label="Number of People" type="number" value={people} onChange={(e) => setPeople(e.target.value)} />
        <Input label="Tip Percentage" type="number" suffix="%" value={tipPercent} onChange={(e) => setTipPercent(e.target.value)} />
        <Button onClick={calculate} className="w-full brand-gradient text-white" size="lg">Split Bill</Button>
        {result && (
          <div className="mt-8 pt-8 border-t">
            <div className="text-center mb-6">
              <div className="text-sm text-muted-foreground mb-1">Each Person Pays</div>
              <div className="text-5xl font-bold brand-gradient-text">{formatCurrency(result.perPerson)}</div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="p-4 text-center"><div className="text-xs text-muted-foreground">Subtotal</div><div className="font-semibold">{formatCurrency(result.total)}</div></Card>
              <Card className="p-4 text-center"><div className="text-xs text-muted-foreground">Total Tip</div><div className="font-semibold">{formatCurrency(result.tipAmount)}</div></Card>
              <Card className="p-4 text-center"><div className="text-xs text-muted-foreground">Grand Total</div><div className="font-semibold">{formatCurrency(result.totalWithTip)}</div></Card>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
