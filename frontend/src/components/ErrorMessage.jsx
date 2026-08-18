/**
 * ErrorMessage.jsx — consistent error display component.
 * @param {string} message - The error message to display.
 */
const ErrorMessage = ({ message }) => {
  if (!message) return null;
  return (
    <div className="bg-red-900/40 border border-red-500/50 text-red-300 px-4 py-3 rounded-lg text-sm" role="alert">
      {message}
    </div>
  );
};

export default ErrorMessage;
