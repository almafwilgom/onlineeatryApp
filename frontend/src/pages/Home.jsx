import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MealCard from '../components/MealCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import { getMenu } from '../services/menuService';

const Home = () => {
  const [featuredMeals, setFeaturedMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        setLoading(true);
        const res = await getMenu();
        const items = res.data?.data?.items || [];
        setFeaturedMeals(items.slice(0, 6)); // Display top 6
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load featured meals.');
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  return (
    <div className="space-y-20 pb-20">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-24 lg:pt-20 lg:pb-32 bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950">
        {/* Glow background accents */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-orange-500/10 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Hero Text */}
            <div className="space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-xs font-bold uppercase tracking-wider">
                <span>🔥 #1 Online Food Delivery Service</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
                Authentic Nigerian & Continental <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-500">Delicacies</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Craving Jollof Rice, Egusi Soup, or sizzling grills? Order online in seconds and get piping hot food delivered right to your doorstep.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-4">
                <Link
                  to="/menu"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-base shadow-xl shadow-orange-500/25 transition-all transform hover:-translate-y-0.5 active:scale-95 flex items-center justify-center gap-2"
                >
                  <span>🍽️</span> Order Now
                </Link>
                <Link
                  to="/about"
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700/80 font-bold text-base transition-all flex items-center justify-center gap-2"
                >
                  Learn More
                </Link>
              </div>

              {/* Stats badges */}
              <div className="pt-8 grid grid-cols-3 gap-4 border-t border-slate-800/80 text-center lg:text-left">
                <div>
                  <p className="text-2xl font-black text-white">30 Mins</p>
                  <p className="text-xs text-slate-400 font-medium">Avg Delivery Time</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-orange-400">100%</p>
                  <p className="text-xs text-slate-400 font-medium">Fresh Ingredients</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-amber-400">4.9 ★</p>
                  <p className="text-xs text-slate-400 font-medium">Customer Rating</p>
                </div>
              </div>

            </div>

            {/* Hero Visual Card */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-lg">
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-orange-500 to-amber-500 blur-lg opacity-30 animate-pulse" />
                <div className="relative bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden p-6 shadow-2xl space-y-6">
                  <div className="relative h-64 rounded-2xl bg-slate-800 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80"
                      alt="Gourmet Meal"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-orange-400 border border-orange-500/30">
                      Chef Special
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-xl font-bold text-white">Special Party Jollof & Plantain</h3>
                      <p className="text-xs text-slate-400 mt-1">Smoky Jollof, fried plantain & grilled chicken</p>
                    </div>
                    <span className="text-2xl font-black text-orange-400">₦3,500</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-12">
          <h2 className="text-3xl font-extrabold text-white">Explore Categories</h2>
          <p className="text-slate-400 text-sm max-w-lg mx-auto">
            Choose from our diverse menu categories cooked fresh by expert chefs.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { name: 'Rice', icon: '🍚', count: 'Jollof, Fried, White' },
            { name: 'Soup', icon: '🍲', count: 'Egusi, Ogbono, Efo Riro' },
            { name: 'Drinks', icon: '🥤', count: 'Fresh Juices & Zobo' },
            { name: 'Desserts', icon: '🍰', count: 'Cakes & Sweet Treats' },
          ].map((cat) => (
            <Link
              key={cat.name}
              to={`/menu?category=${cat.name}`}
              className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-orange-500/40 hover:bg-slate-800/80 transition-all text-center group transform hover:-translate-y-1 shadow-lg"
            >
              <div className="w-16 h-16 mx-auto rounded-2xl bg-orange-500/10 text-3xl flex items-center justify-center group-hover:scale-110 transition-transform">
                {cat.icon}
              </div>
              <h3 className="text-lg font-bold text-white mt-4 group-hover:text-orange-400 transition-colors">
                {cat.name}
              </h3>
              <p className="text-xs text-slate-400 mt-1">{cat.count}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Meals Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10">
          <div>
            <span className="text-xs font-bold text-orange-400 uppercase tracking-widest">Our Selection</span>
            <h2 className="text-3xl font-black text-white mt-1">Featured Meals</h2>
          </div>
          <Link
            to="/menu"
            className="text-sm font-bold text-orange-400 hover:text-orange-300 flex items-center gap-1 transition-colors"
          >
            View Full Menu ➔
          </Link>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : featuredMeals.length === 0 ? (
          <div className="text-center py-12 bg-slate-900 rounded-2xl border border-slate-800">
            <p className="text-slate-400 text-sm">No menu items available right now.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredMeals.map((meal) => (
              <MealCard key={meal._id} meal={meal} />
            ))}
          </div>
        )}
      </section>

      {/* Why Choose Us Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border border-slate-800 rounded-3xl p-8 sm:p-12 shadow-2xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            
            <div className="space-y-3">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-orange-500/20 text-orange-400 flex items-center justify-center text-2xl font-bold">
                ⚡
              </div>
              <h3 className="text-lg font-bold text-white">Super Fast Delivery</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Hot and fresh meals delivered in insulated packaging within 30 minutes.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center text-2xl font-bold">
                👨‍🍳
              </div>
              <h3 className="text-lg font-bold text-white">Master Chefs</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Prepared with organic ingredients by experienced culinary professionals.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-2xl font-bold">
                🔒
              </div>
              <h3 className="text-lg font-bold text-white">Secure Ordering</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Safe and seamless checkout with full order tracking from kitchen to your door.
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
