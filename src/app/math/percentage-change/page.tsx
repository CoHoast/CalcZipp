"use client";
import { useState } from "react";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";
import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react";

export default function PercentageChangeCalculator() {
  const [oldValue, setOldValue] = useState<string>("100");
  const [newValue, setNewValue] = useState<string>("125");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const old = parseFloat(oldValue) || 0;
    const newVal = parseFloat(newValue) || 0;
    if (old === 0) return;
    const change = newVal - old;
    const percentChange = (change / Math.abs(old)) * 100;
    const isIncrease = change >= 0;
    setResult({ change, percentChange, isIncrease, old, new: newVal });
  };

  return (
    <CalculatorLayout title="Percentage Change Calculator" description="Calculate the percentage increase or decrease between two values." category="Math" categoryHref="/math" icon={<TrendingUp className="h-3 w-3 mr-1" />} promoContext="math" formula="Percentage Change = ((New - Old) / |Old|) × 100" relatedCalculators={[{ name: "Percentage Calculator", href: "/math/percentage" }, { name: "Discount Calculator", href: "/financial/discount" }]}>
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <Input label="Original Value" type="number" value={oldValue} onChange={(e) => setOldValue(e.target.value)} />
          <Input label="New Value" type="number" value={newValue} onChange={(e) => setNewValue(e.target.value)} />
        </div>
        <Button onClick={calculate} className="w-full brand-gradient text-white" size="lg">Calculate Change</Button>
        {result && (
          <div className="mt-8 pt-8 border-t">
            <div className="text-center mb-6">
              <div className="text-sm text-muted-foreground mb-1">Percentage Change</div>
              <div className={`text-5xl font-bold flex items-center justify-center gap-2 ${result.isIncrease ? 'text-green-500' : 'text-red-500'}`}>
                {result.isIncrease ? <TrendingUp className="h-10 w-10" /> : <TrendingDown className="h-10 w-10" />}
                {result.isIncrease ? '+' : ''}{formatNumber(result.percentChange, 2)}%
              </div>
            </div>
            <Card className="p-6 text-center">
              <div className="flex items-center justify-center gap-4">
                <div>
                  <div className="text-xs text-muted-foreground">From</div>
                  <div className="text-xl font-semibold">{formatNumber(result.old)}</div>
                </div>
                <ArrowRight className="h-6 w-6 text-muted-foreground" />
                <div>
                  <div className="text-xs text-muted-foreground">To</div>
                  <div className="text-xl font-semibold">{formatNumber(result.new)}</div>
                </div>
                <div className="pl-4 border-l">
                  <div className="text-xs text-muted-foreground">Difference</div>
                  <div className={`text-xl font-semibold ${result.isIncrease ? 'text-green-500' : 'text-red-500'}`}>
                    {result.isIncrease ? '+' : ''}{formatNumber(result.change)}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
