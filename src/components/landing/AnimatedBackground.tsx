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
        isDark ? 'bg-[#0A102D]' : 'bg-[#E0E8F9]'
      )}
    >
      <style>
        {`
          @keyframes move-stars {
            from { transform: translateY(0px); }
            to { transform: translateY(-2000px); }
          }
          .stars {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            height: 100%;
            display: block;
            background: transparent;
            animation: move-stars 200s linear infinite;
          }
          .stars:after {
            content: " ";
            position: absolute;
            top: 2000px;
            width: 100%;
            height: 100%;
            background: transparent;
          }
        `}
      </style>
      <div id="stars-container" className="absolute top-0 left-0 w-full h-full">
         <StarLayer size="1px" count={600} duration={50} isDark={isDark} />
         <StarLayer size="2px" count={200} duration={100} isDark={isDark} />
         <StarLayer size="3px" count={100} duration={150} isDark={isDark} />
      </div>
    </div>
  );
};

const StarLayer = ({ count, size, duration, isDark }: { count: number, size: string, duration: number, isDark: boolean }) => {
  const [shadow, setShadow] = React.useState('');

  React.useEffect(() => {
    let newShadow = '';
    for (let i = 0; i < count; i++) {
      newShadow += `${Math.random() * 2000}px ${Math.random() * 2000}px ${isDark ? '#FFF' : '#1E3A8A'}, `;
    }
    newShadow = newShadow.slice(0, -2);
    setShadow(newShadow);
  }, [count, isDark]);

  return (
     <div className="stars" style={{
        boxShadow: shadow,
        width: size,
        height: size,
        animationDuration: `${duration}s`,
     }} />
  )
}


export default AnimatedBackground;
