"use client";

import React from "react";
import { motion } from "framer-motion";
import { useExperience } from "@/context/ExperienceContext";
import { Sparkles } from "lucide-react";

export const Hero = () => {
  const { isStarted, startExperience } = useExperience();

  if (isStarted) return null;

  return (
    <section className="relative h-screen w-full flex flex-col items-center justify-center bg-ivory overflow-hidden px-6">
      <div className="absolute inset-0 z-0">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blush/20 rounded-full blur-[150px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="z-10 text-center space-y-12"
      >
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center justify-center gap-3 text-muted-gold/60 uppercase tracking-[0.5em] text-xs font-black"
          >
            <Sparkles size={14} strokeWidth={1} />
            <span>A Life Reflection Experience</span>
            <Sparkles size={14} strokeWidth={1} />
          </motion.div>
          <h1 className="text-[clamp(4rem,15vw,13rem)] font-display text-taupe font-bold tracking-tighter leading-[0.85] italic drop-shadow-sm">
            Life in <br />
            <span className="font-signature text-muted-gold text-[1.1em] lowercase block mt-4">percentages</span>
          </h1>
        </div>

        <p className="max-w-3xl mx-auto text-xl md:text-2xl font-display text-taupe/50 italic leading-relaxed">
          Your days are becoming years. <br />
          Discover the beautiful reflection of where your time goes.
        </p>

        <div className="pt-8">
          <button
            onClick={() => startExperience()}
            className="group relative px-20 py-8 bg-muted-gold text-white font-bold rounded-full shadow-2xl hover:bg-taupe transition-all hover:scale-105 active:scale-95 overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="relative z-10 text-lg tracking-[0.2em] uppercase">See Your Journey</span>
          </button>
        </div>
      </motion.div>

      {/* Decorative Drifting Petals */}
      <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-4 text-taupe/10 animate-bounce">
         <div className="w-px h-12 bg-gradient-to-b from-taupe/20 to-transparent" />
      </div>
    </section>
  );
};
