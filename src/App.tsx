/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AppProvider, useApp } from './context';
import { BottomNav } from './components/BottomNav';
import { Sidebar } from './components/Sidebar';
import HomeScreen from './screens/HomeScreen';
import ProductDetailScreen from './screens/ProductDetailScreen';
import CartScreen from './screens/CartScreen';
import MenuScreen from './screens/MenuScreen';
import OrderTrackingScreen from './screens/OrderTrackingScreen';
import ProfileScreen from './screens/ProfileScreen';
import AddressSelectionScreen from './screens/AddressSelectionScreen';
import OffersScreen from './screens/OffersScreen';
import SaladsScreen from './screens/SaladsScreen';
import AdminDashboardScreen from './screens/AdminDashboardScreen';
import AdminOrdersScreen from './screens/AdminOrdersScreen';
import AdminMenuScreen from './screens/AdminMenuScreen';
import LoginScreen from './screens/LoginScreen';

function AppContent() {
  const { currentScreen } = useApp();

  return (
    <div className="min-h-[100dvh] bg-background text-on-background relative w-full lg:max-w-[1200px] md:max-w-3xl mx-auto shadow-2xl overflow-x-hidden border-x border-outline-variant/20 md:flex md:flex-row shadow-[0_0_40px_rgba(0,0,0,0.05)]">
      {/* Global Sidebar component controlled via context */}
      <Sidebar />

      <div className="flex-1 relative w-full flex flex-col min-h-screen">
        {currentScreen === 'home' && <HomeScreen />}
        {currentScreen === 'productDetail' && <ProductDetailScreen />}
        {currentScreen === 'cart' && <CartScreen />}
        {currentScreen === 'menu' && <MenuScreen />}
        {currentScreen === 'orderTracking' && <OrderTrackingScreen />}
        {currentScreen === 'profile' && <ProfileScreen />}
        {currentScreen === 'addressSelection' && <AddressSelectionScreen />}
        {currentScreen === 'offers' && <OffersScreen />}
        {currentScreen === 'salads' && <SaladsScreen />}
        {currentScreen === 'adminDashboard' && <AdminDashboardScreen />}
        {currentScreen === 'adminOrders' && <AdminOrdersScreen />}
        {currentScreen === 'adminMenu' && <AdminMenuScreen />}
        {currentScreen === 'login' && <LoginScreen />}

        {['home', 'menu', 'cart', 'profile', 'salads', 'offers', 'orderTracking'].includes(currentScreen) && <div className="md:hidden"><BottomNav /></div>}
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

