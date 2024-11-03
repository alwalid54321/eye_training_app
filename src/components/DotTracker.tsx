import React, { useEffect, useState } from 'react';

interface DotTrackerProps {
  speed: number;
  dotSize: number;
  dotColor: string;
}

export const DotTracker: React.FC<DotTrackerProps> = ({ speed, dotSize, dotColor }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [target, setTarget] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const moveRandomly = () => {
      setTarget({
        x: Math.random() * (window.innerWidth - dotSize),
        y: Math.random() * (window.innerHeight - dotSize),
      });
    };

    const interval = setInterval(moveRandomly, 2000 / speed);
    return () => clearInterval(interval);
  }, [speed, dotSize]);

  useEffect(() => {
    const animate = () => {
      setPosition(prev => ({
        x: prev.x + (target.x - prev.x) * 0.05,
        y: prev.y + (target.y - prev.y) * 0.05,
      }));
    };

    const animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [target]);

  return (
    <div 
      className="absolute rounded-full cyber-glow transition-all duration-75"
      style={{
        width: `${dotSize}px`,
        height: `${dotSize}px`,
        backgroundColor: dotColor,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    />
  );
};