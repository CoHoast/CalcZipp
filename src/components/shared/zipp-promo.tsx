import Link from "next/link";
import { ArrowRight, QrCode, FileText, Image, Search, Video, FileSpreadsheet } from "lucide-react";

const zippProducts = [
  {
    name: "QRZipp",
    url: "https://qrzipp.com",
    description: "Create beautiful QR codes instantly",
    icon: QrCode,
    color: "from-emerald-500 to-teal-500",
  },
  {
    name: "PDFZipp",
    url: "https://pdfzipp.com",
    description: "Merge, split & convert PDFs",
    icon: FileText,
    color: "from-blue-500 to-cyan-500",
  },
  {
    name: "PIXZipp",
    url: "https://pixzipp.com",
    description: "Compress, resize & edit images with AI",
    icon: Image,
    color: "from-purple-500 to-pink-500",
  },
  {
    name: "SEOZipp",
    url: "https://seozipp.surge.sh",
    description: "Analyze SEO & optimize keywords",
    icon: Search,
    color: "from-blue-500 to-indigo-500",
  },
  {
    name: "VidZipp",
    url: "https://vidzipp.com",
    description: "Edit & compress videos online",
    icon: Video,
    color: "from-slate-700 to-slate-900",
  },
  {
    name: "DOCZipp",
    url: "https://doczipp.com",
    description: "Create invoices & documents",
    icon: FileSpreadsheet,
    color: "from-green-500 to-emerald-500",
  },
];

interface ZippPromoProps {
  exclude?: string[];
  context?: "financial" | "math" | "health" | "general";
}

export function ZippPromo({ exclude = [], context = "general" }: ZippPromoProps) {
  // Smart product selection based on context
  const getRelevantProducts = () => {
    const available = zippProducts.filter(p => !exclude.includes(p.name));
    
    // Prioritize based on context
    const priorities: Record<string, string[]> = {
      financial: ["PDFZipp", "DOCZipp", "SEOZipp"],
      math: ["SEOZipp", "QRZipp", "PIXZipp"],
      health: ["PIXZipp", "PDFZipp", "QRZipp"],
      general: ["QRZipp", "PIXZipp", "SEOZipp"],
    };
    
    const priorityList = priorities[context] || priorities.general;
    const sorted = [...available].sort((a, b) => {
      const aIndex = priorityList.indexOf(a.name);
      const bIndex = priorityList.indexOf(b.name);
      if (aIndex === -1 && bIndex === -1) return 0;
      if (aIndex === -1) return 1;
      if (bIndex === -1) return -1;
      return aIndex - bIndex;
    });
    
    return sorted.slice(0, 3);
  };
  
  const products = getRelevantProducts();
  
  return (
    <div className="promo-card">
      <h3 className="font-semibold mb-1">More Free Tools</h3>
      <p className="text-sm text-muted-foreground mb-4">
        Part of the ZIPP family of free online tools
      </p>
      <div className="space-y-3">
        {products.map((product) => (
          <Link
            key={product.name}
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-lg bg-background border border-border hover:border-primary/30 hover:shadow-sm transition-all group"
          >
            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${product.color} flex items-center justify-center flex-shrink-0`}>
              <product.icon className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium text-sm">{product.name}</div>
              <div className="text-xs text-muted-foreground truncate">
                {product.description}
              </div>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
          </Link>
        ))}
      </div>
    </div>
  );
}

// Inline promotion for within calculator results
export function InlinePromo({ product }: { product: keyof typeof inlinePromos }) {
  const promo = inlinePromos[product];
  if (!promo) return null;
  
  return (
    <Link
      href={promo.url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 p-4 rounded-lg bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20 hover:border-primary/40 transition-colors mt-6"
    >
      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${promo.color} flex items-center justify-center flex-shrink-0`}>
        <promo.icon className="h-5 w-5 text-white" />
      </div>
      <div className="flex-1">
        <div className="font-medium text-sm">{promo.title}</div>
        <div className="text-xs text-muted-foreground">{promo.description}</div>
      </div>
      <ArrowRight className="h-4 w-4 text-primary" />
    </Link>
  );
}

const inlinePromos = {
  resume: {
    title: "Building your career?",
    description: "Create a professional resume with ResumeZipp →",
    url: "https://resumezipp.com",
    icon: FileText,
    color: "from-emerald-500 to-teal-500",
  },
  pdf: {
    title: "Need to work with PDFs?",
    description: "Merge, split & convert PDFs free →",
    url: "https://pdfzipp.com",
    icon: FileText,
    color: "from-blue-500 to-cyan-500",
  },
  images: {
    title: "Working with images?",
    description: "Compress, resize & edit with PIXZipp →",
    url: "https://pixzipp.com",
    icon: Image,
    color: "from-purple-500 to-pink-500",
  },
  seo: {
    title: "Running a website?",
    description: "Get your free SEO score with SEOZipp →",
    url: "https://seozipp.surge.sh",
    icon: Search,
    color: "from-blue-500 to-indigo-500",
  },
  qr: {
    title: "Need a QR code?",
    description: "Create beautiful QR codes instantly →",
    url: "https://qrzipp.com",
    icon: QrCode,
    color: "from-emerald-500 to-teal-500",
  },
};
