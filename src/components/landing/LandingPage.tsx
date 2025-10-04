'use client';
import React from 'react';
import Hero from './Hero';
import LocationDisplay from './LocationDisplay';
import ProcessOverview from './ProcessOverview';
import FaqSection from './FaqSection';
import AnimatedBackground from './AnimatedBackground';
import ContactSection from './ContactSection';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { ChevronDown } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center justify-center p-4 bg-background space-y-16">
      <AnimatedBackground />
      <div className="hero-overlay"></div>
      <LocationDisplay />

      <div className="relative z-10 w-full flex flex-col items-center justify-center min-h-screen">
        <Hero />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center max-w-4xl">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border-none">
            <AccordionTrigger className="w-full bg-white/90 shadow-2xl rounded-xl p-6 text-2xl font-bold text-blue-carbon hover:no-underline justify-center">
              Explore More
              <ChevronDown className="h-6 w-6 shrink-0 transition-transform duration-200 ml-2" />
            </AccordionTrigger>
            <AccordionContent className="mt-8 space-y-16">
              <ProcessOverview />
              <FaqSection />
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="relative z-10 w-full flex flex-col items-center pb-16">
        <ContactSection />
      </div>
    </div>
  );
}
