import React, { useState } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { FiMail, FiLock, FiAlertTriangle } from 'react-icons/fi';

export const LoginPage = ({ setView }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const { loginUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const data = await api.login(email, password);
      loginUser(data.user, data.token);
      setView('dashboard');
    } catch (err) {
      setError('Credenciales incorrectas. Verifique email y contraseña.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-20 md:py-32 flex justify-center items-center">
    <div className="w-full max-w-md bg-white p-8 md:p-10 rounded-2xl border border-stone-100 shadow-lg">
    <div className="text-center mb-8">
    <span className="text-5xl mb-3 block">🔒</span>
    <h2 className="text-3xl font-extrabold tracking-tight text-stone-950">Ingreso Socios</h2>
    <p className="text-stone-600 mt-2 text-sm">Acceso exclusivo para gestión de stock y administración.</p>
    </div>

    {error && (
      <div className="bg-red-50 border border-red-100 text-red-700 p-3 rounded-lg text-sm mb-6 flex items-center gap-2 font-medium">
      <FiAlertTriangle className="text-lg shrink-0" />
      {error}
      </div>
    )}

    <form onSubmit={handleSubmit} className="space-y-5">
    <div>
    <label className="block text-xs font-semibold mb-1.5 text-stone-600 uppercase tracking-wide">Correo Electrónico</label>
    <div className="relative">
    <FiMail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-lg" />
    <input
    className="w-full border border-stone-200 focus:ring-2 focus:ring-amber-200 focus:border-amber-400 p-3 pl-11 rounded-lg text-sm transition"
    type="email"
    placeholder="ejemplo@unidos.coop"
    value={email}
    onChange={e => setEmail(e.target.value)}
    required
    />
    </div>
    </div>
    <div>
    <label className="block text-xs font-semibold mb-1.5 text-stone-600 uppercase tracking-wide">Contraseña</label>
    <div className="relative">
    <FiLock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-lg" />
    <input
    className="w-full border border-stone-200 focus:ring-2 focus:ring-amber-200 focus:border-amber-400 p-3 pl-11 rounded-lg text-sm transition"
    type="password"
    placeholder="••••••••"
    value={password}
    onChange={e => setPassword(e.target.value)}
    required
    />
    </div>
    </div>
    <button type="submit" className="w-full bg-stone-950 hover:bg-stone-800 text-white py-3.5 rounded-lg text-sm font-semibold transition shadow-md active:scale-[0.99]">
    Iniciar Sesión Segura
    </button>
    </form>

    <button onClick={() => setView('catalog')} className="w-full text-center text-sm text-stone-500 mt-6 hover:text-stone-800 hover:underline">
    Volver al Catálogo Público
    </button>
    </div>
    </div>
  );
};
