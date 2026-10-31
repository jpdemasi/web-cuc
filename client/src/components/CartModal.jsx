
import React from 'react';
import { useCart } from '../context/CartContext';
import { FiX, FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';

export const CartModal = ({ whatsappNumber = "5491112345678" }) => {
  const {
    cart,
    isOpen,
    setIsOpen,
    incrementItem,
    decrementItem,
    removeFromCart,
    clearCart
  } = useCart();

  if (!isOpen) return null;

  const total = cart.reduce(
    (acc, item) => acc + Number(item.precio) * Number(item.cantidad),
    0
  );

  const checkoutWhatsApp = () => {
    if (cart.length === 0) return;

    let mensaje = "¡Hola Cooperativa Unidos por el Calzado! Quiero realizar el siguiente pedido:\n\n";

    cart.forEach((item, index) => {
      mensaje += `${index + 1}. *${item.nombre}* | Talle: ${item.talle || 'No especificado'} | Cantidad: ${item.cantidad} par(es) - $${(Number(item.precio) * item.cantidad).toLocaleString('es-AR')}\n`;
    });

    mensaje += `\n*Total Estimado:* $${total.toLocaleString('es-AR')}\n\n¿Tienen disponibilidad para coordinar la entrega? Muchas gracias.`;

    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">

      <div
        className="absolute inset-0 bg-stone-950/60 backdrop-blur-xs transition-opacity"
        onClick={() => setIsOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">

          {/* Header */}
          <div className="p-6 border-b border-stone-200 flex items-center justify-between">
            <h2 className="text-xl font-black text-stone-950">Tu Pedido</h2>

            <button
              onClick={() => setIsOpen(false)}
              className="text-stone-400 hover:text-stone-800 p-2 rounded-lg transition"
            >
              <FiX className="text-xl" />
            </button>
          </div>

          {/* Lista de productos */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">

            {cart.length === 0 ? (
              <div className="text-center py-16 text-stone-500">
                <span className="text-4xl block mb-2">🛍️</span>
                <p className="font-semibold">El carrito está vacío</p>
                <p className="text-xs text-stone-400 mt-1">
                  Elegí un modelo del catálogo para empezar.
                </p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id_producto}
                  className="flex gap-4 p-3.5 bg-stone-50 rounded-xl border border-stone-200/80 items-center"
                >

                  {/* Miniatura */}
                  <img
                    src={item.imagenUrl || item.imagen || '/logo.png'}
                    alt={item.nombre}
                    className="w-16 h-16 object-cover rounded-lg bg-stone-200 shrink-0"
                  />

                  {/* Detalle y controles */}
                  <div className="flex-1 min-w-0">

                    <h4 className="font-bold text-stone-900 text-sm truncate">
                      {item.nombre}
                    </h4>

                    {item.talle && (
                      <p className="text-xs text-stone-500">
                        Talle: <span className="font-bold text-stone-800">{item.talle}</span>
                      </p>
                    )}

                    <p className="text-xs font-black text-amber-700 mt-0.5">
                      ${(Number(item.precio) * item.cantidad).toLocaleString('es-AR')}
                    </p>

                    {/* Selector de cantidad */}
                    <div className="flex items-center gap-2 mt-2">

                      <button
                        onClick={() => decrementItem(item.id_producto, item.talle)}
                        className="w-6 h-6 rounded-md bg-white border border-stone-300 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition active:scale-95"
                        title="Restar unidad"
                      >
                        <FiMinus className="text-xs" />
                      </button>

                      <span className="text-xs font-bold w-6 text-center text-stone-900">
                        {item.cantidad}
                      </span>

                      <button
                        onClick={() => incrementItem(item.id_producto, item.talle)}
                        className="w-6 h-6 rounded-md bg-white border border-stone-300 hover:bg-stone-200 text-stone-700 flex items-center justify-center transition active:scale-95"
                        title="Sumar unidad"
                      >
                        <FiPlus className="text-xs" />
                      </button>

                    </div>
                  </div>

                  {/* Eliminar */}
                  <button
                    onClick={() => removeFromCart(item.id_producto, item.talle)}
                    className="text-stone-400 hover:text-red-600 p-2 transition shrink-0"
                    title="Quitar modelo"
                  >
                    <FiTrash2 className="text-lg" />
                  </button>

                </div>
              ))
            )}

          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="p-6 border-t border-stone-200 bg-stone-50 space-y-4">

              <div className="flex justify-between items-center">
                <span className="text-sm font-semibold text-stone-600">
                  Total:
                </span>

                <span className="text-2xl font-black text-stone-950">
                  ${total.toLocaleString('es-AR')}
                </span>
              </div>

              <button
                onClick={checkoutWhatsApp}
                className="w-full flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition active:scale-[0.98]"
              >
                <FaWhatsapp className="text-xl" />
                <span>Confirmar Pedido por WhatsApp</span>
              </button>

              <button
                onClick={clearCart}
                className="w-full text-center text-xs font-medium text-stone-400 hover:text-stone-600 transition"
              >
                Vaciar carrito
              </button>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};
