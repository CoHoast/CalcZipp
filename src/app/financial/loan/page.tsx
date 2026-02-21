"use client";

import { useState } from "react";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { CreditCard } from "lucide-react";

export default function LoanCalculator() {
  const [loanAmount, setLoanAmount] = useState<string>("10000");
  const [interestRate, setInterestRate] = useState<string>("7");
  const [loanTerm, setLoanTerm] = useState<string>("36");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const principal = parseFloat(loanAmount) || 0;
    const rate = parseFloat(interestRate) || 0;
    const months = parseInt(loanTerm) || 1;

    const monthlyRate = rate / 100 / 12;
    let monthlyPayment = 0;

    if (monthlyRate > 0) {
      monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / 
                       (Math.pow(1 + monthlyRate, months) - 1);
    } else {
      monthlyPayment = principal / months;
    }

    const totalPayment = monthlyPayment * months;
    const totalInterest = totalPayment - principal;

    setResult({
      monthlyPayment,
      totalPayment,
      totalInterest,
      principal,
    });
  };

  return (
    <CalculatorLayout
      title="Loan Calculator"
      description="Calculate monthly loan payments, total interest, and total cost for any loan."
      category="Financial"
      categoryHref="/financial"
      icon={<CreditCard className="h-3 w-3 mr-1" />}
      promoContext="financial"
      formula="M = P[r(1+r)^n]/[(1+r)^n-1]"
      howItWorks={`Enter your loan details to calculate the monthly payment:

1. Loan Amount - The total amount you're borrowing
2. Interest Rate - Annual interest rate (APR)
3. Loan Term - How long to repay in months

The calculator uses standard amortization to determine your fixed monthly payment.`}
      faqs={[
        { question: "What's the difference between APR and interest rate?", answer: "APR includes fees and other costs, while the interest rate is just the cost of borrowing. APR gives a more complete picture of loan cost." },
        { question: "How can I pay off my loan faster?", answer: "Make extra payments toward principal, pay bi-weekly instead of monthly, or refinance to a shorter term." },
      ]}
      relatedCalculators={[
        { name: "Auto Loan Calculator", href: "/financial/auto-loan" },
        { name: "Mortgage Calculator", href: "/financial/mortgage" },
        { name: "Credit Card Payoff", href: "/financial/credit-card-payoff" },
      ]}
    >
      <div className="space-y-6">
        <Input
          label="Loan Amount"
          type="number"
          prefix="$"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
        />
        <Input
          label="Interest Rate (APR)"
          type="number"
          suffix="%"
          step="0.1"
          value={interestRate}
          onChange={(e) => setInterestRate(e.target.value)}
        />
        <Input
          label="Loan Term (months)"
          type="number"
          suffix="months"
          value={loanTerm}
          onChange={(e) => setLoanTerm(e.target.value)}
        />

        <Button onClick={calculate} className="w-full brand-gradient text-white" size="lg">
          Calculate Payment
        </Button>

        {result && (
          <div className="mt-8 pt-8 border-t border-border">
            <div className="text-center mb-6">
              <div className="text-sm text-muted-foreground mb-1">Monthly Payment</div>
              <div className="text-5xl font-bold brand-gradient-text">
                {formatCurrency(result.monthlyPayment)}
              </div>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="p-4 text-center">
                <div className="text-xs text-muted-foreground mb-1">Principal</div>
                <div className="font-semibold text-lg">{formatCurrency(result.principal)}</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-xs text-muted-foreground mb-1">Total Interest</div>
                <div className="font-semibold text-lg">{formatCurrency(result.totalInterest)}</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-xs text-muted-foreground mb-1">Total Payment</div>
                <div className="font-semibold text-lg">{formatCurrency(result.totalPayment)}</div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
