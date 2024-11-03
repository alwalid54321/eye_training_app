import React, { useEffect, useState } from 'react';

interface LinearTrackerProps {
  speed: number;
  dotSize: number;
  dotColor: string;
}

export const LinearTracker: React.FC<LinearTrackerProps> = ({ speed, dotSize, dotColor }) => {
  const [position, setPosition] = useState(0);
  const [direction, setDirection] = useState(1);

  useEffect(() => {
    const move = () => {
      setPosition(prev => {
        const next = prev + direction * speed;
        if (next > window.innerWidth - dotSize) {
          setDirection(-1);
          return window.innerWidth - dotSize;
        }
        if (next < 0) {
          setDirection(1);
          return 0;
        }
        return next;
      });
    };

    const interval = setInterval(move, 16);
    return () => clearInterval(interval);
  }, [speed, direction, dotSize]);

  return (
    <div className="h-screen flex items-center">
      <div className="absolute w-full h-px bg-[#00ff88]/20 cyber-glow" />
      <div
        className="absolute rounded-full cyber-glow transition-all duration-75"
        style={{
          width: `${dotSize}px`,
          height: `${dotSize}px`,
          backgroundColor: dotColor,
          left: `${position}px`,
        }}
      />
    </div>
  );
};