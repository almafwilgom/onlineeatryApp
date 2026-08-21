import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import ToastNotification from '../components/ToastNotification';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-100 text-slate-700 font-sans selection:bg-orange-500 selection:text-white">
      <Navbar />
      <main className="flex-1 bg-slate-100">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <ToastNotification />
    </div>
  );
};

export default MainLayout;
