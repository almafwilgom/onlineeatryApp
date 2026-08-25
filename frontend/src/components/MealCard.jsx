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
    <div className="group bg-white rounded-3xl border border-stone-200/80 overflow-hidden shadow-sm hover:shadow-md hover:border-orange-200 transition-all duration-200 flex flex-col justify-between">
      
      {/* Image container */}
      <Link to={`/menu/${meal._id}`} className="block relative aspect-4/3 bg-stone-100 overflow-hidden">
        <img
          src={meal.imageUrl || defaultImage}
          alt={meal.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = defaultImage;
          }}
        />

        {/* Category tag */}
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-md text-stone-800 text-[10px] font-extrabold px-2.5 py-1 rounded-full shadow-sm">
          {meal.category}
        </span>

        {/* Rating tag (matching reference image) */}
        <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md px-2 py-0.5 rounded-full flex items-center gap-1 shadow-sm text-[11px] font-bold text-stone-800">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span>4.8</span>
        </div>
      </Link>

      {/* Content details */}
      <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
        <div>
          <Link to={`/menu/${meal._id}`} className="block">
            <h3 className="font-display font-bold text-sm text-stone-900 group-hover:text-orange-600 transition-colors line-clamp-1">
              {meal.name}
            </h3>
          </Link>
          <p className="text-stone-500 text-xs mt-1 line-clamp-2 leading-relaxed">
            {meal.description || 'Deliciously prepared authentic meal made with fresh ingredients.'}
          </p>
        </div>

        {/* Price & Add button footer */}
        <div className="flex items-center justify-between pt-2 border-t border-stone-100">
          <div>
            <span className="text-[10px] text-stone-400 font-bold block uppercase tracking-wider">Price</span>
            <span className="font-display font-black text-stone-950 text-base">
              ₦{Number(meal.price).toLocaleString()}
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!meal.isAvailable}
            className={`w-9 h-9 rounded-full flex items-center justify-center transition-all ${
              !meal.isAvailable
                ? 'bg-stone-100 text-stone-300 cursor-not-allowed'
                : added
                ? 'bg-emerald-500 text-white shadow-md shadow-emerald-500/30'
                : 'bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-500/20 active:scale-90'
            }`}
            title={meal.isAvailable ? 'Add to Cart' : 'Sold Out'}
          >
            {added ? <Check className="w-4 h-4 stroke-[3]" /> : <Plus className="w-4 h-4 stroke-[3]" />}
          </button>
        </div>
      </div>

    </div>
  );
};

export default MealCard;
