"use client";
import { useState } from "react";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";
import { Paintbrush } from "lucide-react";

export default function PaintCalculator() {
  const [length, setLength] = useState<string>("20");
  const [width, setWidth] = useState<string>("15");
  const [height, setHeight] = useState<string>("9");
  const [doors, setDoors] = useState<string>("2");
  const [windows, setWindows] = useState<string>("3");
  const [coats, setCoats] = useState<string>("2");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    const h = parseFloat(height) || 0;
    const d = parseFloat(doors) || 0;
    const win = parseFloat(windows) || 0;
    const c = parseFloat(coats) || 1;
    
    const wallArea = 2 * (l + w) * h;
    const doorArea = d * 21; // Standard door ~21 sq ft
    const windowArea = win * 15; // Average window ~15 sq ft
    const paintableArea = wallArea - doorArea - windowArea;
    const totalArea = paintableArea * c;
    const gallons = totalArea / 350; // 1 gallon covers ~350 sq ft
    
    setResult({ wallArea, paintableArea, totalArea, gallons: Math.ceil(gallons), coats: c });
  };

  return (
    <CalculatorLayout title="Paint Calculator" description="Calculate how much paint you need for your room based on dimensions." category="Home & DIY" categoryHref="/home" icon={<Paintbrush className="h-3 w-3 mr-1" />} promoContext="general" howItWorks="Paint coverage is estimated at 350 sq ft per gallon. Standard doors are ~21 sq ft and windows ~15 sq ft." relatedCalculators={[{ name: "Square Footage", href: "/home/square-footage" }, { name: "Flooring Calculator", href: "/home/flooring" }]}>
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <Input label="Room Length (ft)" type="number" value={length} onChange={(e) => setLength(e.target.value)} />
          <Input label="Room Width (ft)" type="number" value={width} onChange={(e) => setWidth(e.target.value)} />
          <Input label="Ceiling Height (ft)" type="number" value={height} onChange={(e) => setHeight(e.target.value)} />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Input label="Number of Doors" type="number" value={doors} onChange={(e) => setDoors(e.target.value)} />
          <Input label="Number of Windows" type="number" value={windows} onChange={(e) => setWindows(e.target.value)} />
          <Input label="Number of Coats" type="number" value={coats} onChange={(e) => setCoats(e.target.value)} />
        </div>
        <Button onClick={calculate} className="w-full brand-gradient text-white" size="lg">Calculate Paint Needed</Button>
        {result && (
          <div className="mt-8 pt-8 border-t">
            <div className="text-center mb-6">
              <div className="text-sm text-muted-foreground mb-1">Paint Needed</div>
              <div className="text-5xl font-bold brand-gradient-text">{result.gallons} gallon{result.gallons !== 1 ? 's' : ''}</div>
              <div className="text-sm text-muted-foreground mt-1">for {result.coats} coat{result.coats !== 1 ? 's' : ''}</div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="p-4 text-center"><div className="text-xs text-muted-foreground">Total Wall Area</div><div className="font-semibold">{formatNumber(result.wallArea)} sq ft</div></Card>
              <Card className="p-4 text-center"><div className="text-xs text-muted-foreground">Paintable Area</div><div className="font-semibold">{formatNumber(result.paintableArea)} sq ft</div></Card>
              <Card className="p-4 text-center"><div className="text-xs text-muted-foreground">Coverage Needed</div><div className="font-semibold">{formatNumber(result.totalArea)} sq ft</div></Card>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
