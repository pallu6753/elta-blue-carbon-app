'use client';
import React from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import Hero from './Hero';
import ProcessOverview from './ProcessOverview';
import FaqSection from './FaqSection';
import LocationDisplay from './LocationDisplay';

export default function LandingPage() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-background');

  return (
    <div className="flex flex-col items-center p-4 bg-background">
      {heroImage && (
        <Image
          src={heroImage.imageUrl}
          alt={heroImage.description}
          fill
          className="object-cover hero-background"
          quality={100}
          priority
          data-ai-hint={heroImage.imageHint}
        />
      )}
      <div className="hero-overlay"></div>
      
      <LocationDisplay />

      <div className="relative z-10 w-full flex flex-col items-center space-y-10 mt-10 mb-10">
        <Hero />
        <ProcessOverview />
        <FaqSection />
      </div>
    </div>
  );
}
