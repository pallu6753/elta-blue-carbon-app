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
        alt="A long exposure shot of a pier extending into a calm ocean at sunset"
        src="https://images.unsplash.com/photo-1494783367193-149034c05e8f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxvY2VhbiUyMHBpZXJ8ZW58MHx8fHwxNzU5ODMxNTA0fDA&ixlib=rb-4.1.0&q=80&w=1080"
        fill
        className="object-cover animated-bg-image"
        data-ai-hint="ocean pier"
      />
    </div>
  );
};

export default AnimatedBackground;
