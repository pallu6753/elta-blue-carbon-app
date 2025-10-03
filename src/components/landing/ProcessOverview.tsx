import React from 'react';
import { Compass, ShieldCheck, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const processSteps = [
  {
    icon: Compass,
    title: '1. Measure',
    description:
      'Submit baseline data using our AI-driven MRV tools and satellite monitoring for high-precision carbon quantification.',
    iconColor: 'text-primary',
  },
  {
    icon: ShieldCheck,
    title: '2. Verify',
    description:
      'Third-party verifiers audit the collected data and approve reports, minting verified carbon credits (VCCs) on the blockchain.',
    iconColor: 'text-yellow-400',
  },
  {
    icon: TrendingUp,
    title: '3. Trade',
    description:
      'Verified carbon credits become tokenized assets, ready to be purchased, retired, or traded by global investors.',
    iconColor: 'text-blue-400',
  },
];

const ProcessCard = ({ icon: Icon, title, description, iconColor }: (typeof processSteps)[0]) => (
    <div className="process-icon-box bg-white/20 p-6 rounded-xl border border-white/30 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
        <Icon className={`h-10 w-10 mx-auto mb-3 ${iconColor}`} />
        <p className="text-xl font-semibold text-white mb-2">{title}</p>
        <p className="text-sm text-gray-200">{description}</p>
    </div>
);


export default function ProcessOverview() {
  return (
    <div className="max-w-4xl w-full p-8 rounded-xl bg-black/30 backdrop-blur-md shadow-2xl">
      <h2 className="text-3xl font-bold text-white mb-8 text-center">
        Our Blue Carbon Certification Process
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
        {processSteps.map((step) => (
          <ProcessCard key={step.title} {...step} />
        ))}
      </div>
    </div>
  );
}
