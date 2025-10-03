'use client';

import { useTheme } from '@/context/ThemeProvider';
import React from 'react';

const AnimatedBackground = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const circleColor = isDark ? 'rgba(15, 163, 129, 0.2)' : 'rgba(16, 185, 129, 0.2)';

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
          @keyframes move {
            0% { transform: translateY(0); }
            100% { transform: translateY(-2000px) translateX(200px); }
          }
        `}
      </style>
      {Array.from({ length: 15 }).map((_, i) => {
        const size = Math.random() * 200 + 50;
        const duration = Math.random() * 40 + 20;
        const delay = Math.random() * -20;
        const left = Math.random() * 100;
        const top = Math.random() * 100 + 100;

        return (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: `${size}px`,
              height: `${size}px`,
              borderRadius: '50%',
              backgroundColor: circleColor,
              left: `${left}%`,
              top: `${top}%`,
              animation: `move ${duration}s linear infinite`,
              animationDelay: `${delay}s`,
            }}
          />
        );
      })}
    </div>
  );
};

export default AnimatedBackground;
