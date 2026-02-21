import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DollarSign,
  Percent,
  Heart,
  Calendar,
  ArrowLeftRight,
  Home,
  ArrowRight,
  Sparkles,
  Zap,
  Building,
  Scale,
  Clock,
  Flame,
  Ruler,
  CreditCard,
  Gift,
  UserCheck,
  ShieldCheck,
  CheckCircle,
  Smartphone,
  Ban,
  QrCode,
  FileText,
  Image,
  Search,
  Video,
  FileSpreadsheet,
  type LucideIcon,
} from "lucide-react";

interface Category {
  name: string;
  href: string;
  icon: LucideIcon;
  description: string;
  calculators: string[];
}

const categories: Category[] = [
  {
    name: "Financial",
    href: "/financial",
    icon: DollarSign,
    description: "Mortgage, loans, savings, tips & more",
    calculators: ["Mortgage", "Loan", "Savings", "Tip", "Compound Interest"],
  },
  {
    name: "Math & Percentage",
    href: "/math",
    icon: Percent,
    description: "Percentages, fractions, GPA & more",
    calculators: ["Percentage", "Fraction", "GPA", "Average", "Scientific"],
  },
  {
    name: "Health & Fitness",
    href: "/health",
    icon: Heart,
    description: "BMI, calories, macros & more",
    calculators: ["BMI", "Calorie", "Macro", "Ideal Weight", "Body Fat"],
  },
  {
    name: "Date & Time",
    href: "/date-time",
    icon: Calendar,
    description: "Age, date difference, countdown & more",
    calculators: ["Age", "Date Difference", "Countdown", "Time Zone"],
  },
  {
    name: "Converters",
    href: "/converters",
    icon: ArrowLeftRight,
    description: "Length, weight, temperature & more",
    calculators: ["Length", "Weight", "Temperature", "Volume", "Data"],
  },
  {
    name: "Home & DIY",
    href: "/home",
    icon: Home,
    description: "Square footage, paint, flooring & more",
    calculators: ["Square Footage", "Paint", "Flooring", "Concrete"],
  },
];

interface PopularCalculator {
  name: string;
  href: string;
  icon: LucideIcon;
}

const popularCalculators: PopularCalculator[] = [
  { name: "Mortgage Calculator", href: "/financial/mortgage", icon: Building },
  { name: "BMI Calculator", href: "/health/bmi", icon: Scale },
  { name: "Percentage Calculator", href: "/math/percentage", icon: Percent },
  { name: "Age Calculator", href: "/date-time/age", icon: Calendar },
  { name: "Tip Calculator", href: "/financial/tip", icon: DollarSign },
  { name: "Loan Calculator", href: "/financial/loan", icon: CreditCard },
  { name: "Calorie Calculator", href: "/health/calorie", icon: Flame },
  { name: "Length Converter", href: "/converters/length", icon: Ruler },
];

interface ZippProduct {
  name: string;
  url: string;
  icon: LucideIcon;
  desc: string;
}

const zippProducts: ZippProduct[] = [
  { name: "QRZipp", url: "https://qrzipp.com", icon: QrCode, desc: "QR Codes" },
  { name: "PDFZipp", url: "https://pdfzipp.com", icon: FileText, desc: "PDF Tools" },
  { name: "PIXZipp", url: "https://pixzipp.com", icon: Image, desc: "Image Tools" },
  { name: "SEOZipp", url: "https://seozipp.surge.sh", icon: Search, desc: "SEO Analysis" },
  { name: "VidZipp", url: "https://vidzipp.com", icon: Video, desc: "Video Tools" },
  { name: "DOCZipp", url: "https://doczipp.com", icon: FileSpreadsheet, desc: "Documents" },
];

interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

const features: Feature[] = [
  {
    title: "100% Free",
    description: "All calculators are completely free. No hidden fees, no premium tier, no catch.",
    icon: Gift,
  },
  {
    title: "No Signup",
    description: "Just use the calculators. No account required, no email needed.",
    icon: Zap,
  },
  {
    title: "Privacy First",
    description: "We don't track you. Your calculations stay in your browser.",
    icon: ShieldCheck,
  },
  {
    title: "Accurate Results",
    description: "Built by developers who care about getting the math right.",
    icon: CheckCircle,
  },
  {
    title: "Mobile Friendly",
    description: "Works perfectly on any device. Calculate on the go.",
    icon: Smartphone,
  },
  {
    title: "No Ads",
    description: "Clean, distraction-free interface. Just calculators.",
    icon: Ban,
  },
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

            {/* Quick Access */}
            <div className="flex flex-wrap gap-3 justify-center mb-8">
              {popularCalculators.slice(0, 4).map((calc) => (
                <Link key={calc.href} href={calc.href}>
                  <Button variant="outline" size="lg" className="gap-2">
                    <calc.icon className="h-4 w-4" />
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
                  <div className="w-12 h-12 rounded-xl brand-gradient flex items-center justify-center flex-shrink-0">
                    <category.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">
                      {category.name}
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
                <div className="w-12 h-12 rounded-xl brand-gradient flex items-center justify-center mx-auto mb-3">
                  <calc.icon className="h-6 w-6 text-white" />
                </div>
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
          {zippProducts.map((product) => (
            <Link
              key={product.name}
              href={product.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Card className="calculator-card text-center p-4 h-full">
                <div className="w-10 h-10 rounded-lg brand-gradient flex items-center justify-center mx-auto mb-2">
                  <product.icon className="h-5 w-5 text-white" />
                </div>
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
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="w-14 h-14 rounded-xl brand-gradient flex items-center justify-center mx-auto mb-3">
                <feature.icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="font-semibold mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
