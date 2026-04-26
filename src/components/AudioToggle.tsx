"use client";

import React from "react";
import { Volume2, VolumeX, Music } from "lucide-react";
import { useAudio } from "@/context/AudioContext";
import { motion, AnimatePresence } from "framer-motion";

export const AudioToggle = () => {
  const { isPlaying, toggleAudio } = useAudio();

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-12 right-12 z-50 flex items-center gap-4 bg-white/80 backdrop-blur-md border border-peach/50 px-6 py-3 rounded-full shadow-2xl hover:bg-white transition-all group overflow-hidden"
      onClick={toggleAudio}
    >
      <div className="absolute inset-0 bg-peach/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
      
      <span className="relative z-10 text-[10px] uppercase tracking-[0.3em] font-black text-taupe/60 group-hover:text-taupe transition-colors">
        {isPlaying ? "Music On" : "Tap for Music"}
      </span>
      
      <div className="relative z-10 w-10 h-10 flex items-center justify-center rounded-full bg-peach/30 text-muted-gold border border-muted-gold/20">
        <AnimatePresence mode="wait">
          {isPlaying ? (
            <motion.div
              key="volume-on"
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 45 }}
            >
              <Music size={18} strokeWidth={1.5} />
            </motion.div>
          ) : (
            <motion.div
              key="volume-off"
              initial={{ scale: 0, rotate: -45 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 45 }}
            >
              <VolumeX size={18} strokeWidth={1.5} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.button>
  );
};
