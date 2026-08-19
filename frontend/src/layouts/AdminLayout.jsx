import { useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
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
    { label: 'Dashboard', path: '/admin', icon: '📊' },
    { label: 'Manage Menu', path: '/admin/menu', icon: '🍔' },
    { label: 'Manage Orders', path: '/admin/orders', icon: '📦' },
  ];

  return (
    <div className="flex min-h-screen bg-slate-950 text-slate-100 font-sans">
      
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 border-r border-slate-800 p-6 flex-shrink-0 justify-between">
        <div className="space-y-8">
          
          {/* Logo & Admin Badge */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-xl shadow-lg">
              ⚙️
            </div>
            <div>
              <span className="font-extrabold text-lg text-white block">Eatery Admin</span>
              <span className="text-[10px] uppercase tracking-wider font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                Management Portal
              </span>
            </div>
          </Link>

          {/* Navigation Links */}
          <nav className="space-y-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all ${
                  isActive(link.path)
                    ? 'bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <span className="text-lg">{link.icon}</span>
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>

        </div>

        {/* Sidebar Footer / User Profile */}
        <div className="space-y-4 pt-6 border-t border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-sm border border-amber-500/30">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'A'}
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold text-white truncate">{user?.name}</p>
              <p className="text-[11px] text-slate-400 truncate">{user?.email}</p>
            </div>
          </div>

          <div className="space-y-1 pt-2">
            <Link
              to="/"
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-slate-400 hover:text-white hover:bg-slate-800 transition-all"
            >
              <span>🌐</span> Customer Site
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold text-red-400 hover:bg-red-500/10 transition-all text-left"
            >
              <span>🚪</span> Log Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Mobile Header */}
        <header className="md:hidden bg-slate-900 border-b border-slate-800 p-4 flex items-center justify-between sticky top-0 z-30">
          <Link to="/admin" className="flex items-center gap-2">
            <span className="text-xl">⚙️</span>
            <span className="font-bold text-white text-base">Admin Panel</span>
          </Link>
          <button
            onClick={() => setMobileSidebarOpen(!mobileSidebarOpen)}
            className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800"
          >
            ☰
          </button>
        </header>

        {/* Mobile Sidebar Overlay */}
        {mobileSidebarOpen && (
          <div className="md:hidden bg-slate-900 border-b border-slate-800 p-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileSidebarOpen(false)}
                className={`block px-4 py-3 rounded-xl text-sm font-bold ${
                  isActive(link.path) ? 'bg-orange-500 text-white' : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                {link.icon} {link.label}
              </Link>
            ))}
            <Link to="/" onClick={() => setMobileSidebarOpen(false)} className="block px-4 py-3 rounded-xl text-sm font-bold text-slate-400">
              🌐 Customer Site
            </Link>
          </div>
        )}

        <main className="flex-1 p-6 sm:p-10 max-w-7xl w-full mx-auto space-y-8">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default AdminLayout;
