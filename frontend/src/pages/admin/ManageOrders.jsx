import { useState, useEffect } from 'react';
import { getAllOrders, updateStatus } from '../../services/orderService';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [updatingId, setUpdatingId] = useState(null);
  const [success, setSuccess] = useState(null);

  const statuses = ['All', 'Pending', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'];

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getAllOrders();
      setOrders(res.data?.data?.orders || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch customer orders.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setUpdatingId(orderId);
      setError(null);
      setSuccess(null);

      await updateStatus(orderId, newStatus);
      setSuccess(`Order status updated to "${newStatus}".`);
      
      // Update local state immediately
      setOrders((prev) =>
        prev.map((o) => (o._id === orderId ? { ...o, status: newStatus } : o))
      );
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update order status.');
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredOrders = statusFilter === 'All'
    ? orders
    : orders.filter((o) => o.status === statusFilter);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-8">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-white">Manage Orders</h1>
          <p className="text-slate-400 text-sm mt-1">Review customer orders and update delivery status</p>
        </div>

        <button
          onClick={fetchOrders}
          className="px-4 py-2 bg-slate-900 border border-slate-800 text-slate-300 text-xs font-bold rounded-xl hover:bg-slate-800 transition-all flex items-center gap-2"
        >
          <span>↻</span> Refresh List
        </button>
      </div>

      <ErrorMessage message={error} />
      {success && (
        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-semibold">
          ✅ {success}
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-slate-900 border border-slate-800 p-2 rounded-2xl">
        {statuses.map((st) => (
          <button
            key={st}
            onClick={() => setStatusFilter(st)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              statusFilter === st
                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                : 'text-slate-400 hover:text-white hover:bg-slate-800'
            }`}
          >
            {st} {st !== 'All' && `(${orders.filter((o) => o.status === st).length})`}
          </button>
        ))}
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="text-center py-16 bg-slate-900/60 rounded-3xl border border-slate-800 text-slate-400 text-sm">
          No orders found matching status "{statusFilter}".
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <div
              key={order._id}
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl"
            >
              
              {/* Header Info */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                      ID: #{order._id.substring(order._id.length - 8)}
                    </span>
                    <span className="text-xs text-slate-400">
                      {new Date(order.createdAt).toLocaleString()}
                    </span>
                  </div>

                  <div className="mt-3 space-y-1 text-xs">
                    <p className="text-white font-bold">
                      👤 Customer: {order.user?.name || 'Unknown'} ({order.user?.email || 'N/A'})
                    </p>
                    <p className="text-slate-400">
                      📍 <strong>Address:</strong> {order.deliveryAddress}
                    </p>
                  </div>
                </div>

                {/* Status Updater Dropdown */}
                <div className="flex items-center gap-3 bg-slate-950 p-3 rounded-2xl border border-slate-800">
                  <span className="text-xs font-bold text-slate-400">Status:</span>
                  <select
                    value={order.status}
                    disabled={updatingId === order._id}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className="bg-slate-900 text-orange-400 font-extrabold text-xs px-3 py-2 rounded-xl border border-orange-500/30 focus:outline-none focus:border-orange-500 cursor-pointer"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Preparing">Preparing</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Order Items</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {order.items?.map((item, idx) => (
                    <div key={idx} className="bg-slate-950/60 rounded-xl p-3 border border-slate-800/80 flex items-center justify-between text-xs">
                      <span className="font-semibold text-white truncate max-w-[150px]">
                        {item.quantity}x {item.menuItem?.name || 'Meal Item'}
                      </span>
                      <span className="font-bold text-slate-400">
                        ₦{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Total */}
              <div className="pt-4 border-t border-slate-800 flex justify-between items-center text-sm">
                <span className="text-slate-400">Total Revenue</span>
                <span className="text-xl font-black text-orange-400">
                  ₦{Number(order.totalAmount).toLocaleString()}
                </span>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default ManageOrders;
