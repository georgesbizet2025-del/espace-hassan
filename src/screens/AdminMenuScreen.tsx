import { useApp } from '../context';
import { ArrowLeft, Plus, Edit2, Trash2, Search, X, Check, Loader2, AlertTriangle } from 'lucide-react';
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
  
  // Custom states for safety and UX
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  useEffect(() => {
    const q = query(collection(db, 'products'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setProducts(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Product)));
    });
    return () => unsubscribe();
  }, []);

  const filteredMenu = products.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const handleSave = async () => {
    if (!formData.name || !formData.price) {
      showToast('Erreur: Veuillez specifier le nom et le prix.');
      return;
    }
    if (isSaving) return;

    setIsSaving(true);
    try {
      if (editingId) {
        await updateDoc(doc(db, 'products', editingId), formData);
        showToast('Produit mis à jour avec succès ! ✨');
      } else {
        await addDoc(collection(db, 'products'), { ...formData, createdAt: new Date().toISOString() });
        showToast('Nouveau produit ajouté au menu ! 🍕');
      }
      setIsAdding(false);
      setEditingId(null);
      setFormData({ name: '', price: '', desc: '', img: '', category: 'Pizza' });
    } catch (error: any) {
      console.error(error);
      showToast('Échec de la sauvegarde: ' + (error.message || error));
    } finally {
      setIsSaving(false);
    }
  };

  const startEdit = (product: Product) => {
    setFormData({ name: product.name, price: product.price, desc: product.desc || '', img: product.img, category: product.category });
    setEditingId(product.id);
    setIsAdding(true);
  };

  const handleDeleteClick = (id: string) => {
    setDeleteConfirmId(id);
  };

  const confirmDelete = async () => {
    if (!deleteConfirmId) return;
    try {
      await deleteDoc(doc(db, 'products', deleteConfirmId));
      showToast('Produit supprimé du menu avec succès ! 🗑️');
    } catch (error: any) {
      console.error(error);
      showToast('Échec de la suppression: ' + (error.message || error));
    } finally {
      setDeleteConfirmId(null);
    }
  };

  return (
    <div className="min-h-screen bg-surface pb-24 relative">
      {/* Toast Alert overlay */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-sm bg-neutral-900 border border-neutral-800 text-white px-4 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3 animate-bounce">
          <div className="bg-primary/20 p-1.5 rounded-full text-primary">
            <Check size={18} />
          </div>
          <span className="text-xs font-bold font-sans flex-1 leading-tight">{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="text-white/40 hover:text-white">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Custom Delete Confirmation Modal (solves sandbox confirm blocks) */}
      {deleteConfirmId && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full border border-black/5 shadow-2xl transform scale-100 transition-all">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 bg-red-100 rounded-2xl flex items-center justify-center text-red-500 mb-4">
                <AlertTriangle size={24} />
              </div>
              <h3 className="text-lg font-extrabold text-on-surface">Confirmer la suppression</h3>
              <p className="text-xs text-on-surface-variant/80 mt-2 leading-relaxed">
                Êtes-vous sûr de vouloir supprimer définitivement ce produit de la carte ? Cette opération est irréversible.
              </p>
            </div>
            <div className="flex gap-3 mt-6">
              <button 
                onClick={() => setDeleteConfirmId(null)}
                className="flex-1 py-3 text-xs font-bold text-on-surface bg-surface-container rounded-xl border border-outline-variant/10 hover:bg-surface-container-high transition-colors"
              >
                Annuler
              </button>
              <button 
                onClick={confirmDelete}
                className="flex-1 py-3 text-xs font-bold text-white bg-red-500 rounded-xl hover:bg-red-600 shadow-md transition-colors"
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-40 flex items-center px-4 h-16 bg-surface shadow-xs w-full border-b border-outline-variant/10">
        <button onClick={() => navigate('adminDashboard')} className="text-primary hover:opacity-80 active:scale-95">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-xl font-black text-primary ml-4">Gérer la Carte</h1>
      </header>

      <main className="px-4 mt-6 max-w-md mx-auto">
        <div className="flex items-center bg-surface-container-low rounded-xl px-4 py-3 border border-outline-variant/30 mb-6 sticky top-20 z-10">
          <Search size={20} className="text-outline" />
          <input 
            type="text" 
            className="bg-transparent border-none focus:ring-0 w-full text-sm ml-2 outline-none text-on-surface" 
            placeholder="Rechercher un produit..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {isAdding && (
          <div className="bg-white p-5 rounded-3xl shadow-md border border-outline-variant/20 mb-6 space-y-4">
            <h2 className="font-extrabold text-lg text-primary tracking-tight">{editingId ? 'Modifier le Produit' : 'Ajouter un Produit'}</h2>
            <div>
              <label className="text-[10px] font-bold text-outline uppercase tracking-wider block mb-1">Nom du Produit</label>
              <input type="text" placeholder="ex: Pizza Thon" className="w-[100%] bg-surface p-3 rounded-xl border border-outline-variant/20 text-sm outline-none text-on-surface" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} disabled={isSaving} />
            </div>
            <div>
              <label className="text-[10px] font-bold text-outline uppercase tracking-wider block mb-1">Prix</label>
              <input type="text" placeholder="ex: 69 DH" className="w-[100%] bg-surface p-3 rounded-xl border border-outline-variant/20 text-sm outline-none text-on-surface" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} disabled={isSaving} />
            </div>
            <div>
              <label className="text-[10px] font-bold text-outline uppercase tracking-wider block mb-1">Catégorie</label>
              <select className="w-[100%] bg-surface p-3 rounded-xl border border-outline-variant/20 text-sm outline-none text-on-surface" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} disabled={isSaving}>
                <option value="Pizza">Pizza</option>
                <option value="Salade">Salade</option>
                <option value="Boisson">Boisson</option>
              </select>
            </div>
            <div>
              <label className="text-[10px] font-bold text-outline uppercase tracking-wider block mb-1">Description</label>
              <input type="text" placeholder="ex: Sauce tomate, Thon, Olives, Fromage" className="w-[100%] bg-surface p-3 rounded-xl border border-outline-variant/20 text-sm outline-none text-on-surface" value={formData.desc} onChange={e => setFormData({...formData, desc: e.target.value})} disabled={isSaving} />
            </div>
            <div>
              <label className="text-[10px] font-bold text-outline uppercase tracking-wider block mb-1">URL de l'image (Optionnel)</label>
              <input type="text" placeholder="https://images.unsplash.com/..." className="w-[100%] bg-surface p-3 rounded-xl border border-outline-variant/20 text-sm outline-none text-on-surface" value={formData.img} onChange={e => setFormData({...formData, img: e.target.value})} disabled={isSaving} />
            </div>
            
            <div className="flex gap-2 mt-4 pt-2">
              <button 
                onClick={() => { setIsAdding(false); setEditingId(null); }} 
                className="flex-1 py-3 text-xs font-bold text-on-surface-variant border border-outline-variant/20 rounded-xl hover:bg-surface transition-colors"
                disabled={isSaving}
              >
                Annuler
              </button>
              <button 
                onClick={handleSave} 
                className="flex-1 py-3 bg-primary text-white text-xs font-semibold rounded-xl flex items-center justify-center gap-2 hover:bg-primary-container shadow-md transition-colors disabled:opacity-50"
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Sauvegarde...
                  </>
                ) : (
                  <>
                    <Check size={16}/> Enregistrer
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        <section className="space-y-4">
          {filteredMenu.map(item => (
            <div key={item.id} className="bg-white p-4 rounded-2xl shadow-xs border border-outline-variant/20 flex items-center gap-4 hover:shadow-sm transition-all">
              <img src={item.img || 'https://images.unsplash.com/photo-1604068549290-dea0e4a30536?q=80&w=200&auto=format&fit=crop'} alt={item.name} className="w-16 h-16 rounded-xl object-cover bg-surface-container" />
              <div className="flex-grow">
                <h3 className="font-extrabold text-on-surface tracking-tight leading-tight">{item.name}</h3>
                <span className="inline-block bg-primary/10 text-primary text-[9px] font-bold px-2 py-0.5 rounded-full mt-1 uppercase">{item.category}</span>
                <div className="font-black text-primary mt-2">{item.price}</div>
              </div>
              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => startEdit(item)} 
                  className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors active:scale-95"
                  title="Modifier"
                >
                  <Edit2 size={14} />
                </button>
                <button 
                  onClick={() => handleDeleteClick(item.id)} 
                  className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-500 hover:bg-red-100 transition-colors active:scale-95"
                  title="Supprimer"
                >
                  <Trash2 size={14} />
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
        <button onClick={() => { setIsAdding(true); setFormData({ name: '', price: '', desc: '', img: '', category: 'Pizza' }); }} className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-white flex items-center justify-center rounded-2xl shadow-xl active:scale-95 transition-transform z-30">
          <Plus size={24} />
        </button>
      )}
    </div>
  );
}
