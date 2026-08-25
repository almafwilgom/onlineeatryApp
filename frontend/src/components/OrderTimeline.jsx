import { Check } from 'lucide-react';

const steps = ['Pending', 'Preparing', 'Out for Delivery', 'Delivered'];

const OrderTimeline = ({ currentStatus, createdAt }) => {
  const getStepIndex = (status) => {
    switch (status) {
      case 'Pending': return 0;
      case 'Preparing': return 1;
      case 'Out for Delivery': return 2;
      case 'Delivered': return 3;
      case 'Cancelled': return -1;
      default: return 0;
    }
  };

  const currentIndex = getStepIndex(currentStatus);

  if (currentStatus === 'Cancelled') {
    return (
      <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
        <span>❌ Order Cancelled</span>
      </div>
    );
  }

  return (
    <div className="space-y-6 py-2">
      {steps.map((step, idx) => {
        const isPassed = idx < currentIndex;
        const isCurrent = idx === currentIndex;
        const isPending = idx > currentIndex;

        return (
          <div key={step} className="flex items-start gap-3.5 relative">
            {/* Connecting line */}
            {idx < steps.length - 1 && (
              <div
                className={`absolute left-3.5 top-7 bottom-0 w-0.5 -ml-px ${
                  idx < currentIndex ? 'bg-emerald-500' : 'bg-stone-200'
                }`}
              />
            )}

            {/* Icon status circle (Matching reference screen 7) */}
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold z-10 flex-shrink-0 transition-all ${
                isPassed
                  ? 'bg-emerald-500 text-white shadow-xs'
                  : isCurrent
                  ? 'bg-orange-500 text-white ring-4 ring-orange-100 shadow-xs'
                  : 'bg-white border-2 border-stone-300 text-stone-300'
              }`}
            >
              {isPassed ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : isCurrent ? '●' : '○'}
            </div>

            {/* Label & Details */}
            <div className="min-w-0 pt-0.5">
              <p
                className={`text-xs font-bold ${
                  isCurrent ? 'text-stone-900 font-extrabold' : isPassed ? 'text-stone-800' : 'text-stone-400'
                }`}
              >
                {step === 'Pending' ? 'Order Placed' : step}
              </p>
              {(isPassed || isCurrent) && (
                <p className="text-[11px] text-stone-400 mt-0.5">
                  {createdAt ? new Date(createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' }) + ', ' + new Date(createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Aug 19, 10:30 AM'}
                </p>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderTimeline;
