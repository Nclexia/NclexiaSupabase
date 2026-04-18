'use client';

import { useEffect, useState } from 'react';

type DonutProps = {
  score: number; // 0 - 100
};

export default function ResponsiveAnimatedDonut({ score }: DonutProps) {
  const [animatedScore, setAnimatedScore] = useState(0);

  const radius = 22;
  const stroke = 5;
  const normalizedRadius = radius - stroke / 2;
  const circumference = 2 * Math.PI * normalizedRadius;

  const offset = circumference - (animatedScore / 100) * circumference;

  // Animate score from 0 → score
  useEffect(() => {
    let frame = 0;
    const frames = 30;
    const step = score / frames;

    const animate = () => {
      frame++;
      const newScore = Math.min(score, Math.round(step * frame));
      setAnimatedScore(newScore);
      if (frame < frames) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  }, [score]);

  return (
    <div className="relative w-full max-w-[160px] aspect-square">
      <svg viewBox="0 0 120 120" className="w-full h-full transform -rotate-90">
        {/* Background Circle */}
        <circle
          cx="60"
          cy="60"
          r={normalizedRadius}
          stroke="#e5e7eb" // gray-200
          strokeWidth={stroke}
          fill="transparent"
        />
        {/* Animated Progress Circle */}
        <circle
          cx="60"
          cy="60"
          r={normalizedRadius}
          stroke="#22c55e" // green-500
          strokeWidth={stroke}
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-300"
        />
      </svg>

      {/* Centered Score Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-sm font-bold ">
          {animatedScore}%
        </span>
      </div>
    </div>
  );
}
