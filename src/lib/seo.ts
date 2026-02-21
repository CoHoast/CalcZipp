import { Metadata } from "next";

const baseUrl = "https://www.calczipp.com";

export function generateCalculatorMetadata({
  title,
  description,
  keywords,
  path,
}: {
  title: string;
  description: string;
  keywords: string[];
  path: string;
}): Metadata {
  const fullTitle = `${title} | CalcZipp`;
  const url = `${baseUrl}${path}`;

  return {
    title,
    description,
    keywords: [
      ...keywords,
      "free calculator",
      "online calculator",
      "CalcZipp",
    ],
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: "CalcZipp",
      type: "website",
      images: [
        {
          url: `${baseUrl}/og-image.png`,
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [`${baseUrl}/og-image.png`],
    },
    alternates: {
      canonical: url,
    },
  };
}

// Calculator-specific JSON-LD
export function generateCalculatorJsonLd({
  name,
  description,
  url,
}: {
  name: string;
  description: string;
  url: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    url: `${baseUrl}${url}`,
    description,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  };
}

// SEO data for all calculators
export const calculatorSEO = {
  // Financial
  mortgage: {
    title: "Free Mortgage Calculator - Monthly Payment & Amortization",
    description:
      "Calculate your monthly mortgage payment, total interest, and view amortization schedule. Includes property tax, insurance, and PMI. Free, no signup required.",
    keywords: [
      "mortgage calculator",
      "home loan calculator",
      "mortgage payment calculator",
      "house payment calculator",
      "amortization calculator",
      "monthly mortgage payment",
      "mortgage interest calculator",
    ],
    path: "/financial/mortgage/",
  },
  loan: {
    title: "Free Loan Calculator - Payment & Interest Calculator",
    description:
      "Calculate loan payments, total interest, and payoff date. Works for personal loans, car loans, and more. Free online loan calculator.",
    keywords: [
      "loan calculator",
      "loan payment calculator",
      "personal loan calculator",
      "interest calculator",
      "loan payoff calculator",
    ],
    path: "/financial/loan/",
  },
  tip: {
    title: "Free Tip Calculator - Calculate Tip & Split Bill",
    description:
      "Quickly calculate tip amount and split the bill. Choose tip percentage or enter custom amount. Free tip calculator for restaurants.",
    keywords: [
      "tip calculator",
      "tip calculator restaurant",
      "gratuity calculator",
      "split bill calculator",
      "how much to tip",
    ],
    path: "/financial/tip/",
  },
  compoundInterest: {
    title: "Free Compound Interest Calculator - Investment Growth",
    description:
      "Calculate compound interest and see how your money grows over time. Daily, monthly, or yearly compounding. Free investment calculator.",
    keywords: [
      "compound interest calculator",
      "investment calculator",
      "interest calculator",
      "compound growth calculator",
      "savings growth calculator",
    ],
    path: "/financial/compound-interest/",
  },
  salary: {
    title: "Free Salary Calculator - Annual, Monthly, Hourly Conversion",
    description:
      "Convert salary between annual, monthly, weekly, and hourly rates. Calculate take-home pay after taxes. Free salary calculator.",
    keywords: [
      "salary calculator",
      "hourly to salary",
      "annual salary calculator",
      "paycheck calculator",
      "wage calculator",
    ],
    path: "/financial/salary/",
  },

  // Health
  bmi: {
    title: "Free BMI Calculator - Body Mass Index Calculator",
    description:
      "Calculate your Body Mass Index (BMI) and see what it means. Supports imperial and metric units. Free BMI calculator with health categories.",
    keywords: [
      "BMI calculator",
      "body mass index calculator",
      "BMI calculator kg",
      "BMI calculator lbs",
      "am I overweight",
      "healthy weight calculator",
    ],
    path: "/health/bmi/",
  },
  calorie: {
    title: "Free Calorie Calculator - Daily Calorie Needs (TDEE)",
    description:
      "Calculate your daily calorie needs based on age, weight, height, and activity level. Uses Mifflin-St Jeor equation. Free TDEE calculator.",
    keywords: [
      "calorie calculator",
      "TDEE calculator",
      "daily calorie calculator",
      "how many calories do I need",
      "calorie intake calculator",
      "metabolism calculator",
    ],
    path: "/health/calorie/",
  },
  bodyFat: {
    title: "Free Body Fat Calculator - Navy Method",
    description:
      "Calculate your body fat percentage using the U.S. Navy method. Requires neck, waist, and hip measurements. Free body fat calculator.",
    keywords: [
      "body fat calculator",
      "body fat percentage calculator",
      "navy body fat calculator",
      "fat percentage calculator",
    ],
    path: "/health/body-fat/",
  },
  macro: {
    title: "Free Macro Calculator - Protein, Carbs, Fat Calculator",
    description:
      "Calculate your daily macronutrient needs for weight loss, maintenance, or muscle gain. Free macro calculator with custom ratios.",
    keywords: [
      "macro calculator",
      "macronutrient calculator",
      "protein calculator",
      "carb calculator",
      "fat calculator",
      "IIFYM calculator",
    ],
    path: "/health/macro/",
  },

  // Math
  percentage: {
    title: "Free Percentage Calculator - Calculate Percentages",
    description:
      "Calculate percentages easily. What is X% of Y? X is what percent of Y? Percentage increase/decrease. Free percentage calculator.",
    keywords: [
      "percentage calculator",
      "percent calculator",
      "percentage increase calculator",
      "percentage decrease calculator",
      "how to calculate percentage",
    ],
    path: "/math/percentage/",
  },
  gpa: {
    title: "Free GPA Calculator - Calculate Your Grade Point Average",
    description:
      "Calculate your GPA using letter grades or percentages. Supports 4.0 scale. Free GPA calculator for college and high school.",
    keywords: [
      "GPA calculator",
      "grade point average calculator",
      "college GPA calculator",
      "cumulative GPA calculator",
      "calculate my GPA",
    ],
    path: "/math/gpa/",
  },
  grade: {
    title: "Free Grade Calculator - Final Grade Calculator",
    description:
      "Calculate what grade you need on your final exam to get your desired grade. Weighted grade calculator included. Free grade calculator.",
    keywords: [
      "grade calculator",
      "final grade calculator",
      "what grade do I need",
      "weighted grade calculator",
      "class grade calculator",
    ],
    path: "/math/grade/",
  },

  // Date & Time
  age: {
    title: "Free Age Calculator - Calculate Exact Age",
    description:
      "Calculate your exact age in years, months, and days. Find out when your next birthday is and what day you were born. Free age calculator.",
    keywords: [
      "age calculator",
      "how old am I",
      "birthday calculator",
      "exact age calculator",
      "age in days calculator",
    ],
    path: "/date-time/age/",
  },
  dateDifference: {
    title: "Free Date Difference Calculator - Days Between Dates",
    description:
      "Calculate the number of days, weeks, months, and years between two dates. Free date difference calculator.",
    keywords: [
      "date difference calculator",
      "days between dates",
      "date calculator",
      "how many days until",
      "days calculator",
    ],
    path: "/date-time/date-difference/",
  },
  countdown: {
    title: "Free Countdown Calculator - Days Until Date",
    description:
      "Calculate how many days, hours, minutes until a specific date. Countdown to holidays, events, and more. Free countdown calculator.",
    keywords: [
      "countdown calculator",
      "days until calculator",
      "countdown timer",
      "how many days until",
      "event countdown",
    ],
    path: "/date-time/countdown/",
  },

  // Converters
  temperature: {
    title: "Free Temperature Converter - Celsius, Fahrenheit, Kelvin",
    description:
      "Convert temperatures between Celsius, Fahrenheit, and Kelvin. Free temperature converter with instant results.",
    keywords: [
      "temperature converter",
      "celsius to fahrenheit",
      "fahrenheit to celsius",
      "kelvin converter",
      "temperature calculator",
    ],
    path: "/converters/temperature/",
  },
  length: {
    title: "Free Length Converter - Feet, Meters, Inches, cm",
    description:
      "Convert length and distance units. Feet, meters, inches, centimeters, miles, kilometers, and more. Free length converter.",
    keywords: [
      "length converter",
      "feet to meters",
      "inches to cm",
      "miles to km",
      "unit converter",
      "distance converter",
    ],
    path: "/converters/length/",
  },
  weight: {
    title: "Free Weight Converter - Pounds, Kilograms, Ounces",
    description:
      "Convert weight units. Pounds, kilograms, ounces, grams, and more. Free weight and mass converter.",
    keywords: [
      "weight converter",
      "pounds to kg",
      "kg to lbs",
      "ounces to grams",
      "mass converter",
    ],
    path: "/converters/weight/",
  },

  // Home & DIY
  paint: {
    title: "Free Paint Calculator - How Much Paint Do I Need?",
    description:
      "Calculate how much paint you need for your room. Enter dimensions, get gallons needed. Accounts for doors and windows. Free paint calculator.",
    keywords: [
      "paint calculator",
      "how much paint do I need",
      "wall paint calculator",
      "room paint calculator",
      "paint coverage calculator",
    ],
    path: "/home/paint/",
  },
  squareFootage: {
    title: "Free Square Footage Calculator - Calculate Area",
    description:
      "Calculate square footage for rooms, yards, and properties. Supports rectangles, circles, and complex shapes. Free square footage calculator.",
    keywords: [
      "square footage calculator",
      "area calculator",
      "square feet calculator",
      "room size calculator",
      "sqft calculator",
    ],
    path: "/home/square-footage/",
  },
  flooring: {
    title: "Free Flooring Calculator - How Much Flooring Do I Need?",
    description:
      "Calculate how much flooring material you need. Includes waste factor. Works for hardwood, tile, laminate. Free flooring calculator.",
    keywords: [
      "flooring calculator",
      "how much flooring do I need",
      "hardwood calculator",
      "tile calculator",
      "laminate calculator",
    ],
    path: "/home/flooring/",
  },
  
  // Additional Financial
  investment: {
    title: "Free Investment Calculator - Calculate Returns & Growth",
    description:
      "Calculate investment returns and see how your money grows. Compound growth calculator with regular contributions. Free investment calculator.",
    keywords: ["investment calculator", "investment return calculator", "compound growth calculator", "investment growth calculator"],
    path: "/financial/investment/",
  },
  savings: {
    title: "Free Savings Calculator - Savings Goal Calculator",
    description:
      "Calculate how much you need to save monthly to reach your goal. See your savings grow over time. Free savings calculator.",
    keywords: ["savings calculator", "savings goal calculator", "how much to save", "savings growth calculator"],
    path: "/financial/savings/",
  },
  retirement: {
    title: "Free Retirement Calculator - How Much Do I Need to Retire?",
    description:
      "Calculate how much you need to retire comfortably. Factor in Social Security, 401k, and investments. Free retirement calculator.",
    keywords: ["retirement calculator", "how much do I need to retire", "retirement savings calculator", "401k calculator"],
    path: "/financial/retirement/",
  },
  autoLoan: {
    title: "Free Auto Loan Calculator - Car Payment Calculator",
    description:
      "Calculate your monthly car payment including interest. Compare loan terms and down payment options. Free auto loan calculator.",
    keywords: ["auto loan calculator", "car payment calculator", "car loan calculator", "vehicle payment calculator"],
    path: "/financial/auto-loan/",
  },
  creditCard: {
    title: "Free Credit Card Payoff Calculator - Debt Calculator",
    description:
      "Calculate how long to pay off credit card debt. See total interest paid and optimize your payments. Free credit card calculator.",
    keywords: ["credit card payoff calculator", "credit card calculator", "debt payoff calculator", "credit card interest calculator"],
    path: "/financial/credit-card/",
  },
  downPayment: {
    title: "Free Down Payment Calculator - Home Down Payment",
    description:
      "Calculate how much you need for a down payment on a home. See PMI costs and total savings needed. Free down payment calculator.",
    keywords: ["down payment calculator", "home down payment calculator", "house down payment", "mortgage down payment"],
    path: "/financial/down-payment/",
  },
  hourlyToSalary: {
    title: "Free Hourly to Salary Calculator - Wage Conversion",
    description:
      "Convert hourly wage to annual salary and vice versa. See weekly, monthly, and yearly earnings. Free hourly to salary calculator.",
    keywords: ["hourly to salary calculator", "salary to hourly", "wage calculator", "hourly wage to annual salary"],
    path: "/financial/hourly-to-salary/",
  },
  discount: {
    title: "Free Discount Calculator - Sale Price Calculator",
    description:
      "Calculate sale prices and savings from discounts. Enter original price and discount percentage. Free discount calculator.",
    keywords: ["discount calculator", "sale price calculator", "percent off calculator", "savings calculator"],
    path: "/financial/discount/",
  },

  // Additional Health
  idealWeight: {
    title: "Free Ideal Weight Calculator - Healthy Weight Range",
    description:
      "Calculate your ideal body weight using multiple formulas. Devine, Robinson, Miller, and Hamwi methods. Free ideal weight calculator.",
    keywords: ["ideal weight calculator", "healthy weight calculator", "ideal body weight", "IBW calculator"],
    path: "/health/ideal-weight/",
  },
  pregnancy: {
    title: "Free Pregnancy Due Date Calculator - Conception Date",
    description:
      "Calculate your due date and track pregnancy milestones. Estimate conception date and trimester timeline. Free pregnancy calculator.",
    keywords: ["pregnancy calculator", "due date calculator", "pregnancy due date", "conception calculator"],
    path: "/health/pregnancy/",
  },
  waterIntake: {
    title: "Free Water Intake Calculator - Daily Water Needs",
    description:
      "Calculate how much water you should drink daily based on weight and activity level. Free water intake calculator.",
    keywords: ["water intake calculator", "how much water should I drink", "daily water calculator", "hydration calculator"],
    path: "/health/water-intake/",
  },
  heartRate: {
    title: "Free Heart Rate Zone Calculator - Target Heart Rate",
    description:
      "Calculate your target heart rate zones for exercise. Fat burning, cardio, and peak zones. Free heart rate calculator.",
    keywords: ["heart rate calculator", "target heart rate", "heart rate zones", "fat burning zone calculator"],
    path: "/health/heart-rate/",
  },
  sleep: {
    title: "Free Sleep Calculator - Best Time to Sleep & Wake Up",
    description:
      "Calculate the best time to wake up or go to sleep based on sleep cycles. Optimize your rest. Free sleep calculator.",
    keywords: ["sleep calculator", "sleep cycle calculator", "when to wake up", "best time to sleep"],
    path: "/health/sleep/",
  },
  bac: {
    title: "Free BAC Calculator - Blood Alcohol Calculator",
    description:
      "Estimate your blood alcohol content based on drinks, weight, and time. For educational purposes only. Free BAC calculator.",
    keywords: ["BAC calculator", "blood alcohol calculator", "alcohol calculator", "drunk calculator"],
    path: "/health/bac/",
  },

  // Additional Math
  average: {
    title: "Free Average Calculator - Mean, Median, Mode",
    description:
      "Calculate average (mean), median, and mode of any set of numbers. Free statistical average calculator.",
    keywords: ["average calculator", "mean calculator", "median calculator", "mode calculator", "statistics calculator"],
    path: "/math/average/",
  },
  fraction: {
    title: "Free Fraction Calculator - Add, Subtract, Multiply, Divide",
    description:
      "Calculate fractions easily. Add, subtract, multiply, and divide fractions. Simplify fractions. Free fraction calculator.",
    keywords: ["fraction calculator", "add fractions", "simplify fractions", "fraction math"],
    path: "/math/fraction/",
  },
  scientific: {
    title: "Free Scientific Calculator Online - Advanced Math",
    description:
      "Full-featured scientific calculator online. Trigonometry, logarithms, exponents, and more. Free scientific calculator.",
    keywords: ["scientific calculator", "online scientific calculator", "advanced calculator", "math calculator"],
    path: "/math/scientific/",
  },
  randomNumber: {
    title: "Free Random Number Generator - Random Numbers",
    description:
      "Generate random numbers within any range. Perfect for games, drawings, and statistics. Free random number generator.",
    keywords: ["random number generator", "random number", "number generator", "random picker"],
    path: "/math/random-number/",
  },

  // Additional Date/Time
  addDays: {
    title: "Free Add Days Calculator - Date Calculator",
    description:
      "Add or subtract days from a date. Calculate future or past dates easily. Free date calculator.",
    keywords: ["add days calculator", "date calculator", "subtract days", "days from date"],
    path: "/date-time/add-days/",
  },
  weekNumber: {
    title: "Free Week Number Calculator - What Week Is It?",
    description:
      "Find the week number of any date. See ISO week numbers and calendar weeks. Free week number calculator.",
    keywords: ["week number calculator", "what week is it", "week of year", "ISO week number"],
    path: "/date-time/week-number/",
  },
  timeZone: {
    title: "Free Time Zone Converter - World Time Calculator",
    description:
      "Convert time between time zones. See current time around the world. Free time zone converter.",
    keywords: ["time zone converter", "time zone calculator", "world clock", "time difference calculator"],
    path: "/date-time/time-zone/",
  },

  // Additional Converters
  area: {
    title: "Free Area Converter - Square Feet, Meters, Acres",
    description:
      "Convert area units. Square feet, square meters, acres, hectares, and more. Free area converter.",
    keywords: ["area converter", "square feet to square meters", "acres to hectares", "area calculator"],
    path: "/converters/area/",
  },
  volume: {
    title: "Free Volume Converter - Gallons, Liters, Cups",
    description:
      "Convert volume and capacity units. Gallons, liters, cups, milliliters, and more. Free volume converter.",
    keywords: ["volume converter", "gallons to liters", "cups to ml", "liquid converter"],
    path: "/converters/volume/",
  },
  speed: {
    title: "Free Speed Converter - MPH, KPH, Knots",
    description:
      "Convert speed units. Miles per hour, kilometers per hour, knots, and more. Free speed converter.",
    keywords: ["speed converter", "mph to kph", "speed calculator", "velocity converter"],
    path: "/converters/speed/",
  },
  data: {
    title: "Free Data Storage Converter - GB, TB, MB, KB",
    description:
      "Convert data storage units. Bytes, kilobytes, megabytes, gigabytes, terabytes. Free data converter.",
    keywords: ["data converter", "GB to MB", "storage converter", "byte converter"],
    path: "/converters/data/",
  },
  time: {
    title: "Free Time Converter - Hours, Minutes, Seconds",
    description:
      "Convert time units. Hours, minutes, seconds, days, weeks, and more. Free time converter.",
    keywords: ["time converter", "hours to minutes", "time calculator", "duration converter"],
    path: "/converters/time/",
  },
  currency: {
    title: "Free Currency Converter - Exchange Rate Calculator",
    description:
      "Convert currencies with live exchange rates. USD, EUR, GBP, and 150+ currencies. Free currency converter.",
    keywords: ["currency converter", "exchange rate calculator", "USD to EUR", "money converter"],
    path: "/converters/currency/",
  },

  // Additional Home
  tile: {
    title: "Free Tile Calculator - How Many Tiles Do I Need?",
    description:
      "Calculate how many tiles you need for your project. Includes grout spacing and waste factor. Free tile calculator.",
    keywords: ["tile calculator", "how many tiles do I need", "tile coverage calculator", "floor tile calculator"],
    path: "/home/tile/",
  },
  wallpaper: {
    title: "Free Wallpaper Calculator - How Much Wallpaper?",
    description:
      "Calculate how many rolls of wallpaper you need. Factor in pattern repeat and room dimensions. Free wallpaper calculator.",
    keywords: ["wallpaper calculator", "how much wallpaper", "wallpaper rolls calculator", "wall covering calculator"],
    path: "/home/wallpaper/",
  },
};
