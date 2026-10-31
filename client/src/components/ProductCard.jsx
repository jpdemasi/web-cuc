
import React from 'react';
import { useCart } from '../context/CartContext';
import { FiPlus } from 'react-icons/fi';

export const ProductCard = ({ producto }) => {
  const { addToCart } = useCart();

  // Google Sheets devuelve una imagen Base64 en producto.imagen
  const imagen = producto.imagen ||
    'https://via.placeholder.com/600x450?text=Sin+Foto';

  // Convertir el precio a número
  const precio = Number(producto.precio) || 0;

  return (
    <div className="bg-white border border-stone-200/70 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group">

      {/* Imagen del producto */}
      <div className="relative overflow-hidden aspect-[4/3] bg-stone-100 select-none">

        <img
          src={imagen}
          alt={producto.nombre}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src =
              'https://via.placeholder.com/600x450?text=Sin+Foto';
          }}
        />

        {/* Categoría */}
        <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[11px] font-bold text-stone-800 px-3 py-1 rounded-full uppercase tracking-wider shadow-sm z-10">
          {producto.categoria}
        </span>

      </div>

      {/* Información del producto */}
      <div className="p-5 flex flex-col flex-grow">

        <div className="mb-3">
          <h3 className="font-extrabold text-stone-950 text-xl tracking-tight mb-1">
            {producto.nombre}
          </h3>

          <p className="text-sm text-stone-600 line-clamp-2 leading-relaxed">
            {producto.descripcion}
          </p>
        </div>

        {/* Precio */}
        <div className="mb-4">
          <span className="text-xs font-semibold text-stone-400 block uppercase tracking-wider">
            Precio Cooperativo
          </span>

          <span className="text-2xl font-black text-amber-700 leading-none">
            ${precio.toLocaleString('es-AR')}
          </span>
        </div>

        {/* Botón de compra */}
        <div className="mt-auto">

          <button
            onClick={() => {
              addToCart({
                ...producto,
                imagen: imagen,
                imagenUrl: imagen
              });
            }}
            className="w-full flex items-center justify-center gap-2 bg-stone-950 hover:bg-stone-800 text-white py-3 rounded-xl font-bold text-sm transition shadow-sm active:scale-[0.98]"
          >
            <FiPlus className="text-lg text-amber-400" />
            Agregar al Carrito
          </button>

        </div>

      </div>
    </div>
  );
};
