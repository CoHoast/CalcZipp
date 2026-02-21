"use client";
import { useState } from "react";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";
import { Grid3X3 } from "lucide-react";

export default function FlooringCalculator() {
  const [length, setLength] = useState<string>("15");
  const [width, setWidth] = useState<string>("12");
  const [waste, setWaste] = useState<string>("10");
  const [boxSize, setBoxSize] = useState<string>("20");
  const [pricePerBox, setPricePerBox] = useState<string>("45");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const l = parseFloat(length) || 0;
    const w = parseFloat(width) || 0;
    const wastePercent = parseFloat(waste) || 10;
    const box = parseFloat(boxSize) || 20;
    const price = parseFloat(pricePerBox) || 0;
    
    const area = l * w;
    const areaWithWaste = area * (1 + wastePercent / 100);
    const boxes = Math.ceil(areaWithWaste / box);
    const totalCost = boxes * price;
    
    setResult({ area, areaWithWaste: Math.ceil(areaWithWaste), boxes, totalCost, sqMeters: area * 0.092903 });
  };

  return (
    <CalculatorLayout title="Flooring Calculator" description="Calculate how much flooring material you need, including waste allowance." category="Home & DIY" categoryHref="/home" icon={<Grid3X3 className="h-3 w-3 mr-1" />} promoContext="general" howItWorks="Include 10% extra for waste, cuts, and mistakes. Most flooring is sold in boxes covering 20-25 sq ft each." relatedCalculators={[{ name: "Square Footage", href: "/home/square-footage" }, { name: "Paint Calculator", href: "/home/paint" }]}>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Room Length (ft)" type="number" value={length} onChange={(e) => setLength(e.target.value)} />
          <Input label="Room Width (ft)" type="number" value={width} onChange={(e) => setWidth(e.target.value)} />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Input label="Waste Factor (%)" type="number" value={waste} onChange={(e) => setWaste(e.target.value)} />
          <Input label="Box Coverage (sq ft)" type="number" value={boxSize} onChange={(e) => setBoxSize(e.target.value)} />
          <Input label="Price per Box ($)" type="number" prefix="$" value={pricePerBox} onChange={(e) => setPricePerBox(e.target.value)} />
        </div>
        <Button onClick={calculate} className="w-full brand-gradient text-white" size="lg">Calculate Flooring</Button>
        {result && (
          <div className="mt-8 pt-8 border-t">
            <div className="text-center mb-6">
              <div className="text-sm text-muted-foreground mb-1">Boxes Needed</div>
              <div className="text-5xl font-bold brand-gradient-text">{result.boxes} boxes</div>
            </div>
            <div className="grid md:grid-cols-4 gap-4">
              <Card className="p-4 text-center"><div className="text-xs text-muted-foreground">Room Area</div><div className="font-semibold">{formatNumber(result.area)} sq ft</div></Card>
              <Card className="p-4 text-center"><div className="text-xs text-muted-foreground">With Waste</div><div className="font-semibold">{result.areaWithWaste} sq ft</div></Card>
              <Card className="p-4 text-center"><div className="text-xs text-muted-foreground">Boxes</div><div className="font-semibold">{result.boxes}</div></Card>
              <Card className="p-4 text-center border-primary bg-primary/5"><div className="text-xs text-primary">Total Cost</div><div className="font-semibold text-primary">${formatNumber(result.totalCost)}</div></Card>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
