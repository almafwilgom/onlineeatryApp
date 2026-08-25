import { Link, useLocation } from 'react-router-dom';
import { Home, Search, ShoppingBag, Package, User } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const MobileBottomNav = () => {
  const location = useLocation();
  const { itemCount } = useCart();

  const navItems = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Search', path: '/menu', icon: Search },
    { label: 'Cart', path: '/cart', icon: ShoppingBag, badge: itemCount },
    { label: 'Orders', path: '/orders', icon: Package },
    { label: 'Profile', path: '/profile', icon: User },
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-stone-200 shadow-lg px-2 py-1.5 flex justify-around items-center">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = isActive(item.path);
        return (
          <Link
            key={item.label}
            to={item.path}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all relative ${
              active
                ? 'text-orange-500 font-bold'
                : 'text-stone-400 hover:text-stone-700 font-medium'
            }`}
          >
            <div className="relative">
              <Icon className={`w-5 h-5 transition-transform ${active ? 'scale-110' : ''}`} />
              {item.badge > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-orange-500 text-white font-black text-[10px] min-w-[16px] h-[16px] px-1 rounded-full flex items-center justify-center shadow-sm">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-[11px] mt-0.5 tracking-tight">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
};

export default MobileBottomNav;
