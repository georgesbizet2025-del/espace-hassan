import { Menu, MapPin, Search, Sparkles, TrendingUp, Compass, ArrowRight } from 'lucide-react';
import { useApp } from '../context';

export default function HomeScreen() {
  const { navigate, setSidebarOpen } = useApp();

  return (
    <div className="w-full flex flex-col pb-24 bg-surface min-h-screen">
      {/* Top App Bar */}
      <header className="flex justify-between items-center px-4 h-16 w-full z-40 sticky top-0 bg-surface/90 backdrop-blur-md border-b border-outline-variant/10 shadow-xs">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setSidebarOpen(true)}
            className="w-10 h-10 rounded-full hover:bg-primary/10 flex items-center justify-center text-primary transition-all duration-200 active:scale-95"
            aria-label="Open Sidebar"
          >
            <Menu size={24} />
          </button>
          <div className="flex items-center gap-2">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCo2U3LUfsihwyEGPP_cyHiLB4hT4R_MWVQPfBGnV11CFsBkS5PPRMHgMfA7QTgeYu2SHpU7q-dKgVH8MyNhyc9bGfp2ve-51-HhxtKbIAfN5KDpBaT7RAynyw8vP5XhnazNlXIXdQ-S1xcXkTZGN8rhd9b6ERuz2kYS24B0qb40EmHFNClVVXUWl6zvaIW8eTLC6gFW-Hy3EvALZW2MkZQ0uvB2uqZ2xTUr1JY81C48Fxm750fi9QXu7QDPMV-C0Ontb1-z4y-8yg" 
              alt="Logo" 
              className="h-9 w-9 object-contain rounded-full border border-primary/20"
            />
            <span className="text-xl font-extrabold text-primary tracking-tight">Espace Hassan</span>
          </div>
        </div>
        
        <button 
          onClick={() => navigate('addressSelection')} 
          className="flex items-center gap-1 px-3 py-1.5 bg-primary/5 hover:bg-primary/10 border border-primary/10 text-primary rounded-full transition-all duration-200 active:scale-95"
        >
          <MapPin size={15} className="text-primary" />
          <span className="text-xs font-bold">Rabat</span>
        </button>
      </header>

      {/* Hero Welcome Section */}
      <section className="px-4 pt-5 pb-3">
        <div className="flex items-center gap-1.5 mb-2">
          <span className="bg-primary/10 text-primary text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full flex items-center gap-1">
            <Sparkles size={11} /> Saveurs Authentiques
          </span>
        </div>
        <h1 className="text-3xl font-black text-on-surface tracking-tight leading-tight">
          Une Cuisine <br/>
          <span className="text-primary">Gourmande & Généreuse</span>
        </h1>
        <p className="text-sm text-on-surface-variant/80 mt-1.5">Découvrez nos pizzas au feu de bois et salades fraîches</p>
      </section>

      {/* Sizzling Wood-Fired Hero Banner (Product Image that stimulates flavor) */}
      <section className="px-4 py-2">
        <div 
          onClick={() => navigate('menu')}
          className="relative w-full h-56 rounded-3xl overflow-hidden shadow-md border border-outline-variant/10 group cursor-pointer"
        >
          {/* Authentic image of a delicious Gourmet Pizza */}
          <img 
            src="https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1000&auto=format&fit=crop" 
            alt="Chef's Special Pizza" 
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Gourmet Dark Overlay with gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-transparent" />
          
          <div className="absolute inset-0 p-5 flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <span className="bg-primary text-white text-[10px] font-black uppercase px-3 py-1.5 rounded-full tracking-wider shadow-md">
                ⭐ SIGNATURE CHEF
              </span>
              <span className="bg-black/50 backdrop-blur-sm text-white text-[10px] font-bold px-3 py-1 rounded-full border border-white/20 uppercase tracking-widest">
                Au feu de bois
              </span>
            </div>
            
            <div>
              <p className="text-secondary text-[11px] font-bold tracking-wider uppercase mb-0.5">Offre Spéciale</p>
              <h2 className="text-2xl font-extrabold text-white leading-tight tracking-tight drop-shadow-sm">
                La Gourmet Regina Royale
              </h2>
              <p className="text-xs text-white/80 line-clamp-2 mt-1">
                Sauce tomate artisanale, fromage mozzarella fior di latte fondant, jambon de dinde et champignons frais de Paris.
              </p>
              <div className="mt-3.5 flex items-center justify-between">
                <span className="text-xl font-black text-white">
                  69 DH <span className="text-xs line-through text-white/50 font-normal ml-1.5">85 DH</span>
                </span>
                <span className="bg-white text-primary hover:bg-primary-container hover:text-white px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 shadow-md flex items-center gap-1">
                  Commander <ArrowRight size={13} />
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Interactive Search Option */}
      <section className="px-4 py-3">
        <div className="relative group/search">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-outline">
            <Search size={18} />
          </div>
          <input 
            type="text" 
            onClick={() => navigate('menu')}
            readOnly
            className="w-full h-12 pl-12 pr-4 bg-surface-container-low border border-outline-variant/30 rounded-2xl text-sm cursor-pointer transition-all hover:bg-surface-container hover:border-primary/20 outline-none text-on-surface-variant font-medium" 
            placeholder="Rechercher une pizza, une salade..." 
          />
        </div>
      </section>

      {/* Categories Grid (With beautiful real images) */}
      <section className="py-4">
        <div className="flex justify-between items-center px-4 mb-3">
          <h3 className="text-lg font-extrabold text-on-surface tracking-tight flex items-center gap-1.5">
            <TrendingUp size={18} className="text-primary" /> Nos Catégories
          </h3>
          <button onClick={() => navigate('menu')} className="text-primary text-xs font-bold hover:underline">Voir Tout</button>
        </div>
        
        <div className="grid grid-cols-3 gap-3 px-4">
          {/* Pizza Cat */}
          <div 
            onClick={() => navigate('menu')}
            className="flex flex-col rounded-2xl overflow-hidden bg-white border border-outline-variant/20 shadow-xs cursor-pointer group active:scale-95 transition-all text-center"
          >
            <div className="h-24 w-full overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1604068549290-dea0e4a30536?q=80&w=200&auto=format&fit=crop" 
                alt="Nos Pizzas" 
                className="w-full h-full object-cover group-hover:scale-105 duration-300"
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>
            <div className="py-2.5 bg-surface-container-lowest">
              <span className="text-xs font-black text-on-surface group-hover:text-primary">Pizzas</span>
              <p className="text-[9px] text-on-surface-variant font-medium mt-0.5">Cuites au Four</p>
            </div>
          </div>

          {/* Salads Cat */}
          <div 
            onClick={() => navigate('salads')}
            className="flex flex-col rounded-2xl overflow-hidden bg-white border border-outline-variant/20 shadow-xs cursor-pointer group active:scale-95 transition-all text-center"
          >
            <div className="h-24 w-full overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=200&auto=format&fit=crop" 
                alt="Nos Salades" 
                className="w-full h-full object-cover group-hover:scale-105 duration-300"
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>
            <div className="py-2.5 bg-surface-container-lowest">
              <span className="text-xs font-black text-on-surface group-hover:text-primary">Salades</span>
              <p className="text-[9px] text-on-surface-variant font-medium mt-0.5">Fraîches & Bio</p>
            </div>
          </div>

          {/* Drinks Cat */}
          <div 
            onClick={() => navigate('menu')}
            className="flex flex-col rounded-2xl overflow-hidden bg-white border border-outline-variant/20 shadow-xs cursor-pointer group active:scale-95 transition-all text-center"
          >
            <div className="h-24 w-full overflow-hidden relative">
              <img 
                src="https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?q=80&w=200&auto=format&fit=crop" 
                alt="Boissons" 
                className="w-full h-full object-cover group-hover:scale-105 duration-300"
              />
              <div className="absolute inset-0 bg-black/10" />
            </div>
            <div className="py-2.5 bg-surface-container-lowest">
              <span className="text-xs font-black text-on-surface group-hover:text-primary">Boissons</span>
              <p className="text-[9px] text-on-surface-variant font-medium mt-0.5">Glacées & Pressées</p>
            </div>
          </div>
        </div>
      </section>

      {/* Elegant Promo Footer Card */}
      <section className="px-4 py-2 mb-4">
        <div 
          onClick={() => navigate('offers')}
          className="w-full p-4 bg-gradient-to-br from-primary-container to-primary rounded-2xl text-white flex items-center justify-between shadow-md cursor-pointer hover:opacity-95 transition-opacity"
        >
          <div className="space-y-1">
            <span className="bg-white/20 backdrop-blur-xs text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
              Première Commande
            </span>
            <h4 className="text-lg font-extrabold">-50% DE RÉDUCTION</h4>
            <p className="text-xs text-white/80">Sur toute la carte aujourd'hui!</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-xs flex items-center justify-center font-extrabold text-sm border border-white/20">
            50%
          </div>
        </div>
      </section>

      <div className="pb-16" />
    </div>
  );
}
