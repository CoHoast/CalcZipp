"use client";
import { useState } from "react";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Apple } from "lucide-react";

export default function MacroCalculator() {
  const [calories, setCalories] = useState<string>("2000");
  const [proteinPercent, setProteinPercent] = useState<string>("30");
  const [carbPercent, setCarbPercent] = useState<string>("40");
  const [fatPercent, setFatPercent] = useState<string>("30");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const cal = parseFloat(calories) || 0;
    const pPct = parseFloat(proteinPercent) || 0;
    const cPct = parseFloat(carbPercent) || 0;
    const fPct = parseFloat(fatPercent) || 0;
    const proteinCal = cal * (pPct / 100);
    const carbCal = cal * (cPct / 100);
    const fatCal = cal * (fPct / 100);
    setResult({
      proteinGrams: Math.round(proteinCal / 4),
      carbGrams: Math.round(carbCal / 4),
      fatGrams: Math.round(fatCal / 9),
      proteinCal: Math.round(proteinCal),
      carbCal: Math.round(carbCal),
      fatCal: Math.round(fatCal),
    });
  };

  return (
    <CalculatorLayout title="Macro Calculator" description="Calculate your daily protein, carbs, and fat intake based on calorie goals." category="Health" categoryHref="/health" icon={<Apple className="h-3 w-3 mr-1" />} promoContext="health" howItWorks="Macros are calculated based on percentage of total calories:\n• Protein: 4 calories per gram\n• Carbs: 4 calories per gram\n• Fat: 9 calories per gram" relatedCalculators={[{ name: "Calorie Calculator", href: "/health/calorie" }, { name: "BMI Calculator", href: "/health/bmi" }]}>
      <div className="space-y-6">
        <Input label="Daily Calories" type="number" value={calories} onChange={(e) => setCalories(e.target.value)} />
        <div className="grid grid-cols-3 gap-4">
          <Input label="Protein %" type="number" suffix="%" value={proteinPercent} onChange={(e) => setProteinPercent(e.target.value)} />
          <Input label="Carbs %" type="number" suffix="%" value={carbPercent} onChange={(e) => setCarbPercent(e.target.value)} />
          <Input label="Fat %" type="number" suffix="%" value={fatPercent} onChange={(e) => setFatPercent(e.target.value)} />
        </div>
        <Button onClick={calculate} className="w-full brand-gradient text-white" size="lg">Calculate Macros</Button>
        {result && (
          <div className="mt-8 pt-8 border-t">
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="p-6 text-center border-blue-200 bg-blue-50">
                <div className="text-3xl font-bold text-blue-600">{result.proteinGrams}g</div>
                <div className="text-sm font-medium text-blue-600">Protein</div>
                <div className="text-xs text-muted-foreground">{result.proteinCal} cal</div>
              </Card>
              <Card className="p-6 text-center border-amber-200 bg-amber-50">
                <div className="text-3xl font-bold text-amber-600">{result.carbGrams}g</div>
                <div className="text-sm font-medium text-amber-600">Carbohydrates</div>
                <div className="text-xs text-muted-foreground">{result.carbCal} cal</div>
              </Card>
              <Card className="p-6 text-center border-green-200 bg-green-50">
                <div className="text-3xl font-bold text-green-600">{result.fatGrams}g</div>
                <div className="text-sm font-medium text-green-600">Fat</div>
                <div className="text-xs text-muted-foreground">{result.fatCal} cal</div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
