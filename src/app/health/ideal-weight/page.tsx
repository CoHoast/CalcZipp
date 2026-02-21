"use client";
import { useState } from "react";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";
import { Scale } from "lucide-react";

export default function IdealWeightCalculator() {
  const [heightFt, setHeightFt] = useState<string>("5");
  const [heightIn, setHeightIn] = useState<string>("10");
  const [gender, setGender] = useState<string>("male");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const totalInches = (parseFloat(heightFt) || 0) * 12 + (parseFloat(heightIn) || 0);
    const inchesOver5ft = totalInches - 60;
    
    // Devine formula
    const devine = gender === "male" 
      ? 50 + 2.3 * inchesOver5ft 
      : 45.5 + 2.3 * inchesOver5ft;
    
    // Robinson formula
    const robinson = gender === "male" 
      ? 52 + 1.9 * inchesOver5ft 
      : 49 + 1.7 * inchesOver5ft;
    
    // Miller formula
    const miller = gender === "male" 
      ? 56.2 + 1.41 * inchesOver5ft 
      : 53.1 + 1.36 * inchesOver5ft;
    
    // Hamwi formula
    const hamwi = gender === "male" 
      ? 48 + 2.7 * inchesOver5ft 
      : 45.5 + 2.2 * inchesOver5ft;

    const avg = (devine + robinson + miller + hamwi) / 4;
    
    setResult({
      devine: devine * 2.205,
      robinson: robinson * 2.205,
      miller: miller * 2.205,
      hamwi: hamwi * 2.205,
      average: avg * 2.205,
      range: { min: Math.min(devine, robinson, miller, hamwi) * 2.205, max: Math.max(devine, robinson, miller, hamwi) * 2.205 }
    });
  };

  return (
    <CalculatorLayout title="Ideal Weight Calculator" description="Calculate your ideal body weight using multiple scientific formulas." category="Health" categoryHref="/health" icon={<Scale className="h-3 w-3 mr-1" />} promoContext="health" howItWorks="Uses 4 scientific formulas:\n• Devine (1974)\n• Robinson (1983)\n• Miller (1983)\n• Hamwi (1964)\n\nResults show a healthy weight range." relatedCalculators={[{ name: "BMI Calculator", href: "/health/bmi" }, { name: "Calorie Calculator", href: "/health/calorie" }]}>
      <div className="space-y-6">
        <div className="flex gap-2">
          <Button variant={gender === "male" ? "default" : "outline"} className={gender === "male" ? "brand-gradient text-white flex-1" : "flex-1"} onClick={() => setGender("male")}>Male</Button>
          <Button variant={gender === "female" ? "default" : "outline"} className={gender === "female" ? "brand-gradient text-white flex-1" : "flex-1"} onClick={() => setGender("female")}>Female</Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <Input label="Height (feet)" type="number" value={heightFt} onChange={(e) => setHeightFt(e.target.value)} />
          <Input label="Height (inches)" type="number" value={heightIn} onChange={(e) => setHeightIn(e.target.value)} />
        </div>
        <Button onClick={calculate} className="w-full brand-gradient text-white" size="lg">Calculate Ideal Weight</Button>
        {result && (
          <div className="mt-8 pt-8 border-t">
            <div className="text-center mb-6">
              <div className="text-sm text-muted-foreground mb-1">Ideal Weight Range</div>
              <div className="text-4xl font-bold brand-gradient-text">{formatNumber(result.range.min)} - {formatNumber(result.range.max)} lbs</div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="p-4 text-center"><div className="text-xs text-muted-foreground">Devine</div><div className="font-semibold">{formatNumber(result.devine)} lbs</div></Card>
              <Card className="p-4 text-center"><div className="text-xs text-muted-foreground">Robinson</div><div className="font-semibold">{formatNumber(result.robinson)} lbs</div></Card>
              <Card className="p-4 text-center"><div className="text-xs text-muted-foreground">Miller</div><div className="font-semibold">{formatNumber(result.miller)} lbs</div></Card>
              <Card className="p-4 text-center"><div className="text-xs text-muted-foreground">Hamwi</div><div className="font-semibold">{formatNumber(result.hamwi)} lbs</div></Card>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
