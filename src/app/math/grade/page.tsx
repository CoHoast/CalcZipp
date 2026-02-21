"use client";

import { useState } from "react";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";
import { Hash, Target, TrendingUp } from "lucide-react";

export default function GradeCalculator() {
  const [mode, setMode] = useState<"final" | "current">("final");
  
  // What grade do I need on final?
  const [currentGrade, setCurrentGrade] = useState<string>("85");
  const [desiredGrade, setDesiredGrade] = useState<string>("90");
  const [finalWeight, setFinalWeight] = useState<string>("20");
  const [finalResult, setFinalResult] = useState<any>(null);

  // Current grade calculator
  const [assignments, setAssignments] = useState([
    { name: "Midterm", score: "88", weight: "25" },
    { name: "Homework", score: "95", weight: "20" },
    { name: "Project", score: "90", weight: "15" },
  ]);
  const [currentResult, setCurrentResult] = useState<any>(null);

  const calculateFinal = () => {
    const current = parseFloat(currentGrade) || 0;
    const desired = parseFloat(desiredGrade) || 0;
    const weight = parseFloat(finalWeight) || 0;

    if (weight <= 0 || weight > 100) return;

    // Formula: needed = (desired - current * (1 - weight/100)) / (weight/100)
    const currentWeight = (100 - weight) / 100;
    const finalWeightDecimal = weight / 100;
    const needed = (desired - current * currentWeight) / finalWeightDecimal;

    setFinalResult({
      needed: Math.max(0, needed),
      possible: needed <= 100,
      current,
      desired,
      weight,
    });
  };

  const addAssignment = () => {
    setAssignments([...assignments, { name: `Assignment ${assignments.length + 1}`, score: "", weight: "" }]);
  };

  const removeAssignment = (index: number) => {
    setAssignments(assignments.filter((_, i) => i !== index));
  };

  const updateAssignment = (index: number, field: string, value: string) => {
    const updated = [...assignments];
    updated[index] = { ...updated[index], [field]: value };
    setAssignments(updated);
  };

  const calculateCurrent = () => {
    let totalWeightedScore = 0;
    let totalWeight = 0;

    assignments.forEach((assignment) => {
      const score = parseFloat(assignment.score) || 0;
      const weight = parseFloat(assignment.weight) || 0;
      totalWeightedScore += score * weight;
      totalWeight += weight;
    });

    const currentGrade = totalWeight > 0 ? totalWeightedScore / totalWeight : 0;
    const letterGrade = getLetterGrade(currentGrade);

    setCurrentResult({
      grade: currentGrade,
      letterGrade,
      totalWeight,
      remaining: 100 - totalWeight,
    });
  };

  const getLetterGrade = (score: number): string => {
    if (score >= 93) return "A";
    if (score >= 90) return "A-";
    if (score >= 87) return "B+";
    if (score >= 83) return "B";
    if (score >= 80) return "B-";
    if (score >= 77) return "C+";
    if (score >= 73) return "C";
    if (score >= 70) return "C-";
    if (score >= 67) return "D+";
    if (score >= 63) return "D";
    if (score >= 60) return "D-";
    return "F";
  };

  return (
    <CalculatorLayout
      title="Grade Calculator"
      description="Calculate what grade you need on your final exam or find your current class grade."
      category="Math"
      categoryHref="/math"
      icon={<Hash className="h-3 w-3 mr-1" />}
      promoContext="math"
      howItWorks={`This calculator helps you in two ways:

1. **Final Grade Calculator** - Find out what score you need on your final exam to achieve your desired grade.

2. **Current Grade Calculator** - Calculate your current weighted average based on completed assignments.

Formula for final grade needed:
Needed = (Desired - Current × (1 - FinalWeight)) / FinalWeight`}
      faqs={[
        { question: "How is my grade calculated?", answer: "Your grade is the weighted average of all assignments. Each assignment's contribution = (Score × Weight) / Total Weight." },
        { question: "What if I need more than 100% on the final?", answer: "If the calculator shows you need more than 100%, you mathematically cannot reach your desired grade with your current standing." },
        { question: "What's a typical final exam weight?", answer: "Finals typically range from 15-30% of your total grade. Check your syllabus for the exact weight." },
      ]}
      relatedCalculators={[
        { name: "GPA Calculator", href: "/math/gpa" },
        { name: "Percentage Calculator", href: "/math/percentage" },
        { name: "Average Calculator", href: "/math/average" },
      ]}
    >
      <div className="space-y-6">
        {/* Mode Toggle */}
        <div className="flex gap-2">
          <Button
            variant={mode === "final" ? "default" : "outline"}
            className={mode === "final" ? "brand-gradient text-white flex-1" : "flex-1"}
            onClick={() => setMode("final")}
          >
            <Target className="h-4 w-4 mr-2" />
            What Grade Do I Need?
          </Button>
          <Button
            variant={mode === "current" ? "default" : "outline"}
            className={mode === "current" ? "brand-gradient text-white flex-1" : "flex-1"}
            onClick={() => setMode("current")}
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Current Grade
          </Button>
        </div>

        {/* Final Grade Calculator */}
        {mode === "final" && (
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-medium mb-4">What grade do I need on my final?</h3>
              <div className="space-y-4">
                <Input
                  label="Current Grade (%)"
                  type="number"
                  suffix="%"
                  value={currentGrade}
                  onChange={(e) => setCurrentGrade(e.target.value)}
                  placeholder="85"
                />
                <Input
                  label="Desired Final Grade (%)"
                  type="number"
                  suffix="%"
                  value={desiredGrade}
                  onChange={(e) => setDesiredGrade(e.target.value)}
                  placeholder="90"
                />
                <Input
                  label="Final Exam Weight (%)"
                  type="number"
                  suffix="%"
                  value={finalWeight}
                  onChange={(e) => setFinalWeight(e.target.value)}
                  placeholder="20"
                />
              </div>
            </Card>

            <Button onClick={calculateFinal} className="w-full brand-gradient text-white" size="lg">
              Calculate Needed Grade
            </Button>

            {finalResult && (
              <div className="mt-8 pt-8 border-t border-border">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground mb-2">
                    To get a {finalResult.desired}% in the class, you need:
                  </div>
                  <div className={`text-6xl font-bold ${finalResult.possible ? 'brand-gradient-text' : 'text-red-500'}`}>
                    {formatNumber(finalResult.needed, 1)}%
                  </div>
                  <div className="text-sm text-muted-foreground mt-2">on your final exam</div>
                  
                  {!finalResult.possible && (
                    <Card className="mt-4 p-4 bg-red-50 border-red-200">
                      <p className="text-red-600 text-sm">
                        ⚠️ You would need more than 100% on your final. This goal isn't achievable with your current grade.
                      </p>
                    </Card>
                  )}
                  
                  {finalResult.possible && finalResult.needed > 90 && (
                    <Card className="mt-4 p-4 bg-amber-50 border-amber-200">
                      <p className="text-amber-600 text-sm">
                        ⚠️ This is a challenging goal. Make sure to study hard!
                      </p>
                    </Card>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Current Grade Calculator */}
        {mode === "current" && (
          <div className="space-y-4">
            {assignments.map((assignment, index) => (
              <Card key={index} className="p-4">
                <div className="flex gap-3 items-end">
                  <div className="flex-1">
                    <label className="block text-xs text-muted-foreground mb-1">Assignment</label>
                    <input
                      className="w-full h-10 px-3 rounded-lg border border-input bg-background"
                      value={assignment.name}
                      onChange={(e) => updateAssignment(index, "name", e.target.value)}
                    />
                  </div>
                  <div className="w-24">
                    <label className="block text-xs text-muted-foreground mb-1">Score (%)</label>
                    <input
                      type="number"
                      className="w-full h-10 px-3 rounded-lg border border-input bg-background"
                      value={assignment.score}
                      onChange={(e) => updateAssignment(index, "score", e.target.value)}
                    />
                  </div>
                  <div className="w-24">
                    <label className="block text-xs text-muted-foreground mb-1">Weight (%)</label>
                    <input
                      type="number"
                      className="w-full h-10 px-3 rounded-lg border border-input bg-background"
                      value={assignment.weight}
                      onChange={(e) => updateAssignment(index, "weight", e.target.value)}
                    />
                  </div>
                  {assignments.length > 1 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeAssignment(index)}
                      className="text-red-500 hover:text-red-600"
                    >
                      ×
                    </Button>
                  )}
                </div>
              </Card>
            ))}

            <Button variant="outline" onClick={addAssignment} className="w-full">
              + Add Assignment
            </Button>

            <Button onClick={calculateCurrent} className="w-full brand-gradient text-white" size="lg">
              Calculate Current Grade
            </Button>

            {currentResult && (
              <div className="mt-8 pt-8 border-t border-border">
                <div className="text-center mb-6">
                  <div className="text-sm text-muted-foreground mb-2">Your Current Grade</div>
                  <div className="text-6xl font-bold brand-gradient-text">
                    {formatNumber(currentResult.grade, 1)}%
                  </div>
                  <div className="text-2xl font-semibold text-muted-foreground mt-2">
                    {currentResult.letterGrade}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Card className="p-4 text-center">
                    <div className="text-xs text-muted-foreground mb-1">Weight Completed</div>
                    <div className="font-semibold text-lg">{formatNumber(currentResult.totalWeight)}%</div>
                  </Card>
                  <Card className="p-4 text-center">
                    <div className="text-xs text-muted-foreground mb-1">Weight Remaining</div>
                    <div className="font-semibold text-lg">{formatNumber(currentResult.remaining)}%</div>
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
