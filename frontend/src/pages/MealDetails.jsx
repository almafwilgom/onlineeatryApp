import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getMenuItem } from '../services/menuService';
import { useCart } from '../contexts/CartContext';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const MealDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [meal, setMeal] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        setLoading(true);
        const res = await getMenuItem(id);
        setMeal(res.data?.data?.item);
      } catch (err) {
        setError(err.response?.data?.message || 'Meal details not found.');
      } finally {
        setLoading(false);
      }
    };
    fetchMeal();
  }, [id]);

  const handleAddToCart = () => {
    if (meal && meal.isAvailable) {
      addItem(meal, quantity);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <div className="max-w-4xl mx-auto p-8"><ErrorMessage message={error} /></div>;
  if (!meal) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-white mb-8 transition-colors"
      >
        ← Back to Menu
      </button>

      <div className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 md:grid-cols-2 gap-0">
        
        {/* Image Side */}
        <div className="relative bg-slate-800 h-80 md:h-auto min-h-[320px]">
          {meal.imageUrl ? (
            <img
              src={meal.imageUrl}
              alt={meal.name}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80';
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-7xl bg-gradient-to-br from-slate-800 to-slate-900">
              🍲
            </div>
          )}

          <span className="absolute top-4 left-4 bg-slate-950/80 backdrop-blur-md text-orange-400 text-xs font-bold px-3 py-1 rounded-full border border-orange-500/20">
            {meal.category}
          </span>
        </div>

        {/* Info Side */}
        <div className="p-8 sm:p-10 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            
            <div className="flex items-center justify-between gap-4">
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                meal.isAvailable
                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                  : 'bg-red-500/20 text-red-400 border border-red-500/30'
              }`}>
                {meal.isAvailable ? 'In Stock' : 'Sold Out'}
              </span>
              <span className="text-xs text-slate-500">ID: {meal._id?.substring(0, 8)}...</span>
            </div>

            <h1 className="text-3xl font-black text-white">{meal.name}</h1>

            <p className="text-2xl font-black text-orange-400">
              ₦{Number(meal.price).toLocaleString()}
            </p>

            <p className="text-slate-300 text-sm leading-relaxed">
              {meal.description}
            </p>

          </div>

          {/* Quantity Selector & Add to Cart */}
          <div className="pt-6 border-t border-slate-800 space-y-6">
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-300">Quantity</span>
              <div className="flex items-center bg-slate-950 rounded-xl border border-slate-800 p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-base flex items-center justify-center transition-colors"
                >
                  -
                </button>
                <span className="w-12 text-center text-sm font-bold text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-9 h-9 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-bold text-base flex items-center justify-center transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-400">
              <span>Item Subtotal:</span>
              <span className="text-base font-extrabold text-white">
                ₦{(meal.price * quantity).toLocaleString()}
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!meal.isAvailable}
              className={`w-full py-4 rounded-2xl font-bold text-base transition-all flex items-center justify-center gap-2 shadow-xl ${
                meal.isAvailable
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-orange-500/20 active:scale-95'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
              }`}
            >
              <span>🛒</span> Add {quantity} {quantity === 1 ? 'Item' : 'Items'} to Cart
            </button>

          </div>

        </div>

      </div>

    </div>
  );
};

export default MealDetails;
