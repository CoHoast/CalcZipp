import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Home, Square, Paintbrush, Grid3X3, Hammer, Cuboid, Ruler, Calculator } from "lucide-react";

export const metadata = {
  title: "Home & DIY Calculators - CalcZipp",
  description: "Free calculators for home improvement projects - square footage, paint, flooring, and more.",
};

const calculators = [
  { name: "Square Footage", href: "/home/square-footage", icon: Square, description: "Calculate area of rooms and spaces" },
  { name: "Paint Calculator", href: "/home/paint", icon: Paintbrush, description: "How much paint do you need?" },
  { name: "Flooring Calculator", href: "/home/flooring", icon: Grid3X3, description: "Calculate flooring materials needed" },
  { name: "Wallpaper Calculator", href: "/home/wallpaper", icon: Grid3X3, description: "Rolls needed for your walls" },
  { name: "Concrete Calculator", href: "/home/concrete", icon: Cuboid, description: "Cubic yards of concrete needed" },
  { name: "Fence Calculator", href: "/home/fence", icon: Ruler, description: "Materials for fence projects" },
  { name: "Deck Calculator", href: "/home/deck", icon: Grid3X3, description: "Deck boards and materials" },
  { name: "Gravel Calculator", href: "/home/gravel", icon: Hammer, description: "Gravel and mulch amounts" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <section className="border-b border-border/50 bg-gradient-to-b from-teal-500/5 to-transparent">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-teal-500/10 text-teal-600 border-teal-500/20">
              <Home className="h-3 w-3 mr-1" />
              Home & DIY
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">🏠 Home & DIY Calculators</h1>
            <p className="text-xl text-muted-foreground">
              Free calculators for home improvement and DIY projects.
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
                  <div className="w-10 h-10 rounded-lg bg-teal-500/10 flex items-center justify-center flex-shrink-0">
                    <calc.icon className="h-5 w-5 text-teal-600" />
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
