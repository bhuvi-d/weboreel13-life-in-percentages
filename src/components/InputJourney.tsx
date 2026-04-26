"use client";

import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useExperience } from "@/context/ExperienceContext";
import { useAudio } from "@/context/AudioContext";
import { HabitData, HABIT_LABELS, calculateLifetimeStats } from "@/lib/constants";
import { ArrowRight, Sparkles, Heart, Sun, Cloud, Moon, Smartphone, Briefcase, Users, Music, ChevronDown } from "lucide-react";
import { SparkleBurst } from "./SparkleEffect";

const FloatingElements = () => {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {Array.from({ length: 15 }).map((_, i) => (
        <motion.div
          key={i}
          initial={{ 
            x: Math.random() * 100 + "%", 
            y: "110%", 
            opacity: 0,
            scale: Math.random() * 0.5 + 0.5
          }}
          animate={{ 
            y: "-10%", 
            opacity: [0, 0.4, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ 
            duration: Math.random() * 10 + 10, 
            repeat: Infinity, 
            delay: Math.random() * 10,
            ease: "linear"
          }}
          className="petal bg-blush/40"
          style={{ width: Math.random() * 20 + 10, height: Math.random() * 10 + 10 }}
        />
      ))}
    </div>
  );
};

const HabitSlider = ({
  label,
  value,
  onChange,
  icon: Icon,
}: {
  label: string;
  value: number;
  onChange: (val: number) => void;
  icon: any;
}) => {
  const { playTick } = useAudio();
  const [sparkleTrigger, setSparkleTrigger] = useState(0);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = parseFloat(e.target.value);
    onChange(newVal);
    // Trigger sparkles on significant moves
    if (Math.abs(newVal - value) >= 1) {
      setSparkleTrigger(prev => prev + 1);
      playTick();
    }
  };

  const lifetime = calculateLifetimeStats(value, 80);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-12 relative">
      <SparkleBurst trigger={sparkleTrigger} />
      
      <div className="flex flex-col items-center text-center space-y-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="w-24 h-24 rounded-full bg-white shadow-xl flex items-center justify-center text-muted-gold border border-peach/30"
        >
          <Icon size={40} strokeWidth={1} />
        </motion.div>

        <div className="space-y-3">
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-signature text-6xl text-muted-gold drop-shadow-sm"
          >
            {label}
          </motion.div>
          <div className="text-[12px] text-taupe font-black tracking-[0.4em] uppercase opacity-60">
            {value > 0 ? `${lifetime.years} Beautiful Years of Existence` : "A gentle reflection of your day"}
          </div>
        </div>

        <div className="flex items-baseline justify-center">
          <motion.span 
            key={value}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-[clamp(6.5rem,15vw,11rem)] font-display text-taupe font-bold tracking-tighter leading-none"
          >
            {value}
          </motion.span>
          <span className="text-2xl text-muted-gold font-cursive ml-3">hours</span>
        </div>
      </div>
      
      <div className="relative h-14 flex items-center group px-12">
        <div className="absolute inset-0 bg-cream rounded-full shadow-inner border border-taupe/10" />
        <motion.div 
          initial={false}
          animate={{ width: `calc(${(value / 24) * 100}% - 2rem)` }}
          className="absolute h-1.5 left-12 bg-gradient-to-r from-peach via-muted-gold to-blush rounded-full pointer-events-none" 
        />
        <input
          type="range"
          min="0"
          max="24"
          step="0.5"
          value={value}
          onChange={handleSliderChange}
          className="relative w-full h-full opacity-0 cursor-pointer z-20"
        />
        <motion.div 
          initial={false}
          animate={{ left: `calc(${(value / 24) * 100}% - 1.75rem)` }}
          className="absolute w-14 h-14 pointer-events-none flex items-center justify-center"
        >
          <div className="w-10 h-10 bg-white rounded-full shadow-2xl border-2 border-muted-gold flex items-center justify-center group-hover:scale-110 transition-transform">
             <div className="w-1.5 h-1.5 bg-muted-gold rounded-full" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export const InputJourney = () => {
  const { habits, updateHabit, lifespan, setLifespan, setShowInsights } = useExperience();
  const { playWhoosh } = useAudio();
  const [step, setStep] = useState(0); 
  
  const totalHours = useMemo(() => {
    return Object.values(habits).reduce((acc, curr) => acc + curr, 0);
  }, [habits]);

  const hoursLeft = 24 - totalHours;
  const isOverLimit = totalHours > 24;

  const steps = [
    { key: "lifespan", label: "The Horizon of Life", description: "How many years do you wish to cherish?", icon: Sun },
    { key: "sleep", label: "Dreams & Rest", description: "Hours given to the moon and stars.", icon: Moon },
    { key: "phone", label: "The Digital Window", description: "Time spent within the glow of glass.", icon: Smartphone },
    { key: "workStudy", label: "Passion & Purpose", description: "The beautiful work of your mind.", icon: Briefcase },
    { key: "exercise", label: "Vital Movement", description: "Honoring the home of your soul.", icon: Heart },
    { key: "social", label: "Kindred Spirits", description: "Time shared with those you love.", icon: Users },
    { key: "entertainment", label: "The Storyteller", description: "Lost in the magic of other worlds.", icon: Music },
    { key: "hobbies", label: "The Spark", description: "Hours spent on what makes you fly.", icon: Sparkles },
  ];

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      handleFinish();
    }
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  const handleFinish = () => {
    setShowInsights(true);
    setTimeout(() => {
      document.getElementById("insight-reveal")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <section id="input-journey" className="relative min-h-[100dvh] bg-ivory flex flex-col items-center justify-center py-20 overflow-hidden">
      <FloatingElements />

      {/* Elegant Progress Indicators */}
      <div className="fixed top-12 left-1/2 -translate-x-1/2 flex items-center gap-4 z-50">
        {steps.map((_, i) => (
          <motion.div 
            key={i}
            animate={{ 
              scale: i === step ? 1.5 : 1,
              backgroundColor: i === step ? '#B58B43' : i < step ? '#F7E7E3' : '#F9F6F1'
            }}
            className="w-2.5 h-2.5 rounded-full shadow-sm border border-taupe/5"
          />
        ))}
      </div>

      <div className="w-full max-w-4xl px-6 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -30, scale: 1.02 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center space-y-16"
          >
            <div className="text-center space-y-4">
              <h2 className="text-[clamp(3.5rem,8vw,7rem)] font-cursive text-taupe leading-tight drop-shadow-sm">
                {steps[step].label}
              </h2>
              <p className="font-display italic text-3xl text-muted-gold leading-relaxed">{steps[step].description}</p>
            </div>

            <div className="w-full">
              {step === 0 ? (
                <div className="w-full max-w-xl mx-auto p-20 rounded-[4.5rem] glass space-y-12 text-center relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-peach via-muted-gold to-peach" />
                  <motion.div 
                    key={lifespan}
                    className="text-[clamp(8.5rem,18vw,13rem)] font-display text-taupe font-bold tracking-tighter drop-shadow-sm"
                  >
                    {lifespan}
                  </motion.div>
                  <div className="space-y-10">
                    <input
                      type="range"
                      min="50"
                      max="100"
                      value={lifespan}
                      onChange={(e) => setLifespan(parseInt(e.target.value))}
                      className="w-full h-2 bg-peach appearance-none cursor-pointer accent-muted-gold rounded-full"
                    />
                    <div className="font-signature text-4xl text-muted-gold">Projected Years</div>
                  </div>
                </div>
              ) : (
                <HabitSlider
                  label={HABIT_LABELS[steps[step].key as keyof HabitData]}
                  value={habits[steps[step].key as keyof HabitData]}
                  onChange={(val) => updateHabit(steps[step].key as keyof HabitData, val)}
                  icon={steps[step].icon}
                />
              )}
            </div>

            <div className="flex items-center gap-12">
              {step > 0 && (
                <button
                  onClick={handleBack}
                  className="px-10 py-4 text-taupe/60 hover:text-taupe font-bold uppercase tracking-[0.4em] text-[12px] transition-all"
                >
                  Back
                </button>
              )}
              <button
                onClick={handleNext}
                className="group relative flex items-center gap-6 px-20 py-8 bg-muted-gold text-white font-bold rounded-full shadow-2xl hover:bg-taupe transition-all hover:scale-105 active:scale-95 overflow-hidden"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                <span className="relative z-10 text-lg tracking-[0.1em]">{step === steps.length - 1 ? "Discover My Life" : "Next Chapter"}</span>
                <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform relative z-10" />
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Elegant Balance Pill */}
      <div className="fixed bottom-12 left-12 z-40">
        <div className="bg-white px-12 py-8 rounded-[3rem] border border-peach shadow-2xl flex flex-col items-start gap-1">
           <span className="text-[11px] uppercase tracking-[0.4em] font-black text-muted-gold">Today's Reflection</span>
           <div className={`text-5xl font-display font-bold ${isOverLimit ? 'text-red-500' : 'text-taupe'}`}>
             {isOverLimit ? `+${totalHours - 24}h` : `${totalHours}/24h`}
           </div>
        </div>
      </div>
    </section>
  );
};
