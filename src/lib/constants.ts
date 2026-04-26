export interface HabitData {
  sleep: number;
  phone: number;
  workStudy: number;
  exercise: number;
  social: number;
  entertainment: number;
  hobbies: number;
}

export const DEFAULT_HABITS: HabitData = {
  sleep: 8,
  phone: 4,
  workStudy: 8,
  exercise: 0.5,
  social: 2,
  entertainment: 2,
  hobbies: 1,
};

export const HABIT_LABELS: Record<keyof HabitData, string> = {
  sleep: "Sleep",
  phone: "Phone Usage",
  workStudy: "Work / Study",
  exercise: "Exercise",
  social: "Social Connection",
  entertainment: "Entertainment",
  hobbies: "Hobbies",
};

export interface LifetimeStats {
  years: number;
  percentage: number;
  days: number;
}

export const calculateLifetimeStats = (dailyHours: number, lifespanYears: number = 80): LifetimeStats => {
  const years = (dailyHours * lifespanYears) / 24;
  const percentage = (years / lifespanYears) * 100;
  const days = (dailyHours * 365 * lifespanYears) / 24;

  return {
    years: parseFloat(years.toFixed(1)),
    percentage: parseFloat(percentage.toFixed(1)),
    days: Math.round(days),
  };
};
