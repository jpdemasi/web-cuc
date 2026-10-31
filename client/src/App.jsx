import React, { useEffect, useState } from 'react';
import { Navbar } from './components/Navbar';
import { CartModal } from './components/CartModal';
import { CatalogPage } from './pages/CatalogPage';
import { LoginPage } from './pages/LoginPage';
import { StockDashboard } from './pages/StockDashboard';
import { Footer } from './components/Footer';


import axios from 'axios';

const API_URL = "https://script.google.com/macros/s/AKfycbzr-fHIUuQ8nxDxr18Oy0_hLTw4_NAbphkhHHl6_CWDApMqfv4okXBrz4vAe_eHHmvK/exec";


export const App = () => {

  const [view, setView] = useState('catalog');
  const [productos, setProductos] = useState([]);


const cargarProductos = async () => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        ruta: "productos"
      }
    });

    console.log(response.data);
    setProductos(response.data);

  } catch (error) {
    console.log("Fallo al consumir productos", error);
  }
};

useEffect(() => {
  cargarProductos();
}, []);



  return (
    <div className="min-h-screen flex flex-col bg-stone-50 text-stone-900">
    <Navbar currentView={view} setView={setView} />

    <main className="flex-grow">
    {view === 'catalog' && <CatalogPage productos={productos} />}
    {view === 'login' && <LoginPage setView={setView} />}
    {view === 'dashboard' && <StockDashboard productos={productos} onRefresh={cargarProductos} />}
    </main>

    <CartModal />
    <Footer setView={setView} />
    </div>
  );
};
