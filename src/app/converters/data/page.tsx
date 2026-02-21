"use client";
import { useState, useEffect } from "react";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";
import { Database } from "lucide-react";

const units = [
  { name: "Bytes", abbr: "B", toBytes: 1 },
  { name: "Kilobytes", abbr: "KB", toBytes: 1024 },
  { name: "Megabytes", abbr: "MB", toBytes: 1024 ** 2 },
  { name: "Gigabytes", abbr: "GB", toBytes: 1024 ** 3 },
  { name: "Terabytes", abbr: "TB", toBytes: 1024 ** 4 },
  { name: "Petabytes", abbr: "PB", toBytes: 1024 ** 5 },
];

export default function DataStorageConverter() {
  const [value, setValue] = useState<string>("1");
  const [fromUnit, setFromUnit] = useState<string>("GB");
  const [results, setResults] = useState<Record<string, string>>({});

  useEffect(() => {
    const num = parseFloat(value) || 0;
    const from = units.find(u => u.abbr === fromUnit);
    if (!from) return;
    const bytes = num * from.toBytes;
    const newResults: Record<string, string> = {};
    units.forEach(unit => { newResults[unit.abbr] = formatNumber(bytes / unit.toBytes, 4); });
    setResults(newResults);
  }, [value, fromUnit]);

  return (
    <CalculatorLayout title="Data Storage Converter" description="Convert between bytes, kilobytes, megabytes, gigabytes, and terabytes." category="Converters" categoryHref="/converters" icon={<Database className="h-3 w-3 mr-1" />} promoContext="general" howItWorks="Data storage uses base-2 (binary):\n• 1 KB = 1,024 Bytes\n• 1 MB = 1,024 KB\n• 1 GB = 1,024 MB\n• 1 TB = 1,024 GB" relatedCalculators={[{ name: "Length Converter", href: "/converters/length" }, { name: "Weight Converter", href: "/converters/weight" }]}>
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
