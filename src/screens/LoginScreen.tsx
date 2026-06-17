import React, { useState } from 'react';
import { useApp } from '../context';
import { auth, db } from '../lib/firebase';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { ArrowLeft, User, Lock, Mail } from 'lucide-react';

export default function LoginScreen() {
  const { navigate } = useApp();
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isRegister) {
        const { user } = await createUserWithEmailAndPassword(auth, email, password);
        await setDoc(doc(db, 'users', user.uid), {
          name,
          email,
          role: email.toLowerCase() === 'georgesbizet2025@gmail.com' || email.toLowerCase().includes('admin') ? 'admin' : 'customer',
          createdAt: new Date().toISOString()
        });
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      navigate('home');
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col items-center pt-20 px-6">
      <button onClick={() => navigate('profile')} className="absolute top-6 left-6 text-primary hover:opacity-80">
        <ArrowLeft size={24} />
      </button>
      <div className="w-20 h-20 bg-primary/10 text-primary rounded-full flex items-center justify-center mb-6 shadow-sm">
        <User size={40} />
      </div>
      <h1 className="text-3xl font-bold text-on-surface mb-2">{isRegister ? 'Créer un compte' : 'Connexion'}</h1>
      <p className="text-on-surface-variant text-center mb-8">{isRegister ? 'Rejoignez-nous pour commander' : 'Content de vous revoir !'}</p>

      {error && <p className="text-red-500 text-sm mb-4 bg-red-100 p-3 rounded-lg text-center w-full max-w-sm">{error}</p>}

      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-4">
        {isRegister && (
          <div className="flex items-center bg-white rounded-xl px-4 py-3 border border-outline-variant/30 shadow-sm">
            <User size={20} className="text-outline mr-3" />
            <input 
              type="text" 
              placeholder="Nom complet" 
              className="bg-transparent border-none focus:ring-0 w-full outline-none text-on-surface" 
              value={name}
              onChange={e => setName(e.target.value)}
              required
            />
          </div>
        )}
        <div className="flex items-center bg-white rounded-xl px-4 py-3 border border-outline-variant/30 shadow-sm">
          <Mail size={20} className="text-outline mr-3" />
          <input 
            type="email" 
            placeholder="Email" 
            className="bg-transparent border-none focus:ring-0 w-full outline-none text-on-surface" 
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="flex items-center bg-white rounded-xl px-4 py-3 border border-outline-variant/30 shadow-sm">
          <Lock size={20} className="text-outline mr-3" />
          <input 
            type="password" 
            placeholder="Mot de passe" 
            className="bg-transparent border-none focus:ring-0 w-full outline-none text-on-surface" 
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="w-full py-4 bg-primary text-white font-bold rounded-xl active:scale-95 transition-transform shadow-md mt-4">
          {isRegister ? "S'inscrire" : 'Se connecter'}
        </button>
      </form>

      <button onClick={() => setIsRegister(!isRegister)} className="mt-6 text-primary font-semibold text-sm hover:underline">
        {isRegister ? 'Déjà un compte ? Se connecter' : "Pas de compte ? S'inscrire"}
      </button>
    </div>
  );
}
