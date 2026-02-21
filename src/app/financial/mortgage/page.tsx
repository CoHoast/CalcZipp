"use client";

import { useState, useEffect } from "react";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatCurrency, formatNumber } from "@/lib/utils";
import { Home, DollarSign, Percent, Calendar, PieChart } from "lucide-react";

export default function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState<string>("350000");
  const [downPayment, setDownPayment] = useState<string>("70000");
  const [downPaymentPercent, setDownPaymentPercent] = useState<string>("20");
  const [loanTerm, setLoanTerm] = useState<string>("30");
  const [interestRate, setInterestRate] = useState<string>("6.5");
  const [propertyTax, setPropertyTax] = useState<string>("3500");
  const [homeInsurance, setHomeInsurance] = useState<string>("1200");
  const [pmi, setPmi] = useState<string>("0");
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    // Auto-calculate PMI if down payment < 20%
    const price = parseFloat(homePrice) || 0;
    const down = parseFloat(downPayment) || 0;
    const percent = (down / price) * 100;
    if (percent < 20 && price > 0) {
      setPmi(String(Math.round((price - down) * 0.01 / 12)));
    } else {
      setPmi("0");
    }
  }, [homePrice, downPayment]);

  const handleDownPaymentChange = (value: string, isPercent: boolean) => {
    const price = parseFloat(homePrice) || 0;
    if (isPercent) {
      setDownPaymentPercent(value);
      setDownPayment(String(Math.round(price * (parseFloat(value) || 0) / 100)));
    } else {
      setDownPayment(value);
      if (price > 0) {
        setDownPaymentPercent(String(((parseFloat(value) || 0) / price * 100).toFixed(1)));
      }
    }
  };

  const calculate = () => {
    const price = parseFloat(homePrice) || 0;
    const down = parseFloat(downPayment) || 0;
    const years = parseFloat(loanTerm) || 30;
    const rate = parseFloat(interestRate) || 0;
    const tax = parseFloat(propertyTax) || 0;
    const insurance = parseFloat(homeInsurance) || 0;
    const monthlyPmi = parseFloat(pmi) || 0;

    const principal = price - down;
    const monthlyRate = rate / 100 / 12;
    const numPayments = years * 12;

    // Monthly P&I payment formula: M = P[r(1+r)^n]/[(1+r)^n-1]
    let monthlyPI = 0;
    if (monthlyRate > 0) {
      monthlyPI = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / 
                  (Math.pow(1 + monthlyRate, numPayments) - 1);
    } else {
      monthlyPI = principal / numPayments;
    }

    const monthlyTax = tax / 12;
    const monthlyInsurance = insurance / 12;
    const totalMonthly = monthlyPI + monthlyTax + monthlyInsurance + monthlyPmi;
    const totalInterest = (monthlyPI * numPayments) - principal;
    const totalCost = monthlyPI * numPayments + tax * years + insurance * years + monthlyPmi * numPayments;

    setResult({
      monthlyPayment: totalMonthly,
      principalAndInterest: monthlyPI,
      monthlyTax,
      monthlyInsurance,
      monthlyPmi,
      loanAmount: principal,
      totalInterest,
      totalCost,
      downPaymentPercent: (down / price * 100).toFixed(1),
    });
  };

  return (
    <CalculatorLayout
      title="Mortgage Calculator"
      description="Calculate your monthly mortgage payment including principal, interest, taxes, and insurance."
      category="Financial"
      categoryHref="/financial"
      icon={<Home className="h-3 w-3 mr-1" />}
      promoContext="financial"
      formula="M = P[r(1+r)^n]/[(1+r)^n-1] where M = monthly payment, P = principal, r = monthly interest rate, n = number of payments"
      howItWorks={`This calculator uses the standard mortgage amortization formula to calculate your monthly payment.

1. Enter the home price and your down payment
2. Set the loan term (typically 15 or 30 years)
3. Enter the current interest rate
4. Add annual property tax and insurance estimates
5. PMI is automatically calculated if down payment is less than 20%

The result shows your total monthly payment broken down by principal & interest, taxes, insurance, and PMI.`}
      faqs={[
        { question: "What is PMI?", answer: "Private Mortgage Insurance (PMI) is required when your down payment is less than 20% of the home price. It protects the lender if you default on the loan." },
        { question: "How much house can I afford?", answer: "A general rule is that your monthly housing costs should not exceed 28% of your gross monthly income." },
        { question: "Should I choose a 15 or 30 year mortgage?", answer: "A 15-year mortgage has higher monthly payments but lower total interest. A 30-year mortgage has lower payments but you'll pay more interest over time." },
      ]}
      relatedCalculators={[
        { name: "Loan Calculator", href: "/financial/loan" },
        { name: "Down Payment Calculator", href: "/financial/down-payment" },
        { name: "Compound Interest Calculator", href: "/financial/compound-interest" },
      ]}
    >
      <div className="space-y-6">
        {/* Inputs */}
        <div className="grid md:grid-cols-2 gap-4">
          <Input
            label="Home Price"
            type="number"
            prefix="$"
            value={homePrice}
            onChange={(e) => setHomePrice(e.target.value)}
            placeholder="350,000"
          />
          <div className="grid grid-cols-2 gap-2">
            <Input
              label="Down Payment"
              type="number"
              prefix="$"
              value={downPayment}
              onChange={(e) => handleDownPaymentChange(e.target.value, false)}
            />
            <Input
              label="&nbsp;"
              type="number"
              suffix="%"
              value={downPaymentPercent}
              onChange={(e) => handleDownPaymentChange(e.target.value, true)}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1.5">Loan Term</label>
            <div className="flex gap-2">
              {["15", "20", "30"].map((term) => (
                <Button
                  key={term}
                  variant={loanTerm === term ? "default" : "outline"}
                  className={loanTerm === term ? "brand-gradient text-white" : ""}
                  onClick={() => setLoanTerm(term)}
                >
                  {term} years
                </Button>
              ))}
            </div>
          </div>
          <Input
            label="Interest Rate"
            type="number"
            suffix="%"
            step="0.1"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
          />
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <Input
            label="Property Tax (yearly)"
            type="number"
            prefix="$"
            value={propertyTax}
            onChange={(e) => setPropertyTax(e.target.value)}
          />
          <Input
            label="Home Insurance (yearly)"
            type="number"
            prefix="$"
            value={homeInsurance}
            onChange={(e) => setHomeInsurance(e.target.value)}
          />
          <Input
            label="PMI (monthly)"
            type="number"
            prefix="$"
            value={pmi}
            onChange={(e) => setPmi(e.target.value)}
          />
        </div>

        <Button onClick={calculate} className="w-full brand-gradient text-white" size="lg">
          Calculate Payment
        </Button>

        {/* Results */}
        {result && (
          <div className="mt-8 pt-8 border-t border-border">
            <div className="text-center mb-6">
              <div className="text-sm text-muted-foreground mb-1">Monthly Payment</div>
              <div className="text-5xl font-bold brand-gradient-text">
                {formatCurrency(result.monthlyPayment)}
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <Card className="p-4 text-center">
                <div className="text-xs text-muted-foreground mb-1">Principal & Interest</div>
                <div className="font-semibold">{formatCurrency(result.principalAndInterest)}</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-xs text-muted-foreground mb-1">Property Tax</div>
                <div className="font-semibold">{formatCurrency(result.monthlyTax)}</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-xs text-muted-foreground mb-1">Insurance</div>
                <div className="font-semibold">{formatCurrency(result.monthlyInsurance)}</div>
              </Card>
              <Card className="p-4 text-center">
                <div className="text-xs text-muted-foreground mb-1">PMI</div>
                <div className="font-semibold">{formatCurrency(result.monthlyPmi)}</div>
              </Card>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <Card className="p-4">
                <div className="text-sm text-muted-foreground">Loan Amount</div>
                <div className="text-xl font-semibold">{formatCurrency(result.loanAmount)}</div>
              </Card>
              <Card className="p-4">
                <div className="text-sm text-muted-foreground">Total Interest</div>
                <div className="text-xl font-semibold">{formatCurrency(result.totalInterest)}</div>
              </Card>
              <Card className="p-4">
                <div className="text-sm text-muted-foreground">Total Cost</div>
                <div className="text-xl font-semibold">{formatCurrency(result.totalCost)}</div>
              </Card>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
