"use client";
import { useState } from "react";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";
import { Sigma, Plus, Trash2 } from "lucide-react";

export default function AverageCalculator() {
  const [numbers, setNumbers] = useState<string[]>(["10", "20", "30", "40", "50"]);
  const [result, setResult] = useState<any>(null);

  const addNumber = () => setNumbers([...numbers, ""]);
  const removeNumber = (i: number) => setNumbers(numbers.filter((_, idx) => idx !== i));
  const updateNumber = (i: number, v: string) => { const n = [...numbers]; n[i] = v; setNumbers(n); };

  const calculate = () => {
    const nums = numbers.map(n => parseFloat(n)).filter(n => !isNaN(n)).sort((a, b) => a - b);
    if (nums.length === 0) return;
    const sum = nums.reduce((a, b) => a + b, 0);
    const mean = sum / nums.length;
    const median = nums.length % 2 === 0 
      ? (nums[nums.length/2 - 1] + nums[nums.length/2]) / 2 
      : nums[Math.floor(nums.length/2)];
    const freq: Record<number, number> = {};
    nums.forEach(n => freq[n] = (freq[n] || 0) + 1);
    const maxFreq = Math.max(...Object.values(freq));
    const modes = Object.keys(freq).filter(k => freq[parseFloat(k)] === maxFreq).map(Number);
    const range = nums[nums.length - 1] - nums[0];
    setResult({ mean, median, mode: modes.length === nums.length ? "None" : modes.join(", "), range, sum, count: nums.length, min: nums[0], max: nums[nums.length - 1] });
  };

  return (
    <CalculatorLayout title="Average Calculator" description="Calculate mean, median, mode, range, and sum of a set of numbers." category="Math" categoryHref="/math" icon={<Sigma className="h-3 w-3 mr-1" />} promoContext="math" howItWorks="• Mean: Sum of all values / count\n• Median: Middle value when sorted\n• Mode: Most frequent value\n• Range: Max - Min" relatedCalculators={[{ name: "Percentage Calculator", href: "/math/percentage" }, { name: "GPA Calculator", href: "/math/gpa" }]}>
      <div className="space-y-4">
        <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
          {numbers.map((num, i) => (
            <div key={i} className="flex gap-1">
              <input type="number" className="w-full h-10 px-3 rounded-lg border border-input bg-background" value={num} onChange={(e) => updateNumber(i, e.target.value)} placeholder="#" />
              {numbers.length > 2 && <button onClick={() => removeNumber(i)} className="text-red-500 hover:text-red-700"><Trash2 className="h-4 w-4" /></button>}
            </div>
          ))}
        </div>
        <Button variant="outline" onClick={addNumber} size="sm"><Plus className="h-4 w-4 mr-1" />Add Number</Button>
        <Button onClick={calculate} className="w-full brand-gradient text-white" size="lg">Calculate</Button>
        {result && (
          <div className="mt-8 pt-8 border-t">
            <div className="text-center mb-6">
              <div className="text-sm text-muted-foreground mb-1">Mean (Average)</div>
              <div className="text-5xl font-bold brand-gradient-text">{formatNumber(result.mean, 2)}</div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="p-4 text-center"><div className="text-xs text-muted-foreground">Median</div><div className="font-semibold">{formatNumber(result.median, 2)}</div></Card>
              <Card className="p-4 text-center"><div className="text-xs text-muted-foreground">Mode</div><div className="font-semibold">{result.mode}</div></Card>
              <Card className="p-4 text-center"><div className="text-xs text-muted-foreground">Range</div><div className="font-semibold">{formatNumber(result.range, 2)}</div></Card>
              <Card className="p-4 text-center"><div className="text-xs text-muted-foreground">Sum</div><div className="font-semibold">{formatNumber(result.sum, 2)}</div></Card>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <Card className="p-4 text-center"><div className="text-xs text-muted-foreground">Count</div><div className="font-semibold">{result.count}</div></Card>
              <Card className="p-4 text-center"><div className="text-xs text-muted-foreground">Min</div><div className="font-semibold">{formatNumber(result.min, 2)}</div></Card>
              <Card className="p-4 text-center"><div className="text-xs text-muted-foreground">Max</div><div className="font-semibold">{formatNumber(result.max, 2)}</div></Card>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
