import { ArrowLeft, MapPin, Truck, Headphones, Home } from 'lucide-react';
import { useApp } from '../context';

export default function OrderTrackingScreen() {
  const { navigate } = useApp();

  return (
    <div className="min-h-screen bg-background pb-32">
      <header className="bg-surface shadow-sm sticky top-0 flex justify-between items-center px-4 h-16 w-full z-50">
        <button onClick={() => navigate('home')} className="text-primary hover:opacity-80 active:scale-95">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-primary">Suivi de Commande</h1>
        <div className="w-8"></div>
      </header>

      <main className="max-w-md mx-auto px-4 pt-6 space-y-6">
        <section className="text-center py-4">
          <h2 className="text-2xl font-bold text-on-surface mb-1">Commande Confirmée!</h2>
          <p className="text-base text-on-surface-variant">Ordre #EH-8293</p>
        </section>

        <div className="relative overflow-hidden rounded-xl shadow-sm bg-white border border-outline-variant">
          <div className="h-48 w-full relative bg-surface-container flex items-center justify-center">
            <span className="opacity-50">Map Simulation</span>
            <div className="absolute top-4 left-4 bg-white/90 px-3 py-1 rounded-full shadow-md flex items-center gap-2">
              <Truck size={16} className="text-primary" />
              <span className="text-xs font-bold text-on-surface">Livreur à 2.4km</span>
            </div>
          </div>
          <div className="p-4 flex justify-between items-center bg-white">
            <div>
              <p className="text-xs font-semibold text-on-surface-variant uppercase">Arrivée estimée</p>
              <p className="text-4xl font-extrabold text-primary">12:45 <span className="text-lg">PM</span></p>
            </div>
            <div className="text-right">
              <p className="text-xs text-on-surface-variant">Statut</p>
              <p className="text-lg font-bold text-secondary">Préparation</p>
            </div>
          </div>
        </div>

        <section className="bg-white rounded-xl p-4 shadow-sm border border-outline-variant">
          <h3 className="text-sm font-semibold text-on-surface mb-6">Timeline</h3>
          <div className="space-y-6 relative border-l-2 border-outline-variant ml-4 pl-6">
            <div className="relative">
              <div className="absolute -left-[31px] w-4 h-4 rounded-full bg-primary" />
              <p className="font-bold text-primary">Commande Reçue</p>
              <p className="text-sm text-on-surface-variant">12:15 PM</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[31px] w-4 h-4 rounded-full bg-primary" />
              <p className="font-bold text-primary">Préparation (En cours)</p>
              <p className="text-sm text-on-surface-variant">Le chef prépare votre plat</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[31px] w-4 h-4 rounded-full bg-surface border-2 border-outline" />
              <p className="font-semibold text-outline">En route</p>
            </div>
          </div>
        </section>

        <section className="space-y-3 pt-4">
          <button className="w-full h-14 bg-primary text-white font-bold rounded-xl flex items-center justify-center gap-2">
            <Headphones size={20} /> Support
          </button>
          <button onClick={() => navigate('home')} className="w-full h-14 border border-outline-variant text-primary font-bold rounded-xl flex items-center justify-center gap-2">
            <Home size={20} /> Retour à l'accueil
          </button>
        </section>
      </main>
    </div>
  );
}
