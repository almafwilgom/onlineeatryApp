import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllOrders } from '../../services/orderService';
import api from '../../services/api';
import LoadingSpinner from '../../components/LoadingSpinner';
import ErrorMessage from '../../components/ErrorMessage';

const Dashboard = () => {
  const [metrics, setMetrics] = useState({ totalOrders: 0, totalRevenue: 0, pendingOrders: 0 });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        
        // Fetch dashboard metrics
        const metricsRes = await api.get('/orders/dashboard');
        setMetrics(metricsRes.data?.data || { totalOrders: 0, totalRevenue: 0, pendingOrders: 0 });

        // Fetch recent orders
        const ordersRes = await getAllOrders();
        const allOrders = ordersRes.data?.data?.orders || [];
        setRecentOrders(allOrders.slice(0, 5)); // Recent 5
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load dashboard metrics.');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="space-y-8 bg-slate-100">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900">Admin Dashboard</h1>
          <p className="text-slate-500 text-sm mt-1">Overview of restaurant performance, sales, and pending orders</p>
        </div>

        <div className="flex gap-3">
          <Link
            to="/admin/menu"
            className="px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 text-xs font-bold hover:bg-slate-50 transition-all flex items-center gap-1.5 shadow-sm"
          >
            <span>➕</span> Add Menu Item
          </Link>
          <Link
            to="/admin/orders"
            className="px-4 py-2.5 rounded-xl bg-orange-500 hover:bg-orange-600 text-white text-xs font-bold transition-all flex items-center gap-1.5 shadow-lg shadow-orange-500/20"
          >
            <span>📦</span> Manage Orders
          </Link>
        </div>
      </div>

      <ErrorMessage message={error} />

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        
        {/* Total Orders Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Orders</p>
              <h3 className="text-3xl font-black text-slate-900 mt-2">{metrics.totalOrders}</h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-600 font-bold flex items-center justify-center text-2xl border border-orange-100">
              📦
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-4">Lifetime placed customer orders</p>
        </div>

        {/* Total Revenue Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Revenue</p>
              <h3 className="text-3xl font-black text-slate-900 mt-2">
                ₦{Number(metrics.totalRevenue || 0).toLocaleString()}
              </h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 font-bold flex items-center justify-center text-2xl border border-amber-100">
              💰
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-4">Calculated from non-cancelled orders</p>
        </div>

        {/* Pending Orders Card */}
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Pending Orders</p>
              <h3 className="text-3xl font-black text-slate-900 mt-2">{metrics.pendingOrders}</h3>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 font-bold flex items-center justify-center text-2xl border border-emerald-100">
              ⏳
            </div>
          </div>
          <p className="text-[11px] text-slate-400 mt-4">Orders awaiting kitchen preparation</p>
        </div>

      </div>

      {/* Recent Orders Preview Table */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm space-y-6 text-slate-700">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold text-slate-900">Recent Orders</h2>
          <Link to="/admin/orders" className="text-xs font-bold text-orange-600 hover:underline">
            View All Orders ➔
          </Link>
        </div>

        {recentOrders.length === 0 ? (
          <div className="text-center py-8 text-slate-400 text-sm">No orders placed yet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600">
              <thead className="bg-slate-50 text-slate-500 uppercase tracking-wider text-[10px]">
                <tr>
                  <th className="p-3.5 rounded-l-xl">Order ID</th>
                  <th className="p-3.5">Customer</th>
                  <th className="p-3.5">Total Amount</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 rounded-r-xl">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentOrders.map((order) => (
                  <tr key={order._id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="p-3.5 font-mono text-slate-500">
                      #{order._id.substring(order._id.length - 8)}
                    </td>
                    <td className="p-3.5 font-bold text-slate-800">
                      {order.user?.name || 'Customer'}
                    </td>
                    <td className="p-3.5 font-bold text-orange-600">
                      ₦{Number(order.totalAmount).toLocaleString()}
                    </td>
                    <td className="p-3.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-orange-50 text-orange-600 border border-orange-100">
                        {order.status}
                      </span>
                    </td>
                    <td className="p-3.5 text-slate-400">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

    </div>
  );
};

export default Dashboard;
