import React from 'react';
import { useCart } from '../context/CartContext';
import { FiX, FiTrash2, FiShoppingBag } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

export const CartModal = ({ whatsappNumber = "5491112345678" }) => {
  const { cart, total, isOpen, setIsOpen, removeFromCart } = useCart();
  if (!isOpen) return null;

  const enviarWhatsApp = () => {
    let mensaje = "¡Hola Unidos por el Calzado! 👋%0AQuiero hacer este pedido desde la web:%0A%0A";
    cart.forEach(item => {
      mensaje += `✅ *${item.nombre}*%0A   Talle: *${item.talle}* x ${item.cantidad} | $${(item.precio * item.cantidad).toLocaleString('es-AR')}%0A%0A`;
    });
    mensaje += `💰 *Total Estimado:* $${total.toLocaleString('es-AR')}%0A%0A¿Tienen disponibilidad para coordinar? ¡Gracias!`;
    window.open(`https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${mensaje}`, '_blank');
  };

  return (
    <div className="fixed inset-0 bg-stone-950/60 backdrop-blur-sm flex justify-end z-50 transition-opacity duration-300">
    <div className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col p-0 transform transition-transform duration-300 translate-x-0">

    {/* Header */}
    <div className="flex justify-between items-center px-6 py-5 border-b border-stone-100">
    <div className="flex items-center gap-2.5 text-stone-950">
    <FiShoppingBag className="text-2xl text-amber-600" />
    <h2 className="text-xl font-bold tracking-tight">Tu Pedido</h2>
    <span className="text-sm bg-stone-100 text-stone-600 px-2.5 py-0.5 rounded-full font-medium">
    {cart.reduce((acc, i) => acc + i.cantidad, 0)} items
    </span>
    </div>
    <button onClick={() => setIsOpen(false)} className="text-stone-400 hover:text-stone-900 transition p-1 rounded-full hover:bg-stone-100">
    <FiX className="text-2xl" />
    </button>
    </div>

    {/* Body */}
    <div className="flex-grow overflow-y-auto space-y-5 p-6 bg-stone-50">
    {cart.length === 0 ? (
      <div className="text-center py-16 flex flex-col items-center justify-center gap-4 bg-white rounded-xl border border-stone-100 shadow-inner">
      <span className="text-5xl opacity-30">🛒</span>
      <p className="text-sm text-stone-500 font-medium">El carrito está vacío.</p>
      <button onClick={() => setIsOpen(false)} className="text-xs bg-stone-900 text-white px-4 py-1.5 rounded-full font-semibold">Explorar Catálogo</button>
      </div>
    ) : (
      cart.map(item => (
        <div key={`${item.id}-${item.talle}`} className="flex gap-4 bg-white p-4 rounded-xl border border-stone-100 shadow-sm items-center">
        <img src={item.imagenUrl} alt={item.nombre} className="w-16 h-16 rounded-lg object-cover border" />
        <div className="flex-grow">
        <h4 className="font-semibold text-stone-900 text-sm">{item.nombre}</h4>
        <p className="text-xs text-stone-500">Talle: <span className='font-bold text-stone-700'>{item.talle}</span> | Cant: <span className='font-bold text-stone-700'>{item.cantidad}</span></p>
        <span className="font-bold text-sm text-amber-700 mt-1 block">${(item.precio * item.cantidad).toLocaleString('es-AR')}</span>
        </div>
        <button onClick={() => removeFromCart(item.id, item.talle)} className="text-stone-300 hover:text-red-500 transition p-2 rounded-lg hover:bg-red-50">
        <FiTrash2 className="text-lg" />
        </button>
        </div>
      ))
    )}
    </div>

    {/* Footer */}
    <div className="border-t border-stone-100 pt-6 p-6 mt-auto bg-white shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
    <div className="flex justify-between items-center text-stone-950 mb-6">
    <span className="text-base font-medium text-stone-600">Total estimado:</span>
    <span className="text-3xl font-extraboldtracking-tighter">${total.toLocaleString('es-AR')}</span>
    </div>
    <button
    disabled={cart.length === 0}
    onClick={enviarWhatsApp}
    className="w-full flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white font-bold py-4 rounded-xl text-center disabled:bg-stone-200 disabled:text-stone-500 transition shadow-lg transition-all duration-150 active:scale-[0.98]"
    >
    <FaWhatsapp className="text-2xl" />
    Confirmar Pedido por WhatsApp
    </button>
    <p className="text-center text-xs text-stone-400 mt-3 font-medium">Coordiná stock y envío directamente con nosotros.</p>
    </div>
    </div>
    </div>
  );
};
