"use client";
import { useState, useEffect } from "react";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";
import { Scale } from "lucide-react";

const units = [
  { name: "Kilograms", abbr: "kg", toKg: 1 },
  { name: "Grams", abbr: "g", toKg: 0.001 },
  { name: "Milligrams", abbr: "mg", toKg: 0.000001 },
  { name: "Pounds", abbr: "lb", toKg: 0.453592 },
  { name: "Ounces", abbr: "oz", toKg: 0.0283495 },
  { name: "Stones", abbr: "st", toKg: 6.35029 },
  { name: "Metric Tons", abbr: "t", toKg: 1000 },
];

export default function WeightConverter() {
  const [value, setValue] = useState<string>("1");
  const [fromUnit, setFromUnit] = useState<string>("kg");
  const [results, setResults] = useState<Record<string, string>>({});

  useEffect(() => {
    const num = parseFloat(value) || 0;
    const from = units.find(u => u.abbr === fromUnit);
    if (!from) return;
    const kg = num * from.toKg;
    const newResults: Record<string, string> = {};
    units.forEach(unit => { newResults[unit.abbr] = formatNumber(kg / unit.toKg, 6); });
    setResults(newResults);
  }, [value, fromUnit]);

  return (
    <CalculatorLayout title="Weight Converter" description="Convert between kilograms, pounds, ounces, grams, and more." category="Converters" categoryHref="/converters" icon={<Scale className="h-3 w-3 mr-1" />} promoContext="general" howItWorks="Common conversions:\n• 1 kg = 2.205 lbs\n• 1 lb = 16 oz = 453.6 g\n• 1 stone = 14 lbs = 6.35 kg" relatedCalculators={[{ name: "Length Converter", href: "/converters/length" }, { name: "BMI Calculator", href: "/health/bmi" }]}>
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <Input label="Value" type="number" value={value} onChange={(e) => setValue(e.target.value)} />
          <div>
            <label className="block text-sm font-medium mb-1.5">From Unit</label>
            <select className="flex h-12 w-full rounded-lg border border-input bg-background px-4 py-2" value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
              {units.map(unit => <option key={unit.abbr} value={unit.abbr}>{unit.name} ({unit.abbr})</option>)}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {units.map(unit => (
            <Card key={unit.abbr} className={`p-4 ${unit.abbr === fromUnit ? 'border-primary bg-primary/5' : ''}`}>
              <div className="text-xs text-muted-foreground mb-1">{unit.name}</div>
              <div className="font-semibold text-lg">{results[unit.abbr] || '0'}<span className="text-sm text-muted-foreground ml-1">{unit.abbr}</span></div>
            </Card>
          ))}
        </div>
      </div>
    </CalculatorLayout>
  );
}
