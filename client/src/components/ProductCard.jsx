import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { FiPlus, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

export const ProductCard = ({ producto }) => {
  const { addToCart } = useCart();
  const tallesDisponibles = producto.stock.filter(s => s.cantidad > 0);
  const [selectedTalle, setSelectedTalle] = useState(tallesDisponibles[0]?.talle || null);

  // Soporte para array de imágenes o imagen única previa
  const imagenes = producto.imagenes && producto.imagenes.length > 0
  ? producto.imagenes
  : [producto.imagenUrl || 'https://via.placeholder.com/600x450?text=Sin+Foto'];

  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev === 0 ? imagenes.length - 1 : prev - 1));
  };

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImgIndex((prev) => (prev === 0 ? imagenes.length - 1 : prev + 1));
  };

  return (
    <div className="bg-white border border-stone-200/70 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col group">

    {/* Carrusel de Fotos */}
    <div className="relative overflow-hidden aspect-[4/3] bg-stone-100 select-none">
    <img
    src={imagenes[currentImgIndex]}
    alt={`${producto.nombre} - vista ${currentImgIndex + 1}`}
    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
    />

    {/* Badge de Categoría */}
    <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-[11px] font-bold text-stone-800 px-3 py-1 rounded-full uppercase tracking-wider shadow-sm z-10">
    {producto.categoria}
    </span>

    {/* Flechas de navegación (solo se muestran si hay más de 1 imagen) */}
    {imagenes.length > 1 && (
      <>
      <button
      onClick={prevImage}
      aria-label="Imagen anterior"
      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-1.5 rounded-full backdrop-blur-sm transition opacity-0 group-hover:opacity-100 z-10"
      >
      <FiChevronLeft className="text-xl" />
      </button>
      <button
      onClick={nextImage}
      aria-label="Siguiente imagen"
      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/70 text-white p-1.5 rounded-full backdrop-blur-sm transition opacity-0 group-hover:opacity-100 z-10"
      >
      <FiChevronRight className="text-xl" />
      </button>

      {/* Indicadores / Puntos del carrusel */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
      {imagenes.map((_, idx) => (
        <button
        key={idx}
        onClick={(e) => {
          e.stopPropagation();
          setCurrentImgIndex(idx);
        }}
        className={`w-2 h-2 rounded-full transition-all ${
          currentImgIndex === idx ? 'bg-white w-5' : 'bg-white/60 hover:bg-white'
        }`}
        />
      ))}
      </div>
      </>
    )}
    </div>

    {/* Información del Calzado: Modelo, Descripción y Precio */}
    <div className="p-5 flex flex-col flex-grow">
    <div className="mb-3">
    <h3 className="font-extrabold text-stone-950 text-xl tracking-tight mb-1">
    {producto.nombre}
    </h3>
    <p className="text-sm text-stone-600 line-clamp-2 leading-relaxed">
    {producto.descripcion}
    </p>
    </div>

    <div className="mb-4">
    <span className="text-xs font-semibold text-stone-400 block uppercase tracking-wider">Precio Cooperativo</span>
    <span className="text-2xl font-black text-amber-700 leading-none">
    ${producto.precio.toLocaleString('es-AR')}
    </span>
    </div>

    {/* Talles y Botón de Compra */}
    <div className="mt-auto space-y-4">
    <div>
    <label className="text-xs font-bold text-stone-500 block mb-2 uppercase tracking-wide">
    Talles Disponibles:
    </label>
    <div className="flex flex-wrap gap-2">
    {tallesDisponibles.length > 0 ? (
      tallesDisponibles.map(s => (
        <button
        key={s.talle}
        onClick={() => setSelectedTalle(s.talle)}
        className={`w-10 h-10 flex items-center justify-center border text-sm font-bold rounded-lg transition ${
          selectedTalle === s.talle
          ? 'bg-stone-950 text-white border-stone-950 shadow-sm'
          : 'bg-stone-50 text-stone-700 border-stone-200 hover:border-stone-400'
        }`}
        >
        {s.talle}
        </button>
      ))
    ) : (
      <span className="text-red-600 text-xs font-semibold bg-red-50 px-3 py-1.5 rounded-lg border border-red-200 w-full text-center">
      Sin stock disponible
      </span>
    )}
    </div>
    </div>

    <button
    disabled={!selectedTalle}
    onClick={() => {
      // Pasa la primera foto para la miniatura del carrito
      addToCart({ ...producto, imagenUrl: imagenes[0] }, selectedTalle);
    }}
    className="w-full flex items-center justify-center gap-2 bg-stone-950 hover:bg-stone-800 disabled:bg-stone-200 disabled:text-stone-400 text-white py-3 rounded-xl font-bold text-sm transition shadow-sm active:scale-[0.98]"
    >
    <FiPlus className="text-lg text-amber-400" />
    Agregar al Carrito
    </button>
    </div>

    </div>
    </div>
  );
};
