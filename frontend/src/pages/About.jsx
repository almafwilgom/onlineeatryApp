import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Zap, ShieldCheck } from 'lucide-react';

const About = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      
      {/* Header */}
      <div className="text-center space-y-3">
        <span className="text-xs font-extrabold text-orange-600 uppercase tracking-widest bg-orange-50 px-3 py-1 rounded-full border border-orange-200">
          Our Culinary Story
        </span>
        <h1 className="font-display text-3xl sm:text-5xl font-black text-stone-900">About Choply</h1>
        <p className="text-stone-500 text-xs sm:text-sm max-w-2xl mx-auto leading-relaxed">
          Good Food. Delivered Simply. Bringing authentic, freshly prepared Nigerian dishes straight from our kitchen to your door.
        </p>
      </div>

      {/* Story Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-white border border-stone-200 rounded-3xl p-6 sm:p-10 shadow-sm">
        <div className="space-y-4 text-stone-700">
          <h2 className="font-display text-2xl font-bold text-stone-900">Passion for Good Food</h2>
          <p className="text-stone-600 text-xs leading-relaxed">
            Founded with a vision to redefine online food ordering in Nigeria, Choply blends traditional recipes with modern culinary standards.
          </p>
          <p className="text-stone-500 text-xs leading-relaxed">
            Every dish is prepared on demand using locally sourced, fresh ingredients. From rich Egusi and Efo Riro soups to smoky party Jollof Rice, we ensure every bite delivers an unforgettable flavor.
          </p>
        </div>
        <div className="relative h-64 sm:h-80 rounded-2xl bg-stone-100 overflow-hidden border border-stone-200 shadow-md">
          <img
            src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80"
            alt="Choply Chefs"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Values Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-stone-200 text-center space-y-3 shadow-sm">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center">
            <Leaf className="w-6 h-6" />
          </div>
          <h3 className="font-display text-base font-bold text-stone-900">Fresh Ingredients</h3>
          <p className="text-xs text-stone-500">Handpicked produce and premium spices daily.</p>
        </div>
        
        <div className="bg-white p-6 rounded-3xl border border-stone-200 text-center space-y-3 shadow-sm">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-orange-50 text-orange-600 border border-orange-200 flex items-center justify-center">
            <Zap className="w-6 h-6" />
          </div>
          <h3 className="font-display text-base font-bold text-stone-900">Rapid Delivery</h3>
          <p className="text-xs text-stone-500">Hot and fresh delivery guaranteed in 30 mins.</p>
        </div>
        
        <div className="bg-white p-6 rounded-3xl border border-stone-200 text-center space-y-3 shadow-sm">
          <div className="w-12 h-12 mx-auto rounded-2xl bg-blue-50 text-blue-600 border border-blue-200 flex items-center justify-center">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-display text-base font-bold text-stone-900">Hygiene First</h3>
          <p className="text-xs text-stone-500">Sanitized kitchens following strict food safety guidelines.</p>
        </div>
      </div>

      {/* CTA */}
      <div className="text-center pt-4">
        <Link
          to="/menu"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs shadow-xl shadow-orange-500/20 transition-all"
        >
          <span>Explore Our Menu Now</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
};

export default About;
