import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Plus, Check } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import fallbackMealImage from '../assets/hero.png';

const MealCard = ({ meal }) => {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(meal);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const defaultImage = fallbackMealImage;

  return (
    <div className="group bg-white rounded-3xl border border-stone-200/90 shadow-xs hover:shadow-md hover:border-orange-300 transition-all duration-200 flex flex-col justify-between p-3 h-full">
      
      {/* Dish Image Container */}
      <Link to={`/menu/${meal._id}`} className="block relative aspect-4/3 bg-stone-900 rounded-2xl overflow-hidden flex-shrink-0">
        <img
          src={meal.imageUrl || defaultImage}
          alt={meal.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultImage;
          }}
        />

        {/* Rating Pill Tag */}
        <div className="absolute bottom-2.5 left-2.5 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full flex items-center gap-1 shadow-sm text-[11px] font-black text-stone-900">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span>4.8</span>
        </div>
      </Link>

      {/* Content details */}
      <div className="pt-3 space-y-2 flex-1 flex flex-col justify-between">
        <Link to={`/menu/${meal._id}`} className="block">
          <h3 className="font-display font-bold text-xs sm:text-sm text-stone-900 group-hover:text-orange-600 transition-colors line-clamp-2 leading-snug">
            {meal.name}
          </h3>
        </Link>

        {/* Bottom Row: Price + Add Button (Fully Visible & Un-clipped) */}
        <div className="pt-1 flex items-center justify-between gap-2 border-t border-stone-100">
          <span className="font-display font-black text-stone-950 text-sm sm:text-base">
            ₦{Number(meal.price).toLocaleString()}
          </span>

          <button
            onClick={handleAddToCart}
            disabled={!meal.isAvailable}
            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center transition-all flex-shrink-0 shadow-sm cursor-pointer ${
              !meal.isAvailable
                ? 'bg-stone-100 text-stone-300 cursor-not-allowed'
                : added
                ? 'bg-emerald-500 text-white scale-105'
                : 'bg-orange-500 hover:bg-orange-600 active:scale-90 text-white shadow-orange-500/20'
            }`}
            title={meal.isAvailable ? 'Add to Cart' : 'Sold Out'}
          >
            {added ? (
              <Check className="w-4 h-4 stroke-[3]" />
            ) : (
              <Plus className="w-4 h-4 stroke-[3]" />
            )}
          </button>
        </div>
      </div>

    </div>
  );
};

export default MealCard;
