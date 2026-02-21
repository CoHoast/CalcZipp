"use client";
import { useState } from "react";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Flame } from "lucide-react";

export default function CalorieCalculator() {
  const [age, setAge] = useState<string>("30");
  const [gender, setGender] = useState<string>("male");
  const [weight, setWeight] = useState<string>("170");
  const [height, setHeight] = useState<string>("70");
  const [activity, setActivity] = useState<string>("1.55");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const w = parseFloat(weight) * 0.453592; // lbs to kg
    const h = parseFloat(height) * 2.54; // inches to cm
    const a = parseFloat(age);
    const act = parseFloat(activity);
    
    let bmr = gender === "male" 
      ? 10 * w + 6.25 * h - 5 * a + 5
      : 10 * w + 6.25 * h - 5 * a - 161;
    
    const tdee = bmr * act;
    setResult({ bmr: Math.round(bmr), tdee: Math.round(tdee), lose: Math.round(tdee - 500), gain: Math.round(tdee + 500) });
  };

  return (
    <CalculatorLayout title="Calorie Calculator (TDEE)" description="Calculate your daily calorie needs based on age, weight, height, and activity level." category="Health" categoryHref="/health" icon={<Flame className="h-3 w-3 mr-1" />} promoContext="health" formula="Mifflin-St Jeor: BMR = 10×weight(kg) + 6.25×height(cm) - 5×age + 5 (male) or -161 (female)" relatedCalculators={[{ name: "BMI Calculator", href: "/health/bmi" }, { name: "Macro Calculator", href: "/health/macro" }]}>
      <div className="space-y-6">
        <div className="flex gap-2">
          <Button variant={gender === "male" ? "default" : "outline"} className={gender === "male" ? "brand-gradient text-white flex-1" : "flex-1"} onClick={() => setGender("male")}>Male</Button>
          <Button variant={gender === "female" ? "default" : "outline"} className={gender === "female" ? "brand-gradient text-white flex-1" : "flex-1"} onClick={() => setGender("female")}>Female</Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Age" type="number" suffix="years" value={age} onChange={(e) => setAge(e.target.value)} />
          <Input label="Weight" type="number" suffix="lbs" value={weight} onChange={(e) => setWeight(e.target.value)} />
        </div>
        <Input label="Height" type="number" suffix="inches" value={height} onChange={(e) => setHeight(e.target.value)} />
        <div>
          <label className="block text-sm font-medium mb-1.5">Activity Level</label>
          <select className="flex h-12 w-full rounded-lg border border-input bg-background px-4 py-2" value={activity} onChange={(e) => setActivity(e.target.value)}>
            <option value="1.2">Sedentary (little/no exercise)</option>
            <option value="1.375">Light (1-3 days/week)</option>
            <option value="1.55">Moderate (3-5 days/week)</option>
            <option value="1.725">Active (6-7 days/week)</option>
            <option value="1.9">Very Active (2x per day)</option>
          </select>
        </div>
        <Button onClick={calculate} className="w-full brand-gradient text-white" size="lg">Calculate Calories</Button>
        {result && (
          <div className="mt-8 pt-8 border-t">
            <div className="text-center mb-6">
              <div className="text-sm text-muted-foreground mb-1">Daily Calories (TDEE)</div>
              <div className="text-5xl font-bold brand-gradient-text">{result.tdee.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground mt-1">calories/day to maintain weight</div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="p-4 text-center"><div className="text-xs text-muted-foreground">BMR</div><div className="font-semibold text-lg">{result.bmr.toLocaleString()}</div></Card>
              <Card className="p-4 text-center border-red-200 bg-red-50"><div className="text-xs text-red-600">Lose Weight</div><div className="font-semibold text-lg text-red-600">{result.lose.toLocaleString()}</div></Card>
              <Card className="p-4 text-center border-green-200 bg-green-50"><div className="text-xs text-green-600">Gain Weight</div><div className="font-semibold text-lg text-green-600">{result.gain.toLocaleString()}</div></Card>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
