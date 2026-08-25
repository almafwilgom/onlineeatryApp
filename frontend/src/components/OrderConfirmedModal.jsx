import { Link } from 'react-router-dom';
import { Check } from 'lucide-react';

const OrderConfirmedModal = ({ isOpen, orderId, userName, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl p-8 max-w-sm w-full text-center space-y-6 shadow-2xl animate-in zoom-in-95 duration-200">
        
        {/* Animated Green Check Circle matching reference image */}
        <div className="relative mx-auto w-24 h-24">
          <div className="w-24 h-24 rounded-full bg-emerald-500 text-white flex items-center justify-center text-4xl shadow-xl shadow-emerald-500/30 animate-bounce">
            <Check className="w-12 h-12 stroke-[3]" />
          </div>
          <div className="absolute -inset-3 rounded-full border-2 border-dashed border-emerald-400/50 animate-spin-slow" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-black text-stone-900">Thank you, {userName || 'Customer'}!</h2>
          <p className="text-xs text-stone-500 leading-relaxed">
            Your order <strong className="text-stone-900 font-mono">#{orderId?.substring(orderId.length - 8) || 'CONFIRMED'}</strong> has been received and is being prepared.
          </p>
        </div>

        {/* Estimated time widget */}
        <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 space-y-1">
          <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">
            Estimated Preparation Time
          </span>
          <span className="text-xl font-black text-orange-600 block">
            20 – 30 mins
          </span>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <Link
            to="/orders"
            onClick={onClose}
            className="w-full block py-3.5 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs shadow-lg shadow-orange-500/30 transition-all transform hover:scale-[1.02] active:scale-95"
          >
            Track Order
          </Link>
          <Link
            to="/menu"
            onClick={onClose}
            className="w-full block py-3 rounded-2xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs transition-all"
          >
            Continue Shopping
          </Link>
        </div>

      </div>
    </div>
  );
};

export default OrderConfirmedModal;
