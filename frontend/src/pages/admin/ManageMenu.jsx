import { useState, useEffect } from 'react';
import { Plus, Search, Edit2, Trash2, X, Upload } from 'lucide-react';
import { getMenu, createItem, updateItem, deleteItem } from '../../services/menuService';
import { SkeletonTable } from '../../components/Skeleton';
import ErrorMessage from '../../components/ErrorMessage';

const ManageMenu = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');

  // Add/Edit Modal
  const [modalOpen, setModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Delete Confirmation Modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

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
      setSubmitting(true);
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
        setSuccess(`"${formData.name}" added to menu successfully.`);
      }

      setModalOpen(false);
      fetchMenuItems();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save menu item.');
    } finally {
      setSubmitting(false);
    }
  };

  const promptDelete = (item) => {
    setItemToDelete(item);
    setDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!itemToDelete) return;
    try {
      setError(null);
      await deleteItem(itemToDelete._id);
      setSuccess(`"${itemToDelete.name}" deleted successfully.`);
      setDeleteModalOpen(false);
      setItemToDelete(null);
      fetchMenuItems();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete menu item.');
    }
  };

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.name?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesStatus =
      selectedStatus === 'All' ||
      (selectedStatus === 'Available' && item.isAvailable) ||
      (selectedStatus === 'Unavailable' && !item.isAvailable);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  return (
    <div className="space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-black text-stone-900">Menu Management</h1>
          <p className="text-stone-500 text-xs mt-0.5">Manage your restaurant food catalog and pricing</p>
        </div>

        <button
          onClick={openCreateModal}
          className="px-5 py-3 rounded-2xl bg-orange-500 hover:bg-orange-600 text-white font-extrabold text-xs transition-all shadow-lg shadow-orange-500/20 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add Meal
        </button>
      </div>

      <ErrorMessage message={error} />
      {success && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold shadow-xs">
          ✅ {success}
        </div>
      )}

      {/* Filter and Search Bar (Matching reference screen) */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-3xl border border-stone-200 shadow-sm">
        <div className="relative flex-1 w-full">
          <input
            type="text"
            placeholder="Search menu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-4 pr-10 py-2.5 bg-stone-50 border border-stone-200 rounded-2xl text-stone-900 text-xs focus:outline-none focus:border-orange-500"
          />
          <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
        </div>

        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full sm:w-44 p-2.5 bg-stone-50 border border-stone-200 rounded-2xl text-stone-700 text-xs font-bold focus:outline-none cursor-pointer"
        >
          <option value="All">All Categories</option>
          <option value="Rice">Rice</option>
          <option value="Soup">Soups</option>
          <option value="Grills">Grills</option>
          <option value="Drinks">Drinks</option>
          <option value="Desserts">Desserts</option>
        </select>

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="w-full sm:w-40 p-2.5 bg-stone-50 border border-stone-200 rounded-2xl text-stone-700 text-xs font-bold focus:outline-none cursor-pointer"
        >
          <option value="All">All Status</option>
          <option value="Available">Available</option>
          <option value="Unavailable">Unavailable</option>
        </select>
      </div>

      {/* Menu Table (Matching exact reference image) */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-sm">
        {loading ? (
          <SkeletonTable />
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-12 text-stone-400 text-xs">
            No menu items found. Click "Add Meal" to create a dish.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-stone-600">
              <thead className="bg-stone-50 text-stone-400 uppercase tracking-wider text-[10px] font-bold">
                <tr>
                  <th className="p-3.5 rounded-l-xl">Image</th>
                  <th className="p-3.5">Meal</th>
                  <th className="p-3.5">Category</th>
                  <th className="p-3.5">Price</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 rounded-r-xl text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                {filteredItems.map((item) => (
                  <tr key={item._id} className="hover:bg-stone-50/80 transition-colors">
                    <td className="p-3.5">
                      <img
                        src={item.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=100&q=80'}
                        alt={item.name}
                        className="w-12 h-12 rounded-2xl object-cover border border-stone-200"
                      />
                    </td>
                    <td className="p-3.5 font-bold text-stone-900 text-sm">
                      {item.name}
                    </td>
                    <td className="p-3.5 text-stone-500 font-semibold">
                      {item.category}
                    </td>
                    <td className="p-3.5 font-black font-display text-stone-950">
                      ₦{Number(item.price).toLocaleString()}
                    </td>
                    <td className="p-3.5">
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold border ${
                        item.isAvailable
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border-rose-200'
                      }`}>
                        {item.isAvailable ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="p-3.5 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(item)}
                        className="p-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
                        title="Edit Meal"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => promptDelete(item)}
                        className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition-colors"
                        title="Delete Meal"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Meal Modal (Matching exact reference image) */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl space-y-6 animate-in zoom-in-95 duration-150 text-stone-800">
            
            <div className="flex justify-between items-center pb-3 border-b border-stone-100">
              <h2 className="font-display text-lg font-black text-stone-900">
                {editingItem ? 'Edit Meal' : 'Add New Meal'}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-stone-400 hover:text-stone-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              
              {/* Image Input */}
              <div>
                <label className="block font-bold text-stone-700 mb-1">Meal Image</label>
                <div className="p-4 border-2 border-dashed border-stone-200 rounded-2xl text-center space-y-2 bg-stone-50">
                  <Upload className="w-6 h-6 text-stone-400 mx-auto" />
                  <p className="text-[11px] text-stone-500">Upload Image or enter image URL</p>
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    className="w-full p-2.5 bg-white border border-stone-200 rounded-xl text-stone-900 text-xs focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Meal Name *</label>
                <input
                  type="text"
                  required
                  placeholder="Enter meal name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-xs focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block font-bold text-stone-700 mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Enter meal description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-xs focus:outline-none focus:border-orange-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-stone-700 mb-1">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-xs font-bold focus:outline-none"
                  >
                    <option value="Rice">Rice</option>
                    <option value="Soup">Soups</option>
                    <option value="Grills">Grills</option>
                    <option value="Drinks">Drinks</option>
                    <option value="Desserts">Desserts</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-stone-700 mb-1">Price (₦) *</label>
                  <input
                    type="number"
                    step="0.01"
                    min="1"
                    required
                    placeholder="0.00"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    className="w-full p-3 bg-stone-50 border border-stone-200 rounded-xl text-stone-900 text-xs focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              {/* Availability Switch */}
              <div className="flex items-center justify-between pt-2">
                <label className="font-bold text-stone-800">Availability</label>
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, isAvailable: !formData.isAvailable })}
                  className={`w-12 h-6 rounded-full transition-colors relative p-1 ${
                    formData.isAvailable ? 'bg-orange-500' : 'bg-stone-300'
                  }`}
                >
                  <div className={`w-4 h-4 rounded-full bg-white transition-transform ${
                    formData.isAvailable ? 'translate-x-6' : 'translate-x-0'
                  }`} />
                </button>
              </div>

              <div className="flex gap-3 pt-4 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="w-full py-3 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 rounded-xl bg-orange-500 hover:bg-orange-600 text-white font-bold shadow-md shadow-orange-500/20"
                >
                  {submitting ? 'Saving...' : 'Save Meal'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalOpen && itemToDelete && (
        <div className="fixed inset-0 z-50 bg-stone-950/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full shadow-2xl space-y-4 text-center">
            <h3 className="font-display font-black text-lg text-stone-900">Delete {itemToDelete.name}?</h3>
            <p className="text-xs text-stone-500">Are you sure you want to delete this menu item?</p>
            
            <div className="grid grid-cols-2 gap-3 pt-2">
              <button
                onClick={() => setDeleteModalOpen(false)}
                className="py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md shadow-rose-600/20"
              >
                Delete Meal
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default ManageMenu;
