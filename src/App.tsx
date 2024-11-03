import React, { useState } from 'react';
import { DotTracker } from './components/DotTracker';
import { LinearTracker } from './components/LinearTracker';
import { BoxTracker } from './components/BoxTracker';
import { CircularTracker } from './components/CircularTracker';
import { PeripheralTest } from './components/PeripheralTest';
import { ColorRecognition } from './components/ColorRecognition';
import { Controls } from './components/Controls';

type ExerciseType = 'random' | 'linear' | 'box' | 'circular' | 'peripheral' | 'color';

function App() {
  const [exercise, setExercise] = useState<ExerciseType>('random');
  const [speed, setSpeed] = useState(2);
  const [dotSize, setDotSize] = useState(20);
  const [dotColor, setDotColor] = useState('#008aff');
  const [boxSize, setBoxSize] = useState(100);
  const [radius, setRadius] = useState(150);

  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white overflow-hidden relative">
      <div className="absolute inset-0 bg-grid opacity-20"></div>
      
      <Controls
        exercise={exercise}
        setExercise={setExercise}
        speed={speed}
        setSpeed={setSpeed}
        dotSize={dotSize}
        setDotSize={setDotSize}
        dotColor={dotColor}
        setDotColor={setDotColor}
        boxSize={boxSize}
        setBoxSize={setBoxSize}
        radius={radius}
        setRadius={setRadius}
      />

      <div className="pt-40">
        {exercise === 'random' && (
          <DotTracker speed={speed} dotSize={dotSize} dotColor={dotColor} />
        )}
        {exercise === 'linear' && (
          <LinearTracker speed={speed} dotSize={dotSize} dotColor={dotColor} />
        )}
        {exercise === 'box' && (
          <BoxTracker 
            speed={speed} 
            dotSize={dotSize} 
            dotColor={dotColor} 
            boxSize={boxSize}
          />
        )}
        {exercise === 'circular' && (
          <CircularTracker 
            speed={speed}
            dotSize={dotSize}
            dotColor={dotColor}
            radius={radius}
          />
        )}
        {exercise === 'peripheral' && (
          <PeripheralTest
            speed={speed}
            dotSize={dotSize}
            dotColor={dotColor}
          />
        )}
        {exercise === 'color' && (
          <ColorRecognition
            speed={speed}
            dotSize={dotSize}
          />
        )}
      </div>
    </div>
  );
}