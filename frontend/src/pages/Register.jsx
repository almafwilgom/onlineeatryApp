import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { signup } from '../services/authService';
import ErrorMessage from '../components/ErrorMessage';

const Register = () => {
  const navigate = useNavigate();
  const { login: setAuth } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });

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

    try {
      setLoading(true);
      setError(null);

      const res = await signup(formData);
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
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white border border-stone-200 rounded-3xl p-8 shadow-md space-y-6 text-stone-800">
        
        {/* Choply Logo & Tagline */}
        <div className="text-center space-y-3">
          <img
            src="/choply-logo.png"
            alt="Choply"
            className="h-16 w-auto mx-auto object-contain"
          />
          <h1 className="font-display text-2xl font-black text-stone-900">Create an Account</h1>
          <p className="text-xs font-bold text-orange-600">Good Food. Delivered Simply.</p>
        </div>

        <ErrorMessage message={error} />

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-stone-700 mb-1">Full Name *</label>
            <input
              type="text"
              name="name"
              required
              placeholder="e.g. John Doe"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-xs focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block font-bold text-stone-700 mb-1">Email Address *</label>
            <input
              type="email"
              name="email"
              required
              placeholder="e.g. john@example.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-xs focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block font-bold text-stone-700 mb-1">Phone Number (Optional)</label>
            <input
              type="tel"
              name="phone"
              placeholder="e.g. 08012345678"
              value={formData.phone}
              onChange={handleChange}
              className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-xs focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block font-bold text-stone-700 mb-1">Password *</label>
            <input
              type="password"
              name="password"
              required
              placeholder="Min 6 characters"
              value={formData.password}
              onChange={handleChange}
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
            {loading ? 'Creating Account...' : 'Sign Up ➔'}
          </button>
        </form>

        <p className="text-center text-xs text-stone-500">
          Already have an account?{' '}
          <Link to="/login" className="text-orange-600 font-bold hover:underline">
            Log In here
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;
