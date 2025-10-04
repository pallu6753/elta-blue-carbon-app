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
import { ChevronDown, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function LandingPage() {

  const handleScrollToContact = () => {
    document.getElementById('contact-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-background space-y-8 md:space-y-16">
      <AnimatedBackground />
      <div className="hero-overlay"></div>
      <LocationDisplay />

      <div className="relative z-10 w-full flex flex-col items-center justify-center min-h-screen">
        <Hero />
      </div>

      <div className="relative z-10 w-full flex flex-col items-center max-w-4xl space-y-8">
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

        <Button 
          onClick={handleScrollToContact}
          className="w-full max-w-4xl bg-white/90 shadow-2xl rounded-xl p-6 text-2xl font-bold text-blue-carbon hover:bg-white/80 hover:no-underline justify-center"
          variant="ghost"
        >
          Contact Us
          <MessageSquare className="h-6 w-6 shrink-0 ml-2" />
        </Button>
      </div>

      <div id="contact-section" className="relative z-10 w-full flex flex-col items-center pb-16 pt-8">
        <ContactSection />
      </div>
    </div>
  );
}
