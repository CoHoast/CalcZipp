"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calculator, Menu, X, ChevronDown } from "lucide-react";
import { useState } from "react";

const categories = [
  { name: "Financial", href: "/financial", emoji: "💰" },
  { name: "Math", href: "/math", emoji: "📊" },
  { name: "Health", href: "/health", emoji: "🏋️" },
  { name: "Date & Time", href: "/date-time", emoji: "📅" },
  { name: "Converters", href: "/converters", emoji: "📐" },
  { name: "Home & DIY", href: "/home", emoji: "🏠" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg brand-gradient flex items-center justify-center">
              <Calculator className="h-5 w-5 text-white" />
            </div>
            <span className="font-bold text-xl">
              Calc<span className="brand-gradient-text">Zipp</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <div className="relative group">
              <button className="flex items-center gap-1 px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted">
                Calculators
                <ChevronDown className="h-4 w-4" />
              </button>
              <div className="absolute top-full left-0 mt-1 w-56 py-2 bg-card border border-border rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                {categories.map((cat) => (
                  <Link
                    key={cat.href}
                    href={cat.href}
                    className="flex items-center gap-3 px-4 py-2.5 hover:bg-muted transition-colors"
                  >
                    <span>{cat.emoji}</span>
                    <span className="text-sm font-medium">{cat.name}</span>
                  </Link>
                ))}
              </div>
            </div>
            {categories.slice(0, 4).map((cat) => (
              <Link
                key={cat.href}
                href={cat.href}
                className="px-3 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted"
              >
                {cat.name}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
              100% Free
            </span>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50">
            <nav className="flex flex-col gap-1">
              {categories.map((cat) => (
                <Link
                  key={cat.href}
                  href={cat.href}
                  className="flex items-center gap-3 px-3 py-2.5 text-sm rounded-lg hover:bg-muted transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <span>{cat.emoji}</span>
                  {cat.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
