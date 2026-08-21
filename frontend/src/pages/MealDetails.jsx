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
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-slate-100">
      
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-slate-800 mb-8 transition-colors"
      >
        ← Back to Menu
      </button>

      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-md grid grid-cols-1 md:grid-cols-2 gap-0">
        
        {/* Image Side */}
        <div className="relative bg-slate-100 h-80 md:h-auto min-h-[320px]">
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
            <div className="w-full h-full flex items-center justify-center text-7xl bg-slate-200">
              🍲
            </div>
          )}

          <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-orange-600 text-xs font-bold px-3 py-1 rounded-full border border-orange-500/10 shadow-sm">
            {meal.category}
          </span>
        </div>

        {/* Info Side */}
        <div className="p-8 sm:p-10 flex flex-col justify-between space-y-6 text-slate-700">
          <div className="space-y-4">
            
            <div className="flex items-center justify-between gap-4">
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                meal.isAvailable
                  ? 'bg-emerald-50 text-emerald-600 border border-emerald-250'
                  : 'bg-rose-5 text-rose-600 border border-rose-250'
              }`}>
                {meal.isAvailable ? 'In Stock' : 'Sold Out'}
              </span>
              <span className="text-xs text-slate-400">ID: {meal._id?.substring(0, 8)}...</span>
            </div>

            <h1 className="text-3xl font-black text-slate-900">{meal.name}</h1>

            <p className="text-2xl font-black text-orange-600">
              ₦{Number(meal.price).toLocaleString()}
            </p>

            <p className="text-slate-600 text-sm leading-relaxed">
              {meal.description}
            </p>

          </div>

          {/* Quantity Selector & Add to Cart */}
          <div className="pt-6 border-t border-slate-100 space-y-6">
            
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-slate-800">Quantity</span>
              <div className="flex items-center bg-slate-50 rounded-xl border border-slate-200 p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-9 h-9 rounded-lg bg-white hover:bg-slate-100 text-slate-800 font-bold text-base flex items-center justify-center transition-colors border border-slate-200"
                >
                  -
                </button>
                <span className="w-12 text-center text-sm font-bold text-slate-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-9 h-9 rounded-lg bg-white hover:bg-slate-100 text-slate-800 font-bold text-base flex items-center justify-center transition-colors border border-slate-200"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-slate-500">
              <span>Item Subtotal:</span>
              <span className="text-base font-extrabold text-slate-900">
                ₦{(meal.price * quantity).toLocaleString()}
              </span>
            </div>

            <button
              onClick={handleAddToCart}
              disabled={!meal.isAvailable}
              className={`w-full py-4 rounded-2xl font-bold text-base transition-all flex items-center justify-center gap-2 shadow-xl ${
                meal.isAvailable
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-orange-500/10 active:scale-95'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
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
