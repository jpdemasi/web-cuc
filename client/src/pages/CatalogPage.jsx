import React, { useState } from 'react';
import { ProductCard } from '../components/ProductCard';

export const CatalogPage = ({ productos = [] }) => {
  
  const [categoria, setCategoria] = useState('Todos');

  // Obtener categorías únicas presentes en los datos
  const categorias = [
    'Todos',
    ...new Set(productos.map((p) => p.categoria).filter(Boolean)),
  ];

  // Filtrar productos según la categoría seleccionada
  const productosFiltrados =
    categoria === 'Todos'
      ? productos
      : productos.filter((p) => p.categoria === categoria);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Encabezado del Catálogo */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h1 className="text-3xl sm:text-4xl font-black text-stone-950 tracking-tight mb-2">
          Nuestra Producción Cooperativa
        </h1>
        <p className="text-stone-600 text-sm sm:text-base">
          Elegí tu calzado, seleccioná el talle, agregalo al carrito y confirmá tu pedido directamente por WhatsApp.
        </p>
      </div>

      {/* Botones de Filtro por Categorías */}
      {categorias.length > 1 && (
        <div className="flex justify-center gap-2 mb-10 flex-wrap">
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoria(cat)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition ${
                categoria === cat
                  ? 'bg-stone-950 text-white shadow-sm'
                  : 'bg-white border border-stone-200 text-stone-600 hover:bg-stone-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Estado de Carga / Grilla de Productos */}
      {productos.length === 0 ? (
        <div className="text-center py-20">
          <div className="animate-spin inline-block w-9 h-9 border-4 border-amber-600 border-t-transparent rounded-full mb-4"></div>
          <p className="text-stone-500 font-medium">Cargando modelos...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {productosFiltrados.map((prod) => {


            console.log("****PRODUCTO ID EN CatalogPag: ",prod.id_producto)
            return(<ProductCard key={prod.id_producto} producto={prod} />)
})}
        </div>
      )}
    </div>
  );
};