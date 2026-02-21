"use client";
import { useState } from "react";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Timer } from "lucide-react";

export default function PaceCalculator() {
  const [distance, setDistance] = useState<string>("5");
  const [unit, setUnit] = useState<string>("km");
  const [hours, setHours] = useState<string>("0");
  const [minutes, setMinutes] = useState<string>("25");
  const [seconds, setSeconds] = useState<string>("0");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const d = parseFloat(distance) || 0;
    const totalSeconds = (parseInt(hours) || 0) * 3600 + (parseInt(minutes) || 0) * 60 + (parseInt(seconds) || 0);
    if (d === 0 || totalSeconds === 0) return;
    
    const paceSeconds = totalSeconds / d;
    const paceMin = Math.floor(paceSeconds / 60);
    const paceSec = Math.round(paceSeconds % 60);
    
    const distMiles = unit === "km" ? d * 0.621371 : d;
    const distKm = unit === "mi" ? d * 1.60934 : d;
    
    const paceSecondsPerMile = totalSeconds / distMiles;
    const paceSecondsPerKm = totalSeconds / distKm;
    
    const speedMph = distMiles / (totalSeconds / 3600);
    const speedKph = distKm / (totalSeconds / 3600);
    
    setResult({
      paceMile: `${Math.floor(paceSecondsPerMile / 60)}:${String(Math.round(paceSecondsPerMile % 60)).padStart(2, '0')}`,
      paceKm: `${Math.floor(paceSecondsPerKm / 60)}:${String(Math.round(paceSecondsPerKm % 60)).padStart(2, '0')}`,
      speedMph: speedMph.toFixed(1),
      speedKph: speedKph.toFixed(1),
    });
  };

  return (
    <CalculatorLayout title="Running Pace Calculator" description="Calculate your running pace, speed, and finish times for any distance." category="Health" categoryHref="/health" icon={<Timer className="h-3 w-3 mr-1" />} promoContext="health" relatedCalculators={[{ name: "Calorie Calculator", href: "/health/calorie" }, { name: "BMI Calculator", href: "/health/bmi" }]}>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <Input label="Distance" type="number" value={distance} onChange={(e) => setDistance(e.target.value)} />
          <div>
            <label className="block text-sm font-medium mb-1.5">Unit</label>
            <select className="flex h-12 w-full rounded-lg border border-input bg-background px-4 py-2" value={unit} onChange={(e) => setUnit(e.target.value)}>
              <option value="km">Kilometers</option>
              <option value="mi">Miles</option>
            </select>
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-1.5">Time</label>
          <div className="grid grid-cols-3 gap-2">
            <Input type="number" suffix="hrs" value={hours} onChange={(e) => setHours(e.target.value)} />
            <Input type="number" suffix="min" value={minutes} onChange={(e) => setMinutes(e.target.value)} />
            <Input type="number" suffix="sec" value={seconds} onChange={(e) => setSeconds(e.target.value)} />
          </div>
        </div>
        <Button onClick={calculate} className="w-full brand-gradient text-white" size="lg">Calculate Pace</Button>
        {result && (
          <div className="mt-8 pt-8 border-t">
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="p-4 text-center"><div className="text-xs text-muted-foreground">Pace per Mile</div><div className="text-2xl font-bold brand-gradient-text">{result.paceMile} /mi</div></Card>
              <Card className="p-4 text-center"><div className="text-xs text-muted-foreground">Pace per Kilometer</div><div className="text-2xl font-bold brand-gradient-text">{result.paceKm} /km</div></Card>
              <Card className="p-4 text-center"><div className="text-xs text-muted-foreground">Speed (mph)</div><div className="font-semibold">{result.speedMph} mph</div></Card>
              <Card className="p-4 text-center"><div className="text-xs text-muted-foreground">Speed (km/h)</div><div className="font-semibold">{result.speedKph} km/h</div></Card>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
