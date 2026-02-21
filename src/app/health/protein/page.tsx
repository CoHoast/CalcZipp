"use client";
import { useState } from "react";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dumbbell } from "lucide-react";

export default function ProteinCalculator() {
  const [weight, setWeight] = useState<string>("170");
  const [goal, setGoal] = useState<string>("maintain");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const w = parseFloat(weight) || 0;
    const wKg = w * 0.453592;
    const multipliers: Record<string, { min: number; max: number; label: string }> = {
      sedentary: { min: 0.8, max: 1.0, label: "Sedentary" },
      maintain: { min: 1.0, max: 1.2, label: "Maintenance" },
      active: { min: 1.2, max: 1.6, label: "Active/Build Muscle" },
      athlete: { min: 1.6, max: 2.2, label: "Athlete/Bodybuilder" },
    };
    const m = multipliers[goal] || multipliers.maintain;
    const minProtein = Math.round(wKg * m.min);
    const maxProtein = Math.round(wKg * m.max);
    setResult({ min: minProtein, max: maxProtein, label: m.label, meals: Math.round((minProtein + maxProtein) / 2 / 4) });
  };

  return (
    <CalculatorLayout title="Protein Calculator" description="Calculate your daily protein needs based on weight and fitness goals." category="Health" categoryHref="/health" icon={<Dumbbell className="h-3 w-3 mr-1" />} promoContext="health" howItWorks="Protein needs vary by activity:\n• Sedentary: 0.8g per kg\n• Active: 1.2-1.6g per kg\n• Athletes: 1.6-2.2g per kg" relatedCalculators={[{ name: "Macro Calculator", href: "/health/macro" }, { name: "Calorie Calculator", href: "/health/calorie" }]}>
      <div className="space-y-6">
        <Input label="Body Weight (lbs)" type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
        <div>
          <label className="block text-sm font-medium mb-1.5">Goal</label>
          <select className="flex h-12 w-full rounded-lg border border-input bg-background px-4 py-2" value={goal} onChange={(e) => setGoal(e.target.value)}>
            <option value="sedentary">Sedentary (minimal exercise)</option>
            <option value="maintain">Maintain Weight (moderate)</option>
            <option value="active">Build Muscle (active training)</option>
            <option value="athlete">Athlete / Bodybuilder</option>
          </select>
        </div>
        <Button onClick={calculate} className="w-full brand-gradient text-white" size="lg">Calculate Protein</Button>
        {result && (
          <div className="mt-8 pt-8 border-t">
            <div className="text-center mb-6">
              <div className="text-sm text-muted-foreground mb-1">Daily Protein Intake</div>
              <div className="text-4xl font-bold brand-gradient-text">{result.min} - {result.max}g</div>
              <div className="text-sm text-muted-foreground mt-1">{result.label}</div>
            </div>
            <Card className="p-4 text-center">
              <div className="text-sm text-muted-foreground">If eating 4 meals per day</div>
              <div className="font-semibold text-xl">~{result.meals}g protein per meal</div>
            </Card>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
