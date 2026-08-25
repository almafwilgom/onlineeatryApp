import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Heart, Plus, Minus, Check } from 'lucide-react';
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
  const [added, setAdded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchMeal = async () => {
      try {
        setLoading(true);
        const res = await getMenuItem(id);
        setMeal(res.data?.data?.item || null);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load meal details.');
      } finally {
        setLoading(false);
      }
    };
    fetchMeal();
  }, [id]);

  const handleAddToCart = () => {
    if (!meal) return;
    for (let i = 0; i < quantity; i++) {
      addItem(meal);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (loading) return <LoadingSpinner />;

  if (error || !meal) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center space-y-4">
        <ErrorMessage message={error || 'Meal not found.'} />
        <button
          onClick={() => navigate('/menu')}
          className="px-6 py-2.5 bg-orange-500 text-white font-bold rounded-xl text-xs"
        >
          Back to Menu
        </button>
      </div>
    );
  }

  const totalPrice = meal.price * quantity;

  return (
    <div className="max-w-xl mx-auto px-4 py-4 space-y-6 pb-28">
      
      {/* Top Header Controls (Matching reference screen 3) */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => navigate(-1)}
          className="p-2.5 rounded-full bg-white border border-stone-200 text-stone-700 hover:bg-stone-100 transition-colors shadow-xs"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="font-display text-sm font-bold text-stone-900">Meal Details</h1>
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className={`p-2.5 rounded-full border transition-all shadow-xs ${
            isFavorite ? 'bg-rose-50 border-rose-200 text-rose-500' : 'bg-white border-stone-200 text-stone-400 hover:text-rose-500'
          }`}
        >
          <Heart className={`w-5 h-5 ${isFavorite ? 'fill-rose-500' : ''}`} />
        </button>
      </div>

      {/* Large Food Image Card (Matching reference screen 3) */}
      <div className="relative aspect-4/3 rounded-3xl overflow-hidden bg-stone-900 border border-stone-200 shadow-md">
        <img
          src={meal.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'}
          alt={meal.name}
          className="w-full h-full object-cover"
        />
        {!meal.isAvailable && (
          <div className="absolute inset-0 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center">
            <span className="px-4 py-2 bg-rose-600 text-white font-bold text-xs rounded-full uppercase tracking-wider">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Title, Rating & Price */}
      <div className="space-y-4 text-left">
        <div>
          <h2 className="font-display text-2xl font-black text-stone-900">{meal.name}</h2>
          
          <div className="flex items-center gap-1.5 mt-1">
            <Star className="w-4 h-4 fill-emerald-500 text-emerald-500" />
            <span className="text-xs font-extrabold text-stone-900">4.8</span>
            <span className="text-xs text-stone-400">(230 reviews)</span>
          </div>
        </div>

        <div className="text-3xl font-black text-stone-950 font-display">
          ₦{Number(meal.price).toLocaleString()}
        </div>

        <p className="text-stone-500 text-xs leading-relaxed">
          {meal.description || 'Smoky party jollof rice cooked to perfection and served with grilled chicken.'}
        </p>

        {/* Quantity Selector */}
        <div className="space-y-2 pt-2">
          <label className="block text-xs font-bold text-stone-700">
            Quantity
          </label>
          <div className="flex items-center bg-stone-100 rounded-2xl border border-stone-200 p-1 w-fit">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-stone-700 font-bold"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-12 text-center font-display font-black text-sm text-stone-900">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-9 h-9 rounded-xl bg-white flex items-center justify-center text-stone-700 font-bold"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Fixed Bottom CTA Button (Matching reference screen 3) */}
      <div className="fixed bottom-16 md:bottom-6 left-0 right-0 max-w-xl mx-auto px-4 z-30">
        <button
          onClick={handleAddToCart}
          disabled={!meal.isAvailable}
          className={`w-full py-4 rounded-2xl font-extrabold text-sm transition-all flex items-center justify-center gap-2 shadow-xl ${
            !meal.isAvailable
              ? 'bg-stone-200 text-stone-400 cursor-not-allowed'
              : added
              ? 'bg-emerald-500 text-white shadow-emerald-500/20'
              : 'bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/30 active:scale-95'
          }`}
        >
          {added ? (
            <>
              <Check className="w-5 h-5 stroke-[3]" /> Added to Cart!
            </>
          ) : (
            <>
              Add to Cart — ₦{totalPrice.toLocaleString()}
            </>
          )}
        </button>
      </div>

    </div>
  );
};

export default MealDetails;
