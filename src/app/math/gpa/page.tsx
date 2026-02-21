"use client";
import { useState } from "react";
import { CalculatorLayout } from "@/components/calculators/calculator-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatNumber } from "@/lib/utils";
import { BarChart, Plus, Trash2 } from "lucide-react";

const gradePoints: Record<string, number> = { "A+": 4.0, "A": 4.0, "A-": 3.7, "B+": 3.3, "B": 3.0, "B-": 2.7, "C+": 2.3, "C": 2.0, "C-": 1.7, "D+": 1.3, "D": 1.0, "D-": 0.7, "F": 0.0 };

export default function GPACalculator() {
  const [courses, setCourses] = useState([{ name: "Course 1", grade: "A", credits: "3" }, { name: "Course 2", grade: "B+", credits: "3" }]);
  const [result, setResult] = useState<number | null>(null);

  const addCourse = () => setCourses([...courses, { name: `Course ${courses.length + 1}`, grade: "A", credits: "3" }]);
  const removeCourse = (index: number) => setCourses(courses.filter((_, i) => i !== index));
  const updateCourse = (index: number, field: string, value: string) => {
    const updated = [...courses];
    updated[index] = { ...updated[index], [field]: value };
    setCourses(updated);
  };

  const calculate = () => {
    let totalPoints = 0, totalCredits = 0;
    courses.forEach(course => {
      const credits = parseFloat(course.credits) || 0;
      const points = gradePoints[course.grade] || 0;
      totalPoints += points * credits;
      totalCredits += credits;
    });
    setResult(totalCredits > 0 ? totalPoints / totalCredits : 0);
  };

  return (
    <CalculatorLayout title="GPA Calculator" description="Calculate your Grade Point Average (GPA) for the semester or cumulative." category="Math" categoryHref="/math" icon={<BarChart className="h-3 w-3 mr-1" />} promoContext="math" howItWorks="Add your courses with grades and credit hours. GPA is calculated as: Total Grade Points / Total Credits.\n\nGrade scale: A/A+ = 4.0, A- = 3.7, B+ = 3.3, B = 3.0, etc." relatedCalculators={[{ name: "Grade Calculator", href: "/math/grade" }, { name: "Percentage Calculator", href: "/math/percentage" }]}>
      <div className="space-y-4">
        {courses.map((course, index) => (
          <Card key={index} className="p-4">
            <div className="flex gap-3 items-end">
              <div className="flex-1">
                <label className="block text-xs text-muted-foreground mb-1">Course</label>
                <input className="w-full h-10 px-3 rounded-lg border border-input bg-background" value={course.name} onChange={(e) => updateCourse(index, "name", e.target.value)} />
              </div>
              <div className="w-24">
                <label className="block text-xs text-muted-foreground mb-1">Grade</label>
                <select className="w-full h-10 px-2 rounded-lg border border-input bg-background" value={course.grade} onChange={(e) => updateCourse(index, "grade", e.target.value)}>
                  {Object.keys(gradePoints).map(g => <option key={g} value={g}>{g}</option>)}
                </select>
              </div>
              <div className="w-20">
                <label className="block text-xs text-muted-foreground mb-1">Credits</label>
                <input type="number" className="w-full h-10 px-3 rounded-lg border border-input bg-background" value={course.credits} onChange={(e) => updateCourse(index, "credits", e.target.value)} />
              </div>
              {courses.length > 1 && <Button variant="ghost" size="icon" onClick={() => removeCourse(index)}><Trash2 className="h-4 w-4 text-red-500" /></Button>}
            </div>
          </Card>
        ))}
        <Button variant="outline" onClick={addCourse} className="w-full"><Plus className="h-4 w-4 mr-2" />Add Course</Button>
        <Button onClick={calculate} className="w-full brand-gradient text-white" size="lg">Calculate GPA</Button>
        {result !== null && (
          <div className="mt-8 pt-8 border-t text-center">
            <div className="text-sm text-muted-foreground mb-1">Your GPA</div>
            <div className="text-6xl font-bold brand-gradient-text">{formatNumber(result, 2)}</div>
            <div className="text-sm text-muted-foreground mt-2">{result >= 3.5 ? "Dean's List! 🎉" : result >= 3.0 ? "Good standing" : result >= 2.0 ? "Satisfactory" : "Needs improvement"}</div>
          </div>
        )}
      </div>
    </CalculatorLayout>
  );
}
