import { ArrowLeft, Check, Plus, Minus } from 'lucide-react';
import { useApp } from '../context';
import { useState } from 'react';

export default function ProductDetailScreen() {
  const { navigate, selectedProduct } = useApp();
  const [qty, setQty] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<number[]>([]);

  // Default fallback product if selectedProduct is not available and we directly reached this page
  const product = selectedProduct || {
    id: "default_margherita",
    name: "Pizza Margherita",
    price: "55DH",
    desc: "Sauce tomate maison infusée au basilic frais, double mozzarella fior di latte fondu, filet d'huile d'olive extra-vierge et feuilles de basilic frais.",
    img: "https://images.unsplash.com/photo-1604068549290-dea0e4a30536?q=80&w=800&auto=format&fit=crop",
    category: "Pizza"
  };

  const getCustomizationOptions = () => {
    switch (product.category) {
      case 'Salade':
        return [
          { id: 1, name: 'Extra Fromage de Chèvre', price: '+15 DH' },
          { id: 2, name: 'Supplément Cerneaux de Noix', price: '+10 DH' },
          { id: 3, name: 'Sauce Vinaigrette Agrumes', price: '+5 DH' }
        ];
      case 'Boisson':
        return [
          { id: 1, name: 'Servir Ultra-Frais avec Glaçons', price: '+0 DH' },
          { id: 2, name: 'Rondelle de Citron Supplémentaire', price: '+2 DH' }
        ];
      case 'Pizza':
      default:
        return [
          { id: 1, name: 'Extra Mozzarella Fondante', price: '+15 DH' },
          { id: 2, name: 'Sauce BBQ Artisanale', price: '+8 DH' },
          { id: 3, name: 'Double Poulet Émincé', price: '+20 DH' }
        ];
    }
  };

  const options = getCustomizationOptions();

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
        <button onClick={() => navigate(product.category === 'Salade' ? 'salads' : 'menu')} className="flex items-center justify-center w-10 h-10 rounded-full bg-white/95 shadow-md text-on-surface hover:bg-surface-container transition-all active:scale-95 border border-outline-variant/10">
          <ArrowLeft size={20} className="text-primary" />
        </button>
      </nav>

      <div className="relative w-full h-[320px] overflow-hidden bg-surface-container">
        <img 
          src={product.img || "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop"} 
          alt={product.name} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="relative -mt-10 px-4 pb-32">
        <div className="bg-surface-container-lowest rounded-t-[32px] p-6 shadow-xl relative z-10 border border-outline-variant/10">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-2xl font-black text-on-surface tracking-tight leading-tight mb-2">{product.name}</h1>
              <span className="bg-primary/10 text-primary text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider">
                {product.category}
              </span>
            </div>
            <div className="bg-primary text-white px-4 py-2.5 rounded-2xl shadow-md min-w-[70px] text-center">
              <span className="text-xl font-extrabold">{product.price}</span>
            </div>
          </div>
          
          {product.desc && (
            <div className="mb-6">
              <h2 className="text-xs uppercase font-extrabold tracking-wider text-outline mb-2">Description</h2>
              <p className="text-sm text-on-surface-variant leading-relaxed bg-surface-container-low p-4 rounded-xl border border-outline-variant/20">
                {product.desc}
              </p>
            </div>
          )}
          
          <div className="mb-8">
            <h2 className="text-sm uppercase font-extrabold tracking-wider text-outline border-b border-outline-variant/20 pb-2 mb-4">
              {product.category === 'Boisson' ? 'Options de service' : 'Personnalisez votre commande'}
            </h2>
            <div className="grid grid-cols-1 gap-3">
              {options.map(opt => (
                <div 
                  key={opt.id} 
                  onClick={() => toggleOption(opt.id)} 
                  className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer select-none transition-all active:scale-[0.99] ${
                    selectedOptions.includes(opt.id) 
                      ? 'border-primary bg-primary/5 shadow-xs' 
                      : 'border-outline-variant/30 hover:border-primary/20 bg-surface-container-low'
                  }`}
                >
                  <div>
                    <p className="text-sm font-bold text-on-surface">{opt.name}</p>
                    <p className="text-xs text-on-surface-variant mt-0.5">{opt.price}</p>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                    selectedOptions.includes(opt.id) 
                      ? 'border-primary bg-primaryScale bg-primary' 
                      : 'border-outline hover:border-primary'
                  }`}>
                    {selectedOptions.includes(opt.id) && <Check size={12} className="text-white font-bold" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-8 bg-surface-container-low border border-outline-variant/20 rounded-2xl p-3 w-fit mx-auto mb-8">
            <button 
              onClick={() => updateQty(-1)} 
              className="w-10 h-10 rounded-full bg-white border border-outline-variant/30 flex items-center justify-center text-primary shadow-sm hover:bg-surface active:scale-90 transition-transform"
            >
              <Minus size={18} />
            </button>
            <span className="text-xl font-extrabold min-w-[24px] text-center text-on-surface">{qty}</span>
            <button 
              onClick={() => updateQty(1)} 
              className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white shadow-md hover:bg-primary-container active:scale-90 transition-transform"
            >
              <Plus size={18} />
            </button>
          </div>
        </div>
      </div>

      <footer className="fixed bottom-0 w-full max-w-md left-1/2 -translate-x-1/2 z-50 bg-white shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-6 py-4 rounded-t-3xl border-t border-outline-variant/30">
        <button 
          onClick={() => navigate('cart')} 
          className="w-full bg-primary text-white h-14 rounded-2xl flex items-center justify-center gap-2 font-black text-base active:scale-95 transition-transform shadow-md hover:bg-primary-container"
        >
          Ajouter au Panier • {(parseFloat(product.price) * qty).toFixed(0)} DH
        </button>
      </footer>
    </div>
  );
}
