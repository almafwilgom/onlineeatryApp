import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

const ErrorMessage = ({ message, onRetry }) => {
  if (!message) return null;

  return (
    <div className="bg-rose-50 border border-rose-200 rounded-2xl p-4 max-w-lg mx-auto text-left my-4 shadow-xs flex items-start gap-3">
      <div className="w-8 h-8 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
        <AlertCircle size={18} />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-xs font-bold text-rose-900 uppercase tracking-wider">Something went wrong</h4>
        <p className="text-stone-700 text-xs mt-0.5 leading-relaxed">{message}</p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs rounded-xl transition-all shadow-xs active:scale-95 cursor-pointer"
          >
            <RefreshCw size={14} />
            Try Again
          </button>
        )}
      </div>
    </div>
  );
};

export default ErrorMessage;
