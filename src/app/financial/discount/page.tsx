"use client";
import { useState } from "react";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { Percent } from "lucide-react";

export default function DiscountCalculator() {
  const [price, setPrice] = useState<string>("100");
  const [discount, setDiscount] = useState<string>("25");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const p = parseFloat(price) || 0;
    const d = parseFloat(discount) || 0;
    const savings = p * (d / 100);
    const finalPrice = p - savings;
    setResult({ originalPrice: p, savings, finalPrice, discountPercent: d });
  };

  return (
    <CalculatorLayout title="Discount Calculator" description="Calculate sale prices, savings, and discounts quickly." category="Financial" categoryHref="/financial" icon={<Percent className="h-3 w-3 mr-1" />} promoContext="financial" relatedCalculators={[{ name: "Percentage Calculator", href: "/math/percentage" }, { name: "Tip Calculator", href: "/financial/tip" }]}>
      <div className="space-y-6">
        <Input label="Original Price" type="number" prefix="$" value={price} onChange={(e) => setPrice(e.target.value)} />
        <div>
          <label className="block text-sm font-medium mb-2">Discount</label>
          <div className="flex gap-2 flex-wrap mb-2">
            {["10", "15", "20", "25", "30", "50"].map((d) => (
              <Button key={d} variant={discount === d ? "default" : "outline"} className={discount === d ? "brand-gradient text-white" : ""} onClick={() => setDiscount(d)}>{d}%</Button>
            ))}
          </div>
          <Input type="number" suffix="%" value={discount} onChange={(e) => setDiscount(e.target.value)} />
        </div>
        <Button onClick={calculate} className="w-full brand-gradient text-white" size="lg">Calculate Discount</Button>
        {result && (
          <div className="mt-8 pt-8 border-t">
            <div className="text-center mb-6">
              <div className="text-sm text-muted-foreground mb-1">Final Price</div>
              <div className="text-5xl font-bold brand-gradient-text">{formatCurrency(result.finalPrice)}</div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="p-4 text-center"><div className="text-xs text-muted-foreground">Original Price</div><div className="font-semibold text-lg line-through text-muted-foreground">{formatCurrency(result.originalPrice)}</div></Card>
              <Card className="p-4 text-center"><div className="text-xs text-muted-foreground">You Save</div><div className="font-semibold text-lg text-green-500">{formatCurrency(result.savings)} ({result.discountPercent}%)</div></Card>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
