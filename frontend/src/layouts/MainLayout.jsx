import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import MobileBottomNav from '../components/MobileBottomNav';
import Footer from '../components/Footer';
import CartDrawer from '../components/CartDrawer';
import ToastNotification from '../components/ToastNotification';

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-stone-50 text-stone-900 font-sans selection:bg-orange-500 selection:text-white pb-16 md:pb-0">
      <div className="bg-stone-900 px-4 py-2 text-center text-[11px] font-semibold tracking-wide text-orange-100">
        Fresh meals are prepared daily · Delivery updates sent straight to your phone
      </div>
      <Navbar />
      <main className="flex-1 bg-stone-50">
        <Outlet />
      </main>
      <Footer />
      <MobileBottomNav />
      <CartDrawer />
      <ToastNotification />
    </div>
  );
};

export default MainLayout;
