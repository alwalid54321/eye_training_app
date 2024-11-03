import React, { useEffect, useState } from 'react';

interface BoxTrackerProps {
  speed: number;
  dotSize: number;
  dotColor: string;
  boxSize: number;
}

export const BoxTracker: React.FC<BoxTrackerProps> = ({ speed, dotSize, dotColor, boxSize }) => {
  const [boxPosition, setBoxPosition] = useState(0);
  const [dotPosition, setDotPosition] = useState({ x: 0, y: 0 });
  const [direction, setDirection] = useState(1);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const move = () => {
      setBoxPosition(prev => {
        const next = prev + direction * speed;
        if (next > window.innerWidth - boxSize) {
          setDirection(-1);
          return window.innerWidth - boxSize;
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
  }, [speed, direction, boxSize]);

  useEffect(() => {
    const moveDot = () => {
      setPhase(prev => (prev + speed) % 360);
      
      const x = boxPosition + (Math.sin(phase * Math.PI / 180) + 1) * (boxSize - dotSize) / 2;
      const y = (Math.cos(phase * Math.PI / 180) + 1) * (boxSize - dotSize) / 2;
      
      setDotPosition({ x, y });
    };

    const interval = setInterval(moveDot, 16);
    return () => clearInterval(interval);
  }, [speed, boxSize, dotSize, boxPosition, phase]);

  return (
    <div className="h-screen flex items-center">
      <div
        className="absolute border-2 border-[#00ff88]/30 rounded-lg cyber-glow"
        style={{
          width: `${boxSize}px`,
          height: `${boxSize}px`,
          left: `${boxPosition}px`,
        }}
      />
      <div
        className="absolute rounded-full cyber-glow"
        style={{
          width: `${dotSize}px`,
          height: `${dotSize}px`,
          backgroundColor: dotColor,
          left: `${dotPosition.x}px`,
          top: `${window.innerHeight/2 - boxSize/2 + dotPosition.y}px`,
        }}
      />
    </div>
  );
};