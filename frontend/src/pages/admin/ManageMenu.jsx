import { useState, useEffect } from 'react';
import { getMenu, createItem, updateItem, deleteItem } from '../../services/menuService';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';

const ManageMenu = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'Rice',
    imageUrl: '',
    isAvailable: true,
  });

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const res = await getMenu();
      setItems(res.data?.data?.items || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch menu items.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const openCreateModal = () => {
    setEditingItem(null);
    setFormData({
      name: '',
      description: '',
      price: '',
      category: 'Rice',
      imageUrl: '',
      isAvailable: true,
    });
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      name: item.name || '',
      description: item.description || '',
      price: item.price || '',
      category: item.category || 'Rice',
      imageUrl: item.imageUrl || '',
      isAvailable: item.isAvailable ?? true,
    });
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError(null);
      setSuccess(null);

      const payload = {
        ...formData,
        price: Number(formData.price),
      };

      if (editingItem) {
        await updateItem(editingItem._id, payload);
        setSuccess(`"${formData.name}" updated successfully.`);
      } else {
        await createItem(payload);
        setSuccess(`"${formData.name}" added to menu.`);
      }

      setModalOpen(false);
      fetchMenuItems();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save menu item.');
    }
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      setError(null);
      await deleteItem(id);
      setSuccess(`"${name}" deleted.`);
      fetchMenuItems();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete menu item.');
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-8">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-white">Manage Menu</h1>
          <p className="text-slate-400 text-sm mt-1">Create, edit, or remove restaurant menu items</p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white text-xs font-bold transition-all shadow-lg shadow-orange-500/20 flex items-center gap-2"
        >
          <span>➕</span> Create New Meal Item
        </button>
      </div>

      <ErrorMessage message={error} />
      {success && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-semibold">
          ✅ {success}
        </div>
      )}

      {/* Menu Items Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
        {items.length === 0 ? (
          <div className="text-center py-12 text-slate-400 text-sm">
            No menu items available. Click "Create New Meal Item" to add your first dish!
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-4 rounded-l-xl">Meal</th>
                  <th className="p-4">Category</th>
                  <th className="p-4">Price (₦)</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 rounded-r-xl text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {items.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-800/40 transition-colors">
                    <td className="p-4 font-bold text-white flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-slate-800 overflow-hidden flex-shrink-0">
                        {item.imageUrl ? (
                          <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-lg">🍲</div>
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{item.name}</p>
                        <p className="text-[11px] text-slate-400 line-clamp-1 max-w-xs">{item.description}</p>
                      </div>
                    </td>

                    <td className="p-4">
                      <span className="bg-slate-950 text-orange-400 border border-orange-500/20 px-2.5 py-1 rounded-full text-[10px] font-bold">
                        {item.category}
                      </span>
                    </td>

                    <td className="p-4 font-extrabold text-white">
                      ₦{Number(item.price).toLocaleString()}
                    </td>

                    <td className="p-4">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                        item.isAvailable
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                          : 'bg-red-500/10 text-red-400 border border-red-500/20'
                      }`}>
                        {item.isAvailable ? 'Available' : 'Sold Out'}
                      </span>
                    </td>

                    <td className="p-4 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(item)}
                        className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold transition-all text-xs"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(item._id, item.name)}
                        className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 text-red-400 font-bold transition-all text-xs"
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal Form for Create / Edit */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-6 animate-in zoom-in-95 duration-150">
            
            <div className="flex justify-between items-center border-b border-slate-800 pb-4">
              <h2 className="text-xl font-bold text-white">
                {editingItem ? 'Edit Menu Item' : 'Create New Menu Item'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white">
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Item Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Suya Grill Platter"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe ingredients and flavor profile..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">Price (₦) *</label>
                  <input
                    type="number"
                    step="0.01"
                    min="1"
                    required
                    placeholder="e.g. 2500"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Category *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rice, Soup, Drinks, Desserts"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Image URL (Optional)</label>
                <input
                  type="url"
                  placeholder="https://images.unsplash.com/..."
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-white text-sm focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <input
                  type="checkbox"
                  id="isAvailable"
                  checked={formData.isAvailable}
                  onChange={(e) => setFormData({ ...formData, isAvailable: e.target.checked })}
                  className="w-4 h-4 accent-orange-500 rounded"
                />
                <label htmlFor="isAvailable" className="font-bold text-white cursor-pointer">
                  Available for Customer Ordering
                </label>
              </div>

              <div className="flex gap-3 pt-4 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold shadow-lg shadow-orange-500/20"
                >
                  {editingItem ? 'Update Item' : 'Create Item'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};

export default ManageMenu;
