import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const MealCard = ({ meal }) => {
  const { addItem } = useCart();

  if (!meal) return null;

  const { _id, name, description, price, category, imageUrl, isAvailable } = meal;

  return (
    <div className="group bg-slate-900/80 rounded-2xl overflow-hidden border border-slate-800 hover:border-orange-500/30 shadow-lg hover:shadow-orange-500/10 transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1">
      
      {/* Meal Image Header */}
      <div className="relative h-48 w-full bg-slate-800 overflow-hidden">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80';
            }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center text-5xl">
            🍲
          </div>
        )}

        {/* Category Pill */}
        <span className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md text-orange-400 border border-orange-500/20 text-xs font-bold px-3 py-1 rounded-full shadow-md">
          {category}
        </span>

        {/* Availability Pill */}
        <span className={`absolute top-3 right-3 text-[11px] font-bold px-2.5 py-0.5 rounded-full shadow-md ${
          isAvailable ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/20 text-red-400 border border-red-500/30'
        }`}>
          {isAvailable ? 'Available' : 'Sold Out'}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <Link to={`/menu/${_id}`}>
            <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors line-clamp-1">
              {name}
            </h3>
          </Link>
          <p className="text-xs text-slate-400 mt-1 line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Price & Action */}
        <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
          <div>
            <span className="text-xs text-slate-500 block font-medium">Price</span>
            <span className="text-lg font-extrabold text-white">
              ₦{Number(price).toLocaleString()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/menu/${_id}`}
              className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800 hover:bg-slate-700 transition-all text-xs font-semibold"
              title="View Details"
            >
              Info
            </Link>

            <button
              onClick={() => addItem(meal)}
              disabled={!isAvailable}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-md ${
                isAvailable
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-orange-500/20 active:scale-95'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
              }`}
            >
              <span>🛒</span> Add
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};

export default MealCard;
