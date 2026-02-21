"use client";
import { useState, useEffect } from "react";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";
import { Droplets } from "lucide-react";

const units = [
  { name: "Liters", abbr: "L", toL: 1 },
  { name: "Milliliters", abbr: "mL", toL: 0.001 },
  { name: "Gallons (US)", abbr: "gal", toL: 3.78541 },
  { name: "Quarts (US)", abbr: "qt", toL: 0.946353 },
  { name: "Pints (US)", abbr: "pt", toL: 0.473176 },
  { name: "Cups (US)", abbr: "cup", toL: 0.236588 },
  { name: "Fluid Ounces", abbr: "fl oz", toL: 0.0295735 },
  { name: "Tablespoons", abbr: "tbsp", toL: 0.0147868 },
  { name: "Teaspoons", abbr: "tsp", toL: 0.00492892 },
];

export default function VolumeConverter() {
  const [value, setValue] = useState<string>("1");
  const [fromUnit, setFromUnit] = useState<string>("L");
  const [results, setResults] = useState<Record<string, string>>({});

  useEffect(() => {
    const num = parseFloat(value) || 0;
    const from = units.find(u => u.abbr === fromUnit);
    if (!from) return;
    const liters = num * from.toL;
    const newResults: Record<string, string> = {};
    units.forEach(unit => { newResults[unit.abbr] = formatNumber(liters / unit.toL, 4); });
    setResults(newResults);
  }, [value, fromUnit]);

  return (
    <CalculatorLayout title="Volume Converter" description="Convert between liters, gallons, cups, tablespoons, and more." category="Converters" categoryHref="/converters" icon={<Droplets className="h-3 w-3 mr-1" />} promoContext="general" relatedCalculators={[{ name: "Cooking Converter", href: "/converters/cooking" }, { name: "Length Converter", href: "/converters/length" }]}>
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <Input label="Value" type="number" value={value} onChange={(e) => setValue(e.target.value)} />
          <div>
            <label className="block text-sm font-medium mb-1.5">From Unit</label>
            <select className="flex h-12 w-full rounded-lg border border-input bg-background px-4 py-2" value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
              {units.map(unit => <option key={unit.abbr} value={unit.abbr}>{unit.name}</option>)}
            </select>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {units.map(unit => (
            <Card key={unit.abbr} className={`p-4 ${unit.abbr === fromUnit ? 'border-primary bg-primary/5' : ''}`}>
              <div className="text-xs text-muted-foreground mb-1">{unit.name}</div>
              <div className="font-semibold">{results[unit.abbr] || '0'} <span className="text-sm text-muted-foreground">{unit.abbr}</span></div>
            </Card>
          ))}
        </div>
      </div>
    </CalculatorLayout>
  );
}
