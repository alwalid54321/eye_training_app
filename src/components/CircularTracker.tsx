import React, { useEffect, useState } from 'react';

interface CircularTrackerProps {
  speed: number;
  dotSize: number;
  dotColor: string;
  radius: number;
}

export const CircularTracker: React.FC<CircularTrackerProps> = ({
  speed,
  dotSize,
  dotColor,
  radius
}) => {
  const [angle, setAngle] = useState(0);
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  useEffect(() => {
    const move = () => {
      setAngle(prev => (prev + speed) % 360);
    };

    const interval = setInterval(move, 16);
    return () => clearInterval(interval);
  }, [speed]);

  const x = centerX + Math.cos(angle * Math.PI / 180) * radius;
  const y = centerY + Math.sin(angle * Math.PI / 180) * radius;

  return (
    <div className="h-screen flex items-center justify-center">
      {/* Path indicator */}
      <div 
        className="absolute border-2 border-[#00ff88]/20 rounded-full"
        style={{
          width: radius * 2,
          height: radius * 2,
        }}
      />
      {/* Moving dot */}
      <div
        className="absolute rounded-full cyber-glow transition-all duration-75"
        style={{
          width: `${dotSize}px`,
          height: `${dotSize}px`,
          backgroundColor: dotColor,
          left: `${x - dotSize/2}px`,
          top: `${y - dotSize/2}px`,
        }}
      />
    </div>
  );
};