import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-stone-200 text-stone-600 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-stone-200">
          
          {/* Brand Column */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="inline-block">
              <img
                src="/choply-logo.png"
                alt="Choply"
                className="h-12 w-auto object-contain"
              />
            </Link>
            <p className="text-xs text-stone-500 leading-relaxed max-w-xs">
              Delicious meals made with love and delivered fast to your doorstep.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3 pt-1">
              {['facebook', 'instagram', 'twitter', 'tiktok'].map((social) => (
                <span
                  key={social}
                  className="w-8 h-8 rounded-full bg-stone-100 hover:bg-orange-500 hover:text-white border border-stone-200 flex items-center justify-center text-xs text-stone-600 transition-all cursor-pointer shadow-xs"
                >
                  {social === 'facebook' ? 'f' : social === 'instagram' ? '📷' : social === 'twitter' ? '🐦' : '🎵'}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-xs text-stone-900 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-xs">
              <li><Link to="/" className="hover:text-orange-600 transition-colors">Home</Link></li>
              <li><Link to="/menu" className="hover:text-orange-600 transition-colors">Menu</Link></li>
              <li><Link to="/about" className="hover:text-orange-600 transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-orange-600 transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Help & Support Column */}
          <div className="space-y-3">
            <h4 className="font-display font-bold text-xs text-stone-900 uppercase tracking-wider">Help & Support</h4>
            <ul className="space-y-2 text-xs text-stone-500">
              <li className="hover:text-stone-900 cursor-pointer">FAQs</li>
              <li className="hover:text-stone-900 cursor-pointer">Delivery Information</li>
              <li className="hover:text-stone-900 cursor-pointer">Returns & Refunds</li>
              <li className="hover:text-stone-900 cursor-pointer">Terms & Conditions</li>
            </ul>
          </div>

          {/* Download App & Payment Options Column */}
          <div className="space-y-4">
            <h4 className="font-display font-bold text-xs text-stone-900 uppercase tracking-wider">Download our app</h4>
            <div className="flex flex-wrap gap-2">
              <div className="px-3 py-2 bg-stone-900 text-white rounded-xl flex items-center gap-2 cursor-pointer hover:bg-stone-800 transition-all">
                <span className="text-lg">▶</span>
                <div className="text-[10px] leading-tight">
                  <span className="text-stone-400 block">GET IT ON</span>
                  <span className="font-bold">Google Play</span>
                </div>
              </div>
              <div className="px-3 py-2 bg-stone-900 text-white rounded-xl flex items-center gap-2 cursor-pointer hover:bg-stone-800 transition-all">
                <span className="text-lg"></span>
                <div className="text-[10px] leading-tight">
                  <span className="text-stone-400 block">Download on the</span>
                  <span className="font-bold">App Store</span>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block mb-1.5">
                Secure Payments
              </span>
              <div className="flex items-center gap-3 text-xs font-black text-stone-800">
                <span className="px-2 py-0.5 rounded bg-stone-100 border border-stone-200 text-blue-700 font-extrabold italic">VISA</span>
                <span className="px-2 py-0.5 rounded bg-stone-100 border border-stone-200 text-red-600 font-extrabold">mastercard</span>
                <span className="px-2 py-0.5 rounded bg-stone-100 border border-stone-200 text-emerald-700 font-extrabold">Verve</span>
              </div>
            </div>
          </div>

        </div>

        {/* Copyright Bar */}
        <div className="text-center text-xs text-stone-400">
          <p>© 2026 Choply. All rights reserved.</p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
