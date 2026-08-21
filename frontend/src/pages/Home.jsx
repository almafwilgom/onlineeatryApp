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
    <div className="space-y-16 pb-20 bg-slate-100">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28 bg-gradient-to-b from-white via-slate-50 to-slate-100">
        {/* Glow background accents */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-orange-500/5 blur-[120px] rounded-full pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-amber-500/5 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Hero Text */}
            <div className="space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 text-xs font-extrabold uppercase tracking-wider">
                <span>🔥 #1 Online Food Delivery Service</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-tight">
                Authentic Nigerian & Continental <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-600">Delicacies</span>
              </h1>

              <p className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
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
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-bold text-base transition-all flex items-center justify-center gap-2 shadow-sm"
                >
                  Learn More
                </Link>
              </div>

              {/* Stats badges */}
              <div className="pt-8 grid grid-cols-3 gap-4 border-t border-slate-200 text-center lg:text-left">
                <div>
                  <p className="text-2xl font-black text-slate-900">30 Mins</p>
                  <p className="text-xs text-slate-500 font-semibold">Avg Delivery Time</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-orange-600">100%</p>
                  <p className="text-xs text-slate-500 font-semibold">Fresh Ingredients</p>
                </div>
                <div>
                  <p className="text-2xl font-black text-amber-600">4.9 ★</p>
                  <p className="text-xs text-slate-500 font-semibold">Customer Rating</p>
                </div>
              </div>

            </div>

            {/* Hero Visual Card */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-full max-w-lg">
                <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-orange-500 to-amber-500 blur-lg opacity-20" />
                <div className="relative bg-white border border-slate-200 rounded-3xl overflow-hidden p-5 shadow-xl space-y-5">
                  <div className="relative h-64 rounded-2xl bg-slate-100 overflow-hidden">
                    <img
                      src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=800&q=80"
                      alt="Gourmet Meal"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-orange-600 border border-orange-500/10">
                      Chef Special
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-lg font-bold text-slate-950">Special Party Jollof & Plantain</h3>
                      <p className="text-xs text-slate-500 mt-1">Smoky Jollof, fried plantain & grilled chicken</p>
                    </div>
                    <span className="text-xl font-extrabold text-orange-600">₦3,500</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Categories Section with Real Pictures */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 mb-10">
          <h2 className="text-3xl font-extrabold text-slate-900">Explore Food Categories</h2>
          <p className="text-slate-500 text-sm max-w-lg mx-auto">
            Choose from our diverse menu categories cooked fresh by expert chefs.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            {
              name: 'Rice',
              image: 'https://images.unsplash.com/photo-1604329760661-e71dc83f8f26?auto=format&fit=crop&w=400&q=80',
              count: 'Jollof, Fried, White',
            },
            {
              name: 'Soup',
              image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=400&q=80',
              count: 'Egusi, Ogbono, Efo Riro',
            },
            {
              name: 'Drinks',
              image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?auto=format&fit=crop&w=400&q=80',
              count: 'Fresh Juices & Zobo',
            },
            {
              name: 'Desserts',
              image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=400&q=80',
              count: 'Cakes & Sweet Treats',
            },
          ].map((cat) => (
            <Link
              key={cat.name}
              to={`/menu?category=${cat.name}`}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] border border-slate-200 shadow-md hover:shadow-xl transition-all transform hover:-translate-y-1 block"
            >
              {/* Category Background Image */}
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/40 to-transparent flex flex-col justify-end p-4 text-left" />
              {/* Text */}
              <div className="absolute bottom-4 left-4 z-10">
                <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-[10px] text-slate-300 mt-0.5 font-medium">{cat.count}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Meals Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-10">
          <div>
            <span className="text-xs font-bold text-orange-600 uppercase tracking-widest">Our Selection</span>
            <h2 className="text-3xl font-black text-slate-900 mt-1">Featured Meals</h2>
          </div>
          <Link
            to="/menu"
            className="text-sm font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1 transition-colors"
          >
            View Full Menu ➔
          </Link>
        </div>

        {loading ? (
          <LoadingSpinner />
        ) : error ? (
          <ErrorMessage message={error} />
        ) : featuredMeals.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
            <p className="text-slate-500 text-sm">No menu items available right now.</p>
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
        <div className="bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            
            <div className="space-y-3">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-orange-500/10 text-orange-600 flex items-center justify-center text-2xl font-bold">
                ⚡
              </div>
              <h3 className="text-lg font-bold text-slate-900">Super Fast Delivery</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Hot and fresh meals delivered in insulated packaging within 30 minutes.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-500/10 text-amber-600 flex items-center justify-center text-2xl font-bold">
                👨‍🍳
              </div>
              <h3 className="text-lg font-bold text-slate-900">Master Chefs</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Prepared with organic ingredients by experienced culinary professionals.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-emerald-50/80 text-emerald-600 flex items-center justify-center text-2xl font-bold">
                🔒
              </div>
              <h3 className="text-lg font-bold text-slate-900">Secure Ordering</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
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
