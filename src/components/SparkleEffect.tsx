"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
}

export const SparkleBurst = ({ trigger }: { trigger: any }) => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    if (trigger) {
      const newSparkles = Array.from({ length: 12 }).map((_, i) => ({
        id: Date.now() + i,
        x: Math.random() * 100 - 50,
        y: Math.random() * 100 - 50,
        size: Math.random() * 10 + 5,
        color: ["#C5A059", "#F7E7E3", "#FFFDF9"][Math.floor(Math.random() * 3)],
      }));
      setSparkles(newSparkles);
      const timer = setTimeout(() => setSparkles([]), 1000);
      return () => clearTimeout(timer);
    }
  }, [trigger]);

  return (
    <div className="absolute inset-0 pointer-events-none z-50 flex items-center justify-center">
      <AnimatePresence>
        {sparkles.map((s) => (
          <motion.div
            key={s.id}
            initial={{ scale: 0, opacity: 1, x: 0, y: 0 }}
            animate={{ 
              scale: 1.5, 
              opacity: 0, 
              x: s.x, 
              y: s.y,
              rotate: 180
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute"
            style={{
              width: s.size,
              height: s.size,
              backgroundColor: s.color,
              clipPath: "polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)",
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
