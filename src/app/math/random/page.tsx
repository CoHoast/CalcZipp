"use client";
import { useState } from "react";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Hash, RefreshCw } from "lucide-react";

export default function RandomNumberGenerator() {
  const [min, setMin] = useState<string>("1");
  const [max, setMax] = useState<string>("100");
  const [count, setCount] = useState<string>("1");
  const [unique, setUnique] = useState<boolean>(false);
  const [results, setResults] = useState<number[]>([]);

  const generate = () => {
    const minVal = parseInt(min) || 0;
    const maxVal = parseInt(max) || 100;
    const countVal = Math.min(parseInt(count) || 1, unique ? maxVal - minVal + 1 : 100);
    const nums: number[] = [];
    if (unique) {
      const available = Array.from({ length: maxVal - minVal + 1 }, (_, i) => minVal + i);
      for (let i = 0; i < countVal; i++) {
        const idx = Math.floor(Math.random() * available.length);
        nums.push(available.splice(idx, 1)[0]);
      }
    } else {
      for (let i = 0; i < countVal; i++) {
        nums.push(Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal);
      }
    }
    setResults(nums);
  };

  return (
    <CalculatorLayout title="Random Number Generator" description="Generate random numbers within a specified range. Perfect for games, raffles, and more." category="Math" categoryHref="/math" icon={<Hash className="h-3 w-3 mr-1" />} promoContext="math" relatedCalculators={[{ name: "Percentage Calculator", href: "/math/percentage" }, { name: "Average Calculator", href: "/math/average" }]}>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Minimum" type="number" value={min} onChange={(e) => setMin(e.target.value)} />
          <Input label="Maximum" type="number" value={max} onChange={(e) => setMax(e.target.value)} />
        </div>
        <Input label="How many numbers?" type="number" value={count} onChange={(e) => setCount(e.target.value)} />
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={unique} onChange={(e) => setUnique(e.target.checked)} className="w-4 h-4 rounded border-input" />
          <span className="text-sm">No repeats (unique numbers only)</span>
        </label>
        <Button onClick={generate} className="w-full brand-gradient text-white" size="lg"><RefreshCw className="mr-2 h-4 w-4" />Generate</Button>
        {results.length > 0 && (
          <Card className="p-6 mt-8">
            <div className="text-center">
              <div className="text-sm text-muted-foreground mb-3">Your Random Number{results.length > 1 ? 's' : ''}</div>
              <div className="flex flex-wrap gap-3 justify-center">
                {results.map((num, i) => (
                  <div key={i} className="text-3xl font-bold brand-gradient-text bg-primary/5 px-4 py-2 rounded-lg">{num}</div>
                ))}
              </div>
            </div>
          </Card>
        )}
      </div>
    </CalculatorLayout>
  );
}
