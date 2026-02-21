"use client";
import { useState } from "react";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { Wallet, Plus, Minus } from "lucide-react";

export default function NetWorthCalculator() {
  const [assets, setAssets] = useState({ cash: "5000", savings: "10000", investments: "25000", retirement: "50000", home: "300000", vehicles: "20000", other: "5000" });
  const [liabilities, setLiabilities] = useState({ mortgage: "250000", carLoans: "15000", studentLoans: "20000", creditCards: "3000", other: "0" });
  const [result, setResult] = useState<any>(null);

  const calculate = () => {
    const totalAssets = Object.values(assets).reduce((sum, v) => sum + (parseFloat(v) || 0), 0);
    const totalLiabilities = Object.values(liabilities).reduce((sum, v) => sum + (parseFloat(v) || 0), 0);
    const netWorth = totalAssets - totalLiabilities;
    setResult({ totalAssets, totalLiabilities, netWorth });
  };

  return (
    <CalculatorLayout title="Net Worth Calculator" description="Calculate your total net worth by subtracting liabilities from assets." category="Financial" categoryHref="/financial" icon={<Wallet className="h-3 w-3 mr-1" />} promoContext="financial" formula="Net Worth = Total Assets - Total Liabilities" relatedCalculators={[{ name: "Savings Calculator", href: "/financial/savings" }, { name: "Retirement Calculator", href: "/financial/retirement" }]}>
      <div className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-4">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><Plus className="h-4 w-4 text-green-500" />Assets</h3>
            <div className="space-y-3">
              <Input label="Cash" type="number" prefix="$" value={assets.cash} onChange={(e) => setAssets({...assets, cash: e.target.value})} />
              <Input label="Savings" type="number" prefix="$" value={assets.savings} onChange={(e) => setAssets({...assets, savings: e.target.value})} />
              <Input label="Investments" type="number" prefix="$" value={assets.investments} onChange={(e) => setAssets({...assets, investments: e.target.value})} />
              <Input label="Retirement (401k, IRA)" type="number" prefix="$" value={assets.retirement} onChange={(e) => setAssets({...assets, retirement: e.target.value})} />
              <Input label="Home Value" type="number" prefix="$" value={assets.home} onChange={(e) => setAssets({...assets, home: e.target.value})} />
              <Input label="Vehicles" type="number" prefix="$" value={assets.vehicles} onChange={(e) => setAssets({...assets, vehicles: e.target.value})} />
              <Input label="Other Assets" type="number" prefix="$" value={assets.other} onChange={(e) => setAssets({...assets, other: e.target.value})} />
            </div>
          </Card>
          <Card className="p-4">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><Minus className="h-4 w-4 text-red-500" />Liabilities</h3>
            <div className="space-y-3">
              <Input label="Mortgage" type="number" prefix="$" value={liabilities.mortgage} onChange={(e) => setLiabilities({...liabilities, mortgage: e.target.value})} />
              <Input label="Car Loans" type="number" prefix="$" value={liabilities.carLoans} onChange={(e) => setLiabilities({...liabilities, carLoans: e.target.value})} />
              <Input label="Student Loans" type="number" prefix="$" value={liabilities.studentLoans} onChange={(e) => setLiabilities({...liabilities, studentLoans: e.target.value})} />
              <Input label="Credit Cards" type="number" prefix="$" value={liabilities.creditCards} onChange={(e) => setLiabilities({...liabilities, creditCards: e.target.value})} />
              <Input label="Other Debts" type="number" prefix="$" value={liabilities.other} onChange={(e) => setLiabilities({...liabilities, other: e.target.value})} />
            </div>
          </Card>
        </div>
        <Button onClick={calculate} className="w-full brand-gradient text-white" size="lg">Calculate Net Worth</Button>
        {result && (
          <div className="mt-8 pt-8 border-t">
            <div className="text-center mb-6">
              <div className="text-sm text-muted-foreground mb-1">Your Net Worth</div>
              <div className={`text-5xl font-bold ${result.netWorth >= 0 ? 'brand-gradient-text' : 'text-red-500'}`}>{formatCurrency(result.netWorth)}</div>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="p-4 text-center border-green-200 bg-green-50"><div className="text-xs text-green-600">Total Assets</div><div className="font-semibold text-lg text-green-600">{formatCurrency(result.totalAssets)}</div></Card>
              <Card className="p-4 text-center border-red-200 bg-red-50"><div className="text-xs text-red-600">Total Liabilities</div><div className="font-semibold text-lg text-red-600">{formatCurrency(result.totalLiabilities)}</div></Card>
            </div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
