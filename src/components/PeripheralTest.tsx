import React, { useState, useEffect, useCallback } from 'react';

interface PeripheralTestProps {
  speed: number;
  dotSize: number;
  dotColor: string;
}

export const PeripheralTest: React.FC<PeripheralTestProps> = ({
  speed,
  dotSize,
  dotColor
}) => {
  const [targets, setTargets] = useState<Array<{ id: number; x: number; y: number; visible: boolean }>>([]);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [isActive, setIsActive] = useState(true);

  const spawnTarget = useCallback(() => {
    const x = Math.random() * (window.innerWidth - dotSize);
    const y = Math.random() * (window.innerHeight - dotSize);
    
    setTargets(prev => [...prev, {
      id: Date.now(),
      x,
      y,
      visible: true
    }]);

    // Remove target after random time if not clicked
    setTimeout(() => {
      setTargets(prev => prev.filter(t => t.id !== Date.now()));
    }, (3000 / speed));
  }, [dotSize, speed]);

  useEffect(() => {
    if (!isActive) return;

    const interval = setInterval(spawnTarget, 1000 / speed);
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
      clearInterval(timer);
    };
  }, [speed, spawnTarget, isActive]);

  const handleClick = (targetId: number) => {
    setTargets(prev => prev.filter(t => t.id !== targetId));
    setScore(prev => prev + 1);
    
    // Create hit effect
    const flash = document.createElement('div');
    flash.className = 'reaction-flash';
    document.body.appendChild(flash);
    setTimeout(() => flash.remove(), 500);
  };

  return (
    <div className="relative h-screen">
      <div className="timer-bar" style={{ width: `${(timeLeft / 60) * 100}%` }} />
      <div className="score-display">Score: {score}</div>
      
      {targets.map(target => (
        <div
          key={target.id}
          className="target cyber-glow"
          style={{
            width: `${dotSize}px`,
            height: `${dotSize}px`,
            backgroundColor: dotColor,
            left: `${target.x}px`,
            top: `${target.y}px`,
            opacity: target.visible ? 1 : 0,
          }}
          onClick={() => handleClick(target.id)}
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