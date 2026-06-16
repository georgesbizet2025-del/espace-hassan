import { ArrowLeft, Search, Plus } from 'lucide-react';
import { useApp } from '../context';

export default function MenuScreen() {
  const { navigate } = useApp();

  return (
    <div className="min-h-screen bg-surface pb-24">
      <header className="flex justify-between items-center px-4 h-16 w-full z-50 bg-surface shadow-sm sticky top-0">
        <h1 className="text-2xl font-extrabold text-primary tracking-tight">Notre Carte</h1>
      </header>

      <nav className="sticky top-16 bg-surface/90 backdrop-blur-md z-40 px-4 py-3 flex gap-4 overflow-x-auto custom-scrollbar border-b border-outline-variant/30">
        <button className="px-5 py-2 whitespace-nowrap rounded-full text-sm font-semibold bg-primary text-white shadow-md">Nos Pizzas</button>
        <button onClick={() => navigate('salads')} className="px-5 py-2 whitespace-nowrap rounded-full text-sm font-semibold bg-surface-container text-on-surface-variant hover:bg-surface-container-high transition-colors">Nos Salades</button>
      </nav>

      <main className="px-4 mt-6 max-w-lg mx-auto">
        <div className="mt-4 flex items-center bg-surface-container-low rounded-xl px-4 py-3 border border-outline-variant/30">
          <Search size={20} className="text-outline" />
          <input type="text" className="bg-transparent border-none focus:ring-0 w-full text-sm ml-2 outline-none" placeholder="Rechercher une pizza..." />
        </div>

        <div className="mt-8 space-y-4">
          {[
            { name: 'Pizza César', price: '69DH', desc: 'Poulet, Parmesan, Laitue, Sauce César, Mozzarella.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCZsrc4oj6DNkR17aDlxkhW3RqwYlptDAW2i53ZFr4kU4bds6CMvOhJe_hdXYjG1QFW2jNru8YguStGXfsWzkQTd-lEjqJEYV9VCdLRKAEmmaP4b2Ig5Vku1z3CXwtvIDJ_7CA93_QJar_vKAJayauISa2Bokf5uKd9gkHFT_jyt02FGLe1hBh16ZC-jiwBIi9l517J4QUU9TED02KX4n2o2TauBYQiWgp4S3kYeaeNi_m1w4CsiJAbKgLgj9JQEx1YiIBaqlCCZQc' },
            { name: 'Pizza Florentine', price: '69DH', desc: 'Epinards, Ricotta, Œuf, Crème, Mozzarella.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAlJlJgLjzo8E2mfHFniuPriZyd1BDLVgZDkfxtfRKM9zw00mvH0Qxx7lRj0yZh8dIuvYW9x2W30_bWdhVDMZoURcrofAESDp9VkMO3LlavrL6Ry9t_4AD5RbPEHCts4upofqmd2B1DPzfQt43295QEUaosWlEcRCX5TFJmF6qlvXhZYpch7bfYy9oP5PWhC3aU3s0ajIk9sEA6M2ANP_4v51pHoStHouJxU4r_xMNWyLjT1c5oqiyBVB2lwH6-_eSWPYAiDZFxxMc' },
            { name: 'Pizza Pollo BBQ', price: '75DH', desc: 'Poulet, Oignons Rouges, Maïs, Sauce BBQ, Mozzarella.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCGar1qtfN_Cvt83ccx5La9UqvxTC4v2JqhWRfr9Ki0cnz3kcff1M2l5B_ZQLPGwiK9PVqInrP4HfnBM-azVhX319zxbAirgQBQkKty69FVAoNN0ZRZpbSiKOeK9F5Du6adVT2B3dhXEcJSror4_lHHXyvrM8ZNloMy1gZj1xFf4blTQkrXQ-0Ig9AUtOerbn4YrITiOikeNdc6Wnw0Yw240-HNa2eFaUxKGVcfqj_xbDihDm8zMXvT1wmRb0jnprZNbFXvvrma9UA' }
          ].map(pizza => (
            <div key={pizza.name} onClick={() => navigate('productDetail')} className="flex items-center gap-4 bg-white p-3 rounded-2xl shadow-sm border border-outline-variant/20 active:scale-[0.98] transition-transform cursor-pointer">
               <div className="w-24 h-24 flex-shrink-0">
                 <img src={pizza.img} className="w-full h-full object-cover rounded-xl" />
               </div>
               <div className="flex-grow">
                 <div className="flex justify-between items-start">
                   <h3 className="font-bold text-lg text-primary">{pizza.name}</h3>
                   <span className="font-bold text-lg text-secondary">{pizza.price}</span>
                 </div>
                 <p className="text-sm text-on-surface-variant leading-tight mt-1">{pizza.desc}</p>
                 <div className="mt-2 flex justify-end">
                   <button className="bg-primary text-white p-2 rounded-lg flex items-center justify-center">
                     <Plus size={16} />
                   </button>
                 </div>
               </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
