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
    <div className="min-h-[85vh] flex items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-4xl bg-white border border-stone-200 rounded-3xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        
        {/* Left Column: Form Section (Matching Reference Image 4) */}
        <div className="p-8 sm:p-10 space-y-6 text-left flex flex-col justify-between">
          
          <div className="space-y-6">
            {/* Logo */}
            <Link to="/" className="inline-block">
              <img
                src="/choply-logo.png"
                alt="Choply"
                className="h-12 w-auto object-contain"
              />
            </Link>

            <div>
              <h1 className="font-display text-2xl font-black text-stone-900">Welcome back!</h1>
              <p className="text-xs text-stone-500 mt-1">Login to continue to your account</p>
            </div>

            <ErrorMessage message={error} />

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-stone-200 rounded-xl text-stone-900 text-xs focus:outline-none focus:border-orange-500 shadow-xs"
                  />
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                </div>
              </div>

              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block font-bold text-stone-700">Password</label>
                  <span className="text-[11px] font-bold text-orange-600 hover:underline cursor-pointer">
                    Forgot password?
                  </span>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-10 py-3 bg-white border border-stone-200 rounded-xl text-stone-900 text-xs focus:outline-none focus:border-orange-500 shadow-xs"
                  />
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-700 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full py-3.5 rounded-xl font-extrabold text-xs transition-all shadow-md flex items-center justify-center gap-2 ${
                  loading
                    ? 'bg-stone-200 text-stone-400 cursor-wait'
                    : 'bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/20 active:scale-95 cursor-pointer'
                }`}
              >
                <span>{loading ? 'Logging in...' : 'Login'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="relative my-4 text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-stone-200" />
              </div>
              <span className="relative bg-white px-3 text-[11px] text-stone-400 uppercase font-bold">
                or continue with
              </span>
            </div>

            {/* Social Buttons with Official Google & Facebook Logos */}
            <div className="grid grid-cols-2 gap-3 text-xs font-bold">
              <button
                type="button"
                className="py-3 px-4 border border-stone-200 rounded-xl flex items-center justify-center gap-2 hover:bg-stone-50 transition-colors cursor-pointer text-stone-700 font-semibold shadow-xs"
              >
                <GoogleLogo className="w-4 h-4" />
                <span>Google</span>
              </button>

              <button
                type="button"
                className="py-3 px-4 border border-stone-200 rounded-xl flex items-center justify-center gap-2 hover:bg-stone-50 transition-colors cursor-pointer text-stone-700 font-semibold shadow-xs"
              >
                <FacebookLogo className="w-4 h-4" />
                <span>Facebook</span>
              </button>
            </div>
          </div>

          <p className="text-center text-xs text-stone-500 pt-4">
            Don't have an account?{' '}
            <Link to="/register" className="text-orange-600 font-bold hover:underline">
              Create account
            </Link>
          </p>

        </div>

        {/* Right Column: HD Nigerian Food Dish Image with Security Badge (Matching Image 4) */}
        <div className="hidden md:block relative bg-stone-900">
          <img
            src="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80"
            alt="Choply Feast"
            className="w-full h-full object-cover"
          />

          {/* Security Glass Badge */}
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
