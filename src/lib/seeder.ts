import { collection, getDocs, writeBatch, doc, limit, query } from 'firebase/firestore';
import { db } from './firebase';

const MOCK_PRODUCTS = [
  {
    name: "Pizza Margherita Spéciale",
    price: "55DH",
    category: "Pizza",
    desc: "Sauce tomate maison infusée au basilic frais, double mozzarella fior di latte fondu, filet d'huile d'olive extra-vierge et feuilles de basilic frais.",
    img: "https://images.unsplash.com/photo-1604068549290-dea0e4a30536?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Pizza Regina Royale",
    price: "69DH",
    category: "Pizza",
    desc: "Une base sauce tomate parfumée, mozzarella fondante, lamelles de jambon de dinde fumé de qualité supérieure, et champignons de Paris frais émincés.",
    img: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Pizza Quatre Fromages Crémeuse",
    price: "75DH",
    category: "Pizza",
    desc: "Pour les passionnés de fromage: un mariage onctueux de mozzarella dorée, de chèvre crémeux, de bleu intense, et de parmesan AOP vieilli.",
    img: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Pizza Pepperoni Épicée",
    price: "70DH",
    category: "Pizza",
    desc: "Une pizza festive avec une abondance de tranches de pepperoni croustillantes et légèrement épicées, parsemées de mozzarella filante.",
    img: "https://images.unsplash.com/photo-1628840042765-356cda07504e?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Salade César Croustillante",
    price: "48DH",
    category: "Salade",
    desc: "Cœur de laitue romaine craquant, suprême de poulet grillé au romarin, croûtons à l'ail dorés au beurre, sauce César onctueuse et généreux éclats de parmesan.",
    img: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Salade Caprese au Pesto",
    price: "45DH",
    category: "Salade",
    desc: "Tranches de tomates charnues mûries au soleil alternées de mozzarella di bufala fondante, arrosées d'un pesto de basilic frais fait maison.",
    img: "https://images.unsplash.com/photo-1592417817098-8f3d6eb19675?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Salade du verger aux Noix",
    price: "50DH",
    category: "Salade",
    desc: "Mélange tendre de jeunes pousses, pommes vertes croquantes et acidulées, cerneaux de noix torréfiés, chèvre frais émietté et vinaigrette balsamique douce.",
    img: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Coca-Cola Glacé",
    price: "12DH",
    category: "Boisson",
    desc: "Canette rafraîchissante de 33cl servie dans un verre glacé avec rondelle de citron frais.",
    img: "https://images.unsplash.com/photo-1622483767028-3f66f32aef97?q=80&w=800&auto=format&fit=crop",
  },
  {
    name: "Jus d'Orange Pressé",
    price: "18DH",
    category: "Boisson",
    desc: "Oranges de saison sélectionnées et pressées à la minute. 100% pur jus, sans sucre ajouté.",
    img: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?q=80&w=800&auto=format&fit=crop",
  }
];

export async function seedMockDataIfEmpty() {
  try {
    const productsRef = collection(db, 'products');
    const q = query(productsRef, limit(1));
    const snapshot = await getDocs(q);
    
    if (snapshot.empty) {
      console.log('No products found in Firestore. Seeding mockup data...');
      const batch = writeBatch(db);
      
      MOCK_PRODUCTS.forEach((product) => {
        const newDocRef = doc(productsRef);
        batch.set(newDocRef, {
          ...product,
          createdAt: new Date().toISOString()
        });
      });
      
      await batch.commit();
      console.log('Mockup data seeded successfully!');
    } else {
      console.log('Database already has product data. Skipping seed.');
    }
  } catch (error) {
    console.error('Error seeding mockup data:', error);
  }
}
