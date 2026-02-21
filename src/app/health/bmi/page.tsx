"use client";

import { useState } from "react";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";
import { Scale } from "lucide-react";

export default function BMICalculator() {
  const [unit, setUnit] = useState<"imperial" | "metric">("imperial");
  const [heightFt, setHeightFt] = useState<string>("5");
  const [heightIn, setHeightIn] = useState<string>("10");
  const [heightCm, setHeightCm] = useState<string>("178");
  const [weight, setWeight] = useState<string>("170");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    let heightInMeters: number;
    let weightInKg: number;

    if (unit === "imperial") {
      const totalInches = (parseFloat(heightFt) || 0) * 12 + (parseFloat(heightIn) || 0);
      heightInMeters = totalInches * 0.0254;
      weightInKg = (parseFloat(weight) || 0) * 0.453592;
    } else {
      heightInMeters = (parseFloat(heightCm) || 0) / 100;
      weightInKg = parseFloat(weight) || 0;
    }

    if (heightInMeters <= 0 || weightInKg <= 0) return;

    const bmi = weightInKg / (heightInMeters * heightInMeters);
    
    let category = "";
    let color = "";
    if (bmi < 18.5) {
      category = "Underweight";
      color = "text-blue-500";
    } else if (bmi < 25) {
      category = "Normal weight";
      color = "text-green-500";
    } else if (bmi < 30) {
      category = "Overweight";
      color = "text-amber-500";
    } else {
      category = "Obese";
      color = "text-red-500";
    }

    // Calculate healthy weight range
    const minHealthyWeight = 18.5 * heightInMeters * heightInMeters;
    const maxHealthyWeight = 24.9 * heightInMeters * heightInMeters;

    setResult({
      bmi: formatNumber(bmi, 1),
      category,
      color,
      minHealthyWeight: unit === "imperial" ? formatNumber(minHealthyWeight / 0.453592) : formatNumber(minHealthyWeight),
      maxHealthyWeight: unit === "imperial" ? formatNumber(maxHealthyWeight / 0.453592) : formatNumber(maxHealthyWeight),
      weightUnit: unit === "imperial" ? "lbs" : "kg",
    });
  };

  return (
    <CalculatorLayout
      title="BMI Calculator"
      description="Calculate your Body Mass Index (BMI) to see if you're at a healthy weight for your height."
      category="Health"
      categoryHref="/health"
      icon={<Scale className="h-3 w-3 mr-1" />}
      promoContext="health"
      formula="BMI = weight (kg) / height² (m²)"
      howItWorks={`BMI (Body Mass Index) is a measure of body fat based on height and weight.

BMI Categories:
• Under 18.5 - Underweight
• 18.5 to 24.9 - Normal weight
• 25 to 29.9 - Overweight
• 30 and above - Obese

Note: BMI doesn't account for muscle mass, age, or body composition. Athletes may have high BMI but low body fat.`}
      faqs={[
        { question: "Is BMI accurate for everyone?", answer: "BMI is a general indicator but doesn't distinguish between muscle and fat. It may overestimate body fat in athletes and underestimate in elderly people." },
        { question: "What's a healthy BMI?", answer: "A BMI between 18.5 and 24.9 is considered normal weight. However, health depends on many factors beyond BMI." },
        { question: "How often should I check my BMI?", answer: "Checking monthly or quarterly is sufficient for tracking changes. Daily fluctuations in weight are normal." },
      ]}
      relatedCalculators={[
        { name: "Calorie Calculator", href: "/health/calorie" },
        { name: "Ideal Weight Calculator", href: "/health/ideal-weight" },
        { name: "Body Fat Calculator", href: "/health/body-fat" },
      ]}
    >
      <div className="space-y-6">
        {/* Unit Toggle */}
        <div className="flex gap-2">
          <Button
            variant={unit === "imperial" ? "default" : "outline"}
            className={unit === "imperial" ? "brand-gradient text-white" : ""}
            onClick={() => setUnit("imperial")}
          >
            Imperial (ft, lbs)
          </Button>
          <Button
            variant={unit === "metric" ? "default" : "outline"}
            className={unit === "metric" ? "brand-gradient text-white" : ""}
            onClick={() => setUnit("metric")}
          >
            Metric (cm, kg)
          </Button>
        </div>

        {/* Height */}
        {unit === "imperial" ? (
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Height (feet)"
              type="number"
              value={heightFt}
              onChange={(e) => setHeightFt(e.target.value)}
              suffix="ft"
            />
            <Input
              label="Height (inches)"
              type="number"
              value={heightIn}
              onChange={(e) => setHeightIn(e.target.value)}
              suffix="in"
            />
          </div>
        ) : (
          <Input
            label="Height"
            type="number"
            value={heightCm}
            onChange={(e) => setHeightCm(e.target.value)}
            suffix="cm"
          />
        )}

        {/* Weight */}
        <Input
          label={`Weight (${unit === "imperial" ? "lbs" : "kg"})`}
          type="number"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
          suffix={unit === "imperial" ? "lbs" : "kg"}
        />

        <Button onClick={calculate} className="w-full brand-gradient text-white" size="lg">
          Calculate BMI
        </Button>

        {result && (
          <div className="mt-8 pt-8 border-t border-border">
            <div className="text-center mb-6">
              <div className="text-sm text-muted-foreground mb-1">Your BMI</div>
              <div className={`text-6xl font-bold ${result.color}`}>
                {result.bmi}
              </div>
              <div className={`text-xl font-medium mt-2 ${result.color}`}>
                {result.category}
              </div>
            </div>

            {/* BMI Scale */}
            <div className="mb-6">
              <div className="h-4 rounded-full overflow-hidden flex">
                <div className="bg-blue-400 flex-1" title="Underweight" />
                <div className="bg-green-400 flex-1" title="Normal" />
                <div className="bg-amber-400 flex-1" title="Overweight" />
                <div className="bg-red-400 flex-1" title="Obese" />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>Underweight<br/>&lt;18.5</span>
                <span>Normal<br/>18.5-24.9</span>
                <span>Overweight<br/>25-29.9</span>
                <span>Obese<br/>30+</span>
              </div>
            </div>

            <Card className="p-4 bg-muted/50">
              <div className="text-sm text-muted-foreground">
                Healthy weight range for your height:
              </div>
              <div className="font-semibold">
                {result.minHealthyWeight} - {result.maxHealthyWeight} {result.weightUnit}
              </div>
            </Card>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
