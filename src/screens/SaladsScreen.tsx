import { ArrowLeft, MapPin, Plus } from 'lucide-react';
import { useApp } from '../context';

export default function SaladsScreen() {
  const { navigate } = useApp();

  return (
    <div className="min-h-screen bg-surface pb-24">
      <header className="bg-surface shadow-sm sticky top-0 flex items-center px-4 h-16 z-50">
        <h1 className="text-2xl font-bold text-primary ml-2 flex-grow">Notre Carte</h1>
      </header>

      <nav className="sticky top-16 bg-surface/90 backdrop-blur-md z-40 px-4 py-3 flex gap-4 overflow-x-auto custom-scrollbar border-b border-outline-variant/30">
        <button onClick={() => navigate('menu')} className="px-5 py-2 whitespace-nowrap rounded-full text-sm font-semibold bg-surface-container text-on-surface-variant">Nos Pizzas</button>
        <button className="px-5 py-2 whitespace-nowrap rounded-full text-sm font-semibold bg-primary text-white shadow-md">Nos Salades</button>
      </nav>

      <main className="p-4 max-w-lg mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-primary">Salades Gourmandes</h2>
          <p className="text-sm text-on-surface-variant">Fraîcheur et authenticité dans chaque assiette.</p>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {[
            { n: 'Salade César Poulet', p: '59DH', d: 'Romaine, poulet grillé, croûtons, tomates, sauce César.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDj35OC9OZeRHiLrQY1iLT-c0QSm654Kh584m9hYITeLR41A6LGMvR1rP3DYycM2eQNRjUAkgJgsrNlTT0LrfmfBqEqGV8mp8FTIXuQcxuXP6HV0GR0RHRgx8Vyn3_ayu-JI6WR7wvdN8GQgjd96lSHxj7uI0eyWE_7oNIwJj45LP5QWaverkhan8ybFjP1MoN03yzLhvROFvdTz2IjoJg7-w3uvC_QC39SN_zGwS29ujRuBOq2ksZNm0g5BbwdnUTEn_eU-P8kFYg' },
            { n: 'Salade Burrata', p: '79DH', d: 'Mesclun, burrata crémeuse, tomates, éclats de noix.', img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJ7T3EJF2pRrzyD-Vn1eeeE_smxdkAlrVsCFe6ikzHphqetDLkWaiPwBiDhjj7WxjP6Ng0pgwy4Bzuw5-ohlHDKsA-RdyH2gJtKqB02BTPQknOmCT76VgH8ZysFZiEniaylTzSDfrt8TgvI8xAnR1crp0K68-8jjDt3-UKdGgej2yGGxGqIyoZ-jLVZztqr8k_pMBER4dGBnqrKEWxZ6rUU-_YQT9a4Edjnk2xA3Gz5bJQniGEqlsyAuX_fMxfcAEmqYhI-7zNgVc' }
          ].map((item, i) => (
            <div key={i} className="bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col">
               <div className="h-48 overflow-hidden">
                 <img src={item.img} className="w-full h-full object-cover" />
               </div>
               <div className="p-4 flex-grow flex flex-col">
                 <div className="flex justify-between items-start mb-2">
                   <h3 className="text-xl font-bold text-on-surface">{item.n}</h3>
                   <span className="text-primary font-bold text-lg">{item.p}</span>
                 </div>
                 <p className="text-sm text-on-surface-variant mb-4 flex-grow">{item.d}</p>
                 <button onClick={() => navigate('productDetail')} className="w-full bg-primary text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 active:scale-95 shadow-md">
                   <Plus size={18} /> Ajouter au panier
                 </button>
               </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
