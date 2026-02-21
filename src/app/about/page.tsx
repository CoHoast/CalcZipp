import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calculator, Zap, Lock, Heart } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "About - CalcZipp",
  description: "CalcZipp is a free online calculator collection. Part of the ZIPP family by BLUPRYNT.",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <section className="border-b border-border/50">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">
              About Us
            </Badge>
            <h1 className="text-4xl font-bold mb-4">About CalcZipp</h1>
            <p className="text-xl text-muted-foreground">
              Free online calculators for everyone. No signup, no ads, no tracking.
            </p>
          </div>
        </div>
      </section>

      <section className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-muted-foreground mb-8">
              CalcZipp was created with a simple goal: provide fast, accurate, and free calculators for everyone. 
              Whether you're calculating a mortgage payment, checking your BMI, or converting units, 
              we want to make it easy and accessible.
            </p>

            <h2 className="text-2xl font-bold mb-4">Why CalcZipp?</h2>
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {[
                { icon: Zap, title: "100% Free", desc: "No premium tier, no hidden costs. Every calculator is free forever." },
                { icon: Lock, title: "Privacy First", desc: "We don't track you or sell your data. Calculations stay in your browser." },
                { icon: Calculator, title: "Accurate", desc: "Built with precision. We test our formulas to ensure accuracy." },
                { icon: Heart, title: "Simple", desc: "Clean design, no clutter. Just the calculator you need." },
              ].map((item) => (
                <Card key={item.title} className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <h2 className="text-2xl font-bold mb-4">Part of the ZIPP Family</h2>
            <p className="text-muted-foreground mb-4">
              CalcZipp is part of the ZIPP family of free online tools by BLUPRYNT. 
              Check out our other free tools:
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              {[
                { name: "QRZipp", url: "https://qrzipp.com" },
                { name: "PDFZipp", url: "https://pdfzipp.com" },
                { name: "PIXZipp", url: "https://pixzipp.com" },
                { name: "SEOZipp", url: "https://seozipp.surge.sh" },
                { name: "VidZipp", url: "https://vidzipp.com" },
              ].map((product) => (
                <Link
                  key={product.name}
                  href={product.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 bg-muted rounded-full text-sm hover:bg-primary/10 transition-colors"
                >
                  {product.name}
                </Link>
              ))}
            </div>

            <h2 className="text-2xl font-bold mb-4">Contact</h2>
            <p className="text-muted-foreground">
              Have feedback or found a bug? We'd love to hear from you.
              Email us at <a href="mailto:hello@bluprynt.com" className="text-primary hover:underline">hello@bluprynt.com</a>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
