import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ArrowRight, Star, Flame, Sparkles, MapPin } from 'lucide-react';
import { getMenu } from '../services/menuService';
import { useAuth } from '../contexts/AuthContext';
import MealCard from '../components/MealCard';
import { SkeletonCard } from '../components/Skeleton';
import ErrorMessage from '../components/ErrorMessage';

const categories = [
  { name: 'Rice', icon: '🍚', bg: 'bg-orange-50 text-orange-600 border-orange-200' },
  { name: 'Soups', icon: '🍲', bg: 'bg-amber-50 text-amber-600 border-amber-200' },
  { name: 'Grills', icon: '🍗', bg: 'bg-rose-50 text-rose-600 border-rose-200' },
  { name: 'Drinks', icon: '🍹', bg: 'bg-blue-50 text-blue-600 border-blue-200' },
  { name: 'Desserts', icon: '🍰', bg: 'bg-purple-50 text-purple-600 border-purple-200' },
];

const Home = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchPopularMeals = async () => {
      try {
        setLoading(true);
        const res = await getMenu();
        setMeals(res.data?.data?.items || []);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load popular meals.');
      } finally {
        setLoading(false);
      }
    };
    fetchPopularMeals();
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/menu?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate('/menu');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      
      {/* Top Greeting & Location Context (Matching reference design) */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 text-xs font-semibold text-stone-500 bg-white px-3.5 py-1.5 rounded-full border border-stone-200 shadow-sm w-fit">
            <MapPin className="w-3.5 h-3.5 text-orange-500" />
            <span>Deliver to: <strong className="text-stone-900">Surulere, Lagos</strong></span>
          </div>
        </div>

        <div>
          <p className="text-xs font-bold text-orange-600 tracking-wider uppercase">
            Hi, {user?.name ? user.name.split(' ')[0] : 'Welcome'} 👋
          </p>
          <h1 className="font-display text-3xl sm:text-5xl font-black text-stone-900 tracking-tight mt-1">
            What are you craving today?
          </h1>
          <p className="text-stone-500 text-sm mt-2 max-w-xl">
            Delicious meals from your favorite kitchen, delivered to your door.
          </p>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="relative max-w-2xl">
          <input
            type="text"
            placeholder="Search for meals, restaurants, or categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-5 pr-14 py-4 bg-white border border-stone-200 rounded-2xl text-stone-900 text-sm placeholder-stone-400 focus:outline-none focus:border-orange-500 shadow-sm transition-all"
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-3 bg-orange-500 hover:bg-orange-600 text-white rounded-xl shadow-md transition-all active:scale-95"
          >
            <Search className="w-4 h-4 stroke-[3]" />
          </button>
        </form>
      </div>

      {/* Hero Promo Banner Card (Matching reference design) */}
      <div className="relative rounded-3xl bg-gradient-to-r from-stone-900 via-stone-900 to-stone-800 text-white p-6 sm:p-10 overflow-hidden shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-4 max-w-md z-10">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 text-xs font-extrabold uppercase tracking-widest">
            <Flame className="w-3.5 h-3.5" /> Special Offer
          </span>
          <h2 className="font-display text-2xl sm:text-4xl font-extrabold leading-tight">
            Delicious meals, delivered fast.
          </h2>
          <p className="text-stone-300 text-xs sm:text-sm">
            Get your hot party Jollof, fresh Egusi soup, and grilled Suya delivered in under 30 minutes!
          </p>
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-orange-500/30 transition-all transform hover:-translate-y-0.5"
          >
            <span>Explore Menu</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* Banner image */}
        <div className="w-full md:w-80 h-48 md:h-56 rounded-2xl overflow-hidden shadow-2xl relative border border-stone-700/50">
          <img
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80"
            alt="Delicious Meal"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Categories Horizontal Grid (Matching reference image) */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-display text-xl font-bold text-stone-900 flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-orange-500" /> Categories
          </h2>
          <Link to="/menu" className="text-xs font-bold text-orange-600 hover:underline">
            See all →
          </Link>
        </div>

        <div className="grid grid-cols-5 gap-3 sm:gap-4 overflow-x-auto scrollbar-none pb-2">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/menu?category=${cat.name}`}
              className="flex flex-col items-center gap-2 p-3 sm:p-4 bg-white border border-stone-200/80 rounded-2xl hover:border-orange-300 hover:shadow-md transition-all text-center group"
            >
              <div className={`w-12 h-12 rounded-2xl ${cat.bg} border flex items-center justify-center text-2xl group-hover:scale-110 transition-transform`}>
                {cat.icon}
              </div>
              <span className="text-xs font-bold text-stone-800 tracking-tight">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Popular Meals Section */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="font-display text-xl sm:text-2xl font-bold text-stone-900">Popular Meals</h2>
            <p className="text-stone-500 text-xs">Most ordered dishes by customers today</p>
          </div>
          <Link to="/menu" className="text-xs font-bold text-orange-600 hover:underline">
            See all →
          </Link>
        </div>

        <ErrorMessage message={error} />

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : meals.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-stone-200 text-stone-400 text-sm">
            No popular meals available right now.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {meals.slice(0, 8).map((meal) => (
              <MealCard key={meal._id} meal={meal} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
};

export default Home;
