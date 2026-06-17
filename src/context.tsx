import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { User, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from './lib/firebase';
import { seedMockDataIfEmpty } from './lib/seeder';

type Screen = 'home' | 'productDetail' | 'cart' | 'menu' | 'orderTracking' | 'profile' | 'addressSelection' | 'offers' | 'salads' | 'adminDashboard' | 'adminOrders' | 'adminMenu' | 'login';

export interface Product {
  id: string;
  name: string;
  price: string;
  desc: string;
  img: string;
  category: string;
}

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
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: ReactNode }) {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [user, setUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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
          let role = data.role;
          const email = (u.email || '').toLowerCase();
          
          if (email === 'georgesbizet2025@gmail.com' || email.includes('admin') || email === 'admin@espacehassan.com') {
            if (role !== 'admin') {
               role = 'admin';
               try {
                 await updateDoc(doc(db, 'users', u.uid), { role: 'admin' });
               } catch(e) {
                 console.log("Failed to promote to admin automatically", e);
               }
            }
          }
          
          setUserData({ ...data, role });
          setIsAdmin(role === 'admin');
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
      setSidebarOpen,
      selectedProduct,
      setSelectedProduct
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
