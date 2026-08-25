import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MapPin, CreditCard, ArrowRight } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { placeOrder } from '../services/orderService';
import OrderConfirmedModal from '../components/OrderConfirmedModal';
import ErrorMessage from '../components/ErrorMessage';

const Checkout = () => {
  const { items, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    phoneNumber: user?.phone || '',
    deliveryAddress: '',
    deliveryInstructions: '',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Confirmed Modal state
  const [createdOrder, setCreatedOrder] = useState(null);
  const [showConfirmedModal, setShowConfirmedModal] = useState(false);

  const deliveryFee = items.length > 0 ? 500 : 0;
  const grandTotal = total + deliveryFee;

  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    if (!formData.deliveryAddress.trim()) {
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

      const payload = {
        items: items.map((i) => ({ menuItem: i._id, quantity: i.quantity })),
        deliveryAddress: `${formData.deliveryAddress.trim()}${
          formData.deliveryInstructions ? ` (Note: ${formData.deliveryInstructions.trim()})` : ''
        }`,
      };

      const res = await placeOrder(payload);
      const order = res.data?.data?.order;
      
      clearCart();
      setCreatedOrder(order);
      setShowConfirmedModal(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0 && !showConfirmedModal) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-display text-2xl font-bold text-stone-900">Your Cart is Empty</h2>
        <p className="text-stone-500 text-xs">Add some items before attempting to checkout.</p>
        <Link to="/menu" className="inline-block px-6 py-2.5 bg-orange-500 text-white font-bold rounded-xl text-xs">
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <div>
        <h1 className="font-display text-3xl sm:text-4xl font-black text-stone-900">Checkout</h1>
        <p className="text-stone-500 text-xs mt-1">Complete your delivery address and order details</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Delivery Information Form (Matching reference image) */}
        <div className="lg:col-span-2">
          <form onSubmit={handleSubmitOrder} className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-5">
            
            <h2 className="font-display text-base font-bold text-stone-900 flex items-center gap-2 pb-3 border-b border-stone-100">
              <MapPin className="w-4 h-4 text-orange-500" /> Delivery Information
            </h2>

            <ErrorMessage message={error} />

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. John Doe"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-xs focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 080 1234 5678"
                  value={formData.phoneNumber}
                  onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-xs focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Delivery Address *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="e.g. 12 Allen Avenue, Surulere, Lagos, Nigeria."
                  value={formData.deliveryAddress}
                  onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                  className="w-full p-4 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-xs focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Delivery Instructions (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Ring the bell on arrival."
                  value={formData.deliveryInstructions}
                  onChange={(e) => setFormData({ ...formData, deliveryInstructions: e.target.value })}
                  className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-xs focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>

            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-center gap-2.5 text-xs text-stone-600">
              <CreditCard className="w-4 h-4 text-stone-500 flex-shrink-0" />
              <span>Payment mode: <strong>Pay on Delivery (Cash / POS Terminal)</strong>.</span>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-2xl font-extrabold text-xs transition-all shadow-lg ${
                loading
                  ? 'bg-stone-200 text-stone-400 cursor-wait'
                  : 'bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/20 active:scale-95'
              }`}
            >
              {loading ? 'Placing Order...' : 'Place Order'}
            </button>

          </form>
        </div>

        {/* Order Summary Panel */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-6 h-fit text-stone-700">
          <h2 className="font-display text-base font-bold text-stone-900 pb-3 border-b border-stone-100">
            Order Summary
          </h2>

          <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1 text-xs">
            {items.map((item) => (
              <div key={item._id} className="flex justify-between items-center text-stone-700">
                <span className="truncate max-w-[170px] font-medium">
                  {item.name} x {item.quantity}
                </span>
                <span className="font-bold text-stone-900">
                  ₦{(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-stone-100 space-y-2 text-xs">
            <div className="flex justify-between text-stone-500">
              <span>Items Subtotal</span>
              <span className="font-bold text-stone-900">₦{total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-stone-500">
              <span>Delivery Fee</span>
              <span className="font-bold text-stone-900">₦{deliveryFee.toLocaleString()}</span>
            </div>
          </div>

          <div className="pt-3 border-t border-stone-100 flex justify-between items-center">
            <span className="font-display text-sm font-bold text-stone-900">Total</span>
            <span className="font-display text-2xl font-black text-orange-600">
              ₦{grandTotal.toLocaleString()}
            </span>
          </div>

        </div>

      </div>

      {/* Order Confirmed Screen Dialog */}
      <OrderConfirmedModal
        isOpen={showConfirmedModal}
        orderId={createdOrder?._id}
        userName={user?.name || formData.fullName}
        onClose={() => setShowConfirmedModal(false)}
      />

    </div>
  );
};

export default Checkout;
