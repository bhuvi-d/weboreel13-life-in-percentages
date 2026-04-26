"use client";

import { ExperienceProvider } from "@/context/ExperienceContext";
import { AudioProvider } from "@/context/AudioContext";
import { Hero } from "@/components/Hero";
import { InputJourney } from "@/components/InputJourney";
import { RevealExperience } from "@/components/RevealExperience";
import { Reflection } from "@/components/Reflection";
import { AudioToggle } from "@/components/AudioToggle";
import { ProgressTracker } from "@/components/ProgressTracker";

export default function Home() {
  return (
    <AudioProvider>
      <ExperienceProvider>
        <main className="relative bg-charcoal selection:bg-gold selection:text-charcoal">
          <ProgressTracker />
          <Hero />
          <InputJourney />
          <RevealExperience />
          <Reflection />
          <AudioToggle />
        </main>
      </ExperienceProvider>
    </AudioProvider>
  );
}
