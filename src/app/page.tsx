import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Calculator,
  DollarSign,
  Percent,
  Heart,
  Calendar,
  ArrowLeftRight,
  Home,
  ArrowRight,
  Sparkles,
  Zap,
  Search,
} from "lucide-react";

const categories = [
  {
    name: "Financial",
    emoji: "💰",
    href: "/financial",
    icon: DollarSign,
    description: "Mortgage, loans, savings, tips & more",
    color: "from-green-500 to-emerald-500",
    calculators: ["Mortgage", "Loan", "Savings", "Tip", "Compound Interest"],
  },
  {
    name: "Math & Percentage",
    emoji: "📊",
    href: "/math",
    icon: Percent,
    description: "Percentages, fractions, GPA & more",
    color: "from-blue-500 to-indigo-500",
    calculators: ["Percentage", "Fraction", "GPA", "Average", "Scientific"],
  },
  {
    name: "Health & Fitness",
    emoji: "🏋️",
    href: "/health",
    icon: Heart,
    description: "BMI, calories, macros & more",
    color: "from-red-500 to-pink-500",
    calculators: ["BMI", "Calorie", "Macro", "Ideal Weight", "Body Fat"],
  },
  {
    name: "Date & Time",
    emoji: "📅",
    href: "/date-time",
    icon: Calendar,
    description: "Age, date difference, countdown & more",
    color: "from-purple-500 to-violet-500",
    calculators: ["Age", "Date Difference", "Countdown", "Time Zone"],
  },
  {
    name: "Converters",
    emoji: "📐",
    href: "/converters",
    icon: ArrowLeftRight,
    description: "Length, weight, temperature & more",
    color: "from-amber-500 to-orange-500",
    calculators: ["Length", "Weight", "Temperature", "Volume", "Data"],
  },
  {
    name: "Home & DIY",
    emoji: "🏠",
    href: "/home",
    icon: Home,
    description: "Square footage, paint, flooring & more",
    color: "from-teal-500 to-cyan-500",
    calculators: ["Square Footage", "Paint", "Flooring", "Concrete"],
  },
];

const popularCalculators = [
  { name: "Mortgage Calculator", href: "/financial/mortgage", emoji: "🏠" },
  { name: "BMI Calculator", href: "/health/bmi", emoji: "⚖️" },
  { name: "Percentage Calculator", href: "/math/percentage", emoji: "%" },
  { name: "Age Calculator", href: "/date-time/age", emoji: "🎂" },
  { name: "Tip Calculator", href: "/financial/tip", emoji: "💵" },
  { name: "Loan Calculator", href: "/financial/loan", emoji: "💳" },
  { name: "Calorie Calculator", href: "/health/calorie", emoji: "🔥" },
  { name: "Length Converter", href: "/converters/length", emoji: "📏" },
];

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border/50">
        <div className="absolute inset-0 brand-gradient opacity-5" />
        <div className="absolute top-20 left-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              <Sparkles className="h-3 w-3 mr-1" />
              100% Free Forever
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Calculate <span className="brand-gradient-text">anything.</span>
              <br />Instantly.
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              50+ free online calculators for finance, math, health, dates, and more.
              Fast, accurate, and no signup required.
            </p>

            {/* Search / Quick Access */}
            <div className="flex flex-wrap gap-3 justify-center mb-8">
              {popularCalculators.slice(0, 4).map((calc) => (
                <Link key={calc.href} href={calc.href}>
                  <Button variant="outline" size="lg" className="gap-2">
                    <span>{calc.emoji}</span>
                    {calc.name.replace(" Calculator", "")}
                  </Button>
                </Link>
              ))}
            </div>

            <p className="text-sm text-muted-foreground">
              <Zap className="inline h-4 w-4 mr-1" />
              No ads • No signup • No tracking
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
          Calculator Categories
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          Browse our collection of free calculators organized by category
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {categories.map((category) => (
            <Link key={category.href} href={category.href}>
              <Card className="category-card h-full">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center flex-shrink-0`}>
                    <category.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1 flex items-center gap-2">
                      {category.name}
                      <span>{category.emoji}</span>
                    </h3>
                    <p className="text-sm text-muted-foreground mb-3">
                      {category.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {category.calculators.slice(0, 3).map((calc) => (
                        <span
                          key={calc}
                          className="text-xs bg-muted px-2 py-0.5 rounded-full"
                        >
                          {calc}
                        </span>
                      ))}
                      <span className="text-xs text-primary">
                        +more
                      </span>
                    </div>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Popular Calculators */}
      <section className="container mx-auto px-4 py-16 border-t border-border/50">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
          Popular Calculators
        </h2>
        <p className="text-center text-muted-foreground mb-12">
          Most used calculators by our visitors
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          {popularCalculators.map((calc) => (
            <Link key={calc.href} href={calc.href}>
              <Card className="calculator-card text-center p-6 h-full">
                <div className="text-3xl mb-2">{calc.emoji}</div>
                <div className="font-medium text-sm">{calc.name}</div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* ZIPP Family */}
      <section className="container mx-auto px-4 py-16 border-t border-border/50">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
          Part of the ZIPP Family
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          CalcZipp is one of many free tools from BLUPRYNT. Check out our other products!
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 max-w-5xl mx-auto">
          {[
            { name: "QRZipp", url: "https://qrzipp.com", emoji: "📱", desc: "QR Codes" },
            { name: "PDFZipp", url: "https://pdfzipp.com", emoji: "📄", desc: "PDF Tools" },
            { name: "PIXZipp", url: "https://pixzipp.com", emoji: "🖼️", desc: "Image Tools" },
            { name: "SEOZipp", url: "https://seozipp.surge.sh", emoji: "🔍", desc: "SEO Analysis" },
            { name: "VidZipp", url: "https://vidzipp.com", emoji: "🎬", desc: "Video Tools" },
            { name: "DOCZipp", url: "https://doczipp.com", emoji: "📋", desc: "Documents" },
          ].map((product) => (
            <Link
              key={product.name}
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Card className="calculator-card text-center p-4 h-full">
                <div className="text-2xl mb-1">{product.emoji}</div>
                <div className="font-medium text-sm">{product.name}</div>
                <div className="text-xs text-muted-foreground">{product.desc}</div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Why CalcZipp */}
      <section className="container mx-auto px-4 py-16 border-t border-border/50">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          Why CalcZipp?
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {[
            {
              title: "100% Free",
              description: "All calculators are completely free. No hidden fees, no premium tier, no catch.",
              emoji: "🎁",
            },
            {
              title: "No Signup",
              description: "Just use the calculators. No account required, no email needed.",
              emoji: "⚡",
            },
            {
              title: "Privacy First",
              description: "We don't track you. Your calculations stay in your browser.",
              emoji: "🔒",
            },
            {
              title: "Accurate Results",
              description: "Built by developers who care about getting the math right.",
              emoji: "✅",
            },
            {
              title: "Mobile Friendly",
              description: "Works perfectly on any device. Calculate on the go.",
              emoji: "📱",
            },
            {
              title: "No Ads",
              description: "Clean, distraction-free interface. Just calculators.",
              emoji: "🚫",
            },
          ].map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="text-4xl mb-3">{feature.emoji}</div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
