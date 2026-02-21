import Link from "next/link";
import { Calculator } from "lucide-react";

const footerLinks = {
  "Financial": [
    { name: "Mortgage Calculator", href: "/financial/mortgage" },
    { name: "Loan Calculator", href: "/financial/loan" },
    { name: "Savings Calculator", href: "/financial/savings" },
    { name: "Tip Calculator", href: "/financial/tip" },
  ],
  "Math & Health": [
    { name: "Percentage Calculator", href: "/math/percentage" },
    { name: "BMI Calculator", href: "/health/bmi" },
    { name: "Age Calculator", href: "/date-time/age" },
    { name: "GPA Calculator", href: "/math/gpa" },
  ],
  "Converters": [
    { name: "Length Converter", href: "/converters/length" },
    { name: "Weight Converter", href: "/converters/weight" },
    { name: "Temperature Converter", href: "/converters/temperature" },
    { name: "Data Storage Converter", href: "/converters/data" },
  ],
  "ZIPP Family": [
    { name: "QRZipp", href: "https://qrzipp.com", external: true, desc: "QR Codes" },
    { name: "PDFZipp", href: "https://pdfzipp.com", external: true, desc: "PDF Tools" },
    { name: "PIXZipp", href: "https://pixzipp.com", external: true, desc: "Image Tools" },
    { name: "SEOZipp", href: "https://seozipp.surge.sh", external: true, desc: "SEO Analysis" },
    { name: "VidZipp", href: "https://vidzipp.com", external: true, desc: "Video Tools" },
    { name: "DOCZipp", href: "https://doczipp.com", external: true, desc: "Documents" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-muted/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg brand-gradient flex items-center justify-center">
                <Calculator className="h-4 w-4 text-white" />
              </div>
              <span className="font-bold text-xl">
                Calc<span className="brand-gradient-text">Zipp</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Free online calculators for everything. Fast, accurate, and easy to use.
            </p>
            <div className="mt-4">
              <span className="inline-block text-xs bg-primary/10 text-primary px-2 py-1 rounded-full font-medium">
                100% Free Forever
              </span>
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h4 className="font-semibold mb-4 text-sm">{category}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      target={(link as any).external ? "_blank" : undefined}
                      rel={(link as any).external ? "noopener noreferrer" : undefined}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                    >
                      {link.name}
                      {(link as any).desc && (
                        <span className="text-xs text-muted-foreground/70">
                          ({(link as any).desc})
                        </span>
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} CalcZipp. Part of the ZIPP family by BLUPRYNT.
          </p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
