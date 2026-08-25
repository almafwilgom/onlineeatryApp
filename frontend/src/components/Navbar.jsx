import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingBag, User, MapPin, Search, ChevronDown, LogOut, Package, Settings, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';

const Navbar = () => {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const { itemCount, openCart } = useCart();
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    navigate('/login');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/menu?search=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Brand Logo & Location Pill */}
          <div className="flex items-center gap-6">
            <Link to="/" className="flex items-center group">
              <img
                src="/choply-logo.png"
                alt="Choply"
                className="h-12 sm:h-14 w-auto object-contain group-hover:scale-105 transition-transform duration-200"
              />
            </Link>

            {/* Location selector (matching reference) */}
            <div className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-stone-100 border border-stone-200 text-xs font-semibold text-stone-700 cursor-pointer hover:bg-stone-200/70 transition-colors">
              <MapPin className="w-3.5 h-3.5 text-orange-500 flex-shrink-0" />
              <span>Deliver to: <strong className="text-stone-900">Surulere, Lagos</strong></span>
              <ChevronDown className="w-3.5 h-3.5 text-stone-400" />
            </div>
          </div>

          {/* Search bar on desktop */}
          <form onSubmit={handleSearchSubmit} className="hidden md:flex flex-1 max-w-md relative">
            <input
              type="text"
              placeholder="Search for meals, restaurants..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-4 pr-10 py-2.5 bg-stone-100 border border-stone-200 rounded-full text-xs font-medium text-stone-800 placeholder-stone-400 focus:outline-none focus:border-orange-500 focus:bg-white transition-all"
            />
            <button
              type="submit"
              className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-orange-500 text-white hover:bg-orange-600 transition-colors"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </form>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { label: 'Home', path: '/' },
              { label: 'Menu', path: '/menu' },
              { label: 'About', path: '/about' },
              { label: 'Contact', path: '/contact' },
            ].map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                  isActive(link.path)
                    ? 'text-orange-600 bg-orange-50'
                    : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {isAdmin && (
              <Link
                to="/admin"
                className="ml-2 px-3 py-1.5 rounded-xl text-xs font-extrabold bg-stone-900 text-white hover:bg-stone-800 transition-all flex items-center gap-1.5 shadow-sm"
              >
                <Shield className="w-3.5 h-3.5 text-orange-400" />
                <span>ADMIN</span>
              </Link>
            )}
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-3">

            {/* Cart Button */}
            <button
              onClick={openCart}
              className="relative p-2.5 rounded-full bg-stone-100 hover:bg-orange-50 text-stone-700 hover:text-orange-600 transition-all focus:outline-none border border-stone-200"
              title="View Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white font-black text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-md animate-pulse">
                  {itemCount}
                </span>
              )}
            </button>

            {/* Auth Dropdown */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 pl-3 pr-2 rounded-full bg-stone-100 hover:bg-stone-200/80 border border-stone-200 text-stone-800 transition-all focus:outline-none"
                >
                  <div className="w-7 h-7 rounded-full bg-orange-500 text-white font-bold flex items-center justify-center text-xs shadow-sm">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <span className="text-xs font-bold max-w-[100px] truncate hidden sm:inline">
                    {user?.name?.split(' ')[0]}
                  </span>
                  <ChevronDown className={`w-3.5 h-3.5 text-stone-400 transition-transform ${userDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 rounded-2xl bg-white border border-stone-200 shadow-xl py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150 text-stone-700">
                    <div className="px-4 py-3 border-b border-stone-100">
                      <p className="text-xs font-bold text-stone-900 truncate">{user?.name}</p>
                      <p className="text-[11px] text-stone-500 truncate">{user?.email}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-orange-100 text-orange-700">
                        {user?.role}
                      </span>
                    </div>

                    <Link
                      to="/profile"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-stone-700 hover:bg-stone-50 transition-all font-semibold"
                    >
                      <User className="w-4 h-4 text-stone-400" /> My Profile
                    </Link>

                    <Link
                      to="/orders"
                      onClick={() => setUserDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-stone-700 hover:bg-stone-50 transition-all font-semibold"
                    >
                      <Package className="w-4 h-4 text-stone-400" /> My Orders
                    </Link>

                    {isAdmin && (
                      <Link
                        to="/admin"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2.5 px-4 py-2.5 text-xs text-amber-700 hover:bg-amber-50 transition-all font-bold"
                      >
                        <Shield className="w-4 h-4 text-amber-600" /> Admin Dashboard
                      </Link>
                    )}

                    <div className="border-t border-stone-100 mt-1 pt-1">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs text-red-600 hover:bg-red-50 transition-all text-left font-bold"
                      >
                        <LogOut className="w-4 h-4" /> Log Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className="px-3.5 py-2 rounded-full text-xs font-bold text-stone-700 hover:bg-stone-100 transition-all"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-full text-xs font-bold text-white bg-orange-500 hover:bg-orange-600 shadow-md shadow-orange-500/20 transition-all"
                >
                  Sign Up
                </Link>
              </div>
            )}

          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
