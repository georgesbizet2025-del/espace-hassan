import { ArrowLeft, MapPin, Truck, Headphones, Home } from 'lucide-react';
import { useApp } from '../context';
import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, query, where, orderBy, limit, onSnapshot } from 'firebase/firestore';

interface Order {
  id: string;
  status: 'pending' | 'preparing' | 'ready' | 'delivered';
}

export default function OrderTrackingScreen() {
  const { navigate, user } = useApp();
  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    if (!user) return;
    
    // Query matching userId only (saves us from needing a composite index for createdAt ordering)
    const q = query(
      collection(db, 'orders'),
      where('userId', '==', user.uid)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      if (!snapshot.empty) {
        // Sort client-side by createdAt descending to get the most recent order first
        const docs = [...snapshot.docs].sort((a, b) => {
          const aTime = a.data().createdAt || '';
          const bTime = b.data().createdAt || '';
          return bTime.localeCompare(aTime); // descending
        });
        const doc = docs[0];
        setOrder({ id: doc.id, ...doc.data() } as Order);
      } else {
        setOrder(null);
      }
    });
    
    return () => unsubscribe();
  }, [user]);

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending': return 'En attente';
      case 'preparing': return 'Préparation';
      case 'ready': return 'Prêt';
      case 'delivered': return 'Livré';
      default: return 'Inconnu';
    }
  };

  const getTimeline = (status: string|undefined) => {
    const states = ['pending', 'preparing', 'ready', 'delivered'];
    const currentIndex = states.indexOf(status || 'pending');

    return (
      <div className="space-y-6 relative border-l-2 border-outline-variant ml-4 pl-6">
        <div className="relative">
          <div className={`absolute -left-[31px] w-4 h-4 rounded-full ${currentIndex >= 0 ? 'bg-primary' : 'bg-surface border-2 border-outline'}`} />
          <p className={`font-bold ${currentIndex >= 0 ? 'text-primary' : 'text-outline'}`}>Commande Reçue</p>
        </div>
        <div className="relative">
          <div className={`absolute -left-[31px] w-4 h-4 rounded-full ${currentIndex >= 1 ? 'bg-primary' : 'bg-surface border-2 border-outline'}`} />
          <p className={`font-bold ${currentIndex >= 1 ? 'text-primary' : 'text-outline'}`}>Préparation</p>
        </div>
        <div className="relative">
          <div className={`absolute -left-[31px] w-4 h-4 rounded-full ${currentIndex >= 2 ? 'bg-primary' : 'bg-surface border-2 border-outline'}`} />
          <p className={`font-bold ${currentIndex >= 2 ? 'text-primary' : 'text-outline'}`}>Prêt / En route</p>
        </div>
        <div className="relative">
          <div className={`absolute -left-[31px] w-4 h-4 rounded-full ${currentIndex >= 3 ? 'bg-primary' : 'bg-surface border-2 border-outline'}`} />
          <p className={`font-bold ${currentIndex >= 3 ? 'text-primary' : 'text-outline'}`}>Livré</p>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      <header className="bg-surface shadow-sm sticky top-0 flex justify-between items-center px-4 h-16 w-full z-50">
        <button onClick={() => navigate('home')} className="text-primary hover:opacity-80 active:scale-95">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-primary">Suivi de Commande</h1>
        <div className="w-8"></div>
      </header>

      <main className="max-w-md md:max-w-3xl lg:max-w-4xl mx-auto w-full px-4 pt-6 space-y-6">
        {order ? (
          <>
            <section className="text-center py-4">
              <h2 className="text-2xl font-bold text-on-surface mb-1">Commande Confirmée!</h2>
              <p className="text-base text-on-surface-variant">Ordre #{order.id.slice(0, 8)}</p>
            </section>

            <div className="relative overflow-hidden rounded-xl shadow-sm bg-white border border-outline-variant">
              <div className="h-48 w-full relative bg-surface-container flex items-center justify-center">
                <span className="opacity-50">Map Simulation</span>
                <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full shadow-md flex items-center gap-2">
                  <Truck size={16} className="text-primary" />
                  <span className="text-xs font-bold text-on-surface">Estimé 30 min</span>
                </div>
              </div>
              <div className="p-4 flex justify-between items-center bg-white">
                <div>
                  <p className="text-xs font-semibold text-on-surface-variant uppercase">Statut</p>
                  <p className="text-2xl font-extrabold text-primary">{getStatusText(order.status)}</p>
                </div>
              </div>
            </div>

            <section className="bg-white rounded-xl p-4 shadow-sm border border-outline-variant">
              <h3 className="text-sm font-semibold text-on-surface mb-6">Timeline</h3>
              {getTimeline(order.status)}
            </section>
          </>
        ) : (
           <div className="text-center pt-20">
             <p className="text-on-surface-variant mb-4">Aucune commande en cours.</p>
           </div>
        )}

        <section className="space-y-3 pt-4">
          <button className="w-full h-14 bg-primary text-white font-bold rounded-xl flex items-center justify-center gap-2 border border-transparent hover:opacity-90 transition-opacity">
            <Headphones size={20} /> Support
          </button>
          <button onClick={() => navigate('home')} className="w-full h-14 border border-outline-variant text-primary font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-surface-container-low transition-colors">
            <Home size={20} /> Retour à l'accueil
          </button>
        </section>
      </main>
    </div>
  );
}
