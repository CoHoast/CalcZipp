import { Metadata } from "next";
import { calculatorSEO, generateCalculatorMetadata, generateCalculatorJsonLd } from "@/lib/seo";

const seo = calculatorSEO.wallpaper;

export const metadata: Metadata = generateCalculatorMetadata(seo);

const jsonLd = generateCalculatorJsonLd({
  name: "Wallpaper Calculator",
  description: seo.description,
  url: seo.path,
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {children}
    </>
  );
}
