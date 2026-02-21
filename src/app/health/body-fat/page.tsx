"use client";
import { useState } from "react";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";
import { Activity } from "lucide-react";

export default function BodyFatCalculator() {
  const [gender, setGender] = useState<string>("male");
  const [height, setHeight] = useState<string>("70");
  const [neck, setNeck] = useState<string>("15");
  const [waist, setWaist] = useState<string>("34");
  const [hips, setHips] = useState<string>("38");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const h = parseFloat(height) || 0;
    const n = parseFloat(neck) || 0;
    const w = parseFloat(waist) || 0;
    const hp = parseFloat(hips) || 0;
    
    let bodyFat: number;
    if (gender === "male") {
      bodyFat = 86.010 * Math.log10(w - n) - 70.041 * Math.log10(h) + 36.76;
    } else {
      bodyFat = 163.205 * Math.log10(w + hp - n) - 97.684 * Math.log10(h) - 78.387;
    }
    
    const categories = gender === "male"
      ? [{ name: "Essential", max: 5 }, { name: "Athletes", max: 13 }, { name: "Fitness", max: 17 }, { name: "Average", max: 24 }, { name: "Obese", max: 100 }]
      : [{ name: "Essential", max: 13 }, { name: "Athletes", max: 20 }, { name: "Fitness", max: 24 }, { name: "Average", max: 31 }, { name: "Obese", max: 100 }];
    
    const category = categories.find(c => bodyFat <= c.max)?.name || "Unknown";
    
    setResult({ bodyFat: Math.max(0, bodyFat), category });
  };

  return (
    <CalculatorLayout title="Body Fat Calculator" description="Estimate your body fat percentage using the U.S. Navy method." category="Health" categoryHref="/health" icon={<Activity className="h-3 w-3 mr-1" />} promoContext="health" howItWorks="Uses the U.S. Navy circumference method. Measure at the narrowest point for neck, widest for waist, and fullest for hips (women only)." relatedCalculators={[{ name: "BMI Calculator", href: "/health/bmi" }, { name: "Ideal Weight", href: "/health/ideal-weight" }]}>
      <div className="space-y-6">
        <div className="flex gap-2">
          <Button variant={gender === "male" ? "default" : "outline"} className={gender === "male" ? "brand-gradient text-white flex-1" : "flex-1"} onClick={() => setGender("male")}>Male</Button>
          <Button variant={gender === "female" ? "default" : "outline"} className={gender === "female" ? "brand-gradient text-white flex-1" : "flex-1"} onClick={() => setGender("female")}>Female</Button>
        </div>
        <Input label="Height (inches)" type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
        <div className={`grid gap-4 ${gender === "female" ? "grid-cols-3" : "grid-cols-2"}`}>
          <Input label="Neck (inches)" type="number" value={neck} onChange={(e) => setNeck(e.target.value)} />
          <Input label="Waist (inches)" type="number" value={waist} onChange={(e) => setWaist(e.target.value)} />
          {gender === "female" && <Input label="Hips (inches)" type="number" value={hips} onChange={(e) => setHips(e.target.value)} />}
        </div>
        <Button onClick={calculate} className="w-full brand-gradient text-white" size="lg">Calculate Body Fat</Button>
        {result && (
          <div className="mt-8 pt-8 border-t">
            <div className="text-center mb-6">
              <div className="text-sm text-muted-foreground mb-1">Estimated Body Fat</div>
              <div className="text-5xl font-bold brand-gradient-text">{formatNumber(result.bodyFat, 1)}%</div>
              <div className="text-lg font-medium text-muted-foreground mt-2">{result.category}</div>
            </div>
            <Card className="p-4">
              <div className="text-sm font-medium mb-2">Body Fat Categories ({gender === "male" ? "Men" : "Women"})</div>
              <div className="grid grid-cols-5 gap-2 text-xs text-center">
                <div className="p-2 rounded bg-blue-100"><div className="font-medium">Essential</div><div>{gender === "male" ? "2-5%" : "10-13%"}</div></div>
                <div className="p-2 rounded bg-green-100"><div className="font-medium">Athletes</div><div>{gender === "male" ? "6-13%" : "14-20%"}</div></div>
                <div className="p-2 rounded bg-teal-100"><div className="font-medium">Fitness</div><div>{gender === "male" ? "14-17%" : "21-24%"}</div></div>
                <div className="p-2 rounded bg-yellow-100"><div className="font-medium">Average</div><div>{gender === "male" ? "18-24%" : "25-31%"}</div></div>
                <div className="p-2 rounded bg-red-100"><div className="font-medium">Obese</div><div>{gender === "male" ? "25%+" : "32%+"}</div></div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
