'use client';

import { useTheme } from '@/context/ThemeProvider';
import React from 'react';

const AnimatedBackground = () => {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const bubbleColor = isDark ? 'rgba(20, 150, 255, 0.15)' : 'rgba(100, 180, 255, 0.2)';
  const particleColor = isDark ? 'rgba(173, 216, 230, 0.3)' : 'rgba(173, 216, 230, 0.5)';
  const godRayColor = isDark ? 'rgba(173, 216, 230, 0.08)' : 'rgba(173, 216, 230, 0.2)';

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
        backgroundColor: isDark ? 'hsl(222 84% 5%)' : 'hsl(210, 40%, 98%)',
      }}
    >
      <style>
        {`
          @keyframes rise {
            0% {
              transform: translateY(10vh) translateX(0);
              opacity: 0;
            }
            10% {
              opacity: 1;
            }
            90% {
              opacity: 1;
            }
            100% {
              transform: translateY(-110vh) translateX(var(--sway-x));
              opacity: 0;
            }
          }

          @keyframes drift {
            0% {
              transform: translate(0, 0);
            }
            50% {
              transform: translate(var(--drift-x), var(--drift-y));
            }
            100% {
              transform: translate(0, 0);
            }
          }
          
          @keyframes sway-rays {
            0% {
              transform: translateX(-15%) skewX(-25deg);
            }
            50% {
              transform: translateX(15%) skewX(-25deg);
            }
            100% {
                transform: translateX(-15%) skewX(-25deg);
            }
          }
        `}
      </style>
      
      {/* God Rays */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={`ray-${i}`}
            className="absolute -top-1/4 h-[150%]"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 10 + 5}px`,
              background: `linear-gradient(to bottom, ${godRayColor}, transparent)`,
              animation: `sway-rays ${Math.random() * 20 + 15}s ease-in-out infinite`,
              animationDelay: `${Math.random() * -30}s`
            }}
          />
        ))}
      </div>


      {/* Bubbles */}
      {Array.from({ length: 20 }).map((_, i) => {
        const size = Math.random() * 100 + 20;
        const duration = Math.random() * 30 + 25;
        const delay = Math.random() * -45;
        const left = Math.random() * 100;
        const swayX = (Math.random() - 0.5) * 200;

        return (
          <div
            key={`bubble-${i}`}
            style={{
              position: 'absolute',
              width: `${size}px`,
              height: `${size}px`,
              borderRadius: '50%',
              backgroundColor: bubbleColor,
              boxShadow: `0 0 ${size / 5}px ${bubbleColor}`,
              left: `${left}%`,
              bottom: `-${size}px`,
              animation: `rise ${duration}s linear infinite`,
              animationDelay: `${delay}s`,
              // @ts-ignore
              '--sway-x': `${swayX}px`,
            }}
          />
        );
      })}

       {/* Floating Particles */}
      {Array.from({ length: 50 }).map((_, i) => {
        const size = Math.random() * 3 + 1;
        const duration = Math.random() * 40 + 30; // Slower drift
        const delay = Math.random() * -50;
        const top = Math.random() * 100;
        const left = Math.random() * 100;
        const driftX = (Math.random() - 0.5) * 100;
        const driftY = (Math.random() - 0.5) * 100;

        return (
          <div
            key={`particle-${i}`}
            style={{
              position: 'absolute',
              width: `${size}px`,
              height: `${size}px`,
              borderRadius: '50%',
              backgroundColor: particleColor,
              boxShadow: `0 0 5px ${particleColor}`,
              top: `${top}%`,
              left: `${left}%`,
              animation: `drift ${duration}s ease-in-out infinite`,
              animationDelay: `${delay}s`,
              opacity: Math.random() * 0.5 + 0.2,
              // @ts-ignore
              '--drift-x': `${driftX}px`,
              '--drift-y': `${driftY}px`,
            }}
          />
        );
      })}

    </div>
  );
};

export default AnimatedBackground;
