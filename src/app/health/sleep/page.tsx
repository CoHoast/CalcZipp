"use client";
import { useState } from "react";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Moon } from "lucide-react";

export default function SleepCalculator() {
  const [mode, setMode] = useState<"wake" | "sleep">("wake");
  const [time, setTime] = useState<string>("07:00");
  const [result, setResult] = useState<string[]>([]);

  const calculate = () => {
    const [hours, minutes] = time.split(":").map(Number);
    const targetTime = new Date();
    targetTime.setHours(hours, minutes, 0, 0);
    const sleepCycles = [6, 5, 4, 3]; // Number of 90-min sleep cycles
    const fallAsleepTime = 15; // Minutes to fall asleep
    const results: string[] = [];
    
    sleepCycles.forEach(cycles => {
      const sleepDuration = cycles * 90; // in minutes
      const resultTime = new Date(targetTime);
      if (mode === "wake") {
        resultTime.setMinutes(resultTime.getMinutes() - sleepDuration - fallAsleepTime);
      } else {
        resultTime.setMinutes(resultTime.getMinutes() + sleepDuration + fallAsleepTime);
      }
      results.push(`${resultTime.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", hour12: true })} (${cycles * 1.5} hrs)`);
    });
    setResult(results);
  };

  return (
    <CalculatorLayout title="Sleep Calculator" description="Find the best times to wake up or go to sleep based on sleep cycles." category="Health" categoryHref="/health" icon={<Moon className="h-3 w-3 mr-1" />} promoContext="health" howItWorks="Sleep cycles last ~90 minutes. Waking between cycles helps you feel more rested. This calculator factors in 15 minutes to fall asleep." relatedCalculators={[{ name: "Calorie Calculator", href: "/health/calorie" }, { name: "Water Intake", href: "/health/water-intake" }]}>
      <div className="space-y-6">
        <div className="flex gap-2">
          <Button variant={mode === "wake" ? "default" : "outline"} className={mode === "wake" ? "brand-gradient text-white flex-1" : "flex-1"} onClick={() => setMode("wake")}>I need to wake up at...</Button>
          <Button variant={mode === "sleep" ? "default" : "outline"} className={mode === "sleep" ? "brand-gradient text-white flex-1" : "flex-1"} onClick={() => setMode("sleep")}>I want to sleep at...</Button>
        </div>
        <Input label={mode === "wake" ? "Wake-up Time" : "Bedtime"} type="time" value={time} onChange={(e) => setTime(e.target.value)} />
        <Button onClick={calculate} className="w-full brand-gradient text-white" size="lg">Calculate</Button>
        {result.length > 0 && (
          <div className="mt-8 pt-8 border-t">
            <div className="text-center mb-4">
              <div className="text-sm text-muted-foreground">{mode === "wake" ? "Go to bed at one of these times:" : "Wake up at one of these times:"}</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {result.map((r, i) => (
                <Card key={i} className={`p-4 text-center ${i === 0 ? 'border-primary bg-primary/5' : ''}`}>
                  <div className="font-bold text-xl brand-gradient-text">{r.split(" (")[0]}</div>
                  <div className="text-xs text-muted-foreground">{r.split(" (")[1]?.replace(")", "")}</div>
                  {i === 0 && <div className="text-xs text-primary mt-1">Recommended</div>}
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
