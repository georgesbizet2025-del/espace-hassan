import { ArrowLeft, Edit2, Award, History, MapPin, CreditCard, Settings, HelpCircle, LogOut } from 'lucide-react';
import { useApp } from '../context';

export default function ProfileScreen() {
  const { navigate } = useApp();

  return (
    <div className="min-h-screen bg-surface">
      <header className="sticky top-0 w-full z-50 flex justify-center items-center px-4 h-16 bg-surface shadow-sm">
        <h1 className="text-xl font-bold text-primary">Mon Profil</h1>
      </header>

      <main className="pt-6 pb-32 px-4 max-w-md mx-auto">
        <section className="flex flex-col items-center mb-8">
          <div className="relative mb-4 group">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md">
              <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuD8076rz7HQqOLGsOnDHEj2MsBpJieQYpe1VrhZ61fi3-X04PDJVsC_UH35qe6U2oWZ00lXZR7LNgbV0RI8M-OortrpASIN0L8KAXOtG2dWDUmLr47eOU_-b4y5l_QDM_SDKPtHZgp2yPZa_G3WoqGy3y0-TDA3w4dBQSS-9Pt-f-sZYmaolNHBbB_k4pdsRnzdvb8xjeurFA4t87rdSb79UG9ONVbQDobMTHUd7b-tvRHxRfLCeh-qA4Pf_E1BGTHoHDUOkSikCrw" className="w-full h-full object-cover" />
            </div>
            <div className="absolute bottom-0 right-0 bg-primary p-1.5 rounded-full text-white shadow-lg cursor-pointer">
              <Edit2 size={14} />
            </div>
          </div>
          <h2 className="text-2xl font-bold text-on-surface mb-1">Hassan Guest</h2>
          <div className="bg-gradient-to-br from-secondary to-secondary-container px-3 py-1 rounded-full flex items-center gap-1 shadow-sm">
            <Award size={16} className="text-white" />
            <span className="text-white text-xs font-semibold">Premium Member</span>
          </div>
        </section>

        <section className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-white p-4 rounded-xl shadow-sm border border-outline-variant/20 flex flex-col items-center">
            <History size={24} className="text-primary mb-2" />
            <span className="text-xl font-bold text-on-surface">12</span>
            <span className="text-xs font-semibold text-outline">Total Orders</span>
          </div>
          <div className="bg-white p-4 rounded-xl shadow-sm border border-outline-variant/20 flex flex-col items-center">
            <Award size={24} className="text-secondary mb-2" />
            <span className="text-xl font-bold text-on-surface">450 pts</span>
            <span className="text-xs font-semibold text-outline">Loyalty Points</span>
          </div>
        </section>

        <section className="space-y-2 mb-10 bg-white rounded-xl shadow-sm overflow-hidden border border-outline-variant/10">
          <button onClick={() => navigate('adminDashboard')} className="w-full flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors group">
             <div className="flex items-center gap-4">
               <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                  <Settings size={20} />
               </div>
               <span className="text-base text-on-surface font-semibold">Admin Dashboard</span>
             </div>
          </button>
          {[
            { icon: History, label: 'Historique des commandes' },
            { icon: MapPin, label: 'Adresses enregistrées' },
            { icon: CreditCard, label: 'Moyens de paiement' },
            { icon: Settings, label: 'Paramètres' },
            { icon: HelpCircle, label: 'Aide & Support' }
          ].map((item, i) => (
            <button key={i} className={`w-full flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors group border-t border-outline-variant/10`}>
               <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <item.icon size={20} />
                 </div>
                 <span className="text-base text-on-surface">{item.label}</span>
               </div>
            </button>
          ))}
        </section>

        <button className="w-full py-4 flex items-center justify-center gap-2 text-primary font-bold border border-primary/20 rounded-xl bg-primary/5 active:scale-95">
          <LogOut size={20} /> Se déconnecter
        </button>
      </main>
    </div>
  );
}
