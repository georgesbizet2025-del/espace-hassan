import { useApp } from '../context';
import { ArrowLeft, Users, ShoppingBag, DollarSign, Activity, Package, Tag, ArrowRight } from 'lucide-react';

export default function AdminDashboardScreen() {
  const { navigate } = useApp();

  return (
    <div className="min-h-screen bg-surface pb-24">
      <header className="sticky top-0 z-50 flex items-center px-4 h-16 bg-surface shadow-sm w-full">
        <button onClick={() => navigate('profile')} className="text-primary hover:opacity-80 active:scale-95">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-primary ml-4">Tableau de bord</h1>
      </header>

      <main className="px-4 mt-6 max-w-md md:max-w-3xl lg:max-w-4xl mx-auto w-full">
        <section className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-outline-variant/20 flex flex-col items-center">
            <DollarSign size={24} className="text-green-500 mb-2" />
            <span className="text-xl font-bold text-on-surface">1,245 DH</span>
            <span className="text-xs font-semibold text-outline text-center">Revenus du Jour</span>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-outline-variant/20 flex flex-col items-center">
            <ShoppingBag size={24} className="text-blue-500 mb-2" />
            <span className="text-xl font-bold text-on-surface">32</span>
            <span className="text-xs font-semibold text-outline text-center">Commandes d'Aujourd'hui</span>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-outline-variant/20 flex flex-col items-center">
            <Activity size={24} className="text-orange-500 mb-2" />
            <span className="text-xl font-bold text-on-surface">4</span>
            <span className="text-xs font-semibold text-outline text-center">Commandes en Cours</span>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-outline-variant/20 flex flex-col items-center">
            <Users size={24} className="text-purple-500 mb-2" />
            <span className="text-xl font-bold text-on-surface">14</span>
            <span className="text-xs font-semibold text-outline text-center">Nouveaux Clients</span>
          </div>
        </section>

        <h2 className="text-lg font-bold text-on-surface mb-4">Actions Rapides</h2>
        
        <section className="space-y-4">
          <button onClick={() => navigate('adminOrders')} className="w-full flex items-center justify-between p-5 bg-white rounded-xl shadow-sm border border-outline-variant/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <ShoppingBag size={24} />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-base font-bold text-on-surface">Gérer les Commandes</span>
                <span className="text-sm text-on-surface-variant">4 commandes nécessitent une action</span>
              </div>
            </div>
            <ArrowRight size={20} className="text-outline" />
          </button>

          <button onClick={() => navigate('adminMenu')} className="w-full flex items-center justify-between p-5 bg-white rounded-xl shadow-sm border border-outline-variant/20 hover:scale-[1.02] active:scale-[0.98] transition-all">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <Package size={24} />
              </div>
              <div className="flex flex-col items-start text-left">
                <span className="text-base font-bold text-on-surface">Gérer la Carte (Produits)</span>
                <span className="text-sm text-on-surface-variant">Ajouter ou modifier des produits au menu</span>
              </div>
            </div>
            <ArrowRight size={20} className="text-outline" />
          </button>

          <button className="w-full flex items-center justify-between p-5 bg-white rounded-xl shadow-sm border border-outline-variant/20 transition-all opacity-50 cursor-not-allowed">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-purple-600">
                <Tag size={24} />
              </div>
              <div className="flex flex-col items-start text-left">
                <span className="text-base font-bold text-on-surface">Offres & Promotions</span>
                <span className="text-sm text-on-surface-variant">Prochainement</span>
              </div>
            </div>
            <ArrowRight size={20} className="text-outline" />
          </button>
        </section>
      </main>
    </div>
  );
}
