import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ArrowRight, Star, Clock, ShieldCheck, Flame, Sparkles, ChefHat, PhoneCall } from 'lucide-react';
import { getMenu } from '../services/menuService';
import MealCard from '../components/MealCard';
import { SkeletonCard } from '../components/Skeleton';
import ErrorMessage from '../components/ErrorMessage';

const categories = [
  { name: 'Rice', icon: '🍚' },
  { name: 'Soups', icon: '🍲' },
  { name: 'Grills', icon: '🍗' },
  { name: 'Drinks', icon: '🍹' },
  { name: 'Desserts', icon: '🍰' },
  { name: 'Snacks', icon: '🍟' },
  { name: 'More', icon: '•••' },
];

const Home = () => {
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
    <div className="space-y-16 pb-12">
      
      {/* ── 1. Hero Section (Matching Image 5) ─────────────────────────── */}
      <section className="relative bg-gradient-to-b from-[#FFF7ED] via-[#FFF7ED]/50 to-white pt-10 pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="space-y-6 text-left">
              <h1 className="font-display text-4xl sm:text-6xl font-black text-stone-900 leading-tight tracking-tight">
                What are you <br className="hidden sm:inline" />
                <span className="text-orange-500 underline decoration-orange-300 decoration-wavy">craving</span> today?
              </h1>
              <p className="text-stone-600 text-sm sm:text-base max-w-lg leading-relaxed">
                Delicious meals from your favorite kitchen, delivered to your door.
              </p>

              {/* Prominent Search Bar with Embedded Orange Search Button */}
              <form onSubmit={handleSearch} className="relative max-w-xl">
                <input
                  type="text"
                  placeholder="Search for meals, restaurants..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-16 py-4 bg-white border border-stone-200 rounded-full text-stone-900 text-sm placeholder-stone-400 focus:outline-none focus:border-orange-500 shadow-md transition-all"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 -translate-y-1/2 w-11 h-11 bg-orange-500 hover:bg-orange-600 text-white rounded-full flex items-center justify-center shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <Search className="w-5 h-5 stroke-[3]" />
                </button>
              </form>

              {/* 3 Trust Badges (Matching Image 5) */}
              <div className="grid grid-cols-3 gap-4 pt-4 border-t border-stone-200/60 max-w-lg text-xs text-stone-600">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-stone-900 text-[11px]">Fast Delivery</strong>
                    <span className="text-[10px] text-stone-400">30–45 mins</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0">
                    <ChefHat className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-stone-900 text-[11px]">Fresh Meals</strong>
                    <span className="text-[10px] text-stone-400">Made with love</span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="block text-stone-900 text-[11px]">Secure Payment</strong>
                    <span className="text-[10px] text-stone-400">100% safe</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Plate Image (Matching Image 5) */}
            <div className="relative flex items-center justify-center">
              <div className="w-80 sm:w-96 lg:w-[440px] aspect-square rounded-full bg-orange-100/50 p-4 shadow-2xl relative">
                <img
                  src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80"
                  alt="Delicious Party Jollof Rice"
                  className="w-full h-full object-cover rounded-full border-4 border-white shadow-2xl transform hover:rotate-3 transition-transform duration-500"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* ── 2. Explore by Category Section (Matching Image 5) ───────────── */}
        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-stone-900">Explore by Category</h2>
            <Link to="/menu" className="text-xs font-bold text-orange-600 hover:underline flex items-center gap-1">
              <span>See all categories</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-7 gap-3 sm:gap-4">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={cat.name === 'More' ? '/menu' : `/menu?category=${cat.name}`}
                className="flex flex-col items-center gap-2.5 p-4 bg-white border border-stone-200/80 rounded-2xl hover:border-orange-300 hover:shadow-md transition-all text-center group cursor-pointer"
              >
                <div className="w-12 h-12 rounded-full bg-[#FFF7ED] border border-orange-100 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
                  {cat.icon}
                </div>
                <span className="text-xs font-bold text-stone-800 tracking-tight">{cat.name}</span>
              </Link>
            ))}
          </div>
        </section>

        {/* ── 3. Popular Meals Section (Matching Image 5) ────────────────── */}
        <section className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="font-display text-xl sm:text-2xl font-bold text-stone-900">Popular Meals</h2>
            <Link to="/menu" className="text-xs font-bold text-orange-600 hover:underline flex items-center gap-1">
              <span>View all menu</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <ErrorMessage message={error} />

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          ) : meals.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-3xl border border-stone-200 text-stone-400 text-xs">
              No popular meals available right now.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {meals.slice(0, 4).map((meal) => (
                <MealCard key={meal._id} meal={meal} />
              ))}
            </div>
          )}
        </section>

        {/* ── 4. Why Choose Choply Section (Matching Image 5) ───────────── */}
        <section className="space-y-6 pt-4">
          <h2 className="font-display text-xl sm:text-2xl font-bold text-stone-900 text-center">Why Choose Choply</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#FFF7ED] p-6 rounded-3xl border border-orange-100 flex items-center gap-4 shadow-xs">
              <div className="w-12 h-12 rounded-full bg-white text-orange-500 flex items-center justify-center text-xl flex-shrink-0 shadow-xs">
                ⏱️
              </div>
              <div>
                <h3 className="font-display text-xs font-bold text-stone-900">Fast Delivery</h3>
                <p className="text-[11px] text-stone-500 mt-0.5">Your meals delivered fast and fresh.</p>
              </div>
            </div>

            <div className="bg-[#FFF7ED] p-6 rounded-3xl border border-orange-100 flex items-center gap-4 shadow-xs">
              <div className="w-12 h-12 rounded-full bg-white text-emerald-600 flex items-center justify-center text-xl flex-shrink-0 shadow-xs">
                🍃
              </div>
              <div>
                <h3 className="font-display text-xs font-bold text-stone-900">Fresh & Tasty</h3>
                <p className="text-[11px] text-stone-500 mt-0.5">We cook with fresh ingredients daily.</p>
              </div>
            </div>

            <div className="bg-[#FFF7ED] p-6 rounded-3xl border border-orange-100 flex items-center gap-4 shadow-xs">
              <div className="w-12 h-12 rounded-full bg-white text-orange-600 flex items-center justify-center text-xl flex-shrink-0 shadow-xs">
                🔒
              </div>
              <div>
                <h3 className="font-display text-xs font-bold text-stone-900">Secure Payment</h3>
                <p className="text-[11px] text-stone-500 mt-0.5">Pay safely using your preferred method.</p>
              </div>
            </div>

            <div className="bg-[#FFF7ED] p-6 rounded-3xl border border-orange-100 flex items-center gap-4 shadow-xs">
              <div className="w-12 h-12 rounded-full bg-white text-blue-600 flex items-center justify-center text-xl flex-shrink-0 shadow-xs">
                🎧
              </div>
              <div>
                <h3 className="font-display text-xs font-bold text-stone-900">24/7 Support</h3>
                <p className="text-[11px] text-stone-500 mt-0.5">We're here to help you anytime.</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. How It Works Section (Matching Image 5) ──────────────────── */}
        <section className="space-y-8 pt-4">
          <h2 className="font-display text-xl sm:text-2xl font-bold text-stone-900 text-center">How It Works</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            
            {/* Step 1 */}
            <div className="bg-white p-6 rounded-3xl border border-stone-200 text-center space-y-4 shadow-xs relative">
              <div className="w-8 h-8 rounded-full bg-orange-500 text-white font-extrabold text-xs flex items-center justify-center mx-auto shadow-md">
                1
              </div>
              <h3 className="font-display text-sm font-bold text-stone-900">Choose Your Meal</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Browse our menu and pick your favorites.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white p-6 rounded-3xl border border-stone-200 text-center space-y-4 shadow-xs relative">
              <div className="w-8 h-8 rounded-full bg-orange-500 text-white font-extrabold text-xs flex items-center justify-center mx-auto shadow-md">
                2
              </div>
              <h3 className="font-display text-sm font-bold text-stone-900">Place Your Order</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Add to cart and place your order in minutes.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white p-6 rounded-3xl border border-stone-200 text-center space-y-4 shadow-xs relative">
              <div className="w-8 h-8 rounded-full bg-orange-500 text-white font-extrabold text-xs flex items-center justify-center mx-auto shadow-md">
                3
              </div>
              <h3 className="font-display text-sm font-bold text-stone-900">We Deliver to You</h3>
              <p className="text-xs text-stone-500 leading-relaxed">
                Sit back and enjoy delicious meals.
              </p>
            </div>

          </div>
        </section>

        {/* ── 6. Bottom Callout Banner (Matching Image 5) ───────────────── */}
        <section className="bg-gradient-to-r from-[#FFF7ED] to-[#FFEDD5] border border-orange-200 rounded-3xl p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="space-y-3 text-left max-w-lg">
            <h2 className="font-display text-2xl sm:text-3xl font-black text-stone-900 leading-tight">
              Ready to eat something amazing?
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm">
              Explore our menu and find something you'll love.
            </p>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-orange-500/20 transition-all"
            >
              <span>Explore Menu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="w-48 sm:w-64 h-36 sm:h-44 rounded-2xl overflow-hidden shadow-md border border-orange-200 flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
              alt="Choply Delicious Plate"
              className="w-full h-full object-cover"
            />
          </div>
        </section>

      </div>

    </div>
  );
};

export default Home;
