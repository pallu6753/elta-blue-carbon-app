'use client';

import { useTheme } from '@/context/ThemeProvider';
import { cn } from '@/lib/utils';
import React from 'react';

const AnimatedBackground = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div
      className={cn(
        'fixed top-0 left-0 w-full h-full z-0 overflow-hidden',
        isDark ? 'bg-gray-900' : 'bg-white'
      )}
    >
      <style>
        {`
          @keyframes gradient-move {
            0% {
              transform: translate(0px, 0px) rotate(0deg);
            }
            25% {
              transform: translate(10vw, 20vh) rotate(90deg);
            }
            50% {
              transform: translate(-20vw, -10vh) rotate(180deg);
            }
            75% {
              transform: translate(20vw, -20vh) rotate(270deg);
            }
            100% {
              transform: translate(0px, 0px) rotate(360deg);
            }
          }
        `}
      </style>
      <div className="relative w-full h-full opacity-30">
        <div
          className="absolute rounded-full filter blur-3xl"
          style={{
            width: 'clamp(300px, 50vw, 800px)',
            height: 'clamp(300px, 50vh, 800px)',
            top: '-20%',
            left: '-20%',
            background: 'radial-gradient(circle, hsl(var(--primary) / 0.5) 0%, transparent 70%)',
            animation: 'gradient-move 30s cubic-bezier(0.42, 0, 0.58, 1) infinite',
          }}
        />
        <div
          className="absolute rounded-full filter blur-3xl"
          style={{
            width: 'clamp(300px, 40vw, 700px)',
            height: 'clamp(300px, 40vh, 700px)',
            bottom: '-20%',
            right: '-20%',
            background: 'radial-gradient(circle, hsl(var(--accent) / 0.4) 0%, transparent 70%)',
            animation: 'gradient-move 35s cubic-bezier(0.42, 0, 0.58, 1) infinite reverse',
            animationDelay: '-5s',
          }}
        />
        <div
          className="absolute rounded-full filter blur-3xl"
          style={{
            width: 'clamp(200px, 30vw, 500px)',
            height: 'clamp(200px, 30vh, 500px)',
            bottom: '10%',
            left: '10%',
            background: 'radial-gradient(circle, hsl(var(--secondary) / 0.3) 0%, transparent 70%)',
            animation: 'gradient-move 40s cubic-bezier(0.42, 0, 0.58, 1) infinite',
            animationDelay: '-10s',
          }}
        />
      </div>
    </div>
  );
};

export default AnimatedBackground;
