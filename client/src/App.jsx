import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { CartModal } from './components/CartModal';
import { CatalogPage } from './pages/CatalogPage';
import { LoginPage } from './pages/LoginPage';
import { StockDashboard } from './pages/StockDashboard';
import { Footer } from './components/Footer';
import { api } from './services/api';

export const App = () => {
  const [view, setView] = useState('catalog');
  const [productos, setProductos] = useState([]);

  const cargar = () => api.getProductos().then(setProductos);

  useEffect(() => { 
    cargar(); 
  
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900">
    <Navbar currentView={view} setView={setView} />

    <main className="flex-grow">
    {view === 'catalog' && <CatalogPage productos={productos} />}
    {view === 'login' && <LoginPage setView={setView} />}
    {view === 'dashboard' && <StockDashboard productos={productos} onRefresh={cargar} />}
    </main>

    <CartModal />
    <Footer setView={setView} />
    </div>
  );
};
