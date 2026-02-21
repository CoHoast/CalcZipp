"use client";
import { useState } from "react";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";
import { Square, Plus, Trash2 } from "lucide-react";

export default function SquareFootageCalculator() {
  const [rooms, setRooms] = useState([{ name: "Room 1", length: "12", width: "10" }]);
  const [result, setResult] = useState<any>(null);

  const addRoom = () => setRooms([...rooms, { name: `Room ${rooms.length + 1}`, length: "", width: "" }]);
  const removeRoom = (index: number) => setRooms(rooms.filter((_, i) => i !== index));
  const updateRoom = (index: number, field: string, value: string) => {
    const updated = [...rooms];
    updated[index] = { ...updated[index], [field]: value };
    setRooms(updated);
  };

  const calculate = () => {
    let total = 0;
    const breakdown = rooms.map(room => {
      const area = (parseFloat(room.length) || 0) * (parseFloat(room.width) || 0);
      total += area;
      return { name: room.name, area };
    });
    setResult({ total, breakdown, sqMeters: total * 0.092903 });
  };

  return (
    <CalculatorLayout title="Square Footage Calculator" description="Calculate the total square footage of rooms and spaces for flooring, painting, or real estate." category="Home & DIY" categoryHref="/home" icon={<Square className="h-3 w-3 mr-1" />} promoContext="general" formula="Area = Length × Width" relatedCalculators={[{ name: "Paint Calculator", href: "/home/paint" }, { name: "Flooring Calculator", href: "/home/flooring" }]}>
      <div className="space-y-4">
        {rooms.map((room, index) => (
          <Card key={index} className="p-4">
            <div className="flex gap-3 items-end">
              <div className="flex-1">
                <label className="block text-xs text-muted-foreground mb-1">Name</label>
                <input className="w-full h-10 px-3 rounded-lg border border-input bg-background" value={room.name} onChange={(e) => updateRoom(index, "name", e.target.value)} />
              </div>
              <div className="w-24">
                <label className="block text-xs text-muted-foreground mb-1">Length (ft)</label>
                <input type="number" className="w-full h-10 px-3 rounded-lg border border-input bg-background" value={room.length} onChange={(e) => updateRoom(index, "length", e.target.value)} />
              </div>
              <div className="w-24">
                <label className="block text-xs text-muted-foreground mb-1">Width (ft)</label>
                <input type="number" className="w-full h-10 px-3 rounded-lg border border-input bg-background" value={room.width} onChange={(e) => updateRoom(index, "width", e.target.value)} />
              </div>
              {rooms.length > 1 && <Button variant="ghost" size="icon" onClick={() => removeRoom(index)}><Trash2 className="h-4 w-4 text-red-500" /></Button>}
            </div>
          </Card>
        ))}
        <Button variant="outline" onClick={addRoom} className="w-full"><Plus className="h-4 w-4 mr-2" />Add Room</Button>
        <Button onClick={calculate} className="w-full brand-gradient text-white" size="lg">Calculate Square Footage</Button>
        {result && (
          <div className="mt-8 pt-8 border-t">
            <div className="text-center mb-6">
              <div className="text-sm text-muted-foreground mb-1">Total Area</div>
              <div className="text-5xl font-bold brand-gradient-text">{formatNumber(result.total)} sq ft</div>
              <div className="text-sm text-muted-foreground mt-1">{formatNumber(result.sqMeters)} sq m</div>
            </div>
            <div className="space-y-2">
              {result.breakdown.map((room: any, i: number) => (
                <div key={i} className="flex justify-between p-3 bg-muted rounded-lg">
                  <span>{room.name}</span>
                  <span className="font-semibold">{formatNumber(room.area)} sq ft</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
