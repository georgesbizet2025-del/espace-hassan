import { useApp } from '../context';
import { ArrowLeft, Clock, CheckCircle2, Truck, Check } from 'lucide-react';
import { useState, useEffect } from 'react';
import { db } from '../lib/firebase';
import { collection, onSnapshot, query, orderBy, updateDoc, doc } from 'firebase/firestore';

interface OrderItem {
  name: string;
  quantity: number;
}

interface Order {
  id: string;
  customerName: string;
  items: OrderItem[];
  total: string;
  status: 'pending' | 'preparing' | 'ready' | 'delivered';
  createdAt: string;
}

type Tab = 'pending' | 'preparing' | 'ready' | 'delivered';

export default function AdminOrdersScreen() {
  const { navigate } = useApp();
  const [activeTab, setActiveTab] = useState<Tab>('pending');
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setOrders(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Order)));
    });
    return () => unsubscribe();
  }, []);

  const filterOrders = (status: Tab) => orders.filter(o => o.status === status);

  const updateStatus = async (id: string, newStatus: Tab) => {
    try {
      await updateDoc(doc(db, 'orders', id), { status: newStatus });
    } catch (e) {
      console.error(e);
    }
  };

  const tabs: { id: Tab, label: string }[] = [
    { id: 'pending', label: 'New' },
    { id: 'preparing', label: 'Prepping' },
    { id: 'ready', label: 'Ready' },
    { id: 'delivered', label: 'Done' }
  ];

  return (
    <div className="min-h-screen bg-surface pb-24">
      <header className="sticky top-0 z-50 flex flex-col bg-surface shadow-sm w-full">
        <div className="flex items-center px-4 h-16">
          <button onClick={() => navigate('adminDashboard')} className="text-primary hover:opacity-80 active:scale-95">
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold text-primary ml-4">Manage Orders</h1>
        </div>
        
        {/* Tabs */}
        <div className="flex overflow-x-auto px-4 gap-2 pb-3 custom-scrollbar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-colors ${
                activeTab === tab.id 
                  ? 'bg-primary text-white shadow-md' 
                  : 'bg-surface-container text-on-surface-variant hover:bg-surface-container-high'
              }`}
            >
              {tab.label}
              <span className="ml-2 bg-black/10 px-1.5 py-0.5 rounded-full text-xs">
                {filterOrders(tab.id).length}
              </span>
            </button>
          ))}
        </div>
      </header>

      <main className="px-4 mt-6 max-w-md md:max-w-3xl lg:max-w-4xl mx-auto w-full space-y-4">
        {filterOrders(activeTab).length === 0 ? (
          <div className="text-center py-10">
            <Clock size={48} className="text-outline mx-auto mb-4 opacity-50" />
            <p className="text-on-surface-variant font-medium">No orders in this status.</p>
          </div>
        ) : (
          filterOrders(activeTab).map(order => (
            <div key={order.id} className="bg-white p-5 rounded-2xl shadow-sm border border-outline-variant/20 flex flex-col gap-3">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-on-surface truncate w-32" title={order.id}>{order.id}</h3>
                  <p className="text-sm font-medium text-primary">{order.customerName}</p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="font-bold text-on-surface">{order.total}</span>
                  <span className="text-xs text-on-surface-variant">{new Date(order.createdAt).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                </div>
              </div>
              
              <div className="text-sm text-on-surface-variant bg-surface-container-low p-3 rounded-xl border border-outline-variant/10">
                {order.items?.map((item, idx) => (
                  <div key={idx}>{item.quantity}x {item.name}</div>
                ))}
                {!order.items?.length && <span>No items</span>}
              </div>

              {/* Action Buttons based on status */}
              <div className="flex gap-2 mt-2">
                {activeTab === 'pending' && (
                  <button 
                    onClick={() => updateStatus(order.id, 'preparing')}
                    className="flex-1 bg-primary text-white py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform"
                  >
                    <CheckCircle2 size={18} /> Accept & Prep
                  </button>
                )}
                {activeTab === 'preparing' && (
                  <button 
                    onClick={() => updateStatus(order.id, 'ready')}
                    className="flex-1 bg-secondary text-white py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform"
                  >
                    <Check size={18} /> Mark as Ready
                  </button>
                )}
                {activeTab === 'ready' && (
                  <button 
                    onClick={() => updateStatus(order.id, 'delivered')}
                    className="flex-1 bg-green-500 text-white py-2.5 rounded-xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform"
                  >
                    <Truck size={18} /> Out for Delivery / Done
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </main>
    </div>
  );
}
