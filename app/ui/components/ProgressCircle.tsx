import React from 'react';

type ProgressCircleProps = {
  progress?: number;
};

const ProgressCircle: React.FC<ProgressCircleProps> = ({ progress }) => {
  const radius = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset =
    circumference - ((progress || 1) / 100) * circumference;

  return (
    <svg className="h-6 w-6">
      <circle
        cx="10"
        cy="10"
        r={radius}
        stroke="lightgray"
        strokeWidth="2"
        fill="none"
      />
      <circle
        cx="10"
        cy="10"
        r={radius}
        stroke="#f08080"
        strokeWidth="2"
        strokeDasharray={circumference}
        strokeDashoffset={strokeDashoffset}
        fill="none"
        className="transition-all duration-300"
      />
    </svg>
  );
};

export default ProgressCircle;
