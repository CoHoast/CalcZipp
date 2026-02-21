import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Percent, Calculator, Divide, Hash, BarChart, Plus, Minus, X, PieChart, Sigma } from "lucide-react";

export const metadata = {
  title: "Math Calculators - CalcZipp",
  description: "Free math calculators for percentages, fractions, GPA, averages, and more.",
};

const calculators = [
  { name: "Percentage Calculator", href: "/math/percentage", icon: Percent, description: "Calculate percentages and changes" },
  { name: "Percentage Change", href: "/math/percentage-change", icon: BarChart, description: "Find increase or decrease %" },
  { name: "Fraction Calculator", href: "/math/fraction", icon: Divide, description: "Add, subtract, multiply fractions" },
  { name: "GPA Calculator", href: "/math/gpa", icon: BarChart, description: "Calculate your grade point average" },
  { name: "Grade Calculator", href: "/math/grade", icon: Hash, description: "What grade do I need?" },
  { name: "Average Calculator", href: "/math/average", icon: Sigma, description: "Find mean, median, mode" },
  { name: "Scientific Calculator", href: "/math/scientific", icon: Calculator, description: "Advanced math functions" },
  { name: "Ratio Calculator", href: "/math/ratio", icon: PieChart, description: "Solve and simplify ratios" },
  { name: "Random Number Generator", href: "/math/random", icon: Hash, description: "Generate random numbers" },
  { name: "Roman Numeral Converter", href: "/math/roman-numerals", icon: Hash, description: "Convert to/from roman numerals" },
];

export default function MathPage() {
  return (
    <div className="min-h-screen">
      <section className="border-b border-border/50 bg-gradient-to-b from-blue-500/5 to-transparent">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-blue-500/10 text-blue-600 border-blue-500/20">
              <Percent className="h-3 w-3 mr-1" />
              Math Calculators
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Math & Percentage Calculators</h1>
            <p className="text-xl text-muted-foreground">
              Free calculators for percentages, fractions, GPA, and all your math needs.
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
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                    <calc.icon className="h-5 w-5 text-blue-600" />
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
