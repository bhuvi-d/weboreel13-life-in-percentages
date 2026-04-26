"use client";

import React, { createContext, useContext, useEffect, useRef, useState } from "react";

interface AudioContextType {
  isPlaying: boolean;
  toggleAudio: () => void;
  playClick: () => void;
  playWhoosh: () => void;
  playTick: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const AudioProvider = ({ children }: { children: React.ReactNode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const masterGainRef = useRef<GainNode | null>(null);
  const beatRef = useRef<number | null>(null);

  const initAudio = () => {
    if (audioContextRef.current) return;
    
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioContextClass();
    audioContextRef.current = ctx;

    const masterGain = ctx.createGain();
    masterGain.gain.setValueAtTime(0, ctx.currentTime);
    masterGain.connect(ctx.destination);
    masterGainRef.current = masterGain;

    // "THE WARMTH" - Friendly Organic Beat
    let beatCount = 0;
    const playPattern = () => {
      if (ctx.state === "suspended") return;
      
      const time = ctx.currentTime;
      
      // 1. SOFT KICK (Beats 1 and 3)
      if (beatCount % 4 === 0 || beatCount % 4 === 2) {
        const kickOsc = ctx.createOscillator();
        const kickGain = ctx.createGain();
        kickOsc.frequency.setValueAtTime(100, time);
        kickOsc.frequency.exponentialRampToValueAtTime(40, time + 0.1);
        kickGain.gain.setValueAtTime(0.15, time);
        kickGain.gain.exponentialRampToValueAtTime(0.001, time + 0.3);
        kickOsc.connect(kickGain);
        kickGain.connect(masterGain);
        kickOsc.start(time);
        kickOsc.stop(time + 0.3);
      }

      // 2. SOFT SHAKER (Off-beats)
      if (beatCount % 2 === 1) {
        const shakerGain = ctx.createGain();
        shakerGain.gain.setValueAtTime(0.015, time);
        shakerGain.gain.exponentialRampToValueAtTime(0.001, time + 0.1);
        
        const bufferSize = ctx.sampleRate * 0.1;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        noise.connect(shakerGain);
        shakerGain.connect(masterGain);
        noise.start(time);
      }

      // 3. WARM PAD (Acoustic Guitar Style Pluck)
      if (beatCount % 8 === 0) {
        const notes = [220, 261, 196, 174]; // A3, C4, G3, F3
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(notes[Math.floor(beatCount / 8) % 4], time);
        gain.gain.setValueAtTime(0, time);
        gain.gain.linearRampToValueAtTime(0.04, time + 0.5);
        gain.gain.linearRampToValueAtTime(0, time + 2);
        osc.connect(gain);
        gain.connect(masterGain);
        osc.start(time);
        osc.stop(time + 2);
      }

      beatCount++;
      beatRef.current = window.setTimeout(playPattern, 400); // 75 BPM - Very Chill
    };

    playPattern();
  };

  const toggleAudio = () => {
    if (!audioContextRef.current) {
      initAudio();
    }

    if (audioContextRef.current?.state === "suspended") {
      audioContextRef.current.resume();
    }

    if (isPlaying) {
      masterGainRef.current?.gain.exponentialRampToValueAtTime(0.0001, audioContextRef.current!.currentTime + 2);
    } else {
      masterGainRef.current?.gain.exponentialRampToValueAtTime(0.4, audioContextRef.current!.currentTime + 2);
    }
    setIsPlaying(!isPlaying);
  };

  const playClick = () => {};
  const playWhoosh = () => {};
  const playTick = () => {};

  return (
    <AudioContext.Provider value={{ isPlaying, toggleAudio, playClick, playWhoosh, playTick }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (context === undefined) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};
