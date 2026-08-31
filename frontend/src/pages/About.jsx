import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Clock, ShieldCheck, PhoneCall, Users, Heart, Star } from 'lucide-react';

const About = () => {
  return (
    <div className="space-y-16 pb-12">
      
      {/* ── 1. About Hero Section (Matching Image 3 with Branded Nigerian Staff) ──── */}
      <section className="relative bg-gradient-to-b from-[#FFF7ED] via-[#FFF7ED]/40 to-white pt-10 pb-16 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="space-y-5 text-left">
              <span className="text-xs font-black text-orange-600 uppercase tracking-widest block">
                ABOUT CHOPLY
              </span>
              <h1 className="font-display text-4xl sm:text-6xl font-black text-stone-900 leading-tight tracking-tight">
                Good Food. <br />
                <span className="text-orange-500">Delivered</span> Simply.
              </h1>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed max-w-lg">
                Choply is your trusted food ordering and delivery partner, bringing delicious meals from the best kitchens in Nigeria straight to your doorstep.
              </p>
              <p className="text-stone-500 text-xs leading-relaxed max-w-lg">
                We combine great food, reliable service and technology to make every meal experience simple, fast and delightful.
              </p>
              <Link
                to="/menu"
                className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-orange-500/20 transition-all transform hover:-translate-y-0.5"
              >
                <span>Explore Our Menu</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Right Hero Image (Authentic Branded Nigerian Choply Chefs) */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-stone-200 aspect-4/3 bg-stone-900">
              <img
                src="/choply-chefs-about.png"
                alt="Choply Nigerian Chefs"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80';
                }}
              />
            </div>

          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* ── 2. Feature Cards Row (Matching Image 3) ────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 border border-orange-200 flex items-center justify-center text-xl flex-shrink-0">
              <Leaf className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <h3 className="font-display text-xs font-bold text-stone-900">Fresh Ingredients</h3>
              <p className="text-[11px] text-stone-500 mt-0.5">We use fresh, quality ingredients in every meal we serve.</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 border border-orange-200 flex items-center justify-center text-xl flex-shrink-0">
              <Clock className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <h3 className="font-display text-xs font-bold text-stone-900">Fast Delivery</h3>
              <p className="text-[11px] text-stone-500 mt-0.5">Your meals delivered hot and on time, always.</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 border border-orange-200 flex items-center justify-center text-xl flex-shrink-0">
              <ShieldCheck className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <h3 className="font-display text-xs font-bold text-stone-900">Secure Payment</h3>
              <p className="text-[11px] text-stone-500 mt-0.5">Pay safely with your preferred payment method.</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-xs flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 border border-orange-200 flex items-center justify-center text-xl flex-shrink-0">
              <PhoneCall className="w-5 h-5 text-orange-500" />
            </div>
            <div>
              <h3 className="font-display text-xs font-bold text-stone-900">24/7 Support</h3>
              <p className="text-[11px] text-stone-500 mt-0.5">We're here to help you anytime, anywhere.</p>
            </div>
          </div>
        </div>

        {/* ── 3. Our Story Section (Matching Image 3 with Branded Nigerian Team) ── */}
        <section className="bg-white border border-stone-200 rounded-3xl p-8 sm:p-12 shadow-sm grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="relative rounded-2xl overflow-hidden shadow-md aspect-4/3 bg-stone-900 border border-stone-200">
            <img
              src="/choply-team-story.png"
              alt="Choply Nigerian Team Story"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80';
              }}
            />
          </div>

          <div className="space-y-4 text-left">
            <h2 className="font-display text-2xl sm:text-3xl font-black text-stone-900">Our Story</h2>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              Choply was born out of a simple idea: everyone deserves access to great food without stress.
            </p>
            <p className="text-stone-500 text-xs leading-relaxed">
              We noticed how busy life can get, and how hard it is sometimes to find the time to cook or even enjoy a homemade meal. So we built Choply — a platform that connects you with amazing local kitchens and delicious meals, delivered with care right to you.
            </p>
            <p className="text-stone-500 text-xs leading-relaxed">
              Today, we're proud to serve thousands of happy customers across Nigeria, and we're just getting started.
            </p>
            <div className="pt-2">
              <span className="font-display text-xl font-bold text-orange-600 italic block">Thank you!</span>
              <span className="text-xs font-bold text-stone-900">The Choply Team</span>
            </div>
          </div>
        </section>

        {/* ── 4. We're More Than Just A Food Delivery App (Matching Image 3) ── */}
        <section className="space-y-8 text-center">
          <h2 className="font-display text-xl sm:text-3xl font-black text-stone-900">
            We're More Than Just A Food Delivery App
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs space-y-4 p-5">
              <div className="h-40 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200">
                <img
                  src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=500&q=80"
                  alt="Passionate People"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-display text-sm font-bold text-stone-900 flex items-center gap-2">
                  <Users className="w-4 h-4 text-orange-500" /> Passionate People
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  A team that truly cares about good food and happy customers.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs space-y-4 p-5">
              <div className="h-40 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200">
                <img
                  src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=500&q=80"
                  alt="Made With Love"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-display text-sm font-bold text-stone-900 flex items-center gap-2">
                  <Heart className="w-4 h-4 text-orange-500" /> Made With Love
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  Every meal is prepared with love and attention to detail.
                </p>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-xs space-y-4 p-5">
              <div className="h-40 rounded-2xl overflow-hidden bg-stone-100 border border-stone-200">
                <img
                  src="https://images.unsplash.com/photo-1526367790999-0150786686a2?auto=format&fit=crop&w=500&q=80"
                  alt="Always Getting Better"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-display text-sm font-bold text-stone-900 flex items-center gap-2">
                  <Star className="w-4 h-4 text-orange-500" /> Always Getting Better
                </h3>
                <p className="text-xs text-stone-500 mt-1">
                  We listen, we learn and we keep improving for you.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── 5. Statistics Counter Bar (Matching Image 3) ────────────────── */}
        <section className="bg-white border border-stone-200 rounded-3xl p-8 shadow-xs">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div className="space-y-1">
              <span className="font-display text-3xl font-black text-stone-900 block">10,000+</span>
              <span className="text-xs text-stone-500">Happy Customers</span>
            </div>
            <div className="space-y-1">
              <span className="font-display text-3xl font-black text-stone-900 block">25,000+</span>
              <span className="text-xs text-stone-500">Orders Delivered</span>
            </div>
            <div className="space-y-1">
              <span className="font-display text-3xl font-black text-stone-900 block">150+</span>
              <span className="text-xs text-stone-500">Partner Kitchens</span>
            </div>
            <div className="space-y-1">
              <span className="font-display text-3xl font-black text-orange-500 block">4.8★</span>
              <span className="text-xs text-stone-500">Customer Rating</span>
            </div>
          </div>
        </section>

        {/* ── 6. Bottom Callout Banner (Matching Image 3) ─────────────────── */}
        <section className="bg-stone-900 text-white rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
          <div className="space-y-3 text-left max-w-lg z-10">
            <h2 className="font-display text-2xl sm:text-3xl font-black leading-tight">
              Ready to enjoy something delicious?
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm">
              Explore our menu and satisfy your cravings today.
            </p>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs rounded-xl shadow-lg shadow-orange-500/20 transition-all"
            >
              <span>Browse Menu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="w-48 sm:w-64 h-36 sm:h-44 rounded-2xl overflow-hidden shadow-2xl border border-stone-800 flex-shrink-0">
            <img
              src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=500&q=80"
              alt="Delicious Dish"
              className="w-full h-full object-cover"
            />
          </div>
        </section>

      </div>

    </div>
  );
};

export default About;
