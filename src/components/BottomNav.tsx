import { Home, UtensilsCrossed, ShoppingCart, User } from 'lucide-react';
import { useApp } from '../context';

export function BottomNav() {
  const { currentScreen, navigate, cartCount } = useApp();

  const navItems = [
    { id: 'home', icon: Home, screen: 'home' },
    { id: 'menu', icon: UtensilsCrossed, screen: 'menu' },
    { id: 'cart', icon: ShoppingCart, screen: 'cart', badge: true },
    { id: 'profile', icon: User, screen: 'profile' },
  ];

  return (
    <nav className="fixed bottom-0 w-full max-w-md left-1/2 -translate-x-1/2 z-50 flex justify-around items-center px-6 pb-4 pt-2 bg-surface dark:bg-inverse-surface border-t border-outline-variant shadow-[0_-4px_20px_rgba(0,0,0,0.05)] rounded-t-3xl">
      {navItems.map((item) => {
        const isActive = currentScreen === item.screen || (item.screen === 'menu' && currentScreen === 'salads');
        const Icon = item.icon;
        
        return (
          <button
            key={item.id}
            onClick={() => navigate(item.screen as any)}
            className={`relative flex items-center justify-center p-3 transition-colors active:scale-90 duration-150 ${
              isActive
                ? 'bg-primary-container text-on-primary-container rounded-full'
                : 'text-on-surface-variant hover:bg-surface-container-high'
            }`}
          >
            <Icon size={24} className={isActive ? 'fill-current' : ''} />
            {item.badge && cartCount > 0 && (
              <span className="absolute top-2 right-2 w-4 h-4 bg-primary text-white text-[10px] flex items-center justify-center rounded-full font-bold">
                {cartCount}
              </span>
            )}
          </button>
        );
      })}
    </nav>
  );
}
