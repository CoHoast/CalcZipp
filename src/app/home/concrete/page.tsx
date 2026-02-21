"use client";
import { useState } from "react";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";
import { Box } from "lucide-react";

export default function ConcreteCalculator() {
  const [length, setLength] = useState<string>("10");
  const [width, setWidth] = useState<string>("10");
  const [depth, setDepth] = useState<string>("4");
  const [pricePerYard, setPricePerYard] = useState<string>("125");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    const d = parseFloat(depth) || 0;
    const price = parseFloat(pricePerYard) || 0;
    
    const cubicFeet = l * w * (d / 12);
    const cubicYards = cubicFeet / 27;
    const cubicYardsRounded = Math.ceil(cubicYards * 10) / 10; // Round up to nearest 0.1
    const bags60lb = Math.ceil(cubicFeet / 0.45); // 60lb bag covers ~0.45 cu ft
    const bags80lb = Math.ceil(cubicFeet / 0.6); // 80lb bag covers ~0.6 cu ft
    const totalCost = cubicYardsRounded * price;
    
    setResult({ cubicFeet, cubicYards: cubicYardsRounded, bags60lb, bags80lb, totalCost, sqFt: l * w });
  };

  return (
    <CalculatorLayout title="Concrete Calculator" description="Calculate how much concrete you need in cubic yards or bags." category="Home & DIY" categoryHref="/home" icon={<Box className="h-3 w-3 mr-1" />} promoContext="general" howItWorks="Ready-mix concrete is sold by cubic yard. For small jobs, pre-mixed bags (60 or 80 lb) may be more practical." relatedCalculators={[{ name: "Square Footage", href: "/home/square-footage" }, { name: "Flooring Calculator", href: "/home/flooring" }]}>
      <div className="space-y-6">
        <div className="grid grid-cols-3 gap-4">
          <Input label="Length (ft)" type="number" value={length} onChange={(e) => setLength(e.target.value)} />
          <Input label="Width (ft)" type="number" value={width} onChange={(e) => setWidth(e.target.value)} />
          <Input label="Depth (inches)" type="number" value={depth} onChange={(e) => setDepth(e.target.value)} />
        </div>
        <Input label="Price per Cubic Yard (optional)" type="number" prefix="$" value={pricePerYard} onChange={(e) => setPricePerYard(e.target.value)} />
        <Button onClick={calculate} className="w-full brand-gradient text-white" size="lg">Calculate Concrete</Button>
        {result && (
          <div className="mt-8 pt-8 border-t">
            <div className="text-center mb-6">
              <div className="text-sm text-muted-foreground mb-1">Ready-Mix Concrete Needed</div>
              <div className="text-5xl font-bold brand-gradient-text">{result.cubicYards} yd³</div>
            </div>
            <div className="grid md:grid-cols-4 gap-4">
              <Card className="p-4 text-center"><div className="text-xs text-muted-foreground">Area</div><div className="font-semibold">{formatNumber(result.sqFt)} sq ft</div></Card>
              <Card className="p-4 text-center"><div className="text-xs text-muted-foreground">Volume</div><div className="font-semibold">{formatNumber(result.cubicFeet, 1)} cu ft</div></Card>
              <Card className="p-4 text-center"><div className="text-xs text-muted-foreground">60 lb Bags</div><div className="font-semibold">{result.bags60lb}</div></Card>
              <Card className="p-4 text-center"><div className="text-xs text-muted-foreground">80 lb Bags</div><div className="font-semibold">{result.bags80lb}</div></Card>
            </div>
            {result.totalCost > 0 && (
              <Card className="p-4 text-center mt-4 border-primary bg-primary/5">
                <div className="text-xs text-primary">Estimated Cost (Ready-Mix)</div>
                <div className="font-bold text-2xl text-primary">${formatNumber(result.totalCost)}</div>
              </Card>
            )}
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
