import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from './lib/firebase';
import { seedMockDataIfEmpty } from './lib/seeder';

type Screen = 'home' | 'productDetail' | 'cart' | 'menu' | 'orderTracking' | 'profile' | 'addressSelection' | 'offers' | 'salads' | 'adminDashboard' | 'adminOrders' | 'adminMenu' | 'login';

interface UserData {
  role: string;
  name: string;
  email: string;
}

interface AppContextType {
  currentScreen: Screen;
  navigate: (screen: Screen) => void;
  cartCount: number;
  isAdmin: boolean;
  user: User | null;
  userData: UserData | null;
  isSidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    // Seed the database with high-quality mockup products if it is completely empty
    seedMockDataIfEmpty();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        const userDoc = await getDoc(doc(db, 'users', u.uid));
        if (userDoc.exists()) {
          const data = userDoc.data() as UserData;
          setUserData(data);
          setIsAdmin(data.role === 'admin');
        } else {
          setUserData(null);
          setIsAdmin(false);
        }
      } else {
        setUserData(null);
        setIsAdmin(false);
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <AppContext.Provider value={{ 
      currentScreen, 
      navigate: (screen) => {
        setCurrentScreen(screen);
        setSidebarOpen(false); // Close sidebar automatically on navigate
      }, 
      cartCount: 2, 
      isAdmin, 
      user, 
      userData,
      isSidebarOpen,
      setSidebarOpen
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
}
