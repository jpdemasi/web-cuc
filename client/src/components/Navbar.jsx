import React from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { FiShoppingBag, FiUser, FiLogOut, FiDownload } from 'react-icons/fi';
import { LogoCUC } from './LogoCUC';

export const Navbar = ({ currentView, setView }) => {
  const { cart, setIsOpen } = useCart();
  const { user, logout } = useAuth();
  const cantTotal = cart.reduce((acc, i) => acc + i.cantidad, 0);

  // REEMPLAZAR TU_ID_DEL_ARCHIVO CON EL ID REAL DE TU DRIVE
  const CATALOGO_DRIVE_URL = "https://drive.google.com/file/d/1fFrq-gd0Y7myScaGFYo-07dKXFbzT3Qp/view?usp=drive_link";

  return (
    <nav className="bg-white border-b border-stone-200/80 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">

          {/* Logo CUC Oficial (vuelve a la vista de catálogo/inicio) */}
          <div 
            className="cursor-pointer select-none py-1 group" 
            onClick={() => setView('catalog')}
          >
            <LogoCUC className="h-10" variant="dark" />
          </div>

          {/* Opciones y Acciones */}
          <div className="flex gap-2 items-center">

            {/* Botón Descargar Catálogo PDF */}
            <a
              href={CATALOGO_DRIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold px-3 sm:px-3.5 py-1.5 rounded-lg border border-stone-300 text-stone-700 hover:text-stone-950 hover:bg-stone-50 transition shadow-2xs"
            >
              <FiDownload className="text-amber-600 text-base" />
              <span>Descargar Catálogo</span>
            </a>

            {user ? (
              <div className="flex items-center gap-2 border-l pl-2 border-stone-200">
                <button
                  onClick={() => setView('dashboard')}
                  className={`flex items-center gap-1.5 text-sm font-semibold px-3 py-1.5 rounded-lg transition ${
                    currentView === 'dashboard'
                      ? 'bg-amber-50 text-amber-800'
                      : 'text-stone-600 hover:text-stone-950'
                  }`}
                >
                  <FiUser className="text-lg text-amber-700" />
                  Panel <span className="capitalize text-xs opacity-75">({user.rol})</span>
                </button>
                <button 
                  onClick={logout} 
                  title="Cerrar sesión"
                  className="text-stone-400 hover:text-red-500 p-1.5 rounded-md transition"
                >
                  <FiLogOut className="text-lg" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setView('login')}
                className="text-sm font-semibold text-stone-600 hover:text-stone-950 px-3 py-1.5"
              >
                Ingresar
              </button>
            )}

            {/* Botón Carrito */}
            <button
              onClick={() => setIsOpen(true)}
              className="relative flex items-center gap-2 bg-stone-950 hover:bg-stone-800 text-white px-4 py-2 rounded-xl text-sm font-semibold transition shadow-sm ml-1 active:scale-95"
            >
              <FiShoppingBag className="text-lg text-amber-400" />
              <span>Pedido</span>
              {cantTotal > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-600 text-white w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold border-2 border-white shadow-sm">
                  {cantTotal}
                </span>
              )}
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
};