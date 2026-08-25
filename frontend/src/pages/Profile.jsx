import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User, MapPin, CreditCard, Package, Settings, LogOut, Camera, Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getProfile, updateProfile } from '../services/userService';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const Profile = () => {
  const { user, updateUser, logout } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
  });

  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchLatestProfile = async () => {
      try {
        setLoading(true);
        const res = await getProfile();
        const latestUser = res.data?.data?.user;
        if (latestUser) {
          updateUser(latestUser);
          setFormData({ name: latestUser.name || '', phone: latestUser.phone || '' });
        }
      } catch (err) {
        console.error('Failed to fetch latest profile:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLatestProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setError(null);
      setSuccess(null);

      const res = await updateProfile(formData);
      const updated = res.data?.data?.user;
      if (updated) {
        updateUser(updated);
        setSuccess('Profile updated successfully!');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile.');
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 space-y-8">
      
      {/* Profile Header Avatar (Matching reference image) */}
      <div className="text-center space-y-3">
        <div className="relative w-24 h-24 mx-auto">
          <div className="w-24 h-24 rounded-full bg-stone-900 text-orange-400 font-display font-black text-3xl flex items-center justify-center border-4 border-white shadow-md">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <button className="absolute bottom-0 right-0 p-2 rounded-full bg-orange-500 text-white shadow-md hover:bg-orange-600 transition-colors">
            <Camera className="w-3.5 h-3.5" />
          </button>
        </div>

        <div>
          <h1 className="font-display text-2xl font-black text-stone-900">{user?.name || 'John Doe'}</h1>
          <p className="text-xs text-stone-500">{user?.email || 'john.doe@gmail.com'}</p>
        </div>
      </div>

      {/* Profile Quick Links Section (Matching reference screen) */}
      <div className="bg-white rounded-3xl p-4 border border-stone-200 shadow-sm divide-y divide-stone-100 text-xs">
        <div className="p-3.5 flex items-center justify-between hover:bg-stone-50 transition-colors rounded-2xl cursor-pointer">
          <div className="flex items-center gap-3">
            <User className="w-4 h-4 text-stone-400" />
            <span className="font-bold text-stone-800">Personal Information</span>
          </div>
          <span className="text-stone-400">›</span>
        </div>

        <div className="p-3.5 flex items-center justify-between hover:bg-stone-50 transition-colors rounded-2xl cursor-pointer">
          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 text-stone-400" />
            <span className="font-bold text-stone-800">Saved Addresses</span>
          </div>
          <span className="text-stone-400">›</span>
        </div>

        <div className="p-3.5 flex items-center justify-between hover:bg-stone-50 transition-colors rounded-2xl cursor-pointer">
          <div className="flex items-center gap-3">
            <CreditCard className="w-4 h-4 text-stone-400" />
            <span className="font-bold text-stone-800">Payment Methods</span>
          </div>
          <span className="text-stone-400">›</span>
        </div>

        <Link to="/orders" className="p-3.5 flex items-center justify-between hover:bg-stone-50 transition-colors rounded-2xl">
          <div className="flex items-center gap-3">
            <Package className="w-4 h-4 text-stone-400" />
            <span className="font-bold text-stone-800">Order History</span>
          </div>
          <span className="text-stone-400">›</span>
        </Link>

        <div className="p-3.5 flex items-center justify-between hover:bg-stone-50 transition-colors rounded-2xl cursor-pointer">
          <div className="flex items-center gap-3">
            <Settings className="w-4 h-4 text-stone-400" />
            <span className="font-bold text-stone-800">Settings</span>
          </div>
          <span className="text-stone-400">›</span>
        </div>

        <button
          onClick={handleLogout}
          className="w-full p-3.5 flex items-center gap-3 text-rose-600 font-bold hover:bg-rose-50 transition-colors rounded-2xl text-left"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>

      {/* Edit Form Card */}
      <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
        <h2 className="font-display text-base font-bold text-stone-900 pb-2 border-b border-stone-100">
          Edit Profile Information
        </h2>

        <ErrorMessage message={error} />
        {success && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-2">
            <Check className="w-4 h-4" /> {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-bold text-stone-700 mb-1">Full Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-xs focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block font-bold text-stone-700 mb-1">Phone Number</label>
            <input
              type="tel"
              placeholder="e.g. 08012345678"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-xs focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block font-bold text-stone-400 mb-1">Email Address (Read-only)</label>
            <input
              type="email"
              disabled
              value={user?.email || ''}
              className="w-full px-4 py-3 bg-stone-100 border border-stone-200 rounded-xl text-stone-400 text-xs cursor-not-allowed"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className={`w-full py-3.5 rounded-xl font-bold text-xs transition-all shadow-md ${
              saving
                ? 'bg-stone-200 text-stone-400 cursor-wait'
                : 'bg-orange-500 hover:bg-orange-600 text-white shadow-orange-500/20 active:scale-95'
            }`}
          >
            {saving ? 'Saving Changes...' : 'Save Profile Changes'}
          </button>
        </form>
      </div>

    </div>
  );
};

export default Profile;
