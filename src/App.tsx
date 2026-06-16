/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AppProvider, useApp } from './context';
import { BottomNav } from './components/BottomNav';
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

function AppContent() {
  const { currentScreen } = useApp();

  return (
    <div className="min-h-[100dvh] bg-background text-on-background relative w-full max-w-md mx-auto shadow-2xl overflow-x-hidden border-x border-outline-variant/20">
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

      {['home', 'menu', 'cart', 'profile', 'salads'].includes(currentScreen) && <BottomNav />}
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

