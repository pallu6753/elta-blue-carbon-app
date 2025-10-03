import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqData = [
    {
        q: "How do you collect energy consumption data for blockchain projects?",
        a: "We use a standardized approach to gather data from blockchain nodes and mining rigs. This includes direct reporting by nodes or integration with energy monitoring systems to ensure **accuracy and consistency**."
    },
    {
        q: "How does geolocation tracking work in calculating carbon footprints?",
        a: "Geolocation data determines the regional energy mix (carbon intensity) of the electricity consumed by nodes. This allows for a much more precise calculation of the true **Scope 2 emissions** than global averages."
    },
    {
        q: "What role do smart contracts play in carbon offsetting?",
        a: "Smart contracts automate the entire process from MRV data validation to **credit minting and retirement**. This ensures that once verification criteria are met, credits are issued immediately, providing trust and transparency."
    },
    {
        q: "How do you ensure the accuracy of emissions calculations?",
        a: "We use a combination of **AI-driven anomaly detection** on MRV data, verification by certified third-party human auditors, and compliance with the latest international methodologies (e.g., IPCC guidelines)."
    },
];

export default function FaqSection() {
  return (
    <div className="max-w-4xl w-full p-8 rounded-xl bg-white/90 shadow-2xl">
      <h2 className="text-3xl font-bold text-blue-carbon mb-6 text-center">
        Everything You Need to Know
      </h2>
      <Accordion type="single" collapsible className="w-full space-y-3">
        {faqData.map((item, index) => (
          <AccordionItem value={`item-${index}`} key={index} className="bg-white/70 border border-white/50 rounded-lg shadow-md hover:bg-white transition duration-200">
            <AccordionTrigger className="text-left text-sm sm:text-base font-semibold text-gray-800 px-6">
              {item.q}
            </AccordionTrigger>
            <AccordionContent className="px-6 text-gray-700 text-sm">
              <p dangerouslySetInnerHTML={{ __html: item.a }}></p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="text-center mt-6">
        <p className="text-gray-700">
          Do you still have more questions? Connect with our team via the AI Expert in the dashboard.
        </p>
      </div>
    </div>
  );
}
