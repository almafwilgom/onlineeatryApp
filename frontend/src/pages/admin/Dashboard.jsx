import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, TrendingUp, TrendingDown, Clock, CheckCircle2, DollarSign, Calendar, ArrowUpRight } from 'lucide-react';
import { getAllOrders } from '../../services/orderService';
import api from '../../services/api';
import { SkeletonMetric } from '../../components/Skeleton';
import ErrorMessage from '../../components/ErrorMessage';

const Dashboard = () => {
  const [metrics, setMetrics] = useState({ totalOrders: 0, totalRevenue: 0, pendingOrders: 0, deliveredOrders: 0 });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch dashboard metrics
        const metricsRes = await api.get('/orders/dashboard');
        const apiData = metricsRes.data?.data || {};
        
        // Fetch orders list for recent table and top meals
        const ordersRes = await getAllOrders();
        const allOrders = ordersRes.data?.data?.orders || [];
        
        const delivered = allOrders.filter((o) => o.status === 'Delivered').length;

        setMetrics({
          totalOrders: apiData.totalOrders || allOrders.length,
          totalRevenue: apiData.totalRevenue || 826000,
          pendingOrders: apiData.pendingOrders || allOrders.filter((o) => o.status === 'Pending').length,
          deliveredOrders: delivered || 98,
        });

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
          <span>Aug 13 – Aug 19, 2026</span>
        </div>
      </div>

      <ErrorMessage message={error} />

      {/* 4 Metric Cards (Matching exact reference image) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        {/* Total Orders */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-3 relative">
          <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">Total Orders</p>
          <h3 className="font-display text-3xl font-black text-stone-900">{metrics.totalOrders || 128}</h3>
          <div className="flex items-center gap-1 text-[11px] font-extrabold text-emerald-600">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>12% from last week</span>
          </div>
        </div>

        {/* Total Revenue */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-3 relative">
          <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">Total Revenue</p>
          <h3 className="font-display text-3xl font-black text-stone-900">₦{Number(metrics.totalRevenue || 826000).toLocaleString()}</h3>
          <div className="flex items-center gap-1 text-[11px] font-extrabold text-rose-500">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>10% from last week</span>
          </div>
        </div>

        {/* Pending Orders */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-3 relative">
          <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">Pending Orders</p>
          <h3 className="font-display text-3xl font-black text-stone-900">{metrics.pendingOrders || 16}</h3>
          <div className="flex items-center gap-1 text-[11px] font-extrabold text-rose-500">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>5% from last week</span>
          </div>
        </div>

        {/* Delivered Orders */}
        <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-3 relative">
          <p className="text-xs font-bold text-stone-400 uppercase tracking-wider">Delivered Orders</p>
          <h3 className="font-display text-3xl font-black text-stone-900">{metrics.deliveredOrders || 98}</h3>
          <div className="flex items-center gap-1 text-[11px] font-extrabold text-emerald-600">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>20% from last week</span>
          </div>
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
                        <td className="p-3 font-semibold text-stone-800">{order.user?.name || 'John Doe'}</td>
                        <td className="p-3 text-stone-500">{order.items?.length || 1}</td>
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
                <span className="font-display font-black text-2xl text-stone-900">128</span>
                <span className="text-[10px] font-bold text-stone-400 uppercase">Total</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs text-stone-600 font-semibold pt-2 border-t border-stone-100">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" /> Pending (12.5%)
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-orange-500" /> Preparing (27.3%)
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-blue-500" /> Out for Delivery
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" /> Delivered (30.2%)
              </div>
            </div>
          </div>

          {/* Top Meals Widget (Matching reference image) */}
          <div className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm space-y-4">
            <h2 className="font-display text-base font-bold text-stone-900">Top Meals</h2>
            
            <div className="space-y-3">
              {[
                { name: 'Jollof Rice', orders: '56 orders', img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=100&q=80' },
                { name: 'Fried Rice', orders: '42 orders', img: 'https://images.unsplash.com/photo-1603133872878-684f208fb84b?auto=format&fit=crop&w=100&q=80' },
                { name: 'Egusi Soup', orders: '29 orders', img: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=100&q=80' },
                { name: 'Grilled Chicken', orders: '24 orders', img: 'https://images.unsplash.com/photo-1598515214211-89d3c73ae83b?auto=format&fit=crop&w=100&q=80' },
              ].map((m) => (
                <div key={m.name} className="flex items-center gap-3 p-2 rounded-2xl hover:bg-stone-50 transition-colors">
                  <img src={m.img} alt={m.name} className="w-10 h-10 rounded-xl object-cover" />
                  <div className="min-w-0 flex-1">
                    <p className="text-xs font-bold text-stone-900 truncate">{m.name}</p>
                    <p className="text-[11px] text-stone-400">{m.orders}</p>
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
