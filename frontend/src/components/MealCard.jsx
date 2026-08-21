import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const MealCard = ({ meal }) => {
  const { addItem } = useCart();

  if (!meal) return null;

  const { _id, name, description, price, category, imageUrl, isAvailable } = meal;

  return (
    <div className="group bg-white rounded-3xl overflow-hidden border border-slate-200/80 hover:border-orange-500/20 shadow-sm hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1">
      
      {/* Meal Image Header */}
      <div className="relative h-52 w-full bg-slate-100 overflow-hidden">
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
          <div className="w-full h-full bg-slate-200 flex items-center justify-center text-5xl">
            🍲
          </div>
        )}

        {/* Category Pill */}
        <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-orange-600 border border-orange-500/10 text-[11px] font-extrabold px-3 py-1 rounded-full shadow-sm">
          {category}
        </span>

        {/* Availability Pill */}
        <span className={`absolute top-4 right-4 text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow-sm ${
          isAvailable 
            ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' 
            : 'bg-rose-5 text-rose-600 border border-rose-200'
        }`}>
          {isAvailable ? 'Available' : 'Sold Out'}
        </span>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <Link to={`/menu/${_id}`}>
            <h3 className="text-base font-bold text-slate-800 group-hover:text-orange-600 transition-colors line-clamp-1">
              {name}
            </h3>
          </Link>
          <p className="text-xs text-slate-500 mt-1.5 line-clamp-2 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Price & Action */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-[10px] text-slate-400 block font-semibold uppercase tracking-wider">Price</span>
            <span className="text-lg font-black text-slate-900">
              ₦{Number(price).toLocaleString()}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Link
              to={`/menu/${_id}`}
              className="p-2.5 rounded-xl text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200/80 transition-all text-xs font-semibold"
              title="View Details"
            >
              Info
            </Link>

            <button
              onClick={() => addItem(meal)}
              disabled={!isAvailable}
              className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-sm ${
                isAvailable
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-orange-500/10 active:scale-95'
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
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
