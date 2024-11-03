import React from 'react';

interface ControlsProps {
  exercise: string;
  setExercise: (value: any) => void;
  speed: number;
  setSpeed: (value: number) => void;
  dotSize: number;
  setDotSize: (value: number) => void;
  dotColor: string;
  setDotColor: (value: string) => void;
  boxSize: number;
  setBoxSize: (value: number) => void;
  radius: number;
  setRadius: (value: number) => void;
}

export const Controls: React.FC<ControlsProps> = ({
  exercise,
  setExercise,
  speed,
  setSpeed,
  dotSize,
  setDotSize,
  dotColor,
  setDotColor,
  boxSize,
  setBoxSize,
  radius,
  setRadius,
}) => {
  return (
    <div className="fixed top-0 left-0 right-0 p-6 backdrop-blur-xl bg-black/30 border-b border-[#008aff]/30 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold cyber-text">Vision Training System</h1>
          <div className="cyber-badge">v2.0</div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="cyber-panel">
            <label className="cyber-label">Exercise Type</label>
            <select 
              value={exercise}
              onChange={(e) => setExercise(e.target.value)}
              className="cyber-select"
            >
              <option value="random">Random Movement</option>
              <option value="linear">Linear Path</option>
              <option value="box">Box Tracking</option>
              <option value="circular">Circular Motion</option>
              <option value="peripheral">Peripheral Vision</option>
              <option value="color">Color Recognition</option>
            </select>
          </div>

          <div className="cyber-panel">
            <label className="cyber-label">Speed Control</label>
            <div className="flex items-center gap-3">
              <input 
                type="range" 
                min="1" 
                max="10" 
                value={speed}
                onChange={(e) => setSpeed(Number(e.target.value))}
                className="cyber-range flex-grow"
              />
              <span className="cyber-value">{speed}</span>
            </div>
          </div>

          <div className="cyber-panel">
            <label className="cyber-label">Dot Size</label>
            <div className="flex items-center gap-3">
              <input 
                type="range" 
                min="5" 
                max="50" 
                value={dotSize}
                onChange={(e) => setDotSize(Number(e.target.value))}
                className="cyber-range flex-grow"
              />
              <span className="cyber-value">{dotSize}px</span>
            </div>
          </div>

          {exercise !== 'color' && (
            <div className="cyber-panel">
              <label className="cyber-label">Color</label>
              <div className="flex items-center gap-3">
                <input 
                  type="color" 
                  value={dotColor}
                  onChange={(e) => setDotColor(e.target.value)}
                  className="cyber-color-input"
                />
                <span className="cyber-value uppercase">{dotColor}</span>
              </div>
            </div>
          )}

          {exercise === 'box' && (
            <div className="cyber-panel">
              <label className="cyber-label">Box Size</label>
              <div className="flex items-center gap-3">
                <input 
                  type="range" 
                  min="50" 
                  max="300" 
                  value={boxSize}
                  onChange={(e) => setBoxSize(Number(e.target.value))}
                  className="cyber-range flex-grow"
                />
                <span className="cyber-value">{boxSize}px</span>
              </div>
            </div>
          )}

          {exercise === 'circular' && (
            <div className="cyber-panel">
              <label className="cyber-label">Radius</label>
              <div className="flex items-center gap-3">
                <input 
                  type="range" 
                  min="50" 
                  max="300" 
                  value={radius}
                  onChange={(e) => setRadius(Number(e.target.value))}
                  className="cyber-range flex-grow"
                />
                <span className="cyber-value">{radius}px</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};