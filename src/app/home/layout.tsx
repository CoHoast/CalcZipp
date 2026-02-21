import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Home & DIY Calculators - Paint, Flooring, Tile & More",
  description:
    "Free home improvement calculators for paint, flooring, tile, wallpaper, and square footage. Plan your projects accurately, no signup required.",
  keywords: [
    "home calculator",
    "paint calculator",
    "flooring calculator",
    "tile calculator",
    "square footage calculator",
    "DIY calculator",
    "home improvement calculator",
  ],
  openGraph: {
    title: "Home & DIY Calculators | CalcZipp",
    description: "Free calculators for paint, flooring, tile, and home improvement.",
    url: "https://www.calczipp.com/home/",
  },
  alternates: {
    canonical: "https://www.calczipp.com/home/",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
