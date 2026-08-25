import { Link } from 'react-router-dom';
import { ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const Cart = () => {
  const { items, total, itemCount, updateQuantity, removeItem, clearCart } = useCart();

  const deliveryFee = items.length > 0 ? 500 : 0;
  const grandTotal = total + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-20 h-20 mx-auto rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center text-4xl shadow-sm text-stone-400">
          <ShoppingBag className="w-10 h-10 text-stone-400" />
        </div>
        <h2 className="font-display text-2xl font-bold text-stone-900">Your Cart is Empty</h2>
        <p className="text-stone-500 text-xs max-w-xs mx-auto">
          Discover something delicious and add it to your order.
        </p>
        <Link
          to="/menu"
          className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-orange-500/20 transition-all"
        >
          <span>Browse Menu</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-black text-stone-900">Shopping Cart</h1>
          <p className="text-stone-500 text-xs mt-1">Review your selected items before checkout</p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs font-bold text-rose-500 hover:text-rose-600 px-3 py-1.5 rounded-lg hover:bg-rose-50 transition-colors"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-white rounded-3xl p-4 sm:p-5 border border-stone-200 shadow-sm flex items-center gap-4 hover:border-stone-300 transition-all"
            >
              {/* Image thumbnail */}
              <div className="w-20 h-20 rounded-2xl bg-stone-100 overflow-hidden flex-shrink-0 border border-stone-200">
                <img
                  src={item.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=200&q=80'}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Title & Controls */}
              <div className="flex-1 min-w-0 space-y-2">
                <div className="flex justify-between items-start gap-2">
                  <h3 className="font-display font-bold text-sm text-stone-900 truncate">
                    {item.name}
                  </h3>
                  <button
                    onClick={() => removeItem(item._id)}
                    className="text-stone-400 hover:text-rose-500 transition-colors p-1"
                    title="Remove Item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-display font-black text-stone-950 text-sm">
                    ₦{(item.price * item.quantity).toLocaleString()}
                  </span>

                  {/* Quantity controls */}
                  <div className="flex items-center bg-stone-100 rounded-xl border border-stone-200 p-0.5">
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-stone-700 hover:bg-stone-50 font-bold text-xs shadow-xs"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="w-8 text-center text-xs font-bold text-stone-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      className="w-7 h-7 rounded-lg bg-white flex items-center justify-center text-stone-700 hover:bg-stone-50 font-bold text-xs shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Order Summary Panel (Matching reference design) */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-6 h-fit">
          <h2 className="font-display text-lg font-bold text-stone-900 pb-3 border-b border-stone-100">
            Order Summary
          </h2>

          <div className="space-y-3 text-xs text-stone-600">
            <div className="flex justify-between">
              <span>Subtotal ({itemCount} items)</span>
              <span className="font-bold text-stone-900">₦{total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Fee</span>
              <span className="font-bold text-stone-900">₦{deliveryFee.toLocaleString()}</span>
            </div>
          </div>

          <div className="pt-4 border-t border-stone-100 flex justify-between items-center">
            <span className="font-display text-sm font-bold text-stone-900">Total</span>
            <span className="font-display text-2xl font-black text-orange-600">
              ₦{grandTotal.toLocaleString()}
            </span>
          </div>

          <Link
            to="/checkout"
            className="w-full py-4 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs text-center flex items-center justify-center gap-2 shadow-lg shadow-orange-500/20 transition-all transform hover:scale-[1.01] active:scale-95"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

      </div>

    </div>
  );
};

export default Cart;
