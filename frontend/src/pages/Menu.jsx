import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, SlidersHorizontal, ArrowUpDown } from 'lucide-react';
import { getMenu } from '../services/menuService';
import MealCard from '../components/MealCard';
import { SkeletonCard } from '../components/Skeleton';
import ErrorMessage from '../components/ErrorMessage';

const categories = ['All', 'Rice', 'Soups', 'Grills', 'Drinks', 'Desserts'];

const Menu = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';

  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        setLoading(true);
        const res = await getMenu();
        setMeals(res.data?.data?.items || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch menu items.');
      } finally {
        setLoading(false);
      }
    };
    fetchMenu();
  }, []);

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
    } else {
      searchParams.set('category', cat);
    }
    setSearchParams(searchParams);
  };

  const filteredMeals = meals
    .filter((meal) => {
      const matchCat = selectedCategory === 'All' || meal.category?.toLowerCase() === selectedCategory.toLowerCase();
      const matchSearch =
        meal.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        meal.description?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    })
    .sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      return 0;
    });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="font-display text-3xl sm:text-4xl font-black text-stone-900">Meals</h1>
        <p className="text-stone-500 text-sm mt-1">Explore our full menu of authentic Nigerian and continental dishes</p>
      </div>

      {/* Search Input Bar */}
      <div className="relative max-w-2xl">
        <input
          type="text"
          placeholder="Search meals..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-5 pr-12 py-3.5 bg-white border border-stone-200 rounded-2xl text-stone-900 text-sm placeholder-stone-400 focus:outline-none focus:border-orange-500 shadow-sm"
        />
        <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
      </div>

      {/* Category Pills & Filter/Sort Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2 sm:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              className={`px-5 py-2 rounded-full text-xs font-bold transition-all flex-shrink-0 ${
                selectedCategory === cat
                  ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                  : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filter & Sort */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs font-bold text-stone-700 shadow-sm">
            <SlidersHorizontal className="w-3.5 h-3.5 text-stone-400" />
            <span>Filter</span>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-2 bg-white border border-stone-200 rounded-xl text-xs font-bold text-stone-700 shadow-sm">
            <ArrowUpDown className="w-3.5 h-3.5 text-stone-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent focus:outline-none font-bold cursor-pointer"
            >
              <option value="default">Sort</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      <ErrorMessage message={error} />

      {/* Food Cards Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : filteredMeals.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 text-stone-400 space-y-3">
          <p className="text-stone-800 font-bold text-base">No meals found</p>
          <p className="text-xs text-stone-500">Try adjusting your search or category filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMeals.map((meal) => (
            <MealCard key={meal._id} meal={meal} />
          ))}
        </div>
      )}

    </div>
  );
};

export default Menu;
