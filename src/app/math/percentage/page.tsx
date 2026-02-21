"use client";

import { useState } from "react";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";
import { Percent } from "lucide-react";

export default function PercentageCalculator() {
  const [mode, setMode] = useState<"whatIs" | "whatPercent" | "change">("whatIs");
  
  // What is X% of Y?
  const [percent1, setPercent1] = useState<string>("25");
  const [value1, setValue1] = useState<string>("200");
  const [result1, setResult1] = useState<string>("");

  // X is what % of Y?
  const [part, setPart] = useState<string>("50");
  const [whole, setWhole] = useState<string>("200");
  const [result2, setResult2] = useState<string>("");

  // % change from X to Y
  const [oldValue, setOldValue] = useState<string>("100");
  const [newValue, setNewValue] = useState<string>("125");
  const [result3, setResult3] = useState<string>("");

  const calculateWhatIs = () => {
    const p = parseFloat(percent1) || 0;
    const v = parseFloat(value1) || 0;
    setResult1(formatNumber(v * (p / 100)));
  };

  const calculateWhatPercent = () => {
    const p = parseFloat(part) || 0;
    const w = parseFloat(whole) || 0;
    if (w !== 0) {
      setResult2(formatNumber((p / w) * 100));
    }
  };

  const calculateChange = () => {
    const o = parseFloat(oldValue) || 0;
    const n = parseFloat(newValue) || 0;
    if (o !== 0) {
      setResult3(formatNumber(((n - o) / o) * 100));
    }
  };

  return (
    <CalculatorLayout
      title="Percentage Calculator"
      description="Calculate percentages easily. Find what percent of a number, percentage of a value, or percent change."
      category="Math"
      categoryHref="/math"
      icon={<Percent className="h-3 w-3 mr-1" />}
      promoContext="math"
      formula="Percentage = (Part / Whole) × 100"
      howItWorks={`This calculator solves three common percentage problems:

1. What is X% of Y? - Multiply Y by X/100
2. X is what % of Y? - Divide X by Y, multiply by 100
3. % change from X to Y - ((Y-X)/X) × 100

Percentages are used everywhere: discounts, tips, grades, statistics, and more.`}
      faqs={[
        { question: "How do I calculate a percentage?", answer: "To find X% of a number, multiply the number by X and divide by 100. Example: 25% of 80 = 80 × 0.25 = 20" },
        { question: "How do I find what percent one number is of another?", answer: "Divide the part by the whole and multiply by 100. Example: 25 is what % of 100? → 25/100 × 100 = 25%" },
      ]}
      relatedCalculators={[
        { name: "Percentage Change", href: "/math/percentage-change" },
        { name: "Discount Calculator", href: "/financial/discount" },
        { name: "Tip Calculator", href: "/financial/tip" },
      ]}
    >
      <div className="space-y-6">
        {/* Mode Tabs */}
        <div className="flex gap-2 flex-wrap">
          <Button
            variant={mode === "whatIs" ? "default" : "outline"}
            className={mode === "whatIs" ? "brand-gradient text-white" : ""}
            onClick={() => setMode("whatIs")}
          >
            What is X% of Y?
          </Button>
          <Button
            variant={mode === "whatPercent" ? "default" : "outline"}
            className={mode === "whatPercent" ? "brand-gradient text-white" : ""}
            onClick={() => setMode("whatPercent")}
          >
            X is what % of Y?
          </Button>
          <Button
            variant={mode === "change" ? "default" : "outline"}
            className={mode === "change" ? "brand-gradient text-white" : ""}
            onClick={() => setMode("change")}
          >
            % Change
          </Button>
        </div>

        {/* What is X% of Y */}
        {mode === "whatIs" && (
          <Card className="p-6">
            <h3 className="font-medium mb-4">What is X% of Y?</h3>
            <div className="flex items-center gap-2 flex-wrap">
              <span>What is</span>
              <Input
                type="number"
                className="w-24"
                value={percent1}
                onChange={(e) => setPercent1(e.target.value)}
              />
              <span>% of</span>
              <Input
                type="number"
                className="w-32"
                value={value1}
                onChange={(e) => setValue1(e.target.value)}
              />
              <span>?</span>
            </div>
            <Button onClick={calculateWhatIs} className="mt-4 brand-gradient text-white">
              Calculate
            </Button>
            {result1 && (
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <span className="text-muted-foreground">{percent1}% of {value1} = </span>
                <span className="text-2xl font-bold brand-gradient-text">{result1}</span>
              </div>
            )}
          </Card>
        )}

        {/* X is what % of Y */}
        {mode === "whatPercent" && (
          <Card className="p-6">
            <h3 className="font-medium mb-4">X is what % of Y?</h3>
            <div className="flex items-center gap-2 flex-wrap">
              <Input
                type="number"
                className="w-32"
                value={part}
                onChange={(e) => setPart(e.target.value)}
              />
              <span>is what % of</span>
              <Input
                type="number"
                className="w-32"
                value={whole}
                onChange={(e) => setWhole(e.target.value)}
              />
              <span>?</span>
            </div>
            <Button onClick={calculateWhatPercent} className="mt-4 brand-gradient text-white">
              Calculate
            </Button>
            {result2 && (
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <span className="text-muted-foreground">{part} is </span>
                <span className="text-2xl font-bold brand-gradient-text">{result2}%</span>
                <span className="text-muted-foreground"> of {whole}</span>
              </div>
            )}
          </Card>
        )}

        {/* % Change */}
        {mode === "change" && (
          <Card className="p-6">
            <h3 className="font-medium mb-4">Percentage Change</h3>
            <div className="flex items-center gap-2 flex-wrap">
              <span>From</span>
              <Input
                type="number"
                className="w-32"
                value={oldValue}
                onChange={(e) => setOldValue(e.target.value)}
              />
              <span>to</span>
              <Input
                type="number"
                className="w-32"
                value={newValue}
                onChange={(e) => setNewValue(e.target.value)}
              />
            </div>
            <Button onClick={calculateChange} className="mt-4 brand-gradient text-white">
              Calculate
            </Button>
            {result3 && (
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <span className="text-muted-foreground">Change: </span>
                <span className={`text-2xl font-bold ${parseFloat(result3) >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {parseFloat(result3) >= 0 ? '+' : ''}{result3}%
                </span>
              </div>
            )}
          </Card>
        )}
      </div>
    </CalculatorLayout>
  );
}
