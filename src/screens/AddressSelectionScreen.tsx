import { ArrowLeft, Search, Navigation, MapPin } from 'lucide-react';
import { useApp } from '../context';

export default function AddressSelectionScreen() {
  const { navigate } = useApp();

  return (
    <div className="min-h-screen bg-background flex flex-col pb-24">
      <header className="sticky top-0 z-50 bg-surface shadow-sm flex items-center px-4 h-16 w-full">
        <button onClick={() => navigate('home')} className="text-primary hover:opacity-80 active:scale-95">
          <ArrowLeft size={24} />
        </button>
        <h1 className="font-bold text-xl ml-4 text-primary">Choisir l'adresse</h1>
      </header>

      <main className="flex-grow pt-0 max-w-md md:max-w-3xl lg:max-w-4xl mx-auto w-full">
        <section className="px-4 py-4 sticky top-16 z-40 bg-background/95 backdrop-blur-md">
          <div className="relative">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" />
            <input type="text" className="w-full pl-12 pr-4 py-4 bg-surface border border-outline-variant rounded-xl focus:ring-2 focus:ring-primary shadow-sm" placeholder="Entrez une nouvelle adresse..." />
          </div>
        </section>

        <section className="relative h-[300px] w-full mb-8 bg-surface-container flex items-center justify-center">
          <span className="text-outline">Map Placeholder</span>
          <div className="absolute inset-0 bg-primary/5 pointer-events-none" />
        </section>

        <div className="px-4 mb-8">
          <button className="w-full flex items-center justify-center gap-3 py-4 bg-surface-container-high text-primary font-bold rounded-xl active:scale-98">
            <Navigation size={20} /> Ma position actuelle
          </button>
        </div>

        <section className="px-4 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Adresses enregistrées</h2>
            <button className="text-primary text-sm font-bold">Gérer</button>
          </div>
          
          <div className="bg-surface p-4 rounded-xl shadow-sm border border-outline-variant flex items-start gap-4 cursor-pointer">
            <div className="bg-primary/10 p-3 rounded-lg text-primary">
              <MapPin size={24} />
            </div>
            <div>
              <h3 className="text-lg font-bold text-primary">Maison</h3>
              <p className="text-sm text-on-surface-variant mt-1">12 Rue des Oliviers, Quartier Souissi, Rabat 10000</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
