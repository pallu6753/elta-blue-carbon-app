'use client';
import React from 'react';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import ProcessOverview from './ProcessOverview';

export default function LandingPage() {
  const heroImage = PlaceHolderImages.find(img => img.id === 'hero-background');

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-background min-h-screen">
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
      
      <div className="relative z-10 w-full flex flex-col items-center space-y-10 mt-10 mb-10">
        <ProcessOverview />
      </div>
    </div>
  );
}
