// AdminLayout.jsx — implemented in Phase 9
import { Outlet } from 'react-router-dom';

const AdminLayout = () => (
  <div className="flex min-h-screen bg-slate-950">
    <aside className="w-64 bg-slate-900 border-r border-slate-800 p-6">
      <p className="text-orange-500 font-bold text-lg mb-8">⚙️ Admin Panel</p>
      {/* Sidebar nav added in Phase 9 */}
    </aside>
    <main className="flex-1 p-8">
      <Outlet />
    </main>
  </div>
);
export default AdminLayout;
