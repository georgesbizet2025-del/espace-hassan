import { ArrowLeft, Trash2, Plus, Minus, MapPin, CreditCard, ShoppingBag } from 'lucide-react';
import { useApp } from '../context';
import { db } from '../lib/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function CartScreen() {
  const { navigate, user, userData } = useApp();

  const cartItems = [
    { id: 1, name: 'Pizza Pollo BBQ', price: '75 DH', qty: 1, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDwOGloVcYcGptO_5D9iFCWAqxj4ZllhvEEuBiUvwlS4MusbdcGbMNDNcKRc0S24SxwRwisZa-l5MNtn-v67q6TaVcxw97OeiCZ-BUwfeP6c6zK5DcvWW2B39N0ngLYHYsMwkBZIqVpc1CIIGSFjAX4gAPF38VYBjHElTQJEshuUOqPkLBKXvzSe_JdraV8W5k4G1EJqtWAXi8wG4EGrN2dIM7nYfZGPxjnJhgXJYeUkOngFXVcgQjlYl0JCljpXfLL_rd5ZbP3HSE' },
    { id: 2, name: 'Jus d\'Orange', price: '36 DH', qty: 2, img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC4RRKgHGXjBamFB0Wubr5UwWVNfPWvLeKfr3n7IVyFMMiOl39ElKo_J_C27r9GbBI2CW7iq1shYMRB5n_o3XE2CRzGEg8j6DIgvN9Og25Gtkf_aC7cZRg1kyCmEyL8ehfqET_zlCwhTJujClXnt6y5HThOWxYWrDQJP8lXQqUx6gVCWEDrdHJndWp2y6UaalCeEllThltYL0h5bM4RHHfcQYTCuXDqDmQfnh3vVyxOoWLPiAK3WiK90bvLLPYKwqcCrarTtbaa5R4' }
  ];

  const handleCheckout = async () => {
    if (!user) {
      alert("Please login to place an order");
      navigate('login');
      return;
    }
    
    try {
      const orderData = {
        userId: user.uid,
        customerName: userData?.name || user.email || 'Customer',
        items: cartItems.map(item => ({ name: item.name, quantity: item.qty, price: item.price })),
        total: '111 DH',
        status: 'pending',
        createdAt: new Date().toISOString(),
        address: 'Gauthier, Casablanca'
      };
      await addDoc(collection(db, 'orders'), orderData);
      navigate('orderTracking');
    } catch (e) {
      console.error("Checkout failed", e);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-32">
      <header className="bg-surface sticky top-0 z-50 flex justify-between items-center px-4 h-16 w-full shadow-sm">
        <h1 className="text-xl font-bold text-primary">Mon Panier</h1>
        <button className="text-on-surface-variant hover:opacity-80 active:scale-95">
          <Trash2 size={24} />
        </button>
      </header>

      <main className="max-w-lg mx-auto p-4 space-y-6">
        <section className="space-y-4">
          {cartItems.map(item => (
            <div key={item.id} className="flex items-center gap-4 bg-white p-3 rounded-xl shadow-sm border border-outline-variant/10">
              <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                <img src={item.img} className="w-full h-full object-cover" />
              </div>
              <div className="flex-grow">
                <h3 className="text-base font-bold text-on-surface">{item.name}</h3>
                <p className="text-primary font-bold text-sm">{item.price}</p>
                <div className="flex items-center gap-3 mt-2">
                  <button className="w-8 h-8 rounded-full border border-outline-variant flex items-center justify-center text-primary active:scale-90 transition-transform"><Minus size={16}/></button>
                  <span className="font-bold text-sm">{item.qty}</span>
                  <button className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center active:scale-90 transition-transform"><Plus size={16}/></button>
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-bold text-on-surface px-1">Détails de livraison</h2>
          <div onClick={() => navigate('addressSelection')} className="bg-surface-container-low p-4 cursor-pointer rounded-xl flex items-start gap-4 border border-outline-variant/30">
            <div className="bg-primary-fixed p-2 rounded-lg text-on-primary-fixed-variant">
              <MapPin size={24} />
            </div>
            <div className="flex-grow">
              <div className="flex justify-between items-center">
                <span className="text-sm font-bold">Adresse de livraison</span>
                <span className="text-primary text-xs font-bold underline">Modifier</span>
              </div>
              <p className="text-sm text-on-surface-variant mt-1 leading-snug">Gauthier, Casablanca</p>
            </div>
          </div>

          <div className="bg-surface-container-low p-4 rounded-xl flex items-center gap-4 border border-outline-variant/30">
            <div className="bg-secondary-fixed p-2 rounded-lg text-on-secondary-fixed-variant">
              <CreditCard size={24} />
            </div>
            <div className="flex-grow">
              <span className="text-sm font-bold block">Méthode de paiement</span>
              <p className="text-sm text-on-surface-variant mt-1">Espèces à la livraison</p>
            </div>
          </div>
        </section>

        <section className="bg-white p-5 rounded-2xl shadow-sm border border-outline-variant/20">
          <h2 className="text-xl font-bold text-on-surface mb-4">Récapitulatif</h2>
          <div className="space-y-3">
            <div className="flex justify-between text-sm text-on-surface-variant"><span>Sous-total</span><span>111 DH</span></div>
            <div className="flex justify-between text-sm text-on-surface-variant"><span>Frais de livraison</span><span className="text-primary font-bold">GRATUIT</span></div>
            <hr className="border-outline-variant border-dashed my-2"/>
            <div className="flex justify-between items-center pt-2">
              <span className="text-xl font-bold text-on-surface">Total à payer</span>
              <span className="text-2xl font-bold text-primary">111 <small className="text-sm">DH</small></span>
            </div>
          </div>
        </section>
      </main>

      <div className="fixed bottom-20 w-full max-w-md left-1/2 -translate-x-1/2 z-50 p-4 bg-gradient-to-t from-background to-transparent pb-6">
        <button onClick={handleCheckout} className="w-full bg-primary text-white py-4 rounded-2xl flex items-center justify-center gap-3 shadow-xl active:scale-[0.98] transition-all">
          <span className="text-base font-bold">Passer la commande</span>
          <ShoppingBag size={20} />
        </button>
      </div>
    </div>
  );
}
