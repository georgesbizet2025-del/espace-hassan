import { useApp } from '../context';
import { ArrowLeft, Plus, Edit2, Trash2, Search } from 'lucide-react';
import { useState } from 'react';

const mockMenu = [
  { id: 1, name: 'Margherita', price: '€12.00', category: 'Pizza', image: 'https://images.unsplash.com/photo-1604068549290-dea0e4a30536?q=80&w=200&auto=format&fit=crop' },
  { id: 2, name: 'Pepperoni', price: '€15.00', category: 'Pizza', image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=200&auto=format&fit=crop' },
  { id: 3, name: 'Caesar Salad', price: '€10.00', category: 'Salads', image: 'https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=200&auto=format&fit=crop' },
];

export default function AdminMenuScreen() {
  const { navigate } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMenu = mockMenu.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));

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

        <section className="space-y-4">
          {filteredMenu.map(item => (
            <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-outline-variant/20 flex items-center gap-4">
              <img src={item.image} alt={item.name} className="w-16 h-16 rounded-xl object-cover" />
              <div className="flex-1">
                <h3 className="font-bold text-on-surface">{item.name}</h3>
                <p className="text-sm text-on-surface-variant mb-1">{item.category}</p>
                <div className="font-bold text-primary">{item.price}</div>
              </div>
              <div className="flex flex-col gap-2">
                <button className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-container-high transition-colors">
                  <Edit2 size={16} />
                </button>
                <button className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center text-red-500 hover:bg-red-100 transition-colors">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </section>
      </main>

      {/* Floating Action Button */}
      <button className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-white flex items-center justify-center rounded-2xl shadow-xl active:scale-95 transition-transform z-50">
        <Plus size={24} />
      </button>
    </div>
  );
}
