import Link from "next/link";
import Image from "next/image";

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
};

const zippFamily = [
  { name: "QRZipp", href: "https://qrzipp.com", prefix: "QR", gradient: "from-emerald-600 to-teal-500", boltColor: "#10b981", desc: "QR Codes" },
  { name: "PDFZipp", href: "https://pdfzipp.com", prefix: "PDF", gradient: "from-blue-800 via-blue-500 to-cyan-500", boltColor: "#3b82f6", desc: "PDF Tools" },
  { name: "CalcZipp", href: "/", prefix: "Calc", gradient: "from-amber-500 via-orange-500 to-red-500", boltColor: "#f97316", desc: "Calculators", current: true },
  { name: "PIXZipp", href: "https://pixzipp.com", prefix: "PIX", gradient: "from-purple-600 via-pink-500 to-rose-500", boltColor: "#a855f7", desc: "Image Tools" },
];

export function Footer() {
  return (
    <footer className="border-t border-border/50 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Main Footer Links */}
        <div className="py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <Link href="/" className="flex items-center gap-1 mb-4">
                <Image 
                  src="/logo.svg" 
                  alt="CalcZipp" 
                  width={28} 
                  height={36}
                  className="w-7 h-9"
                />
                <span className="text-2xl font-bold">
                  Calc<span className="brand-gradient-text font-extrabold">Zipp</span>
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
                        className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* ZIPP Family Section */}
        <div className="border-t border-border/50 py-8">
          <p className="text-center text-xs tracking-widest text-muted-foreground mb-6">
            PART OF THE ZIPP FAMILY
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {zippFamily.map((product) => (
              <Link
                key={product.name}
                href={product.href}
                target={product.current ? undefined : "_blank"}
                rel={product.current ? undefined : "noopener noreferrer"}
                className="flex flex-col items-center text-center group"
              >
                <div className="flex items-center gap-1 mb-2 group-hover:opacity-70 transition-opacity">
                  <svg viewBox="0 0 24 32" className="w-6 h-8" fill="none">
                    <path d="M5 2H20L11 14H19L4 30L9 16H2L5 2Z" fill={product.boltColor} />
                  </svg>
                  <span className="text-2xl font-bold text-gray-900">
                    {product.prefix}<span className={`bg-gradient-to-r ${product.gradient} bg-clip-text text-transparent font-extrabold`}>Zipp</span>
                  </span>
                </div>
                <span className="text-sm text-muted-foreground">{product.desc}</span>
                {product.current && (
                  <span className="text-sm text-green-600 mt-1">● You are here</span>
                )}
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-border/50 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-1">
              <Image 
                src="/logo.svg" 
                alt="CalcZipp" 
                width={20} 
                height={26}
                className="w-5 h-6"
              />
              <span className="font-bold">
                Calc<span className="brand-gradient-text font-extrabold">Zipp</span>
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} CalcZipp. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
              <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
              <Link href="/terms" className="hover:text-foreground transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
