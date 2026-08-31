import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ShieldCheck, ArrowRight } from 'lucide-react';
import { GoogleLogo, FacebookLogo } from '../components/BrandLogos';
import { useAuth } from '../contexts/AuthContext';
import { login } from '../services/authService';
import ErrorMessage from '../components/ErrorMessage';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login: setAuth } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const from = location.state?.from?.pathname || '/menu';

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError(null);

      const res = await login({ email: email.trim(), password });
      const { token, user } = res.data?.data || {};

      if (token && user) {
        setAuth(token, user);
        if (user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate(from, { replace: true });
        }
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-6 px-4 sm:px-6">
      <div className="w-full max-w-4xl bg-white border border-stone-200 rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        
        {/* Left Column: Form Section */}
        <div className="p-6 sm:p-10 space-y-6 text-left flex flex-col justify-between">
          
          <div className="space-y-6">
            {/* Logo */}
            <Link to="/" className="inline-block">
              <img
                src="/choply-logo.png"
                alt="Choply"
                className="h-10 sm:h-12 w-auto object-contain"
              />
            </Link>

            <div>
              <h1 className="font-display text-2xl sm:text-3xl font-black text-stone-900">Welcome back!</h1>
              <p className="text-xs text-stone-500 mt-1">Login to continue to your account</p>
            </div>

            <ErrorMessage message={error} />

            <form onSubmit={handleSubmit} className="space-y-4">
              
              {/* Email Field */}
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1.5">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400 z-10">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full h-11 pl-11 pr-4 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 text-xs sm:text-sm placeholder-stone-400 focus:outline-none focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-bold text-stone-800">Password</label>
                  <span className="text-[11px] font-bold text-orange-600 hover:underline cursor-pointer">
                    Forgot password?
                  </span>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400 z-10">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full h-11 pl-11 pr-11 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 text-xs sm:text-sm placeholder-stone-400 focus:outline-none focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-stone-400 hover:text-stone-700 cursor-pointer z-10"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full h-12 rounded-xl font-extrabold text-xs sm:text-sm transition-all shadow-md flex items-center justify-center gap-2 ${
                  loading
                    ? 'bg-stone-200 text-stone-400 cursor-wait'
                    : 'bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/20 active:scale-95 cursor-pointer'
                }`}
              >
                <span>{loading ? 'Logging in...' : 'Login'}</span>
                <ArrowRight className="w-4 h-4 stroke-[3]" />
              </button>
            </form>

            <div className="relative my-4 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-stone-200" />
              </div>
              <span className="relative bg-white px-3 text-[10px] sm:text-[11px] text-stone-400 uppercase font-bold tracking-wider">
                or continue with
              </span>
            </div>

            {/* Social Buttons */}
            <div className="grid grid-cols-2 gap-3 text-xs font-bold">
              <button
                type="button"
                className="h-11 px-4 border border-stone-300 rounded-xl flex items-center justify-center gap-2 bg-white hover:bg-stone-50 transition-colors cursor-pointer text-stone-700 font-semibold shadow-xs"
              >
                <GoogleLogo className="w-4 h-4" />
                <span>Google</span>
              </button>

              <button
                type="button"
                className="h-11 px-4 border border-stone-300 rounded-xl flex items-center justify-center gap-2 bg-white hover:bg-stone-50 transition-colors cursor-pointer text-stone-700 font-semibold shadow-xs"
              >
                <FacebookLogo className="w-4 h-4" />
                <span>Facebook</span>
              </button>
            </div>
          </div>

          <p className="text-center text-xs text-stone-600 pt-4">
            Don't have an account?{' '}
            <Link to="/register" className="text-orange-600 font-extrabold hover:underline">
              Create account
            </Link>
          </p>

        </div>

        {/* Right Column: HD Nigerian Food Dish Image */}
        <div className="hidden md:block relative bg-stone-900">
          <img
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80"
            alt="Choply Feast"
            className="w-full h-full object-cover"
          />

          <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-black/60 backdrop-blur-md border border-white/20 text-white text-xs space-y-1 text-left">
            <div className="flex items-center gap-2 font-bold text-orange-400">
              <ShieldCheck className="w-4 h-4" />
              <span>Your data is safe with us</span>
            </div>
            <p className="text-[11px] text-stone-300">
              We use industry standard security to protect your information.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
