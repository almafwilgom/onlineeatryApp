/**
 * AppRoutes.jsx — single source of truth for all frontend routes.
 *
 * Route structure:
 *  MainLayout (public + customer routes)
 *    /          → Home
 *    /about     → About
 *    /contact   → Contact
 *    /register  → Register
 *    /login     → Login
 *    /menu      → Menu
 *    /menu/:id  → MealDetails
 *    [ProtectedRoute]
 *      /cart      → Cart
 *      /checkout  → Checkout
 *      /profile   → Profile
 *      /orders    → MyOrders
 *
 *  AdminRoute (admin only — uses AdminLayout)
 *    /admin         → Dashboard
 *    /admin/menu    → ManageMenu
 *    /admin/orders  → ManageOrders
 */
import { Routes, Route } from 'react-router-dom';

import MainLayout  from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';

import ProtectedRoute from '../components/ProtectedRoute';
import AdminRoute     from '../components/AdminRoute';

import Home        from '../pages/Home';
import About       from '../pages/About';
import Contact     from '../pages/Contact';
import Register    from '../pages/Register';
import Login       from '../pages/Login';
import Menu        from '../pages/Menu';
import MealDetails from '../pages/MealDetails';
import Cart        from '../pages/Cart';
import Checkout    from '../pages/Checkout';
import Profile     from '../pages/Profile';
import MyOrders    from '../pages/MyOrders';

import Dashboard    from '../pages/admin/Dashboard';
import ManageMenu   from '../pages/admin/ManageMenu';
import ManageOrders from '../pages/admin/ManageOrders';

const AppRoutes = () => (
  <Routes>
    {/* ── Public / Customer routes (wrapped in MainLayout) ───────── */}
    <Route element={<MainLayout />}>
      <Route path="/"        element={<Home />} />
      <Route path="/about"   element={<About />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login"   element={<Login />} />
      <Route path="/menu"    element={<Menu />} />
      <Route path="/menu/:id" element={<MealDetails />} />

      {/* ── Protected customer routes ─────────────────────────────── */}
      <Route element={<ProtectedRoute />}>
        <Route path="/cart"     element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/profile"  element={<Profile />} />
        <Route path="/orders"   element={<MyOrders />} />
      </Route>
    </Route>

    {/* ── Admin routes (wrapped in AdminLayout) ─────────────────── */}
    <Route element={<AdminRoute />}>
      <Route element={<AdminLayout />}>
        <Route path="/admin"        element={<Dashboard />} />
        <Route path="/admin/menu"   element={<ManageMenu />} />
        <Route path="/admin/orders" element={<ManageOrders />} />
      </Route>
    </Route>
  </Routes>
);

export default AppRoutes;
