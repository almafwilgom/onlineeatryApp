/**
 * LoadingSpinner.jsx — full-page loading indicator.
 * Displayed while authentication state is being restored.
 */
const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-slate-900">
    <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
  </div>
);

export default LoadingSpinner;
