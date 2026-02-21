"use client";
import { useState, useEffect } from "react";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";
import { Square } from "lucide-react";

const units = [
  { name: "Square Meters", abbr: "m²", toSqM: 1 },
  { name: "Square Feet", abbr: "ft²", toSqM: 0.092903 },
  { name: "Square Yards", abbr: "yd²", toSqM: 0.836127 },
  { name: "Square Kilometers", abbr: "km²", toSqM: 1000000 },
  { name: "Square Miles", abbr: "mi²", toSqM: 2589988 },
  { name: "Acres", abbr: "ac", toSqM: 4046.86 },
  { name: "Hectares", abbr: "ha", toSqM: 10000 },
  { name: "Square Inches", abbr: "in²", toSqM: 0.00064516 },
];

export default function AreaConverter() {
  const [value, setValue] = useState<string>("1");
  const [fromUnit, setFromUnit] = useState<string>("m²");
  const [results, setResults] = useState<Record<string, string>>({});

  useEffect(() => {
    const num = parseFloat(value) || 0;
    const from = units.find(u => u.abbr === fromUnit);
    if (!from) return;
    const sqM = num * from.toSqM;
    const newResults: Record<string, string> = {};
    units.forEach(unit => { newResults[unit.abbr] = formatNumber(sqM / unit.toSqM, 6); });
    setResults(newResults);
  }, [value, fromUnit]);

  return (
    <CalculatorLayout title="Area Converter" description="Convert between square feet, square meters, acres, hectares, and more." category="Converters" categoryHref="/converters" icon={<Square className="h-3 w-3 mr-1" />} promoContext="general" howItWorks="Common conversions:\n• 1 acre = 43,560 sq ft\n• 1 hectare = 2.47 acres\n• 1 sq meter = 10.764 sq ft" relatedCalculators={[{ name: "Square Footage", href: "/home/square-footage" }, { name: "Length Converter", href: "/converters/length" }]}>
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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {units.map(unit => (
            <Card key={unit.abbr} className={`p-4 ${unit.abbr === fromUnit ? 'border-primary bg-primary/5' : ''}`}>
              <div className="text-xs text-muted-foreground mb-1">{unit.name}</div>
              <div className="font-semibold text-sm">{results[unit.abbr] || '0'}</div>
            </Card>
          ))}
        </div>
      </div>
    </CalculatorLayout>
  );
}
