import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Scale, Flame, Droplets, Activity, Timer, Moon, Apple, Dumbbell, Baby } from "lucide-react";

export const metadata = {
  title: "Health & Fitness Calculators - CalcZipp",
  description: "Free health calculators for BMI, calories, macros, and fitness tracking.",
};

const calculators = [
  { name: "BMI Calculator", href: "/health/bmi", icon: Scale, description: "Calculate your Body Mass Index" },
  { name: "Calorie Calculator", href: "/health/calorie", icon: Flame, description: "Calculate daily calorie needs (TDEE)" },
  { name: "Macro Calculator", href: "/health/macro", icon: Apple, description: "Calculate protein, carbs, and fats" },
  { name: "Ideal Weight Calculator", href: "/health/ideal-weight", icon: Scale, description: "Find your ideal body weight" },
  { name: "Body Fat Calculator", href: "/health/body-fat", icon: Activity, description: "Estimate body fat percentage" },
  { name: "Water Intake Calculator", href: "/health/water-intake", icon: Droplets, description: "Daily water recommendation" },
  { name: "Protein Calculator", href: "/health/protein", icon: Dumbbell, description: "Daily protein needs" },
  { name: "Pace Calculator", href: "/health/pace", icon: Timer, description: "Running pace and time" },
  { name: "Sleep Calculator", href: "/health/sleep", icon: Moon, description: "Optimal bedtime and wake time" },
  { name: "Pregnancy Calculator", href: "/health/pregnancy", icon: Baby, description: "Due date and trimester" },
];

export default function HealthPage() {
  return (
    <div className="min-h-screen">
      <section className="border-b border-border/50 bg-gradient-to-b from-red-500/5 to-transparent">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-red-500/10 text-red-600 border-red-500/20">
              <Heart className="h-3 w-3 mr-1" />
              Health & Fitness
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">🏋️ Health Calculators</h1>
            <p className="text-xl text-muted-foreground">
              Free calculators for BMI, calories, macros, and all your fitness needs.
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
                  <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center flex-shrink-0">
                    <calc.icon className="h-5 w-5 text-red-600" />
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
