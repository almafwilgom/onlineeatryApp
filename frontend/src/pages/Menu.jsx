import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import MealCard from '../components/MealCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { getMenu } from '../services/menuService';

const Menu = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [category, setCategory] = useState(searchParams.get('category') || 'All');
  const [minPrice, setMinPrice] = useState(searchParams.get('minPrice') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');

  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const categories = ['All', 'Rice', 'Soup', 'Drinks', 'Desserts', 'Grills'];

  const fetchMeals = async () => {
    try {
      setLoading(true);
      setError(null);

      const params = {};
      if (search.trim()) params.search = search.trim();
      if (category !== 'All') params.category = category;
      if (minPrice) params.minPrice = minPrice;
      if (maxPrice) params.maxPrice = maxPrice;

      const res = await getMenu(params);
      setMeals(res.data?.data?.items || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch menu items.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMeals();
  }, [category]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchMeals();
  };

  const handleResetFilters = () => {
    setSearch('');
    setCategory('All');
    setMinPrice('');
    setMaxPrice('');
    setSearchParams({});
    getMenu().then((res) => setMeals(res.data?.data?.items || []));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 bg-slate-100">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
          Our Delicious <span className="text-orange-500">Menu</span>
        </h1>
        <p className="text-slate-500 text-sm max-w-xl mx-auto">
          Explore our wide selection of freshly prepared Nigerian meals, soups, drinks, and desserts.
        </p>
      </div>

      {/* Filter Controls Bar */}
      <div className="bg-white border border-slate-200/80 rounded-3xl p-6 shadow-sm space-y-6">
        
        {/* Top row: Search form */}
        <form onSubmit={handleSearchSubmit} className="flex gap-3 max-w-2xl mx-auto">
          <div className="relative flex-1">
            <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400">
              🔍
            </span>
            <input
              type="text"
              placeholder="Search meals by name (e.g. Jollof, Egusi)..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-250 rounded-2xl text-slate-800 text-sm focus:outline-none focus:border-orange-500 transition-colors"
            />
          </div>
          <button
            type="submit"
            className="px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-2xl transition-all shadow-md shadow-orange-500/20"
          >
            Search
          </button>
        </form>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategory(cat)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                category === cat
                  ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-md shadow-orange-500/10 scale-105'
                  : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              {cat === 'All' ? '🍽️ All Items' : cat}
            </button>
          ))}
        </div>

        {/* Price Range Filter Row */}
        <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="font-bold text-slate-500">Price Filter (₦):</span>
            <input
              type="number"
              placeholder="Min"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-24 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-orange-500"
            />
            <span className="text-slate-400">—</span>
            <input
              type="number"
              placeholder="Max"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-24 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 focus:outline-none focus:border-orange-500"
            />
            <button
              onClick={fetchMeals}
              className="px-4 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl transition-all"
            >
              Apply Price
            </button>
          </div>

          <button
            onClick={handleResetFilters}
            className="text-orange-600 hover:text-orange-700 font-bold transition-colors"
          >
            Reset All Filters ↺
          </button>
        </div>

      </div>

      {/* Results Listing */}
      {loading ? (
        <LoadingSpinner />
      ) : error ? (
        <ErrorMessage message={error} />
      ) : meals.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 space-y-4 shadow-sm">
          <div className="text-5xl">🔍</div>
          <h3 className="text-xl font-bold text-slate-800">No meals found</h3>
          <p className="text-slate-500 text-sm max-w-sm mx-auto">
            We couldn't find any dishes matching your search filters. Try clearing your search or category.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-xl transition-all shadow-md shadow-orange-500/20"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {meals.map((meal) => (
            <MealCard key={meal._id} meal={meal} />
          ))}
        </div>
      )}

    </div>
  );
};

export default Menu;
