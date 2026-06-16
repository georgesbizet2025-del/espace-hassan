import { ArrowLeft, Check, Plus, Minus } from 'lucide-react';
import { useApp } from '../context';
import { useState } from 'react';

export default function ProductDetailScreen() {
  const { navigate } = useApp();
  const [qty, setQty] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([1]);

  const toggleOption = (id: number) => {
    if (selectedOptions.includes(id)) {
      setSelectedOptions(selectedOptions.filter(o => o !== id));
    } else {
      setSelectedOptions([...selectedOptions, id]);
    }
  };

  const updateQty = (delta: number) => setQty(Math.max(1, qty + delta));

  return (
    <div className="min-h-screen bg-background relative">
      <nav className="absolute top-4 left-4 z-50">
        <button onClick={() => navigate('menu')} className="flex items-center justify-center w-10 h-10 rounded-full bg-white/90 shadow-sm text-on-surface transition-all active:scale-95">
          <ArrowLeft size={20} />
        </button>
      </nav>

      <div className="relative w-full h-[400px] overflow-hidden">
        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2N_bkt_yyXaFNLSFXdb_hDo-0Xm_VJ2FkzutlO7Qd3rD-pptVl7hfQ6eSIyqwyuSNaQ6ZbZZyHsa9U_AZD2edl8zMcTb9nmsVpQ2my1m9wUAB9dKBDMVrNBmzGM2O8WHkhULGu5dDcrZs7e4M-g-foYXSybcoSoU7VXF00hMI8e016wgzP3xydr63qUwchMXQWeH0OYlRg_qp77q4M2bgXKCcwZFOJyU-rAfBLUI7uPMkn32lv8O1W1qRW7jqeh0dw3qGtsieQJo" className="w-full h-full object-cover" />
      </div>

      <div className="relative -mt-12 px-4 pb-32">
        <div className="bg-surface-container-lowest rounded-t-[32px] p-6 shadow-xl relative z-10">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-bold text-on-surface mb-1">Pizza Pollo BBQ</h1>
              <p className="text-primary font-semibold text-sm">4.9 (120+ avis)</p>
            </div>
            <div className="bg-primary-container text-white px-4 py-2 rounded-2xl">
              <span className="text-xl font-bold">75DH</span>
            </div>
          </div>
          
          <div className="mb-8">
            <h2 className="text-sm border-b pb-2 mb-4 font-bold text-on-surface">Personnalisez votre pizza</h2>
            <div className="grid grid-cols-1 gap-4">
              {[
                { id: 1, name: 'Extra Mozzarella', price: '+15 DH' },
                { id: 2, name: 'Sauce BBQ Supplément', price: '+8 DH' },
                { id: 3, name: 'Double Poulet', price: '+20 DH' }
              ].map(opt => (
                <div key={opt.id} onClick={() => toggleOption(opt.id)} className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer ${selectedOptions.includes(opt.id) ? 'border-primary bg-primary/5' : 'border-outline-variant/30 bg-surface-container-low'}`}>
                  <div>
                    <p className="text-sm font-semibold">{opt.name}</p>
                    <p className="text-sm text-on-surface-variant">{opt.price}</p>
                  </div>
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedOptions.includes(opt.id) ? 'border-primary bg-primary' : 'border-outline'}`}>
                    {selectedOptions.includes(opt.id) && <Check size={14} className="text-white" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-8 bg-surface-container rounded-2xl p-4 w-fit mx-auto mb-8">
            <button onClick={() => updateQty(-1)} className="w-12 h-12 rounded-full bg-white flex items-center justify-center text-primary shadow-sm"><Minus size={24} /></button>
            <span className="text-2xl font-bold min-w-[24px] text-center">{qty}</span>
            <button onClick={() => updateQty(1)} className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white shadow-md"><Plus size={24} /></button>
          </div>
        </div>
      </div>

      <footer className="fixed bottom-0 w-full max-w-md left-1/2 -translate-x-1/2 z-50 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.05)] px-6 py-4 rounded-t-3xl">
        <button onClick={() => navigate('cart')} className="w-full bg-primary text-white h-16 rounded-2xl flex items-center justify-center gap-3 font-bold text-lg active:scale-95 transition-transform">
          Ajouter au Panier
        </button>
      </footer>
    </div>
  );
}
