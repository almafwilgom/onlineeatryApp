import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, Mail, Phone, Lock, Eye, EyeOff, ShieldCheck, UserPlus, CheckCircle2 } from 'lucide-react';
import { GoogleLogo, FacebookLogo } from '../components/BrandLogos';
import { useAuth } from '../contexts/AuthContext';
import { signup } from '../services/authService';
import ErrorMessage from '../components/ErrorMessage';

const Register = () => {
  const navigate = useNavigate();
  const { login: setAuth } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    if (formData.confirmPassword && formData.password !== formData.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const res = await signup({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
      });
      const { token, user } = res.data?.data || {};

      if (token && user) {
        setAuth(token, user);
        navigate('/menu');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
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
              <h1 className="font-display text-2xl font-black text-stone-900">Create your account</h1>
              <p className="text-xs text-stone-500 mt-1">Join Choply and start ordering delicious meals</p>
            </div>

            <ErrorMessage message={error} />

            <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-stone-700 mb-1">Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-stone-200 rounded-xl text-stone-900 text-xs focus:outline-none focus:border-orange-500 shadow-xs"
                  />
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Email Address</label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-stone-200 rounded-xl text-stone-900 text-xs focus:outline-none focus:border-orange-500 shadow-xs"
                  />
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Phone Number</label>
                <div className="relative">
                  <input
                    type="tel"
                    name="phone"
                    placeholder="080 1234 5678"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-3 bg-white border border-stone-200 rounded-xl text-stone-900 text-xs focus:outline-none focus:border-orange-500 shadow-xs"
                  />
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    required
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
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
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 font-semibold mt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Password must be at least 6 characters</span>
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full pl-10 pr-10 py-3 bg-white border border-stone-200 rounded-xl text-stone-900 text-xs focus:outline-none focus:border-orange-500 shadow-xs"
                  />
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
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
                <UserPlus className="w-4 h-4" />
                <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
              </button>
            </form>

            <div className="relative my-3 text-center">
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

          <p className="text-center text-xs text-stone-500 pt-3">
            Already have an account?{' '}
            <Link to="/login" className="text-orange-600 font-bold hover:underline">
              Login
            </Link>
          </p>

        </div>

        {/* Right Column: HD Nigerian Food Image with Security Badge (Matching Image 4) */}
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

export default Register;
