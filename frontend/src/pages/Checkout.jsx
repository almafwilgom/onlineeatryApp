import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { placeOrder } from '../services/orderService';
import ErrorMessage from '../components/ErrorMessage';

const Checkout = () => {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();

  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const deliveryFee = items.length > 0 ? 500 : 0;
  const grandTotal = total + deliveryFee;

  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    if (!deliveryAddress.trim()) {
      setError('Please provide a complete delivery address.');
      return;
    }

    if (items.length === 0) {
      setError('Your cart is empty.');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Format payload for backend: [{ menuItem: id, quantity: n }]
      const payload = {
        items: items.map((i) => ({ menuItem: i._id, quantity: i.quantity })),
        deliveryAddress: deliveryAddress.trim(),
      };

      const res = await placeOrder(payload);
      
      // Clear cart & navigate to my-orders page
      clearCart();
      navigate('/orders', { state: { newOrderCreated: true, orderId: res.data?.data?.order?._id } });
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Your Cart is Empty</h2>
        <p className="text-slate-400 text-sm">Add some items before attempting to checkout.</p>
        <Link to="/menu" className="inline-block px-6 py-2.5 bg-orange-500 text-white font-bold rounded-xl text-sm">
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      <div>
        <h1 className="text-3xl sm:text-4xl font-black text-white">Checkout</h1>
        <p className="text-slate-400 text-sm mt-1">Provide your delivery address to complete your order</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Delivery Address Form */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmitOrder} className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
            
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <span>📍</span> Delivery Information
            </h2>

            <ErrorMessage message={error} />

            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                Full Delivery Address *
              </label>
              <textarea
                rows={4}
                required
                placeholder="e.g. House 14, Admiralty Way, Lekki Phase 1, Lagos, Nigeria"
                value={deliveryAddress}
                onChange={(e) => setDeliveryAddress(e.target.value)}
                className="w-full p-4 bg-slate-950 border border-slate-800 rounded-2xl text-white text-sm focus:outline-none focus:border-orange-500 transition-colors"
              />
              <p className="text-[11px] text-slate-500">
                Please include house number, street name, area, and city for fast delivery.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex items-center gap-3 text-xs text-slate-400">
              <span className="text-lg">💳</span>
              <span>Payment mode: <strong>Pay on Delivery / Terminal</strong> upon order arrival.</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-2xl font-extrabold text-base transition-all shadow-xl ${
                loading
                  ? 'bg-slate-800 text-slate-500 cursor-wait'
                  : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-orange-500/20 active:scale-95'
              }`}
            >
              {loading ? 'Processing Order...' : 'Confirm & Place Order ➔'}
            </button>

          </form>
        </div>

        {/* Order Breakdown */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6 h-fit">
          <h2 className="text-xl font-bold text-white">Your Order</h2>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {items.map((item) => (
              <div key={item._id} className="flex justify-between items-center text-xs text-slate-300">
                <span className="truncate max-w-[160px]">
                  {item.quantity}x {item.name}
                </span>
                <span className="font-semibold text-white">
                  ₦{(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Items Subtotal</span>
              <span className="font-semibold text-white">₦{total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Delivery Fee</span>
              <span className="font-semibold text-white">₦{deliveryFee.toLocaleString()}</span>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 flex justify-between items-center">
            <span className="text-sm font-bold text-white">Total Amount</span>
            <span className="text-xl font-black text-orange-400">₦{grandTotal.toLocaleString()}</span>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Checkout;
