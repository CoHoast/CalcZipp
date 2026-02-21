"use client";

import { useState, useEffect } from "react";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";
import { Ruler } from "lucide-react";

const units = [
  { name: "Meters", abbr: "m", toMeters: 1 },
  { name: "Centimeters", abbr: "cm", toMeters: 0.01 },
  { name: "Millimeters", abbr: "mm", toMeters: 0.001 },
  { name: "Kilometers", abbr: "km", toMeters: 1000 },
  { name: "Inches", abbr: "in", toMeters: 0.0254 },
  { name: "Feet", abbr: "ft", toMeters: 0.3048 },
  { name: "Yards", abbr: "yd", toMeters: 0.9144 },
  { name: "Miles", abbr: "mi", toMeters: 1609.344 },
  { name: "Nautical Miles", abbr: "nmi", toMeters: 1852 },
];

export default function LengthConverter() {
  const [value, setValue] = useState<string>("1");
  const [fromUnit, setFromUnit] = useState<string>("m");
  const [results, setResults] = useState<Record<string, string>>({});

  useEffect(() => {
    const num = parseFloat(value) || 0;
    const from = units.find(u => u.abbr === fromUnit);
    if (!from) return;

    const meters = num * from.toMeters;
    const newResults: Record<string, string> = {};
    
    units.forEach(unit => {
      const converted = meters / unit.toMeters;
      newResults[unit.abbr] = formatNumber(converted, 6);
    });
    
    setResults(newResults);
  }, [value, fromUnit]);

  return (
    <CalculatorLayout
      title="Length Converter"
      description="Convert between meters, feet, inches, miles, kilometers, and more length units."
      category="Converters"
      categoryHref="/converters"
      icon={<Ruler className="h-3 w-3 mr-1" />}
      promoContext="general"
      howItWorks={`Enter a value and select the unit you're converting from. The converter will show the equivalent in all other length units.

Common conversions:
• 1 inch = 2.54 cm
• 1 foot = 30.48 cm = 12 inches
• 1 meter = 3.281 feet
• 1 mile = 1.609 km
• 1 kilometer = 0.621 miles`}
      faqs={[
        { question: "What's the difference between miles and nautical miles?", answer: "A nautical mile (1,852 m) is about 15% longer than a statute mile (1,609 m). Nautical miles are used in aviation and maritime navigation." },
        { question: "How do I convert feet and inches to cm?", answer: "Multiply feet by 30.48 and inches by 2.54, then add them together." },
      ]}
      relatedCalculators={[
        { name: "Area Converter", href: "/converters/area" },
        { name: "Speed Converter", href: "/converters/speed" },
        { name: "Weight Converter", href: "/converters/weight" },
      ]}
    >
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="Value"
            type="number"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <div>
            <label className="block text-sm font-medium mb-1.5">From Unit</label>
            <select
              className="flex h-12 w-full rounded-lg border border-input bg-background px-4 py-2 text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
            >
              {units.map(unit => (
                <option key={unit.abbr} value={unit.abbr}>
                  {unit.name} ({unit.abbr})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {units.map(unit => (
            <Card 
              key={unit.abbr} 
              className={`p-4 ${unit.abbr === fromUnit ? 'border-primary bg-primary/5' : ''}`}
            >
              <div className="text-xs text-muted-foreground mb-1">{unit.name}</div>
              <div className="font-semibold text-lg">
                {results[unit.abbr] || '0'}
                <span className="text-sm text-muted-foreground ml-1">{unit.abbr}</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </CalculatorLayout>
  );
}
