'use client';

import { useTheme } from '@/context/ThemeProvider';
import React from 'react';

const AnimatedBackground = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const bubbleColor = isDark ? 'rgba(20, 150, 255, 0.15)' : 'rgba(100, 180, 255, 0.2)';

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        overflow: 'hidden',
        backgroundColor: isDark ? 'hsl(222 84% 5%)' : 'hsl(220 13% 96%)',
      }}
    >
      <style>
        {`
          @keyframes rise {
            0% {
              transform: translateY(0) translateX(0);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            90% {
                opacity: 1;
            }
            100% {
              transform: translateY(-120vh) translateX(var(--sway-x));
              opacity: 0;
            }
          }
        `}
      </style>
      {Array.from({ length: 25 }).map((_, i) => {
        const size = Math.random() * 120 + 20;
        const duration = Math.random() * 30 + 20; // 20-50 seconds
        const delay = Math.random() * -40;
        const left = Math.random() * 100;
        const swayX = (Math.random() - 0.5) * 200; // -100px to +100px

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: `${size}px`,
              height: `${size}px`,
              borderRadius: '50%',
              backgroundColor: bubbleColor,
              boxShadow: `0 0 ${size / 5}px ${bubbleColor}`,
              left: `${left}%`,
              bottom: `-${size}px`, // Start from below the viewport
              animation: `rise ${duration}s linear infinite`,
              animationDelay: `${delay}s`,
              // @ts-ignore
              '--sway-x': `${swayX}px`,
            }}
          />
        );
      })}
    </div>
  );
};

export default AnimatedBackground;
