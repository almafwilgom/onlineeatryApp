import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16 bg-slate-100">
      
      {/* Header */}
      <div className="text-center space-y-4">
        <span className="text-xs font-bold text-orange-600 uppercase tracking-widest">Our Culinary Story</span>
        <h1 className="text-4xl sm:text-5xl font-black text-slate-900">About The Online Eatery</h1>
        <p className="text-slate-500 text-base max-w-2xl mx-auto leading-relaxed">
          Bringing authentic, freshly prepared Nigerian and continental meals straight from our kitchen to your table.
        </p>
      </div>

      {/* Story Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center bg-white border border-slate-200 rounded-3xl p-8 sm:p-12 shadow-sm">
        <div className="space-y-4 text-slate-700">
          <h2 className="text-2xl font-bold text-slate-900">Passion for Good Food</h2>
          <p className="text-slate-600 text-sm leading-relaxed">
            Founded with a vision to redefine online food ordering in Nigeria, The Online Eatery blends traditional recipes with modern culinary standards.
          </p>
          <p className="text-slate-500 text-xs leading-relaxed">
            Every dish is prepared on demand using locally sourced, fresh ingredients. From rich Egusi and Efo Riro soups to smoky party Jollof Rice, we ensure every bite delivers an unforgettable flavor.
          </p>
        </div>
        <div className="relative h-64 sm:h-80 rounded-2xl bg-slate-100 overflow-hidden border border-slate-250">
          <img
            src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80"
            alt="Kitchen Chefs"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Values Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-3 shadow-sm">
          <div className="text-3xl">🌱</div>
          <h3 className="text-lg font-bold text-slate-950">Fresh Ingredients</h3>
          <p className="text-xs text-slate-500">Handpicked produce and premium spices daily.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-3 shadow-sm">
          <div className="text-3xl">🚀</div>
          <h3 className="text-lg font-bold text-slate-950">Rapid Delivery</h3>
          <p className="text-xs text-slate-500">Hot and fresh delivery guaranteed in 30 mins.</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-slate-200 text-center space-y-3 shadow-sm">
          <div className="text-3xl">❤️</div>
          <h3 className="text-lg font-bold text-slate-950">Hygiene First</h3>
          <p className="text-xs text-slate-500">Sanitized kitchens following strict food safety guidelines.</p>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pt-6">
        <Link
          to="/menu"
          className="inline-block px-8 py-4 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-extrabold text-base shadow-xl shadow-orange-500/10 transition-all"
        >
          Explore Our Menu Now ➔
        </Link>
      </div>

    </div>
  );
};

export default About;
