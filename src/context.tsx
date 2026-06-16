import { createContext, useContext, useState, ReactNode } from 'react';

type Screen = 'home' | 'productDetail' | 'cart' | 'menu' | 'orderTracking' | 'profile' | 'addressSelection' | 'offers' | 'salads';

interface AppContextType {
  currentScreen: Screen;
  navigate: (screen: Screen) => void;
  cartCount: number;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');

  return (
    <AppContext.Provider value={{ currentScreen, navigate: setCurrentScreen, cartCount: 2 }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
}
