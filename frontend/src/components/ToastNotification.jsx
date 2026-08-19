import { useCart } from '../contexts/CartContext';

const ToastNotification = () => {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-4 duration-300">
      <div className="bg-slate-900 border border-orange-500/40 text-white px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 backdrop-blur-md">
        <span className="text-lg">✅</span>
        <p className="text-sm font-semibold">{toastMessage}</p>
      </div>
    </div>
  );
};

export default ToastNotification;
