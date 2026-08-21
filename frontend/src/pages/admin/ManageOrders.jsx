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

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-50 text-amber-700 border-amber-200';
      case 'Preparing':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Out for Delivery':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      case 'Delivered':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Cancelled':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-slate-100 text-slate-650 border-slate-200';
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-8 bg-slate-100">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Manage Orders</h1>
          <p className="text-slate-500 text-sm mt-1">Review customer orders and update delivery status</p>
        </div>

        <button
          onClick={fetchOrders}
          className="px-4 py-2 bg-white border border-slate-200 text-slate-700 text-xs font-bold rounded-xl hover:bg-slate-50 transition-all flex items-center gap-2 shadow-sm"
        >
          <span>↻</span> Refresh List
        </button>
      </div>

      <ErrorMessage message={error} />
      {success && (
        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-650 text-sm font-semibold">
          ✅ {success}
        </div>
      )}

      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 bg-white border border-slate-200 p-2 rounded-2xl shadow-sm">
        {statuses.map((st) => (
          <button
            key={st}
            onClick={() => setStatusFilter(st)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              statusFilter === st
                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'
            }`}
          >
            {st} {st !== 'All' && `(${orders.filter((o) => o.status === st).length})`}
          </button>
        ))}
      </div>

      {/* Orders List */}
      {filteredOrders.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-slate-200 text-slate-400 text-sm shadow-sm">
          No orders found matching status "{statusFilter}".
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order) => (
            <div
              key={order._id}
              className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm text-slate-700"
            >
              
              {/* Header Info */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
                      ID: #{order._id.substring(order._id.length - 8)}
                    </span>
                    <span className="text-xs text-slate-400">
                      {new Date(order.createdAt).toLocaleString()}
                    </span>
                  </div>

                  <div className="mt-3 space-y-1 text-xs text-slate-600">
                    <p className="text-slate-900 font-bold">
                      👤 Customer: {order.user?.name || 'Unknown'} ({order.user?.email || 'N/A'})
                    </p>
                    <p className="text-slate-500">
                      📍 <strong>Address:</strong> {order.deliveryAddress}
                    </p>
                  </div>
                </div>

                {/* Status Updater Dropdown */}
                <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200/80">
                  <span className="text-xs font-bold text-slate-500">Status:</span>
                  <select
                    value={order.status}
                    disabled={updatingId === order._id}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className="bg-white text-orange-655 font-extrabold text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:border-orange-500 cursor-pointer shadow-sm"
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
                    <div key={idx} className="bg-slate-50 rounded-xl p-3 border border-slate-200/60 flex items-center justify-between text-xs text-slate-700">
                      <span className="font-semibold text-slate-900 truncate max-w-[150px]">
                        {item.quantity}x {item.menuItem?.name || 'Meal Item'}
                      </span>
                      <span className="font-bold text-slate-500">
                        ₦{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Footer Total */}
              <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-sm">
                <span className="text-slate-500 font-medium">Total Revenue</span>
                <span className="text-xl font-black text-orange-600">
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
