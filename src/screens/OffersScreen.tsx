import { ArrowLeft, Star } from 'lucide-react';
import { useApp } from '../context';

export default function OffersScreen() {
  const { navigate } = useApp();

  return (
    <div className="min-h-screen bg-background pb-24">
      <header className="bg-surface sticky top-0 z-50 flex items-center px-4 h-16 shadow-sm">
        <button onClick={() => navigate('home')} className="text-primary active:scale-95 p-2">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold ml-2 text-primary">Offers & Rewards</h1>
      </header>

      <main className="max-w-2xl md:max-w-4xl lg:max-w-5xl mx-auto w-full">
        <section className="px-4 py-6">
          <div className="rounded-3xl bg-primary-container p-8 shadow-lg text-white">
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-sm opacity-80 uppercase tracking-widest">Total Balance</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-extrabold">2,450</span>
                  <span className="text-sm">pts</span>
                </div>
              </div>
              <div className="bg-white/20 backdrop-blur-md rounded-full px-4 py-1.5 flex items-center gap-2 border border-white/30">
                <Star size={16} className="fill-current" />
                <span className="text-sm font-semibold">Premium Member</span>
              </div>
            </div>
            <div className="w-full bg-white/20 h-2 rounded-full mb-2 overflow-hidden">
              <div className="bg-secondary-container h-full w-[75%] rounded-full"></div>
            </div>
            <p className="text-sm opacity-90">550 points until your next free meal!</p>
          </div>
        </section>

        <section className="px-4 py-4">
          <h2 className="text-xl font-bold text-primary mb-4">Active Offers</h2>
          <div className="bg-surface rounded-2xl shadow-md border border-outline-variant overflow-hidden flex flex-col mb-4">
            <div className="h-32 bg-primary/20 flex flex-col justify-end p-4">
               <span className="text-4xl font-extrabold text-primary">50% OFF</span>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-bold mb-1">New User Special</h3>
              <p className="text-sm text-on-surface-variant">Valid on your first order of traditional tagines or couscous.</p>
              <button className="mt-4 w-full bg-primary text-white font-semibold py-3 rounded-xl active:scale-95 shadow-md">Claim Now</button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
