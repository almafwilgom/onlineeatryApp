import { Link } from 'react-router-dom';
import { ShoppingBag, Plus, Minus, Trash2, ArrowRight, X } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const CartDrawer = () => {
  const { items, isCartOpen, closeCart, updateQuantity, removeItem, total, itemCount, clearCart } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-stone-950/50 backdrop-blur-xs transition-opacity"
        onClick={closeCart}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white border-l border-stone-200 shadow-2xl flex flex-col text-stone-800">
          
          {/* Header */}
          <div className="p-6 border-b border-stone-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-orange-500" />
              <h2 className="font-display font-bold text-base text-stone-900">Your Cart</h2>
              <span className="bg-orange-100 text-orange-700 text-xs font-bold px-2.5 py-0.5 rounded-full">
                {itemCount} {itemCount === 1 ? 'item' : 'items'}
              </span>
            </div>

            <button
              onClick={closeCart}
              className="p-2 rounded-xl text-stone-400 hover:text-stone-700 hover:bg-stone-50 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-stone-400 space-y-4">
                <div className="w-20 h-20 rounded-full bg-stone-100 border border-stone-200 flex items-center justify-center text-4xl shadow-xs">
                  <ShoppingBag className="w-10 h-10 text-stone-400" />
                </div>
                <div>
                  <p className="text-stone-900 font-display font-bold text-base">Your cart is empty</p>
                  <p className="text-xs text-stone-500 mt-1 max-w-xs">
                    Looks like you haven't added any delicious meals yet.
                  </p>
                </div>
                <Link
                  to="/menu"
                  onClick={closeCart}
                  className="mt-2 px-6 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs transition-all shadow-lg shadow-orange-500/20"
                >
                  Browse Menu
                </Link>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item._id}
                  className="bg-stone-50 rounded-2xl p-4 border border-stone-200/80 flex items-center gap-4 shadow-xs"
                >
                  {/* Thumbnail */}
                  <div className="w-16 h-16 rounded-xl bg-stone-200 overflow-hidden flex-shrink-0 border border-stone-200">
                    <img
                      src={item.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=200&q=80'}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Info & Quantity controls */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-display text-xs font-bold text-stone-900 truncate">{item.name}</h4>
                    <p className="text-xs text-orange-600 font-extrabold mt-0.5">
                      ₦{Number(item.price).toLocaleString()}
                    </p>

                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center bg-white rounded-lg border border-stone-200 px-1 py-0.5 shadow-xs">
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity - 1)}
                          className="w-5 h-5 flex items-center justify-center text-stone-700 hover:bg-stone-100 rounded font-bold text-xs"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-bold text-stone-900">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item._id, item.quantity + 1)}
                          className="w-5 h-5 flex items-center justify-center text-stone-700 hover:bg-stone-100 rounded font-bold text-xs"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item._id)}
                        className="text-stone-400 hover:text-rose-500 p-1 transition-colors"
                        title="Remove Item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="text-right">
                    <span className="text-[10px] text-stone-400 block font-bold uppercase tracking-wider">Total</span>
                    <span className="font-display text-xs font-black text-stone-950">
                      ₦{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="p-6 border-t border-stone-100 bg-stone-50 space-y-4">
              <div className="flex justify-between items-center text-xs">
                <span className="text-stone-500 font-semibold">Subtotal</span>
                <span className="font-display text-xl font-black text-stone-950">
                  ₦{total.toLocaleString()}
                </span>
              </div>
              <p className="text-[11px] text-stone-400">
                Taxes and delivery fees calculated at checkout.
              </p>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <Link
                  to="/cart"
                  onClick={closeCart}
                  className="w-full py-3 rounded-xl bg-white hover:bg-stone-100 text-stone-700 font-bold text-xs text-center transition-all border border-stone-200 shadow-xs"
                >
                  View Cart
                </Link>

                <Link
                  to="/checkout"
                  onClick={closeCart}
                  className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs text-center shadow-md shadow-orange-500/20 transition-all flex items-center justify-center gap-1.5"
                >
                  <span>Checkout</span> <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <button
                onClick={clearCart}
                className="w-full text-center text-xs text-rose-500 hover:text-rose-600 pt-1 transition-colors font-bold"
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
