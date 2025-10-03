import React from 'react';
import { Compass, ShieldCheck, TrendingUp } from 'lucide-react';

const processSteps = [
  {
    icon: Compass,
    title: '1. Measure',
    description:
      'Submit baseline data using our AI-driven MRV tools and satellite monitoring for high-precision carbon quantification.',
    iconColor: 'text-green-500',
  },
  {
    icon: ShieldCheck,
    title: '2. Verify',
    description:
      'Third-party verifiers audit the collected data and approve reports, minting verified carbon credits (VCCs) on the blockchain.',
    iconColor: 'text-yellow-500',
  },
  {
    icon: TrendingUp,
    title: '3. Trade',
    description:
      'Verified carbon credits become tokenized assets, ready to be purchased, retired, or traded by global investors.',
    iconColor: 'text-blue-500',
  },
];

const ProcessCard = ({ icon: Icon, title, description, iconColor }: (typeof processSteps)[0]) => (
    <div className="bg-gray-200/50 dark:bg-gray-800/30 p-6 rounded-lg shadow-md transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div className={`w-12 h-12 flex items-center justify-center rounded-full mx-auto mb-4 ${iconColor} bg-opacity-10`}>
            <Icon className={`h-8 w-8 ${iconColor}`} />
        </div>
        <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
        <p className="text-sm text-muted-foreground">{description}</p>
    </div>
);


export default function ProcessOverview() {
  return (
    <div className="max-w-4xl w-full p-8 rounded-xl bg-gray-100/80 dark:bg-gray-900/80 shadow-2xl">
      <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
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
