import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { getProfile, updateProfile } from '../services/userService';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const Profile = () => {
  const { user, updateUser } = useAuth();

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

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 space-y-8 bg-slate-100">
      
      <div>
        <h1 className="text-3xl sm:text-4xl font-black text-slate-900">My Profile</h1>
        <p className="text-slate-500 text-sm mt-1">Manage your account details and contact information</p>
      </div>

      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 text-slate-700">
        
        {/* User Card Header */}
        <div className="flex items-center gap-4 pb-6 border-b border-slate-100">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-orange-500 to-amber-500 text-white font-extrabold text-2xl flex items-center justify-center shadow-md shadow-orange-500/10">
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">{user?.name}</h2>
            <p className="text-xs text-slate-500">{user?.email}</p>
            <span className="inline-block mt-2 px-3 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-orange-500/10 text-orange-600 border border-orange-200">
              Role: {user?.role}
            </span>
          </div>
        </div>

        <ErrorMessage message={error} />
        
        {success && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-250 text-emerald-600 text-sm font-semibold">
            ✅ {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Full Name</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-600 mb-1">Phone Number</label>
            <input
              type="tel"
              placeholder="e.g. 08012345678"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm focus:outline-none focus:border-orange-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-400 mb-1">Email Address (Read-only)</label>
            <input
              type="email"
              disabled
              value={user?.email || ''}
              className="w-full px-4 py-3 bg-slate-100 border border-slate-200/60 rounded-xl text-slate-400 text-sm cursor-not-allowed"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className={`w-full py-3.5 rounded-xl font-bold text-sm transition-all shadow-lg ${
              saving
                ? 'bg-slate-200 text-slate-400 cursor-wait'
                : 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-orange-500/10 active:scale-95'
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
