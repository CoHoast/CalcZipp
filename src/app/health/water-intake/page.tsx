"use client";
import { useState } from "react";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";
import { Droplets } from "lucide-react";

export default function WaterIntakeCalculator() {
  const [weight, setWeight] = useState<string>("150");
  const [activity, setActivity] = useState<string>("moderate");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const w = parseFloat(weight) || 0;
    let baseOz = w * 0.5; // Base: half your weight in oz
    const multipliers: Record<string, number> = { sedentary: 1, light: 1.1, moderate: 1.2, active: 1.3, "very-active": 1.4 };
    const totalOz = baseOz * (multipliers[activity] || 1.2);
    const liters = totalOz * 0.0295735;
    const cups = totalOz / 8;
    const bottles = totalOz / 16.9;
    setResult({ oz: Math.round(totalOz), liters: formatNumber(liters, 1), cups: Math.round(cups), bottles: Math.round(bottles) });
  };

  return (
    <CalculatorLayout title="Water Intake Calculator" description="Calculate how much water you should drink daily based on weight and activity." category="Health" categoryHref="/health" icon={<Droplets className="h-3 w-3 mr-1" />} promoContext="health" howItWorks="Base recommendation: drink half your body weight in ounces. Adjust based on activity level, climate, and health conditions." relatedCalculators={[{ name: "Calorie Calculator", href: "/health/calorie" }, { name: "BMI Calculator", href: "/health/bmi" }]}>
      <div className="space-y-6">
        <Input label="Body Weight (lbs)" type="number" value={weight} onChange={(e) => setWeight(e.target.value)} />
        <div>
          <label className="block text-sm font-medium mb-1.5">Activity Level</label>
          <select className="flex h-12 w-full rounded-lg border border-input bg-background px-4 py-2" value={activity} onChange={(e) => setActivity(e.target.value)}>
            <option value="sedentary">Sedentary (little/no exercise)</option>
            <option value="light">Light (1-2 days/week)</option>
            <option value="moderate">Moderate (3-5 days/week)</option>
            <option value="active">Active (6-7 days/week)</option>
            <option value="very-active">Very Active (athlete/physical job)</option>
          </select>
        </div>
        <Button onClick={calculate} className="w-full brand-gradient text-white" size="lg">Calculate Water Intake</Button>
        {result && (
          <div className="mt-8 pt-8 border-t">
            <div className="text-center mb-6">
              <div className="text-sm text-muted-foreground mb-1">Daily Water Goal</div>
              <div className="text-5xl font-bold brand-gradient-text">{result.oz} oz</div>
              <div className="text-muted-foreground">({result.liters} liters)</div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="p-4 text-center"><div className="text-xs text-muted-foreground">8 oz Glasses</div><div className="font-semibold text-2xl">{result.cups} 🥛</div></Card>
              <Card className="p-4 text-center"><div className="text-xs text-muted-foreground">Water Bottles (16.9 oz)</div><div className="font-semibold text-2xl">{result.bottles} 💧</div></Card>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
