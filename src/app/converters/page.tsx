import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeftRight, Ruler, Scale, Thermometer, Droplets, Gauge, Database, Clock, Shirt, Footprints } from "lucide-react";

export const metadata = {
  title: "Unit Converters - CalcZipp",
  description: "Free unit converters for length, weight, temperature, volume, and more.",
};

const calculators = [
  { name: "Length Converter", href: "/converters/length", icon: Ruler, description: "Meters, feet, inches, miles, km" },
  { name: "Weight Converter", href: "/converters/weight", icon: Scale, description: "Kg, lbs, oz, grams, stones" },
  { name: "Temperature Converter", href: "/converters/temperature", icon: Thermometer, description: "Celsius, Fahrenheit, Kelvin" },
  { name: "Volume Converter", href: "/converters/volume", icon: Droplets, description: "Liters, gallons, cups, ml" },
  { name: "Area Converter", href: "/converters/area", icon: ArrowLeftRight, description: "Sq ft, sq m, acres, hectares" },
  { name: "Speed Converter", href: "/converters/speed", icon: Gauge, description: "MPH, KPH, knots, m/s" },
  { name: "Data Storage", href: "/converters/data", icon: Database, description: "Bytes, KB, MB, GB, TB" },
  { name: "Time Converter", href: "/converters/time", icon: Clock, description: "Seconds, minutes, hours, days" },
  { name: "Cooking Converter", href: "/converters/cooking", icon: Droplets, description: "Cups, tbsp, tsp, ml, oz" },
  { name: "Shoe Size Converter", href: "/converters/shoe-size", icon: Footprints, description: "US, UK, EU shoe sizes" },
];

export default function ConvertersPage() {
  return (
    <div className="min-h-screen">
      <section className="border-b border-border/50 bg-gradient-to-b from-amber-500/5 to-transparent">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-amber-500/10 text-amber-600 border-amber-500/20">
              <ArrowLeftRight className="h-3 w-3 mr-1" />
              Unit Converters
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Unit Converters</h1>
            <p className="text-xl text-muted-foreground">
              Free converters for length, weight, temperature, and all units.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {calculators.map((calc) => (
            <Link key={calc.href} href={calc.href}>
              <Card className="calculator-card p-5 h-full">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                    <calc.icon className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{calc.name}</h3>
                    <p className="text-sm text-muted-foreground">{calc.description}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
