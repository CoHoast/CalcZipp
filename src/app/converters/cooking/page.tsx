"use client";
import { useState } from "react";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";
import { ChefHat } from "lucide-react";

const conversions = [
  { from: "cups", to: "tablespoons", factor: 16 },
  { from: "cups", to: "teaspoons", factor: 48 },
  { from: "cups", to: "milliliters", factor: 236.588 },
  { from: "cups", to: "fluid ounces", factor: 8 },
  { from: "tablespoons", to: "teaspoons", factor: 3 },
  { from: "tablespoons", to: "milliliters", factor: 14.787 },
  { from: "teaspoons", to: "milliliters", factor: 4.929 },
  { from: "ounces", to: "grams", factor: 28.35 },
  { from: "pounds", to: "grams", factor: 453.592 },
  { from: "pounds", to: "ounces", factor: 16 },
];

export default function CookingConverter() {
  const [amount, setAmount] = useState<string>("1");
  const [selectedConversion, setSelectedConversion] = useState<number>(0);

  const conv = conversions[selectedConversion];
  const result = (parseFloat(amount) || 0) * conv.factor;
  const reverse = (parseFloat(amount) || 0) / conv.factor;

  return (
    <CalculatorLayout title="Cooking Converter" description="Convert common cooking measurements like cups, tablespoons, teaspoons, and grams." category="Converters" categoryHref="/converters" icon={<ChefHat className="h-3 w-3 mr-1" />} promoContext="general" howItWorks="Quick reference:\n• 1 cup = 16 tbsp = 48 tsp\n• 1 tbsp = 3 tsp\n• 1 oz = 28.35g" relatedCalculators={[{ name: "Volume Converter", href: "/converters/volume" }, { name: "Weight Converter", href: "/converters/weight" }]}>
      <div className="space-y-6">
        <Input label="Amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        <div>
          <label className="block text-sm font-medium mb-1.5">Conversion</label>
          <select className="flex h-12 w-full rounded-lg border border-input bg-background px-4 py-2" value={selectedConversion} onChange={(e) => setSelectedConversion(parseInt(e.target.value))}>
            {conversions.map((c, i) => <option key={i} value={i}>{c.from} → {c.to}</option>)}
          </select>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="p-6 text-center">
            <div className="text-xs text-muted-foreground mb-1">{amount} {conv.from} =</div>
            <div className="text-3xl font-bold brand-gradient-text">{formatNumber(result, 2)}</div>
            <div className="text-sm text-muted-foreground">{conv.to}</div>
          </Card>
          <Card className="p-6 text-center bg-muted/30">
            <div className="text-xs text-muted-foreground mb-1">{amount} {conv.to} =</div>
            <div className="text-3xl font-bold">{formatNumber(reverse, 4)}</div>
            <div className="text-sm text-muted-foreground">{conv.from}</div>
          </Card>
        </div>
        <Card className="p-4">
          <div className="text-sm font-medium mb-2">Quick Reference</div>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>1 cup = 16 tablespoons</div>
            <div>1 tablespoon = 3 teaspoons</div>
            <div>1 cup = 236.6 mL</div>
            <div>1 stick butter = ½ cup</div>
            <div>1 ounce = 28.35 grams</div>
            <div>1 pound = 453.6 grams</div>
          </div>
        </Card>
      </div>
    </CalculatorLayout>
  );
}
