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
    <div className="min-h-[85vh] flex items-center justify-center py-6 px-4 sm:px-6">
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
              <h1 className="font-display text-2xl sm:text-3xl font-black text-stone-900">Create your account</h1>
              <p className="text-xs text-stone-500 mt-1">Join Choply and start ordering delicious meals</p>
            </div>

            <ErrorMessage message={error} />

            <form onSubmit={handleSubmit} className="space-y-3.5">
              
              {/* Full Name */}
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">Full Name</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400 z-10">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full h-11 pl-11 pr-4 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 text-xs sm:text-sm placeholder-stone-400 focus:outline-none focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all"
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400 z-10">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full h-11 pl-11 pr-4 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 text-xs sm:text-sm placeholder-stone-400 focus:outline-none focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all"
                  />
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400 z-10">
                    <Phone className="w-4 h-4" />
                  </div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="080 1234 5678"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full h-11 pl-11 pr-4 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 text-xs sm:text-sm placeholder-stone-400 focus:outline-none focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400 z-10">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    required
                    placeholder="Create a password"
                    value={formData.password}
                    onChange={handleChange}
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
                <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 font-semibold mt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Password must be at least 6 characters</span>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-xs font-bold text-stone-800 mb-1">Confirm Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-stone-400 z-10">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full h-11 pl-11 pr-11 bg-stone-50 border border-stone-300 rounded-xl text-stone-900 text-xs sm:text-sm placeholder-stone-400 focus:outline-none focus:bg-white focus:border-orange-500 focus:ring-2 focus:ring-orange-100 transition-all"
                  />
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
                <UserPlus className="w-4 h-4" />
                <span>{loading ? 'Creating Account...' : 'Create Account'}</span>
              </button>
            </form>

            <div className="relative my-3 text-center">
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

          <p className="text-center text-xs text-stone-600 pt-3">
            Already have an account?{' '}
            <Link to="/login" className="text-orange-600 font-extrabold hover:underline">
              Login
            </Link>
          </p>

        </div>

        {/* Right Column: HD Nigerian Food Image */}
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

export default Register;
