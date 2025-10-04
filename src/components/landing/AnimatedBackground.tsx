'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const AnimatedBackground = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-0 overflow-hidden bg-black">
      <style>
        {`
          @keyframes pan-zoom {
            0% {
              transform: scale(1) translate(0, 0);
            }
            50% {
              transform: scale(1.1) translate(-2%, 2%);
            }
            100% {
              transform: scale(1) translate(0, 0);
            }
          }
          .animated-bg-image {
            animation: pan-zoom 45s ease-in-out infinite;
          }
        `}
      </style>
      <Image
        alt="An aerial view of a lush green forest with a lake in the shape of the letters CO2, symbolizing carbon capture."
        src="https://images.unsplash.com/photo-1621287932393-2483863d0859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxjYXJib24lMjBjYXB0dXJlfGVufDB8fHx8MTc2MDIxODAyOXww&ixlib=rb-4.1.0&q=80&w=1080"
        fill
        className="object-cover animated-bg-image"
        data-ai-hint="carbon capture"
      />
    </div>
  );
};

export default AnimatedBackground;
