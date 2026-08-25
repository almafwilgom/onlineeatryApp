import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Plus, Check } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

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

  const defaultImage = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80';

  return (
    <div className="group bg-white rounded-3xl border border-stone-200/80 overflow-hidden shadow-xs hover:shadow-md hover:border-orange-200 transition-all duration-200 flex flex-col justify-between p-2.5">
      
      {/* Dish Image Container */}
      <Link to={`/menu/${meal._id}`} className="block relative aspect-square bg-stone-900 rounded-2xl overflow-hidden">
        <img
          src={meal.imageUrl || defaultImage}
          alt={meal.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultImage;
          }}
        />

        {/* Rating Pill Tag (Matching reference image ★ 4.8) */}
        <div className="absolute bottom-2 left-2 bg-white/95 backdrop-blur-md px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs text-[10px] font-extrabold text-stone-900">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span>4.8</span>
        </div>
      </Link>

      {/* Content details */}
      <div className="pt-3 px-1 space-y-1 flex-1 flex flex-col justify-between">
        <div>
          <Link to={`/menu/${meal._id}`} className="block">
            <h3 className="font-display font-bold text-xs sm:text-sm text-stone-900 group-hover:text-orange-600 transition-colors line-clamp-1">
              {meal.name}
            </h3>
          </Link>
          <p className="font-display font-black text-stone-950 text-xs sm:text-sm mt-0.5">
            ₦{Number(meal.price).toLocaleString()}
          </p>
        </div>

        {/* Quick Add Button */}
        <div className="pt-2 flex justify-end">
          <button
            onClick={handleAddToCart}
            disabled={!meal.isAvailable}
            className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
              !meal.isAvailable
                ? 'bg-stone-100 text-stone-300 cursor-not-allowed'
                : added
                ? 'bg-emerald-500 text-white shadow-xs'
                : 'bg-orange-500 hover:bg-orange-600 text-white shadow-xs active:scale-90'
            }`}
            title={meal.isAvailable ? 'Add to Cart' : 'Sold Out'}
          >
            {added ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : <Plus className="w-3.5 h-3.5 stroke-[3]" />}
          </button>
        </div>
      </div>

    </div>
  );
};

export default MealCard;
