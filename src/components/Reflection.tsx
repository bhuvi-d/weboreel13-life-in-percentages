"use client";

import React from "react";
import { motion } from "framer-motion";
import { useExperience } from "@/context/ExperienceContext";
import { useAudio } from "@/context/AudioContext";
import { calculateLifetimeStats } from "@/lib/constants";
import { RefreshCw, Share2, Heart, Sparkles as SparklesIcon } from "lucide-react";

const ParticleField = () => {
  return (
    <div className="absolute inset-0 pointer-events-none z-0">
      {Array.from({ length: 30 }).map((_, i) => (
        <motion.div
          key={i}
          animate={{ 
            y: ["0vh", "100vh"],
            x: [`${Math.random() * 100}vw`, `${Math.random() * 100}vw`],
            opacity: [0, 0.4, 0],
            rotate: [0, 360]
          }}
          transition={{ duration: Math.random() * 20 + 15, repeat: Infinity, ease: "linear" }}
          className="absolute w-4 h-4 bg-blush/40 rounded-full blur-[2px]"
          style={{ top: "-10%" }}
        />
      ))}
    </div>
  );
};

export const Reflection = () => {
  const { showInsights, habits, lifespan } = useExperience();
  const { playWhoosh } = useAudio();

  if (!showInsights) return null;

  const handleRestart = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setTimeout(() => {
      window.location.reload();
    }, 800);
  };

  const categories = [
    { label: "Rest", hours: habits.sleep, color: "text-taupe" },
    { label: "Digital", hours: habits.phone + habits.entertainment, color: "text-taupe" },
    { label: "Purpose", hours: habits.workStudy, color: "text-taupe" },
    { label: "Vitality", hours: habits.exercise, color: "text-taupe" },
    { label: "Love", hours: habits.social, color: "text-taupe" },
  ];

  return (
    <section className="min-h-screen bg-ivory flex flex-col items-center justify-center px-6 text-center py-40 relative overflow-hidden">
       {/* Warm Sunrise Aesthetic */}
       <div className="absolute bottom-0 left-0 w-full h-[60%] bg-gradient-to-t from-peach/40 via-blush/20 to-transparent z-0" />
       <div className="absolute top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-muted-gold/5 rounded-full blur-[150px] z-0" />
       
       <ParticleField />

       <motion.div
         initial={{ opacity: 0, y: 100 }}
         whileInView={{ opacity: 1, y: 0 }}
         transition={{ duration: 2, ease: [0.16, 1, 0.3, 1] }}
         viewport={{ once: true }}
         className="z-10 max-w-6xl w-full space-y-32"
       >
         <div className="space-y-12">
           <h2 className="text-[clamp(4rem,12vw,10rem)] font-cursive text-taupe leading-tight">
             Your days become <br />
             <span className="font-signature text-muted-gold text-[1.2em]">your decades.</span>
           </h2>
           <div className="max-w-3xl mx-auto space-y-8">
             <p className="font-display italic text-3xl text-taupe/40">
               You still have time to shape them beautifully.
             </p>
             <div className="flex items-center justify-center gap-4 text-muted-gold/40">
                <div className="h-px w-20 bg-muted-gold/20" />
                <SparklesIcon size={20} strokeWidth={1} />
                <div className="h-px w-20 bg-muted-gold/20" />
             </div>
           </div>
         </div>

         {/* Luxury Summary Grid */}
         <div className="grid grid-cols-2 md:grid-cols-5 gap-6 w-full">
            {categories.map((item, i) => {
              const stats = calculateLifetimeStats(item.hours, lifespan);
              return (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 + 0.5, duration: 1 }}
                  className="p-12 rounded-[4rem] bg-white/60 backdrop-blur-md border border-white/80 flex flex-col items-center justify-center gap-6 shadow-xl hover:shadow-2xl hover:scale-105 transition-all group"
                >
                  <span className="font-signature text-3xl text-muted-gold/60">{item.label}</span>
                  <div className={`text-6xl font-display font-bold ${item.color}`}>
                    {stats.years}y
                  </div>
                  <div className="w-12 h-px bg-peach" />
                  <span className="text-[10px] uppercase tracking-[0.3em] text-taupe/30 font-black">{stats.percentage}% of life</span>
                </motion.div>
              );
            })}
         </div>

         <div className="flex flex-col md:flex-row items-center justify-center gap-10 pt-12">
           <button 
             onClick={handleRestart}
             className="w-full md:w-auto flex items-center justify-center gap-4 px-14 py-8 bg-cream text-taupe font-bold rounded-full border border-peach shadow-md hover:bg-white transition-all"
           >
             <RefreshCw size={18} />
             <span>Recalculate</span>
           </button>

           <button className="w-full md:w-auto flex items-center justify-center gap-4 px-14 py-8 bg-white text-taupe font-bold rounded-full border border-peach shadow-md hover:bg-cream transition-all">
             <Share2 size={18} />
             <span>Share My Reflection</span>
           </button>

           <button className="w-full md:w-auto flex items-center justify-center gap-6 px-20 py-10 bg-muted-gold text-white font-bold rounded-full shadow-2xl hover:bg-taupe transition-all hover:scale-105 group">
             <span>Begin Again</span>
             <Heart size={22} className="group-hover:fill-current transition-colors" />
           </button>
         </div>
       </motion.div>

       <div className="mt-40 font-signature text-4xl text-taupe/20">
         Life in Percentages • A Beautiful Reflection
       </div>
    </section>
  );
};
