'use client';
import React from 'react';
import Hero from './Hero';
import LocationDisplay from './LocationDisplay';
import ProcessOverview from './ProcessOverview';
import FaqSection from './FaqSection';
import AnimatedBackground from './AnimatedBackground';

export default function LandingPage() {

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-background">
      <AnimatedBackground />
      <div className="hero-overlay"></div>
      <LocationDisplay />
      
      <div className="relative z-10 w-full flex flex-col items-center justify-center min-h-screen">
          <Hero />
      </div>

    </div>
  );
}
