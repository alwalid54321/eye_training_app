import React, { useState, useEffect, useCallback } from 'react';

interface ColorRecognitionProps {
  speed: number;
  dotSize: number;
}

const COLORS = ['#008aff', '#ff0000', '#00ff00', '#ffff00', '#ff00ff'];

export const ColorRecognition: React.FC<ColorRecognitionProps> = ({
  speed,
  dotSize
}) => {
  const [targets, setTargets] = useState<Array<{
    id: number;
    x: number;
    y: number;
    color: string;
    visible: boolean;
  }>>([]);
  const [score, setScore] = useState(0);
  const [targetColor, setTargetColor] = useState(COLORS[0]);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isActive, setIsActive] = useState(true);

  const spawnTarget = useCallback(() => {
    const x = Math.random() * (window.innerWidth - dotSize);
    const y = Math.random() * (window.innerHeight - dotSize);
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    
    setTargets(prev => [...prev, {
      id: Date.now(),
      x,
      y,
      color,
      visible: true
    }]);

    setTimeout(() => {
      setTargets(prev => prev.filter(t => t.id !== Date.now()));
    }, (2000 / speed));
  }, [dotSize, speed]);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(spawnTarget, 1000 / speed);
    const colorInterval = setInterval(() => {
      setTargetColor(COLORS[Math.floor(Math.random() * COLORS.length)]);
    }, 5000);
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          setIsActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(interval);
      clearInterval(colorInterval);
      clearInterval(timer);
    };
  }, [speed, spawnTarget, isActive]);

  const handleClick = (target: { id: number; color: string }) => {
    if (target.color === targetColor) {
      setScore(prev => prev + 1);
      const flash = document.createElement('div');
      flash.className = 'reaction-flash';
      document.body.appendChild(flash);
      setTimeout(() => flash.remove(), 500);
    } else {
      setScore(prev => Math.max(0, prev - 1));
    }
    setTargets(prev => prev.filter(t => t.id !== target.id));
  };

  return (
    <div className="relative h-screen">
      <div className="timer-bar" style={{ width: `${(timeLeft / 60) * 100}%` }} />
      <div className="score-display">Score: {score}</div>
      
      <div className="fixed top-4 left-1/2 -translate-x-1/2 cyber-panel">
        <span className="cyber-text">Click all </span>
        <span className="font-bold" style={{ color: targetColor }}>
          {targetColor === '#008aff' ? 'BLUE' :
           targetColor === '#ff0000' ? 'RED' :
           targetColor === '#00ff00' ? 'GREEN' :
           targetColor === '#ffff00' ? 'YELLOW' :
           'PURPLE'} dots
        </span>
      </div>

      {targets.map(target => (
        <div
          key={target.id}
          className="target cyber-glow"
          style={{
            width: `${dotSize}px`,
            height: `${dotSize}px`,
            backgroundColor: target.color,
            left: `${target.x}px`,
            top: `${target.y}px`,
            opacity: target.visible ? 1 : 0,
          }}
          onClick={() => handleClick(target)}
        />
      ))}

      {!isActive && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div className="cyber-panel text-center">
            <h2 className="cyber-text text-2xl mb-4">Time's Up!</h2>
            <p className="text-xl mb-4">Final Score: {score}</p>
            <button
              className="cyber-button px-4 py-2 border border-[#008aff] text-[#008aff] rounded"
              onClick={() => window.location.reload()}
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};