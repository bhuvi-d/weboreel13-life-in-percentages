"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useExperience } from "@/context/ExperienceContext";
import { calculateLifetimeStats } from "@/lib/constants";
import { Moon, Smartphone, Briefcase, Heart, Users, Sparkles, Music, ArrowDown } from "lucide-react";
import { SparkleBurst } from "./SparkleEffect";

const InsightSection = ({
  title,
  subtitle,
  stat,
  icon: Icon,
  bgGradient,
  isLast = false,
}: {
  title: string;
  subtitle: string;
  stat: string;
  icon: any;
  bgGradient: string;
  isLast?: boolean;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const isInView = useInView(containerRef, { amount: 0.5, once: false });
  const [sparkleTrigger, setSparkleTrigger] = useState(0);

  useEffect(() => {
    if (isInView) {
      setSparkleTrigger(prev => prev + 1);
    }
  }, [isInView]);

  const opacity = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0, 1, 0]);
  const scale = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [0.95, 1, 0.95]);
  const y = useTransform(scrollYProgress, [0.3, 0.5, 0.7], [60, 0, -60]);

  return (
    <div ref={containerRef} className={`h-screen w-full sticky top-0 flex items-center justify-center overflow-hidden ${bgGradient}`}>
      <SparkleBurst trigger={sparkleTrigger} />
      
      <motion.div 
        style={{ opacity, scale, y }}
        className="relative z-10 text-center max-w-5xl px-6 w-full"
      >
        <div className="flex flex-col items-center gap-16 md:gap-24">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="w-32 h-32 md:w-48 md:h-48 rounded-full flex items-center justify-center bg-white/60 backdrop-blur-md border-2 border-white/80 text-taupe shadow-2xl"
          >
            <Icon size={64} strokeWidth={0.5} />
          </motion.div>
          
          <div className="space-y-10">
            <h3 className="font-signature text-6xl md:text-8xl text-taupe italic drop-shadow-sm">
              {subtitle}
            </h3>
            <div className="text-[clamp(7rem,22vw,14rem)] font-display text-taupe font-bold tracking-tighter leading-none drop-shadow-md">
              {stat}
            </div>
            <h4 className="text-2xl md:text-3xl text-taupe font-black tracking-[0.8em] uppercase opacity-40">
              {title}
            </h4>
          </div>
        </div>
      </motion.div>

      {!isLast && (
        <motion.div 
          style={{ opacity }}
          className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-6 text-taupe z-20"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="font-signature text-4xl text-muted-gold">Gently scroll down</span>
            <span className="text-[10px] uppercase tracking-[0.5em] font-black opacity-30">to see more</span>
          </div>
          <motion.div 
            animate={{ y: [0, 15, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="p-3 rounded-full bg-white/40 backdrop-blur-sm border border-white/60 shadow-lg"
          >
            <ArrowDown size={24} className="text-muted-gold" strokeWidth={1.5} />
          </motion.div>
        </motion.div>
      )}

      {/* Atmospheric Particles */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            animate={{ 
              y: ["0vh", "100vh"],
              x: ["0vw", `${Math.random() * 30 - 15}vw`],
              opacity: [0, 0.4, 0]
            }}
            transition={{ duration: Math.random() * 20 + 20, repeat: Infinity, ease: "linear" }}
            className="absolute w-1.5 h-1.5 bg-white rounded-full blur-[1px]"
            style={{ left: `${Math.random() * 100}%`, top: "-10%" }}
          />
        ))}
      </div>
    </div>
  );
};

export const RevealExperience = () => {
  const { habits, lifespan, showInsights } = useExperience();

  if (!showInsights) return null;

  const sleepStats = calculateLifetimeStats(habits.sleep, lifespan);
  const screenStats = calculateLifetimeStats(habits.phone + habits.entertainment, lifespan);
  const workStats = calculateLifetimeStats(habits.workStudy, lifespan);
  const exerciseStats = calculateLifetimeStats(habits.exercise, lifespan);
  const socialStats = calculateLifetimeStats(habits.social, lifespan);

  return (
    <section id="insight-reveal" className="relative">
      <InsightSection
        subtitle="Moments of Rest"
        title="Restoring Your Soul"
        stat={`${sleepStats.years}y`}
        icon={Moon}
        bgGradient="bg-gradient-to-b from-ivory via-blush to-peach"
      />

      <InsightSection
        subtitle="The Digital Reflection"
        title="Time Behind Glass"
        stat={`${screenStats.years}y`}
        icon={Smartphone}
        bgGradient="bg-gradient-to-b from-peach via-white to-sage"
      />

      <InsightSection
        subtitle="Your Life's Purpose"
        title="The Work of Your Hands"
        stat={`${workStats.years}y`}
        icon={Briefcase}
        bgGradient="bg-gradient-to-b from-sage via-white to-blush"
      />

      <InsightSection
        subtitle="Vital Energy"
        title="Honoring Your Vessel"
        stat={`${exerciseStats.years}y`}
        icon={Heart}
        bgGradient="bg-gradient-to-b from-blush via-white to-peach"
      />

      <InsightSection
        subtitle="The Heart of Living"
        title="With the Souls You Love"
        stat={`${socialStats.years}y`}
        icon={Users}
        isLast
        bgGradient="bg-gradient-to-b from-peach via-blush to-ivory"
      />
    </section>
  );
};
