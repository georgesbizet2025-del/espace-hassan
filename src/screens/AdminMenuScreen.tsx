import { useApp } from '../context';
import { ArrowLeft, Plus, Edit2, Trash2, Search, X, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, onSnapshot, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from 'firebase/firestore';

interface Product {
  id: string;
  name: string;
  price: string;
  desc: string;
  img: string;
  category: string;
}

export default function AdminMenuScreen() {
  const { navigate } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState({ name: '', price: '', desc: '', img: '', category: 'Pizza' });

  useEffect(() => {
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product)));
    });
    return () => unsubscribe();
  }, []);

  const filteredMenu = products.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const handleSave = async () => {
    if (!formData.name || !formData.price) return;
    try {
      if (editingId) {
        await updateDoc(doc(db, 'products', editingId), formData);
      } else {
        await addDoc(collection(db, 'products'), { ...formData, createdAt: new Date().toISOString() });
      }
      setIsAdding(false);
      setEditingId(null);
      setFormData({ name: '', price: '', desc: '', img: '', category: 'Pizza' });
    } catch (error) {
      console.error(error);
    }
  };

  const startEdit = (product: Product) => {
    setFormData({ name: product.name, price: product.price, desc: product.desc || '', img: product.img, category: product.category });
    setEditingId(product.id);
    setIsAdding(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Etes-vous sûr de vouloir supprimer ce produit ?')) {
      await deleteDoc(doc(db, 'products', id));
    }
  };

  return (
    <div className="min-h-screen bg-surface pb-24">
      <header className="sticky top-0 z-50 flex items-center px-4 h-16 bg-surface shadow-sm w-full">
        <button onClick={() => navigate('adminDashboard')} className="text-primary hover:opacity-80 active:scale-95">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-bold text-primary ml-4">Manage Menu</h1>
      </header>

      <main className="px-4 mt-6 max-w-md mx-auto">
        <div className="flex items-center bg-surface-container-low rounded-xl px-4 py-3 border border-outline-variant/30 mb-6 sticky top-20 z-40">
          <Search size={20} className="text-outline" />
          <input 
            type="text" 
            className="bg-transparent border-none focus:ring-0 w-full text-sm ml-2 outline-none" 
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {isAdding && (
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-outline-variant/20 mb-6 space-y-3">
            <h2 className="font-bold text-on-surface mb-2">{editingId ? 'Edit Product' : 'Add Product'}</h2>
            <input type="text" placeholder="Name" className="w-full bg-surface p-3 rounded-xl border border-outline-variant/20" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            <input type="text" placeholder="Price (ex: 69DH)" className="w-full bg-surface p-3 rounded-xl border border-outline-variant/20" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
            <select className="w-full bg-surface p-3 rounded-xl border border-outline-variant/20" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
              <option value="Pizza">Pizza</option>
              <option value="Salade">Salade</option>
              <option value="Boisson">Boisson</option>
            </select>
            <input type="text" placeholder="Description" className="w-full bg-surface p-3 rounded-xl border border-outline-variant/20" value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})} />
            <input type="text" placeholder="Image URL" className="w-full bg-surface p-3 rounded-xl border border-outline-variant/20" value={formData.img} onChange={e => setFormData({...formData, img: e.target.value})} />
            
            <div className="flex gap-2 mt-4">
              <button onClick={() => { setIsAdding(false); setEditingId(null); }} className="flex-1 py-3 text-on-surface-variant font-bold border border-outline-variant/20 rounded-xl">Cancel</button>
              <button onClick={handleSave} className="flex-1 py-3 bg-primary text-white font-bold rounded-xl flex items-center justify-center gap-2"><Check size={18}/> Save</button>
            </div>
          </div>
        )}

        <section className="space-y-4">
          {filteredMenu.map(item => (
            <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-outline-variant/20 flex items-center gap-4">
              <img src={item.img || 'https://images.unsplash.com/photo-1604068549290-dea0e4a30536?q=80&w=200&auto=format&fit=crop'} alt={item.name} className="w-16 h-16 rounded-xl object-cover bg-surface-container" />
              <div className="flex-1">
                <h3 className="font-bold text-on-surface">{item.name}</h3>
                <p className="text-sm text-on-surface-variant mb-1">{item.category}</p>
                <div className="font-bold text-primary">{item.price}</div>
              </div>
              <div className="flex flex-col gap-2">
                <button onClick={() => startEdit(item)} className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors">
                  <Edit2 size={16} />
                </button>
                <button onClick={() => handleDelete(item.id)} className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-500 hover:bg-red-100 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
          {filteredMenu.length === 0 && !isAdding && (
            <div className="text-center py-10 text-on-surface-variant font-medium">Aucun produit trouvé.</div>
          )}
        </section>
      </main>

      {!isAdding && (
        <button onClick={() => { setIsAdding(true); setFormData({ name: '', price: '', desc: '', img: '', category: 'Pizza' }); }} className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-white flex items-center justify-center rounded-2xl shadow-xl active:scale-95 transition-transform z-50">
          <Plus size={24} />
        </button>
      )}
    </div>
  );
}
