import { ArrowLeft, MapPin, Plus, Menu } from 'lucide-react';
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

export default function SaladsScreen() {
  const { navigate, setSidebarOpen, setSelectedProduct } = useApp();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'products'), where('category', '==', 'Salade'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product)));
    });
    return () => unsubscribe();
  }, []);

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
        <button onClick={() => navigate('menu')} className="px-5 py-2 whitespace-nowrap rounded-full text-sm font-semibold bg-surface-container text-on-surface-variant">Nos Pizzas</button>
        <button className="px-5 py-2 whitespace-nowrap rounded-full text-sm font-semibold bg-primary text-white shadow-md">Nos Salades</button>
      </nav>

      <main className="p-4 max-w-lg md:max-w-4xl lg:max-w-6xl mx-auto w-full">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-primary">Salades Gourmandes</h2>
          <p className="text-sm text-on-surface-variant">Fraîcheur et authenticité dans chaque assiette.</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {products.map((item) => (
            <div key={item.id} className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col border border-outline-variant/20">
               <div className="h-48 overflow-hidden bg-surface-container">
                 <img src={item.img || 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=200&auto=format&fit=crop'} className="w-full h-full object-cover" />
               </div>
               <div className="p-4 flex-grow flex flex-col">
                 <div className="flex justify-between items-start mb-2">
                   <h3 className="text-xl font-bold text-on-surface">{item.name}</h3>
                   <span className="text-primary font-bold text-lg">{item.price}</span>
                 </div>
                 <p className="text-sm text-on-surface-variant mb-4 flex-grow">{item.desc}</p>
                 <button onClick={() => { setSelectedProduct(item); navigate('productDetail'); }} className="w-full bg-primary text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 active:scale-95 shadow-md">
                   <Plus size={18} /> Ajouter
                 </button>
               </div>
            </div>
          ))}
          {products.length === 0 && (
             <div className="text-center py-10 text-on-surface-variant">Aucune salade trouvée.</div>
          )}
        </div>
      </main>
    </div>
  );
}
