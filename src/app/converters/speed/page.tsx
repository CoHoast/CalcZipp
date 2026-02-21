"use client";
import { useState, useEffect } from "react";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";
import { Gauge } from "lucide-react";

const units = [
  { name: "Miles per hour", abbr: "mph", toMs: 0.44704 },
  { name: "Kilometers per hour", abbr: "km/h", toMs: 0.277778 },
  { name: "Meters per second", abbr: "m/s", toMs: 1 },
  { name: "Feet per second", abbr: "ft/s", toMs: 0.3048 },
  { name: "Knots", abbr: "kn", toMs: 0.514444 },
  { name: "Mach", abbr: "Mach", toMs: 343 },
];

export default function SpeedConverter() {
  const [value, setValue] = useState<string>("60");
  const [fromUnit, setFromUnit] = useState<string>("mph");
  const [results, setResults] = useState<Record<string, string>>({});

  useEffect(() => {
    const num = parseFloat(value) || 0;
    const from = units.find(u => u.abbr === fromUnit);
    if (!from) return;
    const ms = num * from.toMs;
    const newResults: Record<string, string> = {};
    units.forEach(unit => { newResults[unit.abbr] = formatNumber(ms / unit.toMs, 4); });
    setResults(newResults);
  }, [value, fromUnit]);

  return (
    <CalculatorLayout title="Speed Converter" description="Convert between mph, km/h, m/s, knots, and more speed units." category="Converters" categoryHref="/converters" icon={<Gauge className="h-3 w-3 mr-1" />} promoContext="general" howItWorks="Common conversions:\n• 1 mph = 1.609 km/h\n• 1 knot = 1.151 mph (nautical)\n• Mach 1 = 767 mph (speed of sound)" relatedCalculators={[{ name: "Length Converter", href: "/converters/length" }, { name: "Pace Calculator", href: "/health/pace" }]}>
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
