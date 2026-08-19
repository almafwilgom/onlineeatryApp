import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 pt-16 pb-12 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-slate-900">
          
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-600 to-amber-500 flex items-center justify-center text-xl shadow-md">
                🍽️
              </div>
              <span className="font-extrabold text-xl tracking-tight text-white">
                The Online <span className="text-orange-500">Eatery</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed">
              Order your favorite Nigerian and continental dishes online. Fast delivery, fresh ingredients, and unforgettable taste.
            </p>
            <div className="flex items-center gap-3 pt-2">
              {['facebook', 'twitter', 'instagram'].map((social) => (
                <span key={social} className="w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-sm hover:text-orange-400 hover:border-orange-500/30 transition-all cursor-pointer">
                  {social === 'facebook' ? '👍' : social === 'twitter' ? '🐦' : '📷'}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base tracking-wide uppercase">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/" className="hover:text-orange-400 transition-colors">Home Page</Link></li>
              <li><Link to="/menu" className="hover:text-orange-400 transition-colors">Explore Menu</Link></li>
              <li><Link to="/about" className="hover:text-orange-400 transition-colors">About Our Eatery</Link></li>
              <li><Link to="/contact" className="hover:text-orange-400 transition-colors">Contact Support</Link></li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base tracking-wide uppercase">Opening Hours</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li className="flex justify-between"><span>Mon – Fri:</span> <span className="font-semibold text-slate-200">8:00 AM – 10:00 PM</span></li>
              <li className="flex justify-between"><span>Saturday:</span> <span className="font-semibold text-slate-200">9:00 AM – 11:00 PM</span></li>
              <li className="flex justify-between"><span>Sunday:</span> <span className="font-semibold text-orange-400">10:00 AM – 9:00 PM</span></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-base tracking-wide uppercase">Contact Us</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <span className="text-orange-400">📍</span>
                <span>12 Marina Street, Victoria Island, Lagos, Nigeria</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-orange-400">📞</span>
                <span>+234 801 234 5678</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-orange-400">✉️</span>
                <span>orders@onlineeatery.com</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} The Online Eatery. PORA Tech Academy Capstone Project.</p>
          <div className="flex gap-6">
            <span className="hover:text-slate-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-slate-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-slate-400 cursor-pointer">Food Safety Guarantee</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
