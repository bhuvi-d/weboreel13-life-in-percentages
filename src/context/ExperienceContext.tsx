"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { HabitData, DEFAULT_HABITS } from "@/lib/constants";

interface ExperienceContextType {
  habits: HabitData;
  lifespan: number;
  updateHabit: (key: keyof HabitData, value: number) => void;
  setLifespan: (value: number) => void;
  isStarted: boolean;
  startExperience: () => void;
  showInsights: boolean;
  setShowInsights: (show: boolean) => void;
}

const ExperienceContext = createContext<ExperienceContextType | undefined>(undefined);

export const ExperienceProvider = ({ children }: { children: ReactNode }) => {
  const [habits, setHabits] = useState<HabitData>(DEFAULT_HABITS);
  const [lifespan, setLifespan] = useState(80);
  const [isStarted, setIsStarted] = useState(false);
  const [showInsights, setShowInsights] = useState(false);

  const updateHabit = (key: keyof HabitData, value: number) => {
    setHabits((prev) => ({ ...prev, [key]: value }));
  };

  const startExperience = () => setIsStarted(true);

  return (
    <ExperienceContext.Provider
      value={{
        habits,
        lifespan,
        updateHabit,
        setLifespan,
        isStarted,
        startExperience,
        showInsights,
        setShowInsights,
      }}
    >
      {children}
    </ExperienceContext.Provider>
  );
};

export const useExperience = () => {
  const context = useContext(ExperienceContext);
  if (context === undefined) {
    throw new Error("useExperience must be used within an ExperienceProvider");
  }
  return context;
};
