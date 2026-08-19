import React from 'react';

const LoadingSpinner = ({ text = 'Loading...' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 min-h-[300px]">
      <div className="relative w-16 h-16">
        <div className="absolute top-0 left-0 w-full h-full border-4 border-orange-500/20 rounded-full animate-ping"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-t-orange-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
      </div>
      <p className="mt-4 text-slate-400 text-sm font-medium tracking-wide animate-pulse">{text}</p>
    </div>
  );
};

export default LoadingSpinner;
