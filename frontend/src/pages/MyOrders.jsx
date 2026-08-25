import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, RotateCw, ChevronDown, ChevronUp } from 'lucide-react';
import { getMyOrders } from '../services/orderService';
import OrderTimeline from '../components/OrderTimeline';
import { SkeletonCard } from '../components/Skeleton';
import ErrorMessage from '../components/ErrorMessage';

const statuses = ['All', 'Pending', 'Preparing', 'Out for Delivery', 'Delivered', 'Cancelled'];

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [expandedOrderId, setExpandedOrderId] = useState(null);

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

  const filteredOrders = selectedStatus === 'All'
    ? orders
    : orders.filter((o) => o.status === selectedStatus);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display text-3xl sm:text-4xl font-black text-stone-900">My Orders</h1>
          <p className="text-stone-500 text-xs mt-1">Track live order statuses and view your order history</p>
        </div>

        <button
          onClick={fetchOrders}
          className="px-4 py-2 bg-white border border-stone-200 text-stone-700 text-xs font-bold rounded-xl hover:bg-stone-50 transition-all flex items-center gap-2 shadow-xs"
        >
          <RotateCw className="w-3.5 h-3.5 text-stone-400" /> Refresh
        </button>
      </div>

      {/* Filter Tabs (Matching reference design) */}
      <div className="flex items-center gap-2 overflow-x-auto scrollbar-none pb-2 sm:pb-0">
        {statuses.map((st) => (
          <button
            key={st}
            onClick={() => setSelectedStatus(st)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all flex-shrink-0 ${
              selectedStatus === st
                ? 'bg-orange-500 text-white shadow-md shadow-orange-500/20'
                : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-100'
            }`}
          >
            {st}
          </button>
        ))}
      </div>

      <ErrorMessage message={error} />

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : filteredOrders.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-3xl border border-stone-200 space-y-3">
          <div className="w-16 h-16 mx-auto rounded-full bg-stone-100 flex items-center justify-center text-stone-400">
            <Package className="w-8 h-8" />
          </div>
          <h3 className="font-display text-lg font-bold text-stone-900">You haven't placed any orders yet</h3>
          <p className="text-stone-500 text-xs max-w-xs mx-auto">
            Explore our delicious menu to get started!
          </p>
          <Link
            to="/menu"
            className="inline-block px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs rounded-xl shadow-lg shadow-orange-500/20 transition-all"
          >
            Explore Menu
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {filteredOrders.map((order) => {
            const isExpanded = expandedOrderId === order._id;
            const shortId = `#CHP${order._id.substring(order._id.length - 5).toUpperCase()}`;

            return (
              <div
                key={order._id}
                className="bg-white border border-stone-200 rounded-3xl p-6 space-y-6 shadow-sm hover:shadow-md transition-all"
              >
                
                {/* Header row */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-100">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-black font-display text-stone-900">
                        {shortId}
                      </span>
                      <span className="text-xs text-stone-400">
                        {new Date(order.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 mt-1">
                      {order.items?.length || 0} items
                    </p>
                  </div>

                  <div className="flex items-center gap-3 justify-between sm:justify-end">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold border ${getStatusBadge(order.status)}`}>
                      ● {order.status}
                    </span>
                    <span className="font-display font-black text-stone-950 text-base">
                      ₦{Number(order.totalAmount).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Item Thumbnails Preview (Matching reference image) */}
                <div className="flex items-center gap-3 overflow-x-auto scrollbar-none py-1">
                  {order.items?.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 bg-stone-50 p-2 rounded-xl border border-stone-200/60 flex-shrink-0 text-xs">
                      <div className="w-10 h-10 rounded-lg bg-stone-200 overflow-hidden">
                        <img
                          src={item.menuItem?.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=150&q=80'}
                          alt={item.menuItem?.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="font-bold text-stone-800">
                        {item.quantity}x {item.menuItem?.name || 'Meal'}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Expand / Collapse Order Timeline Details */}
                <div className="pt-2 border-t border-stone-100">
                  <button
                    onClick={() => setExpandedOrderId(isExpanded ? null : order._id)}
                    className="text-xs font-bold text-orange-600 hover:text-orange-700 flex items-center gap-1"
                  >
                    <span>{isExpanded ? 'Hide Details' : 'View Order Details & Timeline'}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>

                  {isExpanded && (
                    <div className="mt-6 pt-4 border-t border-stone-100 grid grid-cols-1 md:grid-cols-2 gap-8 animate-in fade-in duration-200">
                      <div>
                        <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-4">
                          Order Status Timeline
                        </h4>
                        <OrderTimeline currentStatus={order.status} createdAt={order.createdAt} />
                      </div>

                      <div className="space-y-3 bg-stone-50 p-5 rounded-2xl border border-stone-200/80">
                        <h4 className="text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                          Delivery Information
                        </h4>
                        <p className="text-xs text-stone-600 leading-relaxed">
                          <strong>Address:</strong> {order.deliveryAddress}
                        </p>
                        <p className="text-xs text-stone-600">
                          <strong>Order Date:</strong> {new Date(order.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};

export default MyOrders;
