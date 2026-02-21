"use client";
import { useState } from "react";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { CreditCard } from "lucide-react";

export default function CreditCardPayoffCalculator() {
  const [balance, setBalance] = useState<string>("5000");
  const [apr, setApr] = useState<string>("19.99");
  const [payment, setPayment] = useState<string>("150");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const b = parseFloat(balance) || 0;
    const r = (parseFloat(apr) || 0) / 100 / 12;
    const pmt = parseFloat(payment) || 0;
    
    if (pmt <= b * r) {
      setResult({ error: "Payment too low to pay off debt" });
      return;
    }
    
    let remaining = b;
    let months = 0;
    let totalInterest = 0;
    
    while (remaining > 0 && months < 600) {
      const interest = remaining * r;
      totalInterest += interest;
      remaining = remaining + interest - pmt;
      months++;
    }
    
    const totalPaid = pmt * months;
    const years = Math.floor(months / 12);
    const remMonths = months % 12;
    
    setResult({ months, years, remMonths, totalPaid, totalInterest, payoffDate: new Date(Date.now() + months * 30.44 * 24 * 60 * 60 * 1000).toLocaleDateString("en-US", { month: "long", year: "numeric" }) });
  };

  return (
    <CalculatorLayout title="Credit Card Payoff Calculator" description="Calculate how long it will take to pay off your credit card and total interest paid." category="Financial" categoryHref="/financial" icon={<CreditCard className="h-3 w-3 mr-1" />} promoContext="financial" relatedCalculators={[{ name: "Loan Calculator", href: "/financial/loan" }, { name: "Net Worth Calculator", href: "/financial/net-worth" }]}>
      <div className="space-y-6">
        <Input label="Credit Card Balance" type="number" prefix="$" value={balance} onChange={(e) => setBalance(e.target.value)} />
        <Input label="Annual Interest Rate (APR)" type="number" suffix="%" value={apr} onChange={(e) => setApr(e.target.value)} />
        <Input label="Monthly Payment" type="number" prefix="$" value={payment} onChange={(e) => setPayment(e.target.value)} />
        <Button onClick={calculate} className="w-full brand-gradient text-white" size="lg">Calculate Payoff</Button>
        {result && !result.error && (
          <div className="mt-8 pt-8 border-t">
            <div className="text-center mb-6">
              <div className="text-sm text-muted-foreground mb-1">Debt-Free Date</div>
              <div className="text-4xl font-bold brand-gradient-text">{result.payoffDate}</div>
              <div className="text-muted-foreground">{result.years > 0 ? `${result.years} year${result.years !== 1 ? 's' : ''} ` : ''}{result.remMonths} month{result.remMonths !== 1 ? 's' : ''}</div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="p-4 text-center"><div className="text-xs text-muted-foreground">Total Paid</div><div className="font-semibold text-lg">{formatCurrency(result.totalPaid)}</div></Card>
              <Card className="p-4 text-center border-red-200 bg-red-50"><div className="text-xs text-red-600">Total Interest</div><div className="font-semibold text-lg text-red-600">{formatCurrency(result.totalInterest)}</div></Card>
            </div>
          </div>
        )}
        {result?.error && (
          <Card className="p-4 text-center border-red-200 bg-red-50"><div className="text-red-600">{result.error}</div></Card>
        )}
      </div>
    </CalculatorLayout>
  );
}
