import { ArrowLeft, Search, Plus, Menu } from 'lucide-react';
import { useApp } from '../context';
import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, onSnapshot, query, where } from 'firebase/firestore';

interface Product {
  id: string;
  name: string;
  price: string;
  desc: string;
  img: string;
  category: string;
}

export default function MenuScreen() {
  const { navigate, setSidebarOpen, setSelectedProduct } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'products'), where('category', '==', 'Pizza'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product)));
    });
    return () => unsubscribe();
  }, []);

  const filteredPizzas = products.filter(pizza => pizza.name.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="min-h-screen bg-surface pb-24">
      <header className="flex justify-between items-center px-4 h-16 w-full z-10 bg-surface shadow-xs sticky top-0 border-b border-outline-variant/10">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="w-10 h-10 rounded-full hover:bg-primary/10 flex items-center justify-center text-primary transition-all duration-200 active:scale-95 md:hidden"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-xl font-extrabold text-primary tracking-tight">Notre Carte</h1>
        </div>
      </header>

      <nav className="sticky top-16 bg-surface/90 backdrop-blur-md z-40 px-4 py-3 flex gap-4 overflow-x-auto custom-scrollbar border-b border-outline-variant/30">
        <button className="px-5 py-2 whitespace-nowrap rounded-full text-sm font-semibold bg-primary text-white shadow-md">Nos Pizzas</button>
        <button onClick={() => navigate('salads')} className="px-5 py-2 whitespace-nowrap rounded-full text-sm font-semibold bg-surface-container text-on-surface-variant hover:bg-surface-container-high transition-colors">Nos Salades</button>
      </nav>

      <main className="px-4 mt-6 max-w-lg md:max-w-4xl lg:max-w-6xl mx-auto w-full">
        <div className="mt-4 flex items-center bg-surface-container-low rounded-xl px-4 py-3 border border-outline-variant/30">
          <Search size={20} className="text-outline" />
          <input 
            type="text" 
            className="bg-transparent border-none focus:ring-0 w-full text-sm ml-2 outline-none" 
            placeholder="Rechercher une pizza..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="mt-8 space-y-4">
          {filteredPizzas.map(pizza => (
            <div key={pizza.id} onClick={() => { setSelectedProduct(pizza); navigate('productDetail'); }} className="flex items-center gap-4 bg-white p-3 rounded-2xl shadow-sm border border-outline-variant/20 active:scale-[0.98] transition-transform cursor-pointer">
               <div className="w-24 h-24 flex-shrink-0">
                 <img src={pizza.img || 'https://images.unsplash.com/photo-1604068549290-dea0e4a30536?q=80&w=200&auto=format&fit=crop'} className="w-full h-full object-cover rounded-xl bg-surface-container" />
               </div>
               <div className="flex-grow">
                 <div className="flex justify-between items-start">
                   <h3 className="font-bold text-lg text-primary">{pizza.name}</h3>
                   <span className="font-bold text-lg text-secondary">{pizza.price}</span>
                 </div>
                 <p className="text-sm text-on-surface-variant leading-tight mt-1 line-clamp-2">{pizza.desc}</p>
                 <div className="mt-2 flex justify-end">
                   <button className="bg-primary text-white p-2 rounded-lg flex items-center justify-center shadow-sm">
                     <Plus size={16} />
                   </button>
                 </div>
               </div>
            </div>
          ))}
          {filteredPizzas.length === 0 && (
             <div className="text-center py-10 text-on-surface-variant">Aucune pizza trouvée.</div>
          )}
        </div>
      </main>
    </div>
  );
}
