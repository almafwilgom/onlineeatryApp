import { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { getMyOrders } from '../services/orderService';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';

const MyOrders = () => {
  const location = useLocation();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const newOrderCreated = location.state?.newOrderCreated;

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getMyOrders();
      setOrders(res.data?.data?.orders || []);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch order history.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-amber-50 text-amber-700 border-amber-250';
      case 'Preparing':
        return 'bg-blue-50 text-blue-700 border-blue-250';
      case 'Out for Delivery':
        return 'bg-purple-50 text-purple-700 border-purple-250';
      case 'Delivered':
        return 'bg-emerald-50 text-emerald-700 border-emerald-250';
      case 'Cancelled':
        return 'bg-rose-50 text-rose-700 border-rose-250';
      default:
        return 'bg-slate-100 text-slate-600 border-slate-200';
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 bg-slate-100">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900">My Orders</h1>
          <p className="text-slate-500 text-sm mt-1">Track status and view your order history</p>
        </div>

        <button
          onClick={fetchOrders}
          className="px-4 py-2 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-all flex items-center gap-2 shadow-sm"
        >
          <span>↻</span> Refresh Orders
        </button>
      </div>

      {newOrderCreated && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-bold flex items-center gap-3 shadow-sm animate-in fade-in slide-in-from-top-2">
          <span className="text-xl">🎉</span>
          <div>
            <p>Order Placed Successfully!</p>
            <p className="text-xs font-normal text-slate-600">Your order is now being processed by our kitchen.</p>
          </div>
        </div>
      )}

      <ErrorMessage message={error} />

      {orders.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 space-y-4 shadow-sm">
          <div className="text-5xl">📦</div>
          <h3 className="text-xl font-bold text-slate-900">No Orders Yet</h3>
          <p className="text-slate-500 text-sm max-w-sm mx-auto">
            You haven't placed any food orders yet. Explore our delicious menu to get started!
          </p>
          <Link
            to="/menu"
            className="inline-block px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-sm rounded-xl transition-all shadow-lg shadow-orange-500/20"
          >
            Explore Menu
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm hover:shadow-md transition-all"
            >
              
              {/* Top row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
                      ID: #{order._id.substring(order._id.length - 8)}
                    </span>
                    <span className="text-xs text-slate-400">
                      {new Date(order.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-slate-600 mt-3">
                    📍 <strong>Delivery Address:</strong> {order.deliveryAddress}
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-3.5 py-1 rounded-full text-xs font-extrabold border ${getStatusBadge(order.status)}`}>
                    ● {order.status}
                  </span>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ordered Items</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {order.items?.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-slate-50 rounded-xl p-3 border border-slate-200/60 flex items-center justify-between text-xs text-slate-700"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-md bg-orange-500/10 text-orange-600 font-bold flex items-center justify-center">
                          {item.quantity}x
                        </span>
                        <span className="font-semibold text-slate-900 truncate max-w-[140px]">
                          {item.menuItem?.name || 'Meal Item'}
                        </span>
                      </div>
                      <span className="font-bold text-slate-800">
                        ₦{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Footer */}
              <div className="pt-4 border-t border-slate-100 flex justify-between items-center text-sm">
                <span className="text-slate-500 font-medium">Total Order Amount</span>
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

export default MyOrders;
