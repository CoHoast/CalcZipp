import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Home, Car, PiggyBank, CreditCard, Percent, Calculator, Wallet, TrendingUp, Receipt, Coins, ArrowLeftRight, Users, Clock } from "lucide-react";

export const metadata = {
  title: "Financial Calculators - CalcZipp",
  description: "Free financial calculators for mortgage, loans, savings, tips, and more. Calculate your finances instantly.",
};

const calculators = [
  { name: "Mortgage Calculator", href: "/financial/mortgage", icon: Home, description: "Calculate monthly mortgage payments" },
  { name: "Loan Calculator", href: "/financial/loan", icon: CreditCard, description: "Calculate loan payments and interest" },
  { name: "Auto Loan Calculator", href: "/financial/auto-loan", icon: Car, description: "Calculate car loan payments" },
  { name: "Savings Calculator", href: "/financial/savings", icon: PiggyBank, description: "Project your savings growth" },
  { name: "Compound Interest", href: "/financial/compound-interest", icon: TrendingUp, description: "Calculate compound interest earnings" },
  { name: "Investment Calculator", href: "/financial/investment", icon: TrendingUp, description: "Project investment returns" },
  { name: "Retirement Calculator", href: "/financial/retirement", icon: Clock, description: "Plan for retirement savings" },
  { name: "Tip Calculator", href: "/financial/tip", icon: Receipt, description: "Calculate tips and split bills" },
  { name: "Split Bill Calculator", href: "/financial/split-bill", icon: Users, description: "Split expenses among friends" },
  { name: "Down Payment Calculator", href: "/financial/down-payment", icon: Home, description: "Calculate home down payment" },
  { name: "Credit Card Payoff", href: "/financial/credit-card-payoff", icon: CreditCard, description: "Plan credit card debt payoff" },
  { name: "Net Worth Calculator", href: "/financial/net-worth", icon: Wallet, description: "Calculate your total net worth" },
  { name: "Salary to Hourly", href: "/financial/salary-to-hourly", icon: Coins, description: "Convert salary to hourly rate" },
  { name: "Currency Converter", href: "/financial/currency", icon: ArrowLeftRight, description: "Convert between currencies" },
  { name: "Discount Calculator", href: "/financial/discount", icon: Percent, description: "Calculate sale prices and savings" },
];

export default function FinancialPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="border-b border-border/50 bg-gradient-to-b from-green-500/5 to-transparent">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="mb-4 bg-green-500/10 text-green-600 border-green-500/20">
              <DollarSign className="h-3 w-3 mr-1" />
              Financial Calculators
            </Badge>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Financial Calculators
            </h1>
            <p className="text-xl text-muted-foreground">
              Free calculators for mortgages, loans, savings, tips, and all your financial needs.
            </p>
          </div>
        </div>
      </section>

      {/* Calculators Grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {calculators.map((calc) => (
            <Link key={calc.href} href={calc.href}>
              <Card className="calculator-card p-5 h-full">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center flex-shrink-0">
                    <calc.icon className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{calc.name}</h3>
                    <p className="text-sm text-muted-foreground">{calc.description}</p>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
