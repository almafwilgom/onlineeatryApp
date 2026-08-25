import { useState, useEffect } from 'react';
import { RotateCw, CheckCircle2 } from 'lucide-react';
import { getAllOrders, updateStatus } from '../../services/orderService';
import { SkeletonTable } from '../../components/Skeleton';
import ErrorMessage from '../../components/ErrorMessage';

const statuses = ['All', 'Pending', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'];

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [updatingId, setUpdatingId] = useState(null);
  const [success, setSuccess] = useState(null);

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
      setSuccess('Order status updated successfully.');
      
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
        return 'bg-orange-50 text-orange-700 border-orange-200';
      case 'Out for Delivery':
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'Delivered':
        return 'bg-emerald-50 text-emerald-700 border-emerald-200';
      case 'Cancelled':
        return 'bg-rose-50 text-rose-700 border-rose-200';
      default:
        return 'bg-stone-100 text-stone-600 border-stone-200';
    }
  };

  return (
    <div className="space-y-8">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-black text-stone-900">Manage Orders</h1>
          <p className="text-stone-500 text-xs mt-0.5">Track live customer orders and update status progression</p>
        </div>

        <button
          onClick={fetchOrders}
          className="px-4 py-2 bg-white border border-stone-200 text-stone-700 text-xs font-bold rounded-xl hover:bg-stone-50 transition-all flex items-center gap-2 shadow-xs"
        >
          <RotateCw className="w-3.5 h-3.5 text-stone-400" /> Refresh List
        </button>
      </div>

      <ErrorMessage message={error} />
      {success && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-bold flex items-center gap-2 shadow-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" /> {success}
        </div>
      )}

      {/* Filter Tabs (Matching reference screen) */}
      <div className="flex flex-wrap items-center gap-2 bg-white border border-stone-200 p-2 rounded-2xl shadow-sm">
        {statuses.map((st) => (
          <button
            key={st}
            onClick={() => setStatusFilter(st)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              statusFilter === st
                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                : 'text-stone-500 hover:text-stone-900 hover:bg-stone-50'
            }`}
          >
            {st} {st !== 'All' && `(${orders.filter((o) => o.status === st).length})`}
          </button>
        ))}
      </div>

      {/* Orders Table & Cards */}
      <div className="bg-white border border-stone-200 rounded-3xl p-6 shadow-sm">
        {loading ? (
          <SkeletonTable />
        ) : filteredOrders.length === 0 ? (
          <div className="text-center py-12 text-stone-400 text-xs">
            No orders found matching status "{statusFilter}".
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const shortId = `#CHP${order._id.substring(order._id.length - 5).toUpperCase()}`;
              return (
                <div
                  key={order._id}
                  className="p-5 border border-stone-200/80 rounded-2xl space-y-4 hover:border-stone-300 transition-all bg-stone-50/50"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3">
                        <span className="font-display font-black text-sm text-stone-900">{shortId}</span>
                        <span className="text-xs text-stone-400">{new Date(order.createdAt).toLocaleString()}</span>
                      </div>
                      <p className="text-xs text-stone-600 mt-1">
                        👤 <strong>Customer:</strong> {order.user?.name || 'Unknown'} ({order.user?.email || 'N/A'})
                      </p>
                      <p className="text-xs text-stone-500">
                        📍 <strong>Address:</strong> {order.deliveryAddress}
                      </p>
                    </div>

                    {/* Status Select Updater */}
                    <div className="flex items-center gap-3 bg-white p-2.5 rounded-2xl border border-stone-200 shadow-xs">
                      <span className="text-xs font-bold text-stone-400">Status:</span>
                      <select
                        value={order.status}
                        disabled={updatingId === order._id}
                        onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        className="bg-transparent font-extrabold text-xs text-orange-600 focus:outline-none cursor-pointer"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Preparing">Preparing</option>
                        <option value="Out for Delivery">Out for Delivery</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  </div>

                  {/* Item List */}
                  <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-200/60">
                    {order.items?.map((item, idx) => (
                      <span key={idx} className="bg-white px-3 py-1 rounded-xl text-xs border border-stone-200 text-stone-700 font-semibold">
                        {item.quantity}x {item.menuItem?.name || 'Meal'} (₦{(item.price * item.quantity).toLocaleString()})
                      </span>
                    ))}
                    <span className="ml-auto font-display font-black text-stone-950 text-sm">
                      Total: ₦{Number(order.totalAmount).toLocaleString()}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};

export default ManageOrders;
