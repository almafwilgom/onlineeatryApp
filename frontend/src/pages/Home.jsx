import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ArrowRight, Star, Flame, Sparkles, MapPin, Bell } from 'lucide-react';
import { getMenu } from '../services/menuService';
import { useAuth } from '../contexts/AuthContext';
import MealCard from '../components/MealCard';
import { SkeletonCard } from '../components/Skeleton';
import ErrorMessage from '../components/ErrorMessage';

const categories = [
  { name: 'Rice', icon: '🍚', bg: 'bg-[#FFEDD5] text-[#EA580C] border-[#FDBA74]' },
  { name: 'Soups', icon: '🍲', bg: 'bg-[#FEF3C7] text-[#D97706] border-[#FDE68A]' },
  { name: 'Grills', icon: '🍗', bg: 'bg-[#FEE2E2] text-[#DC2626] border-[#FCA5A5]' },
  { name: 'Drinks', icon: '🍹', bg: 'bg-[#DBEAFE] text-[#2563EB] border-[#93C5FD]' },
  { name: 'Desserts', icon: '🍰', bg: 'bg-[#FCE7F3] text-[#DB2777] border-[#F9A8D4]' },
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
      
      {/* Top Mobile Bar: Location & Bell Notification (Matching reference screen 1) */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-stone-600 bg-white px-3.5 py-1.5 rounded-full border border-stone-200 shadow-xs cursor-pointer">
          <MapPin className="w-3.5 h-3.5 text-orange-500" />
          <span>Deliver to <strong className="text-stone-900 font-extrabold">Surulere, Lagos ▾</strong></span>
        </div>

        <button className="relative p-2.5 rounded-full bg-white border border-stone-200 text-stone-700 shadow-xs hover:bg-stone-50">
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-orange-500 border-2 border-white" />
        </button>
      </div>

      {/* Hero Greeting & Headline */}
      <div className="space-y-1">
        <p className="text-xs font-bold text-stone-500">
          Hi, {user?.name ? user.name.split(' ')[0] : 'John'} 👋
        </p>
        <h1 className="font-display text-3xl sm:text-4xl font-black text-stone-900 tracking-tight leading-tight">
          What are you craving today?
        </h1>
      </div>

      {/* Search Input Bar with Embedded Square Orange Search Button */}
      <form onSubmit={handleSearch} className="relative max-w-2xl">
        <input
          type="text"
          placeholder="Search for meals, restaurants..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-11 pr-14 py-3.5 bg-white border border-stone-200 rounded-2xl text-stone-900 text-xs placeholder-stone-400 focus:outline-none focus:border-orange-500 shadow-xs transition-all"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
        <button
          type="submit"
          className="absolute right-1.5 top-1.5 bottom-1.5 w-10 bg-orange-500 hover:bg-orange-600 text-white rounded-xl flex items-center justify-center shadow-md transition-all active:scale-95"
        >
          <Search className="w-4 h-4 stroke-[3]" />
        </button>
      </form>

      {/* Promo Hero Card (Matching reference screen 1) */}
      <div className="relative rounded-3xl bg-[#1C1917] text-white p-6 sm:p-8 overflow-hidden shadow-xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-3 max-w-xs z-10 text-left">
          <h2 className="font-display text-xl sm:text-2xl font-extrabold leading-snug">
            Delicious meals, delivered fast
          </h2>
          <Link
            to="/menu"
            className="inline-flex items-center gap-1.5 text-xs font-extrabold text-orange-400 hover:text-orange-300 transition-colors"
          >
            <span>Order now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Banner image */}
        <div className="w-full sm:w-44 h-32 sm:h-36 rounded-2xl overflow-hidden shadow-lg border border-stone-800 flex-shrink-0">
          <img
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
            alt="Delicious Meal"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Categories Horizontal Circles (Matching reference screen 1) */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-display text-lg font-bold text-stone-900">Categories</h2>
          <Link to="/menu" className="text-xs font-bold text-orange-500 hover:underline">
            See all
          </Link>
        </div>

        <div className="flex items-center justify-between gap-3 overflow-x-auto scrollbar-none pb-2">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/menu?category=${cat.name}`}
              className="flex flex-col items-center gap-2 flex-shrink-0 group"
            >
              <div className={`w-14 h-14 rounded-full ${cat.bg} border flex items-center justify-center text-2xl shadow-xs group-hover:scale-110 transition-transform`}>
                {cat.icon}
              </div>
              <span className="text-xs font-bold text-stone-700 tracking-tight">{cat.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Popular Meals Section */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="font-display text-lg font-bold text-stone-900">Popular Meals</h2>
          <Link to="/menu" className="text-xs font-bold text-orange-500 hover:underline">
            See all
          </Link>
        </div>

        <ErrorMessage message={error} />

        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {[1, 2, 3, 4].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : meals.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-stone-200 text-stone-400 text-xs">
            No popular meals available right now.
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
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
