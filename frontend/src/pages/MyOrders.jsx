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
        return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'Preparing':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Out for Delivery':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      case 'Delivered':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'Cancelled':
        return 'bg-red-500/20 text-red-400 border-red-500/30';
      default:
        return 'bg-slate-800 text-slate-400 border-slate-700';
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">My Orders</h1>
          <p className="text-slate-400 text-sm mt-1">Track status and view your order history</p>
        </div>

        <button
          onClick={fetchOrders}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 text-xs font-bold rounded-xl transition-all flex items-center gap-2"
        >
          <span>↻</span> Refresh Orders
        </button>
      </div>

      {newOrderCreated && (
        <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-bold flex items-center gap-3 shadow-lg animate-in fade-in slide-in-from-top-2">
          <span className="text-xl">🎉</span>
          <div>
            <p>Order Placed Successfully!</p>
            <p className="text-xs font-normal text-slate-300">Your order is now being processed by our kitchen.</p>
          </div>
        </div>
      )}

      <ErrorMessage message={error} />

      {orders.length === 0 ? (
        <div className="text-center py-20 bg-slate-900/60 rounded-3xl border border-slate-800 space-y-4">
          <div className="text-5xl">📦</div>
          <h3 className="text-xl font-bold text-white">No Orders Yet</h3>
          <p className="text-slate-400 text-sm max-w-sm mx-auto">
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
              className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl hover:border-slate-700 transition-all"
            >
              
              {/* Top row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-slate-400 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800">
                      ID: #{order._id.substring(order._id.length - 8)}
                    </span>
                    <span className="text-xs text-slate-400">
                      {new Date(order.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-2">
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
                      className="bg-slate-950/60 rounded-xl p-3 border border-slate-800/80 flex items-center justify-between text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-md bg-orange-500/10 text-orange-400 font-bold flex items-center justify-center">
                          {item.quantity}x
                        </span>
                        <span className="font-semibold text-white truncate max-w-[140px]">
                          {item.menuItem?.name || 'Meal Item'}
                        </span>
                      </div>
                      <span className="font-bold text-slate-300">
                        ₦{(item.price * item.quantity).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Order Footer */}
              <div className="pt-4 border-t border-slate-800 flex justify-between items-center text-sm">
                <span className="text-slate-400">Total Order Amount</span>
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

export default MyOrders;
