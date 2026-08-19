import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

const ErrorMessage = ({ message = 'Something went wrong. Please try again.', onRetry }) => {
  return (
    <div className="bg-red-500/10 border border-red-500/30 rounded-2xl p-6 max-w-lg mx-auto text-center my-6 backdrop-blur-md">
      <div className="w-12 h-12 bg-red-500/20 text-red-400 rounded-full flex items-center justify-center mx-auto mb-3">
        <AlertTriangle size={24} />
      </div>
      <h3 className="text-lg font-semibold text-white mb-1">Error Occurred</h3>
      <p className="text-slate-300 text-sm mb-4">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="inline-flex items-center gap-2 px-4 py-2 bg-red-500 hover:bg-red-600 text-white font-medium text-sm rounded-xl transition-all shadow-lg shadow-red-500/20 active:scale-95 cursor-pointer"
        >
          <RefreshCw size={16} />
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;
