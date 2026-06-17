import { useApp } from '../context';
import { Home, Utensils, ShoppingCart, Tag, Compass, User, LogOut, Settings, X, ShieldAlert, LogIn, ClipboardList } from 'lucide-react';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';

export function Sidebar() {
  const { isSidebarOpen, setSidebarOpen, navigate, user, userData, isAdmin, currentScreen } = useApp();

  if (!isSidebarOpen) return null;

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setSidebarOpen(false);
      navigate('login');
    } catch (e) {
      console.error('Logout error:', e);
    }
  };

  const navItems = [
    { id: 'home', label: 'Accueil', icon: Home, screen: 'home' },
    { id: 'menu', label: 'Nos Pizzas', icon: Utensils, screen: 'menu' },
    { id: 'salads', label: 'Nos Salades', icon: Compass, screen: 'salads' },
    { id: 'cart', label: 'Mon Panier', icon: ShoppingCart, screen: 'cart' },
    { id: 'offers', label: 'Offres Spéciales', icon: Tag, screen: 'offers' },
    { id: 'orderTracking', label: 'Suivre Commande', icon: ClipboardList, screen: 'orderTracking' },
    { id: 'profile', label: 'Mon Profil', icon: User, screen: user ? 'profile' : 'login' },
  ];

  return (
    <div className="fixed inset-0 z-100 flex justify-start pointer-events-auto">
      {/* Dark Overlay with smooth transition on exit */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300"
        onClick={() => setSidebarOpen(false)}
      />

      {/* Main Drawer Container */}
      <div className="relative w-72 max-w-sm h-full bg-surface-container-lowest flex flex-col shadow-2xl z-10 border-r border-outline-variant/30 animate-[slide-in_0.25s_ease-out]">
        {/* Style tag to inject the slide-in animation directly and cleanly */}
        <style dangerouslySetInnerHTML={{__html: `
          @keyframes slide-in {
            0% { transform: translateX(-100%); }
            100% { transform: translateX(0); }
          }
        `}} />

        {/* Header with Close and Branding */}
        <div className="p-5 border-b border-outline-variant/30 bg-gradient-to-r from-primary/10 to-transparent flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCo2U3LUfsihwyEGPP_cyHiLB4hT4R_MWVQPfBGnV11CFsBkS5PPRMHgMfA7QTgeYu2SHpU7q-dKgVH8MyNhyc9bGfp2ve-51-HhxtKbIAfN5KDpBaT7RAynyw8vP5XhnazNlXIXdQ-S1xcXkTZGN8rhd9b6ERuz2kYS24B0qb40EmHFNClVVXUWl6zvaIW8eTLC6gFW-Hy3EvALZW2MkZQ0uvB2uqZ2xTUr1JY81C48Fxm750fi9QXu7QDPMV-C0Ontb1-z4y-8yg" 
              alt="Logo" 
              className="h-10 w-10 object-contain rounded-full border border-primary/25"
            />
            <div>
              <h2 className="text-xl font-extrabold text-primary leading-none">Espace Hassan</h2>
              <p className="text-[10px] text-on-surface-variant font-medium mt-1">Le Goût de la Tradition</p>
            </div>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="w-8 h-8 rounded-full bg-surface-container-high hover:bg-outline-variant/50 flex items-center justify-center text-on-surface transition-colors active:scale-95"
          >
            <X size={18} />
          </button>
        </div>

        {/* User Card */}
        <div className="p-4 mx-4 mt-4 bg-primary/5 rounded-2xl border border-primary/10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
            {user ? (userData?.name?.charAt(0).toUpperCase() || 'U') : 'G'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-on-surface truncate">
              {user ? (userData?.name || 'Utilisateur') : 'Invité'}
            </p>
            <p className="text-xs text-on-surface-variant truncate">
              {user ? (userData?.email || user.email) : 'Connectez-vous pour commander'}
            </p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1.5 custom-scrollbar">
          <p className="text-[10px] uppercase tracking-wider text-outline font-bold px-3 mb-2">Navigation</p>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentScreen === item.screen;
            return (
              <button
                key={item.id}
                onClick={() => navigate(item.screen as any)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-all active:scale-[0.98] ${
                  isActive 
                    ? 'bg-primary text-white shadow-md' 
                    : 'text-on-surface hover:bg-surface-container-high'
                }`}
              >
                <Icon size={20} className={isActive ? 'text-white' : 'text-primary'} />
                <span>{item.label}</span>
              </button>
            );
          })}

          {/* Admin Section */}
          {isAdmin && (
            <div className="pt-6 mt-4 border-t border-outline-variant/30 space-y-1.5">
              <p className="text-[10px] uppercase tracking-wider text-outline font-bold px-3 mb-2 flex items-center gap-1.5 text-primary-container">
                <ShieldAlert size={12} /> Espace Administration
              </p>
              <button
                onClick={() => navigate('adminDashboard')}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-all active:scale-[0.98] ${
                  currentScreen === 'adminDashboard' 
                    ? 'bg-primary-container text-white shadow-md' 
                    : 'text-on-surface hover:bg-surface-container-high'
                }`}
              >
                <Settings size={20} className="text-primary-container" />
                <span>Tableau de bord</span>
              </button>
              <button
                onClick={() => navigate('adminMenu')}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-all active:scale-[0.98] ${
                  currentScreen === 'adminMenu' 
                    ? 'bg-primary-container text-white shadow-md' 
                    : 'text-on-surface hover:bg-surface-container-high'
                }`}
              >
                <Utensils size={20} className="text-primary-container" />
                <span>Gérer la Carte</span>
              </button>
              <button
                onClick={() => navigate('adminOrders')}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold transition-all active:scale-[0.98] ${
                  currentScreen === 'adminOrders' 
                    ? 'bg-primary-container text-white shadow-md' 
                    : 'text-on-surface hover:bg-surface-container-high'
                }`}
              >
                <ClipboardList size={20} className="text-primary-container" />
                <span>Commandes Clients</span>
              </button>
            </div>
          )}
        </nav>

        {/* Footer Actions */}
        <div className="p-4 border-t border-outline-variant/30">
          {user ? (
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 border border-red-200 text-red-600 hover:bg-red-50 font-bold text-sm rounded-xl transition-all active:scale-95"
            >
              <LogOut size={18} />
              <span>Se déconnecter</span>
            </button>
          ) : (
            <button
              onClick={() => navigate('login')}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white font-bold text-sm rounded-xl transition-all active:scale-95 shadow-md"
            >
              <LogIn size={18} />
              <span>Se connecter</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
