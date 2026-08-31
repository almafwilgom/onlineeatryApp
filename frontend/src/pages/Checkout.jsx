import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MapPin, Phone, User, MessageSquare, CreditCard, ShieldCheck, ArrowLeft, ArrowRight, Check, Plus, Minus, Tag, Clock, Headphones, Award } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { placeOrder } from '../services/orderService';
import OrderConfirmedModal from '../components/OrderConfirmedModal';
import ErrorMessage from '../components/ErrorMessage';

const Checkout = () => {
  const { items, total, updateQuantity, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: user?.name || 'John Doe',
    phoneNumber: user?.phone || '080 1234 5678',
    deliveryAddress: '12 Adekunle Street, Surulere, Lagos, Nigeria.',
    deliveryInstructions: 'Please ring the bell on arrival. Thank you!',
  });

  const [paymentMethod, setPaymentMethod] = useState('card');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  // Confirmed Modal state
  const [createdOrder, setCreatedOrder] = useState(null);
  const [showConfirmedModal, setShowConfirmedModal] = useState(false);

  const deliveryFee = items.length > 0 ? 1200 : 0;
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
        <Link to="/menu" className="inline-block px-6 py-2.5 bg-orange-500 text-white font-bold rounded-xl text-xs shadow-md">
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* ── 1. Step Progress Stepper (Matching Image 1) ────────────────── */}
      <div className="flex items-center justify-center gap-4 sm:gap-8 max-w-xl mx-auto text-xs font-bold text-stone-500">
        
        {/* Step 1: Your Cart */}
        <Link to="/cart" className="flex items-center gap-2 text-stone-700">
          <div className="w-7 h-7 rounded-full bg-stone-200 text-stone-700 flex items-center justify-center text-xs">
            <Check className="w-4 h-4 text-stone-700 stroke-[3]" />
          </div>
          <span>Your Cart</span>
        </Link>
        
        <div className="h-0.5 w-12 bg-orange-200" />

        {/* Step 2: Checkout (Active) */}
        <div className="flex items-center gap-2 text-orange-600 font-extrabold">
          <div className="w-7 h-7 rounded-full bg-orange-500 text-white flex items-center justify-center text-xs shadow-md">
            2
          </div>
          <span>Checkout</span>
        </div>

        <div className="h-0.5 w-12 bg-stone-200" />

        {/* Step 3: Payment */}
        <div className="flex items-center gap-2 text-stone-400">
          <div className="w-7 h-7 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center text-xs">
            3
          </div>
          <span>Payment</span>
        </div>

      </div>

      {/* ── 2. Two-Column Main Layout (Matching Image 1) ───────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Column (2 Cols): Delivery Information & Payment Method */}
        <div className="lg:col-span-2 space-y-6 text-left">
          
          <form onSubmit={handleSubmitOrder} className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-sm space-y-8">
            
            {/* Header */}
            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-black text-stone-900">Checkout</h1>
              <p className="text-stone-500 text-xs mt-1">Complete your order by providing your delivery details.</p>
            </div>

            <ErrorMessage message={error} />

            {/* Delivery Information Section */}
            <div className="space-y-4">
              <h3 className="font-display text-sm font-bold text-stone-900 border-b border-stone-100 pb-2">
                Delivery Information
              </h3>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Full Name</label>
                  <div className="relative">
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-white border border-stone-200 rounded-xl text-stone-900 text-xs focus:outline-none focus:border-orange-500 shadow-xs"
                    />
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Phone Number</label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      placeholder="080 1234 5678"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-white border border-stone-200 rounded-xl text-stone-900 text-xs focus:outline-none focus:border-orange-500 shadow-xs"
                    />
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Delivery Address</label>
                  <div className="relative">
                    <textarea
                      rows={2}
                      required
                      placeholder="12 Adekunle Street, Surulere, Lagos, Nigeria."
                      value={formData.deliveryAddress}
                      onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-white border border-stone-200 rounded-xl text-stone-900 text-xs focus:outline-none focus:border-orange-500 shadow-xs"
                    />
                    <MapPin className="absolute left-3.5 top-4 w-4 h-4 text-stone-400" />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Delivery Instructions (Optional)</label>
                  <div className="relative">
                    <textarea
                      rows={2}
                      placeholder="Please ring the bell on arrival. Thank you!"
                      value={formData.deliveryInstructions}
                      onChange={(e) => setFormData({ ...formData, deliveryInstructions: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 bg-white border border-stone-200 rounded-xl text-stone-900 text-xs focus:outline-none focus:border-orange-500 shadow-xs"
                    />
                    <MessageSquare className="absolute left-3.5 top-4 w-4 h-4 text-stone-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method Section (Matching Image 1) */}
            <div className="space-y-4 pt-2">
              <div>
                <h3 className="font-display text-sm font-bold text-stone-900">Payment Method</h3>
                <p className="text-[11px] text-stone-500">Choose a payment method</p>
              </div>

              <div className="space-y-3 text-xs">
                
                {/* Option 1: Card */}
                <div
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                    paymentMethod === 'card'
                      ? 'border-orange-500 bg-orange-50/20 ring-1 ring-orange-500'
                      : 'border-stone-200 bg-white hover:bg-stone-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === 'card' ? 'border-orange-500 bg-orange-500' : 'border-stone-300'}`}>
                      {paymentMethod === 'card' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <CreditCard className="w-4 h-4 text-stone-700" />
                    <div>
                      <strong className="block text-stone-900">Pay with Card</strong>
                      <span className="text-[11px] text-stone-500">Visa, Mastercard, Verve</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-black text-stone-800">
                    <span className="text-blue-700 italic">VISA</span>
                    <span className="text-red-600">mastercard</span>
                    <span className="text-emerald-700">Verve</span>
                  </div>
                </div>

                {/* Option 2: Bank Transfer */}
                <div
                  onClick={() => setPaymentMethod('transfer')}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                    paymentMethod === 'transfer'
                      ? 'border-orange-500 bg-orange-50/20 ring-1 ring-orange-500'
                      : 'border-stone-200 bg-white hover:bg-stone-50'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === 'transfer' ? 'border-orange-500 bg-orange-500' : 'border-stone-300'}`}>
                    {paymentMethod === 'transfer' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <span className="text-lg">🏛️</span>
                  <div>
                    <strong className="block text-stone-900">Bank Transfer</strong>
                    <span className="text-[11px] text-stone-500">Transfer directly from your bank</span>
                  </div>
                </div>

                {/* Option 3: Pay on Delivery */}
                <div
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                    paymentMethod === 'cod'
                      ? 'border-orange-500 bg-orange-50/20 ring-1 ring-orange-500'
                      : 'border-stone-200 bg-white hover:bg-stone-50'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${paymentMethod === 'cod' ? 'border-orange-500 bg-orange-500' : 'border-stone-300'}`}>
                    {paymentMethod === 'cod' && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <span className="text-lg">💵</span>
                  <div>
                    <strong className="block text-stone-900">Pay on Delivery</strong>
                    <span className="text-[11px] text-stone-500">Pay when you receive your order</span>
                  </div>
                </div>

              </div>

              {/* Security Banner (Matching Image 1) */}
              <div className="p-3.5 rounded-2xl bg-orange-50/60 border border-orange-200 flex items-center gap-3 text-xs text-orange-900">
                <ShieldCheck className="w-5 h-5 text-orange-600 flex-shrink-0" />
                <div>
                  <strong className="block text-stone-900">Your payment is secure</strong>
                  <span className="text-[11px] text-stone-600">We use industry-standard encryption to protect your information.</span>
                </div>
              </div>
            </div>

            {/* Bottom Controls */}
            <div className="pt-4 border-t border-stone-100 flex flex-col sm:flex-row items-center justify-between gap-4">
              <Link
                to="/cart"
                className="w-full sm:w-auto px-6 py-3 rounded-xl border border-stone-200 bg-white hover:bg-stone-50 text-stone-700 font-bold text-xs flex items-center justify-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" /> Back to Cart
              </Link>

              <button
                type="submit"
                disabled={loading}
                className={`w-full sm:w-auto px-10 py-3.5 rounded-xl font-extrabold text-xs transition-all flex items-center justify-center gap-2 shadow-lg ${
                  loading
                    ? 'bg-stone-200 text-stone-400 cursor-wait'
                    : 'bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/20 active:scale-95 cursor-pointer'
                }`}
              >
                <span>{loading ? 'Placing Order...' : 'Place Order'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <p className="text-[11px] text-stone-400 text-center pt-1">
              🔒 By placing this order, you agree to our <span className="underline cursor-pointer">Terms & Conditions</span>
            </p>

          </form>
        </div>

        {/* Right Column (1 Col): Order Summary Panel (Matching Image 1) */}
        <div className="space-y-6 text-left">
          
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-6">
            
            <div className="flex justify-between items-center pb-3 border-b border-stone-100">
              <h2 className="font-display text-base font-bold text-stone-900">Order Summary</h2>
              <Link to="/cart" className="text-xs font-bold text-orange-500 hover:underline">
                Edit Cart
              </Link>
            </div>

            {/* Cart Item rows (Matching Image 1) */}
            <div className="space-y-4 max-h-72 overflow-y-auto pr-1">
              {items.map((item) => (
                <div key={item._id} className="flex items-center gap-3 text-xs">
                  <img
                    src={item.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=150&q=80'}
                    alt={item.name}
                    className="w-14 h-14 rounded-xl object-cover border border-stone-200 flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display font-bold text-stone-900 truncate">{item.name}</h4>
                    <p className="text-[10px] text-stone-400 truncate">Delicious freshly prepared meal</p>
                    
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex items-center bg-stone-100 rounded-lg border border-stone-200 px-1 py-0.5">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          className="w-4 h-4 flex items-center justify-center text-stone-700 hover:bg-stone-200 rounded text-[10px]"
                        >
                          <Minus className="w-2.5 h-2.5" />
                        </button>
                        <span className="w-5 text-center text-[10px] font-bold text-stone-900">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="w-4 h-4 flex items-center justify-center text-stone-700 hover:bg-stone-200 rounded text-[10px]"
                        >
                          <Plus className="w-2.5 h-2.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  <span className="font-display font-black text-stone-950">
                    ₦{(item.price * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            {/* Subtotal & Delivery fee */}
            <div className="pt-4 border-t border-stone-100 space-y-2 text-xs">
              <div className="flex justify-between text-stone-600">
                <span>Subtotal</span>
                <span className="font-bold text-stone-900">₦{total.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-stone-600">
                <span>Delivery Fee ⓘ</span>
                <span className="font-bold text-stone-900">₦{deliveryFee.toLocaleString()}</span>
              </div>
            </div>

            {/* Total (Big Orange Font) */}
            <div className="pt-3 border-t border-stone-100 flex justify-between items-center">
              <span className="font-display text-sm font-bold text-stone-900">Total</span>
              <span className="font-display text-2xl font-black text-orange-500">
                ₦{grandTotal.toLocaleString()}
              </span>
            </div>

            {/* Promo Accordion */}
            <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center justify-between cursor-pointer">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-emerald-600" />
                <span>Have a promo code?</span>
              </div>
              <span>˅</span>
            </div>

            {/* Estimated Delivery Time Box (Matching Image 1) */}
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200/80 flex items-center gap-3">
              <span className="text-2xl">🛵</span>
              <div>
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block">Estimated Delivery Time</span>
                <strong className="text-sm font-black text-orange-600 block">30 – 45 mins</strong>
              </div>
            </div>

            {/* Trust Badges 3 Icons */}
            <div className="grid grid-cols-3 gap-2 text-center text-[10px] font-bold text-stone-600 pt-2 border-t border-stone-100">
              <div className="space-y-1">
                <ShieldCheck className="w-4 h-4 mx-auto text-stone-700" />
                <span>Secure Payment</span>
              </div>
              <div className="space-y-1">
                <Award className="w-4 h-4 mx-auto text-stone-700" />
                <span>100% Quality</span>
              </div>
              <div className="space-y-1">
                <Headphones className="w-4 h-4 mx-auto text-stone-700" />
                <span>24/7 Support</span>
              </div>
            </div>

          </div>

          {/* Need Help Box (Matching Image 1) */}
          <div className="bg-[#FFF7ED] border border-orange-200 rounded-3xl p-5 flex items-center gap-4 shadow-xs">
            <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center text-2xl shadow-md flex-shrink-0">
              👨‍🍳
            </div>
            <div>
              <h4 className="font-display text-xs font-bold text-stone-900">Need help?</h4>
              <p className="text-[11px] text-stone-500 mt-0.5">Our support team is here to help</p>
              <strong className="text-xs font-extrabold text-orange-600 block mt-1">0801 234 5678</strong>
            </div>
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
