"use client";
import { useState, useEffect } from "react";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Thermometer } from "lucide-react";

export default function TemperatureConverter() {
  const [celsius, setCelsius] = useState<string>("20");
  const [fahrenheit, setFahrenheit] = useState<string>("68");
  const [kelvin, setKelvin] = useState<string>("293.15");
  const [lastChanged, setLastChanged] = useState<string>("celsius");

  useEffect(() => {
    if (lastChanged === "celsius") {
      const c = parseFloat(celsius) || 0;
      setFahrenheit((c * 9/5 + 32).toFixed(2));
      setKelvin((c + 273.15).toFixed(2));
    } else if (lastChanged === "fahrenheit") {
      const f = parseFloat(fahrenheit) || 0;
      const c = (f - 32) * 5/9;
      setCelsius(c.toFixed(2));
      setKelvin((c + 273.15).toFixed(2));
    } else {
      const k = parseFloat(kelvin) || 0;
      const c = k - 273.15;
      setCelsius(c.toFixed(2));
      setFahrenheit((c * 9/5 + 32).toFixed(2));
    }
  }, [celsius, fahrenheit, kelvin, lastChanged]);

  return (
    <CalculatorLayout title="Temperature Converter" description="Convert between Celsius, Fahrenheit, and Kelvin instantly." category="Converters" categoryHref="/converters" icon={<Thermometer className="h-3 w-3 mr-1" />} promoContext="general" formula="°F = °C × 9/5 + 32 | K = °C + 273.15" howItWorks="Enter a temperature in any unit and the others will update automatically. Common reference points:\n• 0°C = 32°F = 273.15K (water freezes)\n• 100°C = 212°F = 373.15K (water boils)\n• 37°C = 98.6°F (body temperature)" relatedCalculators={[{ name: "Length Converter", href: "/converters/length" }, { name: "Weight Converter", href: "/converters/weight" }]}>
      <div className="space-y-6">
        <Card className="p-6">
          <Input label="Celsius (°C)" type="number" suffix="°C" value={celsius} onChange={(e) => { setCelsius(e.target.value); setLastChanged("celsius"); }} />
        </Card>
        <Card className="p-6">
          <Input label="Fahrenheit (°F)" type="number" suffix="°F" value={fahrenheit} onChange={(e) => { setFahrenheit(e.target.value); setLastChanged("fahrenheit"); }} />
        </Card>
        <Card className="p-6">
          <Input label="Kelvin (K)" type="number" suffix="K" value={kelvin} onChange={(e) => { setKelvin(e.target.value); setLastChanged("kelvin"); }} />
        </Card>
        <div className="text-sm text-muted-foreground text-center">Type in any field to convert instantly</div>
      </div>
    </CalculatorLayout>
  );
}
