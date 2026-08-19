import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const CartDrawer = () => {
  const { items, isCartOpen, closeCart, updateQuantity, removeItem, total, itemCount, clearCart } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col text-slate-200">
          
          {/* Header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xl">🛒</span>
              <h2 className="text-lg font-bold text-white">Your Cart</h2>
              <span className="bg-orange-500/10 text-orange-400 border border-orange-500/20 text-xs font-bold px-2.5 py-0.5 rounded-full">
                {itemCount} {itemCount === 1 ? 'item' : 'items'}
              </span>
            </div>

            <button
              onClick={closeCart}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-400 space-y-4">
                <div className="w-20 h-20 rounded-full bg-slate-800/80 flex items-center justify-center text-4xl">
                  🍱
                </div>
                <div>
                  <p className="text-white font-bold text-lg">Your cart is empty</p>
                  <p className="text-xs text-slate-400 mt-1 max-w-xs">
                    Looks like you haven't added any delicious meals yet.
                  </p>
                </div>
                <Link
                  to="/menu"
                  onClick={closeCart}
                  className="mt-2 px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm transition-all shadow-lg shadow-orange-500/20"
                >
                  Browse Menu
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item._id}
                  className="bg-slate-800/60 rounded-xl p-4 border border-slate-700/50 flex items-center gap-4"
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-lg bg-slate-700 overflow-hidden flex-shrink-0">
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
                      <div className="w-full h-full flex items-center justify-center text-2xl">
                        🍛
                      </div>
                    )}
                  </div>

                  {/* Info & Quantity controls */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-white truncate">{item.name}</h4>
                    <p className="text-xs text-orange-400 font-semibold mt-0.5">
                      ₦{Number(item.price).toLocaleString()}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center bg-slate-900 rounded-lg border border-slate-700 px-1 py-0.5">
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 rounded font-bold text-xs"
                        >
                          -
                        </button>
                        <span className="w-8 text-center text-xs font-bold text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-slate-300 hover:text-white hover:bg-slate-800 rounded font-bold text-xs"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item._id)}
                        className="text-xs text-red-400 hover:text-red-300 p-1"
                        title="Remove Item"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>

                  {/* Subtotal for this item */}
                  <div className="text-right">
                    <span className="text-xs text-slate-400 block">Total</span>
                    <span className="text-sm font-extrabold text-white">
                      ₦{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Subtotal & Checkout */}
          {items.length > 0 && (
            <div className="p-6 border-t border-slate-800 bg-slate-950/60 space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-400">Subtotal</span>
                <span className="text-xl font-black text-white">
                  ₦{total.toLocaleString()}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Taxes and delivery fees calculated at checkout.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <Link
                  to="/cart"
                  onClick={closeCart}
                  className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-sm text-center transition-all border border-slate-700"
                >
                  View Cart Page
                </Link>

                <Link
                  to="/checkout"
                  onClick={closeCart}
                  className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-sm text-center shadow-lg shadow-orange-500/20 transition-all transform hover:-translate-y-0.5"
                >
                  Checkout ➔
                </Link>
              </div>

              <button
                onClick={clearCart}
                className="w-full text-center text-xs text-slate-400 hover:text-red-400 pt-1 transition-colors"
              >
                Clear Cart
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default CartDrawer;
