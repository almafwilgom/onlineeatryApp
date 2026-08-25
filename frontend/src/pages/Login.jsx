import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { login } from '../services/authService';
import ErrorMessage from '../components/ErrorMessage';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login: setAuth } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white border border-stone-200 rounded-3xl p-8 shadow-md space-y-6 text-stone-800">
        
        {/* Choply Logo & Tagline (Matching prompt rules) */}
        <div className="text-center space-y-3">
          <img
            src="/choply-logo.png"
            alt="Choply"
            className="h-16 w-auto mx-auto object-contain"
          />
          <h1 className="font-display text-2xl font-black text-stone-900">Welcome Back</h1>
          <p className="text-xs font-bold text-orange-600">Good Food. Delivered Simply.</p>
        </div>

        <ErrorMessage message={error} />

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-stone-700 mb-1">Email Address</label>
            <input
              type="email"
              required
              placeholder="e.g. john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-xs focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block font-bold text-stone-700 mb-1">Password</label>
            <input
              type="password"
              required
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-xs focus:outline-none focus:border-orange-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3.5 rounded-xl font-bold text-xs transition-all shadow-md ${
              loading
                ? 'bg-stone-200 text-stone-400 cursor-wait'
                : 'bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/20 active:scale-95'
            }`}
          >
            {loading ? 'Logging In...' : 'Log In ➔'}
          </button>
        </form>

        <p className="text-center text-xs text-stone-500">
          Don't have an account yet?{' '}
          <Link to="/register" className="text-orange-600 font-bold hover:underline">
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;
