import { Menu, MapPin, Search } from 'lucide-react';
import { useApp } from '../context';

export default function HomeScreen() {
  const { navigate } = useApp();

  return (
    <div className="w-full flex flex-col pb-20">
      {/* Top App Bar */}
      <header className="flex justify-between items-center px-4 h-16 w-full z-50 sticky top-0 bg-surface shadow-sm">
        <div className="flex items-center gap-3">
          <button className="transition-all duration-200 active:scale-95 hover:opacity-80">
            <Menu size={28} className="text-primary" />
          </button>
          <div className="flex items-center gap-2">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCo2U3LUfsihwyEGPP_cyHiLB4hT4R_MWVQPfBGnV11CFsBkS5PPRMHgMfA7QTgeYu2SHpU7q-dKgVH8MyNhyc9bGfp2ve-51-HhxtKbIAfN5KDpBaT7RAynyw8vP5XhnazNlXIXdQ-S1xcXkTZGN8rhd9b6ERuz2kYS24B0qb40EmHFNClVVXUWl6zvaIW8eTLC6gFW-Hy3EvALZW2MkZQ0uvB2uqZ2xTUr1JY81C48Fxm750fi9QXu7QDPMV-C0Ontb1-z4y-8yg" 
              alt="Logo" 
              className="h-10 w-10 object-contain rounded-full"
            />
            <span className="text-2xl font-bold text-primary">Espace Hassan</span>
          </div>
        </div>
        <button onClick={() => navigate('addressSelection')} className="transition-all duration-200 active:scale-95 hover:opacity-80">
          <MapPin size={24} className="text-primary bg-[#35c737]" />
        </button>
      </header>

      {/* Welcome & Search */}
      <section className="px-4 pt-6 pb-4">
        <div className="mb-6">
          <h1 className="text-4xl font-extrabold text-primary leading-tight">Welcome to <br/>Authentic Taste</h1>
          <p className="text-base text-on-surface-variant mt-2">Find your favorite gourmet meal</p>
        </div>
        <div className="relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search size={20} className="text-outline" />
          </div>
          <input 
            type="text" 
            className="w-full h-14 pl-12 pr-4 bg-surface-container-low border-none rounded-2xl focus:ring-2 focus:ring-primary text-sm premium-card-shadow transition-all duration-300" 
            placeholder="Search for Pizzas, Pasta, or more..." 
          />
        </div>
      </section>

      {/* Featured Deals Carousel */}
      <section className="py-4">
        <div className="flex overflow-x-auto gap-4 px-4 custom-scrollbar snap-x snap-mandatory">
          <div onClick={() => navigate('offers')} className="flex-shrink-0 w-[85%] h-44 bg-gradient-to-br from-primary to-primary-container rounded-3xl p-6 relative overflow-hidden snap-center group cursor-pointer">
            <div className="relative z-10 flex flex-col justify-between h-full">
              <div>
                <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-white uppercase tracking-wider">New User Special</span>
                <h2 className="text-2xl font-bold text-white mt-2">50% OFF</h2>
                <p className="text-sm text-white/90">On your first order today!</p>
              </div>
              <button className="bg-white text-primary px-4 py-2 rounded-xl text-xs font-semibold w-fit transition-transform group-hover:scale-105 active:scale-95">Claim Now</button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-6">
        <div className="flex justify-between items-center px-4 mb-4">
          <h3 className="text-xl font-bold text-on-surface">Categories</h3>
          <button onClick={() => navigate('menu')} className="text-primary text-xs font-semibold">View All</button>
        </div>
        <div className="flex gap-4 overflow-x-auto px-4 custom-scrollbar">
          {['Pizzas', 'Pasta', 'Salads', 'Drinks', 'Burgers'].map((cat, i) => (
            <button key={cat} onClick={() => navigate(cat === 'Salads' ? 'salads' : 'menu')} className="flex flex-col items-center gap-2 group">
              <div className="w-16 h-16 rounded-2xl bg-primary-container/10 flex items-center justify-center transition-all duration-200 group-hover:bg-primary-container group-hover:text-white">
                <span className="text-primary group-hover:text-white font-bold text-lg">{cat[0]}</span>
              </div>
              <span className="text-xs font-semibold text-on-surface-variant group-hover:text-primary">{cat}</span>
            </button>
          ))}
        </div>
      </section>

      <div className="pb-16" />
    </div>
  );
}
