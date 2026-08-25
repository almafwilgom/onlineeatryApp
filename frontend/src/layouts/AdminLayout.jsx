import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, UtensilsCrossed, Package, Settings, LogOut, ArrowLeft, Menu, X, Users, BarChart3 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { label: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { label: 'Menu', path: '/admin/menu', icon: UtensilsCrossed },
    { label: 'Orders', path: '/admin/orders', icon: Package },
    { label: 'Customers', path: '#', icon: Users, disabled: true },
    { label: 'Reports', path: '#', icon: BarChart3, disabled: true },
    { label: 'Settings', path: '#', icon: Settings, disabled: true },
  ];

  return (
    <div className="flex min-h-screen bg-stone-100 text-stone-900 font-sans">
      
      {/* Sidebar Desktop (Dark Charcoal #1C1917 matching reference image) */}
      <aside className="hidden md:flex flex-col w-64 bg-[#1C1917] text-stone-300 p-6 flex-shrink-0 justify-between min-h-screen border-r border-stone-800">
        <div className="space-y-8">
          
          {/* Logo & Admin Badge */}
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/choply-logo.png"
              alt="Choply"
              className="h-12 w-auto object-contain brightness-110"
            />
            <span className="text-[10px] font-black uppercase tracking-widest text-orange-400 bg-orange-950/60 border border-orange-800/80 px-2 py-0.5 rounded-md">
              ADMIN
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);
              if (link.disabled) {
                return (
                  <div
                    key={link.label}
                    className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold text-stone-600 cursor-not-allowed opacity-60"
                  >
                    <Icon className="w-4 h-4" />
                    <span>{link.label}</span>
                  </div>
                );
              }
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-all ${
                    active
                      ? 'bg-orange-500 text-white shadow-md shadow-orange-500/30'
                      : 'text-stone-400 hover:text-white hover:bg-stone-800/80'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

        </div>

        {/* Sidebar Footer / Admin User Profile */}
        <div className="space-y-4 pt-6 border-t border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-stone-800 text-orange-400 font-extrabold flex items-center justify-center text-sm border border-stone-700">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">{user?.name || 'Admin User'}</p>
              <p className="text-[11px] text-stone-400 truncate">{user?.email || 'admin@choply.com'}</p>
            </div>
          </div>

          <div className="space-y-1 pt-2">
            <Link
              to="/"
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-stone-400 hover:text-white hover:bg-stone-800 transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Customer Site
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-400 hover:bg-rose-950/40 transition-all text-left"
            >
              <LogOut className="w-3.5 h-3.5" /> Logout
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Mobile Admin Header */}
        <header className="md:hidden bg-[#1C1917] text-white border-b border-stone-800 p-4 flex items-center justify-between sticky top-0 z-30 shadow-md">
          <Link to="/admin" className="flex items-center gap-2">
            <img src="/choply-logo.png" alt="Choply" className="h-9 w-auto object-contain" />
            <span className="text-[10px] font-black uppercase tracking-widest text-orange-400 bg-orange-950/60 border border-orange-800 px-2 py-0.5 rounded-md">
              ADMIN
            </span>
          </Link>
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-2 rounded-xl text-stone-300 hover:text-white bg-stone-800"
          >
            {mobileSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </header>

        {/* Mobile Sidebar Overlay */}
        {mobileSidebarOpen && (
          <div className="md:hidden bg-[#1C1917] text-stone-300 p-4 space-y-2 border-b border-stone-800 shadow-xl">
            {navLinks.map((link) => {
              const Icon = link.icon;
              if (link.disabled) return null;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold ${
                    isActive(link.path) ? 'bg-orange-500 text-white' : 'text-stone-300 hover:bg-stone-800'
                  }`}
                >
                  <Icon className="w-4 h-4" /> {link.label}
                </Link>
              );
            })}
            <Link to="/" onClick={() => setMobileSidebarOpen(false)} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold text-stone-400 hover:bg-stone-800">
              <ArrowLeft className="w-4 h-4" /> Customer Site
            </Link>
          </div>
        )}

        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto space-y-8">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default AdminLayout;
