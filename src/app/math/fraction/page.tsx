"use client";
import { useState } from "react";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Divide } from "lucide-react";

function gcd(a: number, b: number): number { return b === 0 ? a : gcd(b, a % b); }
function simplify(num: number, den: number): [number, number] {
  if (den === 0) return [num, den];
  const g = Math.abs(gcd(num, den));
  return [num / g, den / g];
}

export default function FractionCalculator() {
  const [num1, setNum1] = useState<string>("1");
  const [den1, setDen1] = useState<string>("2");
  const [num2, setNum2] = useState<string>("1");
  const [den2, setDen2] = useState<string>("4");
  const [operation, setOperation] = useState<string>("+");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const n1 = parseInt(num1) || 0, d1 = parseInt(den1) || 1;
    const n2 = parseInt(num2) || 0, d2 = parseInt(den2) || 1;
    let resNum = 0, resDen = 1;
    switch (operation) {
      case "+": resNum = n1 * d2 + n2 * d1; resDen = d1 * d2; break;
      case "-": resNum = n1 * d2 - n2 * d1; resDen = d1 * d2; break;
      case "×": resNum = n1 * n2; resDen = d1 * d2; break;
      case "÷": resNum = n1 * d2; resDen = d1 * n2; break;
    }
    const [simpNum, simpDen] = simplify(resNum, resDen);
    const decimal = resDen !== 0 ? resNum / resDen : 0;
    setResult({ num: resNum, den: resDen, simpNum, simpDen, decimal: decimal.toFixed(4), mixed: resDen !== 0 && Math.abs(simpNum) >= Math.abs(simpDen) ? `${Math.floor(simpNum / simpDen)} ${Math.abs(simpNum % simpDen)}/${Math.abs(simpDen)}` : null });
  };

  return (
    <CalculatorLayout title="Fraction Calculator" description="Add, subtract, multiply, or divide fractions with step-by-step results." category="Math" categoryHref="/math" icon={<Divide className="h-3 w-3 mr-1" />} promoContext="math" howItWorks="Operations:\n• Addition/Subtraction: Find common denominator\n• Multiplication: Multiply numerators and denominators\n• Division: Multiply by reciprocal" relatedCalculators={[{ name: "Percentage Calculator", href: "/math/percentage" }, { name: "Average Calculator", href: "/math/average" }]}>
      <div className="space-y-6">
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex flex-col items-center gap-1">
            <Input type="number" value={num1} onChange={(e) => setNum1(e.target.value)} className="w-20 text-center" />
            <div className="h-px w-16 bg-foreground" />
            <Input type="number" value={den1} onChange={(e) => setDen1(e.target.value)} className="w-20 text-center" />
          </div>
          <select className="h-12 px-4 rounded-lg border bg-background text-xl font-bold" value={operation} onChange={(e) => setOperation(e.target.value)}>
            <option value="+">+</option>
            <option value="-">−</option>
            <option value="×">×</option>
            <option value="÷">÷</option>
          </select>
          <div className="flex flex-col items-center gap-1">
            <Input type="number" value={num2} onChange={(e) => setNum2(e.target.value)} className="w-20 text-center" />
            <div className="h-px w-16 bg-foreground" />
            <Input type="number" value={den2} onChange={(e) => setDen2(e.target.value)} className="w-20 text-center" />
          </div>
        </div>
        <Button onClick={calculate} className="w-full brand-gradient text-white" size="lg">Calculate</Button>
        {result && (
          <Card className="p-6 mt-8">
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-2">Result</div>
              <div className="flex items-center justify-center gap-4">
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold brand-gradient-text">{result.simpNum}</span>
                  <div className="h-1 w-16 bg-primary my-1" />
                  <span className="text-3xl font-bold brand-gradient-text">{result.simpDen}</span>
                </div>
                <span className="text-2xl text-muted-foreground">=</span>
                <span className="text-3xl font-bold">{result.decimal}</span>
              </div>
              {result.mixed && <div className="text-muted-foreground mt-2">Mixed number: {result.mixed}</div>}
            </div>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  );
}
