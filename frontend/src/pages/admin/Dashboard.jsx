import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowUpRight } from 'lucide-react';
import { getAllOrders } from '../../services/orderService';
import api from '../../services/api';
import { SkeletonMetric } from '../../components/Skeleton';
import ErrorMessage from '../../components/ErrorMessage';

const Dashboard = () => {
  const [metrics, setMetrics] = useState({ totalOrders: 0, totalRevenue: 0, pendingOrders: 0, deliveredOrders: 0 });
  const [recentOrders, setRecentOrders] = useState([]);
  const [statusCounts, setStatusCounts] = useState({ Pending: 0, Preparing: 0, 'Out for Delivery': 0, Delivered: 0 });
  const [topMeals, setTopMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        const [metricsResult, ordersRes] = await Promise.all([
          api.get('/orders/dashboard').catch(() => null),
          getAllOrders(),
        ]);
        const apiData = metricsResult?.data?.data || {};
        const allOrders = ordersRes.data?.data?.orders || [];
        const counts = allOrders.reduce((result, order) => ({
          ...result,
          [order.status]: (result[order.status] || 0) + 1,
        }), { Pending: 0, Preparing: 0, 'Out for Delivery': 0, Delivered: 0 });
        const mealTotals = allOrders.reduce((result, order) => {
          order.items?.forEach((item) => {
            const meal = item.menuItem || {};
            const key = meal._id || meal.name || item._id;
            if (!key) return;
            result[key] = result[key] || { name: meal.name || 'Meal', imageUrl: meal.imageUrl, orders: 0 };
            result[key].orders += Number(item.quantity) || 0;
          });
          return result;
        }, {});

        setMetrics({
          totalOrders: apiData.totalOrders ?? allOrders.length,
          totalRevenue: apiData.totalRevenue ?? allOrders.reduce((sum, order) => sum + (Number(order.totalAmount) || 0), 0),
          pendingOrders: apiData.pendingOrders ?? counts.Pending,
          deliveredOrders: counts.Delivered,
        });
        setStatusCounts(counts);
        setTopMeals(Object.values(mealTotals).sort((a, b) => b.orders - a.orders).slice(0, 4));
        setRecentOrders(allOrders.slice(0, 5));
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load dashboard metrics.');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
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

  if (loading) {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <SkeletonMetric key={i} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      
      {/* Top Header (Matching reference design) */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="font-display text-2xl sm:text-3xl font-black text-stone-900">Dashboard</h1>
          <p className="text-stone-500 text-xs mt-0.5">Overview of store sales, orders performance, and key metrics</p>
        </div>

        <div className="flex items-center gap-2 px-3.5 py-2 bg-white border border-stone-200 rounded-xl text-xs font-bold text-stone-700 shadow-xs">
          <Calendar className="w-3.5 h-3.5 text-stone-400" />
          <span>All-time overview</span>
        </div>
      </div>

      <ErrorMessage message={error} />

      {/* 4 Metric Cards (Matching exact reference image) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Orders */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-3 relative">
          <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">Total Orders</p>
          <h3 className="font-display text-3xl font-black text-stone-900">{metrics.totalOrders}</h3>
          <p className="text-[11px] font-semibold text-stone-400">Orders received</p>
        </div>

        {/* Total Revenue */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-3 relative">
          <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">Total Revenue</p>
          <h3 className="font-display text-3xl font-black text-stone-900">₦{Number(metrics.totalRevenue).toLocaleString()}</h3>
          <p className="text-[11px] font-semibold text-stone-400">Recorded order value</p>
        </div>

        {/* Pending Orders */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-3 relative">
          <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">Pending Orders</p>
          <h3 className="font-display text-3xl font-black text-stone-900">{metrics.pendingOrders}</h3>
          <p className="text-[11px] font-semibold text-stone-400">Awaiting processing</p>
        </div>

        {/* Delivered Orders */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-3 relative">
          <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">Delivered Orders</p>
          <h3 className="font-display text-3xl font-black text-stone-900">{metrics.deliveredOrders}</h3>
          <p className="text-[11px] font-semibold text-stone-400">Completed deliveries</p>
        </div>

      </div>

      {/* Main Grid: Recent Orders Table + Side Widgets (Matching reference image) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Recent Orders Table (2 Cols) */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-6">
          <div className="flex justify-between items-center pb-3 border-b border-stone-100">
            <h2 className="font-display text-lg font-bold text-stone-900">Recent Orders</h2>
            <Link to="/admin/orders" className="text-xs font-bold text-orange-600 hover:underline flex items-center gap-0.5">
              <span>View all</span> <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <div className="text-center py-8 text-stone-400 text-xs">No orders available.</div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-stone-600">
                <thead className="bg-stone-50 text-stone-400 uppercase tracking-wider text-[10px] font-bold">
                  <tr>
                    <th className="p-3 rounded-l-xl">Order ID</th>
                    <th className="p-3">Customer</th>
                    <th className="p-3">Items</th>
                    <th className="p-3">Amount</th>
                    <th className="p-3">Status</th>
                    <th className="p-3 rounded-r-xl">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {recentOrders.map((order) => {
                    const shortId = `#CHP${order._id.substring(order._id.length - 5).toUpperCase()}`;
                    return (
                      <tr key={order._id} className="hover:bg-stone-50/80 transition-colors">
                        <td className="p-3 font-mono font-bold text-stone-900">{shortId}</td>
                        <td className="p-3 font-semibold text-stone-800">{order.user?.name || 'Customer'}</td>
                        <td className="p-3 text-stone-500">{order.items?.length ?? 0}</td>
                        <td className="p-3 font-black font-display text-stone-900">₦{Number(order.totalAmount).toLocaleString()}</td>
                        <td className="p-3">
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border ${getStatusBadge(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="p-3 text-stone-400">{new Date(order.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Side Widgets (Orders Overview Ring & Top Meals) */}
        <div className="space-y-6">
          
          {/* Orders Overview Summary Box */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
            <h2 className="font-display text-base font-bold text-stone-900">Orders Overview</h2>
            
            <div className="flex items-center justify-center p-4">
              <div className="w-32 h-32 rounded-full border-8 border-orange-500 border-t-emerald-500 border-r-blue-500 flex flex-col items-center justify-center text-center shadow-inner">
                <span className="font-display font-black text-2xl text-stone-900">{metrics.totalOrders}</span>
                <span className="text-[10px] font-bold text-stone-400 uppercase">Total</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs text-stone-600 font-semibold pt-2 border-t border-stone-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Pending ({statusCounts.Pending})
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500" /> Preparing ({statusCounts.Preparing})
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Out for Delivery ({statusCounts['Out for Delivery']})
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Delivered ({statusCounts.Delivered})
              </div>
            </div>
          </div>

          {/* Top Meals Widget (Matching reference image) */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
            <h2 className="font-display text-base font-bold text-stone-900">Top Meals</h2>
            
            <div className="space-y-3">
              {topMeals.length === 0 ? (
                <p className="py-4 text-center text-xs text-stone-400">No meal order data yet.</p>
              ) : topMeals.map((m) => (
                <div key={m.name} className="flex items-center gap-3 p-2 rounded-2xl hover:bg-stone-50 transition-colors">
                  <img src={m.imageUrl || 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=100&q=80'} alt={m.name} className="w-10 h-10 rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-stone-900 truncate">{m.name}</p>
                    <p className="text-[11px] text-stone-400">{m.orders} ordered</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default Dashboard;
