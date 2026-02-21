"use client";

import { useState } from "react";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { Receipt, Users } from "lucide-react";

export default function TipCalculator() {
  const [billAmount, setBillAmount] = useState<string>("50");
  const [tipPercent, setTipPercent] = useState<string>("18");
  const [numPeople, setNumPeople] = useState<string>("1");
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const bill = parseFloat(billAmount) || 0;
    const tip = parseFloat(tipPercent) || 0;
    const people = parseInt(numPeople) || 1;

    const tipAmount = bill * (tip / 100);
    const total = bill + tipAmount;
    const perPerson = total / people;
    const tipPerPerson = tipAmount / people;

    setResult({
      tipAmount,
      total,
      perPerson,
      tipPerPerson,
      billPerPerson: bill / people,
    });
  };

  const tipPresets = ["15", "18", "20", "25"];

  return (
    <CalculatorLayout
      title="Tip Calculator"
      description="Calculate tip amount and split the bill among friends easily."
      category="Financial"
      categoryHref="/financial"
      icon={<Receipt className="h-3 w-3 mr-1" />}
      promoContext="financial"
      formula="Tip = Bill × (Tip% / 100), Total = Bill + Tip, Per Person = Total / Number of People"
      howItWorks={`This calculator helps you figure out how much to tip and how to split the bill:

1. Enter the bill amount
2. Select a tip percentage (or enter a custom amount)
3. Enter the number of people splitting the bill
4. See the tip amount, total, and each person's share

Common tip percentages:
• 15% - Standard service
• 18% - Good service
• 20% - Great service
• 25% - Excellent service`}
      faqs={[
        { question: "How much should I tip?", answer: "In the US, 15-20% is standard for good service at restaurants. 18% is a common choice." },
        { question: "Should I tip on the pre-tax or post-tax amount?", answer: "Technically, you should tip on the pre-tax amount, but many people tip on the total for convenience." },
        { question: "Is it okay to not tip?", answer: "In the US, tips are a significant part of service workers' income. It's generally expected to tip unless service was extremely poor." },
      ]}
      relatedCalculators={[
        { name: "Split Bill Calculator", href: "/financial/split-bill" },
        { name: "Discount Calculator", href: "/financial/discount" },
        { name: "Percentage Calculator", href: "/math/percentage" },
      ]}
    >
      <div className="space-y-6">
        <Input
          label="Bill Amount"
          type="number"
          prefix="$"
          value={billAmount}
          onChange={(e) => setBillAmount(e.target.value)}
          placeholder="50.00"
        />

        <div>
          <label className="block text-sm font-medium mb-2">Tip Percentage</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {tipPresets.map((preset) => (
              <Button
                key={preset}
                variant={tipPercent === preset ? "default" : "outline"}
                className={tipPercent === preset ? "brand-gradient text-white" : ""}
                onClick={() => setTipPercent(preset)}
              >
                {preset}%
              </Button>
            ))}
          </div>
          <Input
            type="number"
            suffix="%"
            value={tipPercent}
            onChange={(e) => setTipPercent(e.target.value)}
            placeholder="Custom"
          />
        </div>

        <Input
          label="Number of People"
          type="number"
          value={numPeople}
          onChange={(e) => setNumPeople(e.target.value)}
          min="1"
        />

        <Button onClick={calculate} className="w-full brand-gradient text-white" size="lg">
          Calculate Tip
        </Button>

        {result && (
          <div className="mt-8 pt-8 border-t border-border">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="text-center p-6 bg-muted rounded-xl">
                <div className="text-sm text-muted-foreground mb-1">Tip Amount</div>
                <div className="text-4xl font-bold brand-gradient-text">
                  {formatCurrency(result.tipAmount)}
                </div>
              </div>
              <div className="text-center p-6 bg-muted rounded-xl">
                <div className="text-sm text-muted-foreground mb-1">Total Bill</div>
                <div className="text-4xl font-bold brand-gradient-text">
                  {formatCurrency(result.total)}
                </div>
              </div>
            </div>

            {parseInt(numPeople) > 1 && (
              <div className="mt-6">
                <div className="flex items-center gap-2 mb-4">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Split between {numPeople} people</span>
                </div>
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="p-4 text-center">
                    <div className="text-xs text-muted-foreground mb-1">Bill Per Person</div>
                    <div className="font-semibold text-lg">{formatCurrency(result.billPerPerson)}</div>
                  </Card>
                  <Card className="p-4 text-center">
                    <div className="text-xs text-muted-foreground mb-1">Tip Per Person</div>
                    <div className="font-semibold text-lg">{formatCurrency(result.tipPerPerson)}</div>
                  </Card>
                  <Card className="p-4 text-center bg-primary/5 border-primary/20">
                    <div className="text-xs text-muted-foreground mb-1">Total Per Person</div>
                    <div className="font-semibold text-lg text-primary">{formatCurrency(result.perPerson)}</div>
                  </Card>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
