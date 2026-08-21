import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const Cart = () => {
  const { items, updateQuantity, removeItem, clearCart, total } = useCart();

  const deliveryFee = items.length > 0 ? 500 : 0;
  const grandTotal = total + deliveryFee;

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6 bg-slate-100">
        <div className="w-24 h-24 mx-auto rounded-full bg-white border border-slate-200 flex items-center justify-center text-5xl shadow-sm">
          🛒
        </div>
        <h1 className="text-3xl font-black text-slate-900">Your Shopping Cart is Empty</h1>
        <p className="text-slate-500 text-sm max-w-sm mx-auto">
          Explore our menu and add your favorite dishes to get started!
        </p>
        <Link
          to="/menu"
          className="inline-block px-8 py-3.5 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-base shadow-xl shadow-orange-500/10 transition-all"
        >
          Browse Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 bg-slate-100">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900">Shopping Cart</h1>
          <p className="text-slate-500 text-sm mt-1">Review your selected items before checkout</p>
        </div>

        <button
          onClick={clearCart}
          className="text-xs font-bold text-rose-600 bg-rose-50 hover:bg-rose-100 border border-rose-200 px-4 py-2.5 rounded-xl transition-all"
        >
          Clear Entire Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={item._id}
              className="bg-white border border-slate-200/80 rounded-2xl p-5 flex flex-col sm:flex-row items-center gap-5 shadow-sm"
            >
              <div className="w-20 h-20 rounded-xl bg-slate-100 overflow-hidden flex-shrink-0">
                {item.imageUrl ? (
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=200&q=80';
                    }}
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-3xl">
                    🍲
                  </div>
                )}
              </div>

              <div className="flex-1 text-center sm:text-left space-y-1">
                <h3 className="text-base font-bold text-slate-800">{item.name}</h3>
                <span className="text-xs text-orange-600 font-bold block">
                  ₦{Number(item.price).toLocaleString()} each
                </span>
              </div>

              {/* Quantity Controls */}
              <div className="flex items-center gap-3">
                <div className="flex items-center bg-slate-50 rounded-xl border border-slate-200 p-1">
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity - 1)}
                    className="w-7 h-7 rounded-lg bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-center border border-slate-200"
                  >
                    -
                  </button>
                  <span className="w-10 text-center text-xs font-bold text-slate-900">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                    className="w-7 h-7 rounded-lg bg-white hover:bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-center border border-slate-200"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={() => removeItem(item._id)}
                  className="p-2 text-slate-400 hover:text-rose-600 text-sm transition-colors"
                  title="Remove item"
                >
                  🗑️
                </button>
              </div>

              {/* Item Total */}
              <div className="text-right min-w-[90px]">
                <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">Subtotal</span>
                <span className="text-base font-extrabold text-slate-900">
                  ₦{(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Summary Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm space-y-6 h-fit text-slate-700">
          <h2 className="text-xl font-bold text-slate-900">Order Summary</h2>

          <div className="space-y-3 text-sm border-b border-slate-100 pb-4">
            <div className="flex justify-between text-slate-500">
              <span>Items Subtotal</span>
              <span className="font-semibold text-slate-900">₦{total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-slate-500">
              <span>Estimated Delivery Fee</span>
              <span className="font-semibold text-slate-900">₦{deliveryFee.toLocaleString()}</span>
            </div>
          </div>

          <div className="flex justify-between items-center text-base font-black text-slate-900">
            <span>Total</span>
            <span className="text-2xl text-orange-600">₦{grandTotal.toLocaleString()}</span>
          </div>

          <Link
            to="/checkout"
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-base text-center block shadow-xl shadow-orange-500/10 transition-all transform hover:-translate-y-0.5"
          >
            Proceed to Checkout ➔
          </Link>

          <Link
            to="/menu"
            className="w-full text-center block text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
          >
            ← Continue Shopping
          </Link>
        </div>

      </div>

    </div>
  );
};

export default Cart;
