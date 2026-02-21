"use client";

import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ZippPromo } from "@/components/shared/zipp-promo";
import Link from "next/link";
import { ChevronRight, Calculator } from "lucide-react";

interface CalculatorLayoutProps {
  title: string;
  description: string;
  category: string;
  categoryHref: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  formula?: string;
  howItWorks?: string;
  faqs?: { question: string; answer: string }[];
  relatedCalculators?: { name: string; href: string }[];
  promoContext?: "financial" | "math" | "health" | "general";
}

export function CalculatorLayout({
  title,
  description,
  category,
  categoryHref,
  icon,
  children,
  formula,
  howItWorks,
  faqs,
  relatedCalculators,
  promoContext = "general",
}: CalculatorLayoutProps) {
  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="border-b border-border/50 bg-muted/30">
        <div className="container mx-auto px-4 py-3">
          <nav className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <Link href={categoryHref} className="text-muted-foreground hover:text-foreground transition-colors">
              {category}
            </Link>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
            <span className="text-foreground font-medium">{title}</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Calculator */}
            <div className="lg:col-span-2">
              {/* Header */}
              <div className="mb-6">
                <Badge className="mb-3 bg-primary/10 text-primary border-primary/20">
                  {icon || <Calculator className="h-3 w-3 mr-1" />}
                  {category}
                </Badge>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">{title}</h1>
                <p className="text-lg text-muted-foreground">{description}</p>
              </div>

              {/* Calculator Card */}
              <Card className="p-6 md:p-8 mb-8">
                {children}
              </Card>

              {/* Formula */}
              {formula && (
                <Card className="p-6 mb-8">
                  <h2 className="font-semibold mb-3">Formula</h2>
                  <div className="bg-muted p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    {formula}
                  </div>
                </Card>
              )}

              {/* How It Works */}
              {howItWorks && (
                <Card className="p-6 mb-8">
                  <h2 className="font-semibold mb-3">How It Works</h2>
                  <div className="text-muted-foreground text-sm leading-relaxed whitespace-pre-line">
                    {howItWorks}
                  </div>
                </Card>
              )}

              {/* FAQs */}
              {faqs && faqs.length > 0 && (
                <Card className="p-6 mb-8">
                  <h2 className="font-semibold mb-4">Frequently Asked Questions</h2>
                  <div className="space-y-4">
                    {faqs.map((faq, index) => (
                      <div key={index}>
                        <h3 className="font-medium text-sm mb-1">{faq.question}</h3>
                        <p className="text-sm text-muted-foreground">{faq.answer}</p>
                      </div>
                    ))}
                  </div>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Related Calculators */}
              {relatedCalculators && relatedCalculators.length > 0 && (
                <Card className="p-6 mb-6">
                  <h3 className="font-semibold mb-4">Related Calculators</h3>
                  <div className="space-y-2">
                    {relatedCalculators.map((calc) => (
                      <Link
                        key={calc.href}
                        href={calc.href}
                        className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted transition-colors text-sm"
                      >
                        <Calculator className="h-4 w-4 text-primary" />
                        {calc.name}
                      </Link>
                    ))}
                  </div>
                </Card>
              )}

              {/* ZIPP Promo */}
              <ZippPromo context={promoContext} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
