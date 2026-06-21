import { ArrowLeft, Edit2, Award, History, MapPin, CreditCard, Settings, HelpCircle, LogOut, Shield, LogIn } from 'lucide-react';
import { useApp } from '../context';
import { auth } from '../lib/firebase';
import { signOut } from 'firebase/auth';

export default function ProfileScreen() {
  const { navigate, isAdmin, user, userData } = useApp();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('home');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-surface">
      <header className="sticky top-0 w-full z-50 flex justify-center items-center px-4 h-16 bg-surface shadow-sm">
        <h1 className="text-xl font-bold text-primary">Mon Profil</h1>
      </header>

      <main className="pt-6 pb-32 px-4 max-w-md md:max-w-3xl lg:max-w-4xl mx-auto w-full">
        {!user ? (
          <div className="flex flex-col items-center justify-center pt-20">
            <Shield size={64} className="text-outline mb-6 opacity-50" />
            <h2 className="text-2xl font-bold text-on-surface mb-2">Non connecté</h2>
            <p className="text-on-surface-variant text-center mb-8">Connectez-vous pour voir vos commandes et votre profil.</p>
            <button 
              onClick={() => navigate('login')} 
              className="w-full py-4 flex items-center justify-center gap-2 text-white font-bold rounded-xl bg-primary active:scale-95 shadow-md"
            >
              <LogIn size={20} /> Se connecter
            </button>
          </div>
        ) : (
          <>
            <section className="flex flex-col items-center mb-8">
              <div className="relative mb-4 group">
                <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-md bg-secondary text-white flex items-center justify-center text-3xl font-bold uppercase">
                  {userData?.name?.charAt(0) || user.email?.charAt(0) || 'U'}
                </div>
              </div>
              <h2 className="text-2xl font-bold text-on-surface mb-1">{userData?.name || 'Utilisateur'}</h2>
              <p className="text-on-surface-variant text-sm mb-2">{user.email}</p>
              {isAdmin && (
                <div className="bg-gradient-to-br from-secondary to-secondary-container px-3 py-1 rounded-full flex items-center gap-1 shadow-sm mt-2">
                  <Shield size={16} className="text-white" />
                  <span className="text-white text-xs font-semibold">Admin</span>
                </div>
              )}
            </section>

            <section className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-outline-variant/20 flex flex-col items-center">
                <History size={24} className="text-primary mb-2" />
                <span className="text-xl font-bold text-on-surface">0</span>
                <span className="text-xs font-semibold text-outline">Total Orders</span>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-outline-variant/20 flex flex-col items-center">
                <Award size={24} className="text-secondary mb-2" />
                <span className="text-xl font-bold text-on-surface">0 pts</span>
                <span className="text-xs font-semibold text-outline">Loyalty Points</span>
              </div>
            </section>

            <section className="space-y-2 mb-10 bg-white rounded-xl shadow-sm overflow-hidden border border-outline-variant/10">
              {isAdmin && (
                <button onClick={() => navigate('adminDashboard')} className="w-full flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors group">
                   <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                        <Shield size={20} />
                     </div>
                     <span className="text-base text-on-surface font-semibold text-red-600">Admin Dashboard</span>
                   </div>
                </button>
              )}
              {[
                { icon: History, label: 'Historique des commandes' },
                { icon: MapPin, label: 'Adresses enregistrées' },
                { icon: Settings, label: 'Paramètres' },
              ].map((item, i) => (
                <button key={i} className={`w-full flex items-center justify-between p-4 hover:bg-surface-container-low transition-colors group ${i !== 0 || isAdmin ? 'border-t border-outline-variant/10' : ''}`}>
                   <div className="flex items-center gap-4">
                     <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <item.icon size={20} />
                     </div>
                     <span className="text-base text-on-surface">{item.label}</span>
                   </div>
                </button>
              ))}
            </section>

            <div className="space-y-4">
              <button onClick={handleLogout} className="w-full py-4 flex items-center justify-center gap-2 text-primary font-bold border border-primary/20 rounded-xl bg-primary/5 active:scale-95">
                <LogOut size={20} /> Se déconnecter
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
