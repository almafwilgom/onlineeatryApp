/**
 * CartContext.jsx — manages the shopping cart state.
 *
 * Provides:
 *  - items          : array of { _id, name, price, imageUrl, quantity }
 *  - addItem(meal)  : add a meal or increment its quantity
 *  - removeItem(id) : remove a meal completely
 *  - updateQuantity(id, qty) : set exact quantity; qty <= 0 removes the item
 *  - clearCart()    : empty the cart (called after successful checkout)
 *  - total          : computed total price
 *  - itemCount      : total number of items (for navbar badge)
 *
 * Persisted to localStorage so the cart survives page refreshes.
 *
 * Full implementation in Phase 7.
 */
import { createContext, useState, useEffect, useContext } from 'react';

export const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const stored = localStorage.getItem('cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Persist cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(items));
  }, [items]);

  const addItem = (meal) => {
    setItems((prev) => {
      const existing = prev.find((i) => i._id === meal._id);
      if (existing) {
        return prev.map((i) =>
          i._id === meal._id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...meal, quantity: 1 }];
    });
  };

  const removeItem = (id) => {
    setItems((prev) => prev.filter((i) => i._id !== id));
  };

  const updateQuantity = (id, qty) => {
    if (qty <= 0) return removeItem(id);
    setItems((prev) =>
      prev.map((i) => (i._id === id ? { ...i, quantity: qty } : i))
    );
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem('cart');
  };

  const total = items.reduce((sum, i) => sum + i.price * i.quantity, 0);
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, total, itemCount }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for convenient access
export const useCart = () => useContext(CartContext);
