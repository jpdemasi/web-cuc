
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const API_URL = "https://script.google.com/macros/s/AKfycbzr-fHIUuQ8nxDxr18Oy0_hLTw4_NAbphkhHHl6_CWDApMqfv4okXBrz4vAe_eHHmvK/exec";

export const StockDashboard = ({ productos = [], onRefresh }) => {
  const { user } = useAuth();

  const [selectedProd, setSelectedProd] = useState('');
  const [talle, setTalle] = useState('');
  const [cantidad, setCantidad] = useState(0);
  const [guardando, setGuardando] = useState(false);

  // Seleccionar el primer producto cuando llegan los datos
  useEffect(() => {
    if (productos.length > 0 && !selectedProd) {
      setSelectedProd(String(productos[0].id_producto));
    }
  }, [productos, selectedProd]);

  // Obtener el producto seleccionado
  const productoSeleccionado = productos.find(
    p => String(p.id_producto) === String(selectedProd)
  );

  // Obtener los talles del producto
  const stockProducto = productoSeleccionado?.stock || [];

  // Actualizar el talle seleccionado
  useEffect(() => {
    if (stockProducto.length > 0) {
      setTalle(String(stockProducto[0].talle));
      setCantidad(Number(stockProducto[0].cantidad) || 0);
    } else {
      setTalle('');
      setCantidad(0);
    }
  }, [selectedProd, productos]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!productoSeleccionado || !talle || cantidad < 0) {
      alert('Verificá el producto, talle y cantidad.');
      return;
    }

    try {
      setGuardando(true);

      const response = await axios.post(
        API_URL,
        {
          accion: "actualizarStock",
          id: productoSeleccionado.id_producto,
          nombre_producto: productoSeleccionado.nombre,
          talle: talle,
          cantidad: Number(cantidad)
        },
        {
          headers: {
            'Content-Type': 'text/plain;charset=utf-8'
          }
        }
      );

      if (!response.data.exito) {
        throw new Error(
          response.data.mensaje || 'No se pudo actualizar el stock.'
        );
      }

      await onRefresh();

      alert('Stock actualizado correctamente.');

    } catch (error) {
      console.error('Error al actualizar stock:', error);
      alert(error.message || 'Error al actualizar el stock.');
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">

      <h2 className="text-2xl font-bold mb-2">
        Control de Stock ({user?.rol || 'Usuario'})
      </h2>

      <p className="text-sm text-gray-500 mb-6">
        Actualización de inventario por taller/producción.
      </p>

      {productos.length === 0 ? (
        <div className="bg-white border rounded p-6 text-center text-gray-500">
          No hay productos disponibles.
        </div>
      ) : (
        <>
          <form
            onSubmit={handleUpdate}
            className="bg-white p-4 border rounded mb-8 flex flex-wrap gap-4 items-end"
          >

            {/* Modelo e imagen */}
            <div className="flex items-end gap-3">
              <div>
                <label className="text-xs font-semibold block mb-1">
                  Modelo
                </label>

                <select
                  className="border p-2 rounded text-sm"
                  value={selectedProd}
                  onChange={e => setSelectedProd(e.target.value)}
                >
                  {productos.map(p => (
                    <option
                      key={p.id_producto}
                      value={String(p.id_producto)}
                    >
                      {p.nombre}
                    </option>
                  ))}
                </select>
              </div>

              {productoSeleccionado?.imagen && (
                <img
                  src={productoSeleccionado.imagen}
                  alt={productoSeleccionado.nombre}
                  className="w-16 h-16 object-contain rounded border bg-white p-1"
                />
              )}
            </div>

            {/* Talle */}
            <div>
              <label className="text-xs font-semibold block mb-1">
                Talle
              </label>

              <select
                className="border p-2 rounded text-sm w-24"
                value={talle}
                onChange={e => {
                  const nuevoTalle = e.target.value;
                  setTalle(nuevoTalle);

                  const existente = stockProducto.find(
                    s => String(s.talle) === nuevoTalle
                  );

                  setCantidad(
                    existente ? Number(existente.cantidad) : 0
                  );
                }}
              >
                {stockProducto.map((s, index) => (
                  <option key={index} value={String(s.talle)}>
                    {s.talle}
                  </option>
                ))}
              </select>
            </div>

            {/* Cantidad */}
            <div>
              <label className="text-xs font-semibold block mb-1">
                Nueva Cantidad
              </label>

              <input
                className="border p-2 rounded text-sm w-24"
                type="number"
                min="0"
                value={cantidad}
                onChange={e => setCantidad(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={guardando || !talle}
              className="bg-stone-900 text-white px-4 py-2 rounded text-sm font-semibold disabled:opacity-50"
            >
              {guardando ? 'Guardando...' : 'Guardar Stock'}
            </button>

          </form>

          {/* Tabla de stock */}
          <div className="bg-white border rounded overflow-hidden">

            <div className="p-4 border-b flex items-center gap-3">

              {productoSeleccionado?.imagen && (
                <img
                  src={productoSeleccionado.imagen}
                  alt={productoSeleccionado.nombre}
                  className="w-16 h-16 object-contain rounded border bg-white p-1"
                />
              )}

              <div>
                <h3 className="font-semibold">
                  Stock de {productoSeleccionado?.nombre}
                </h3>

                <p className="text-xs text-gray-500">
                  ID: {productoSeleccionado?.id_producto}
                </p>
              </div>

            </div>

            {stockProducto.length === 0 ? (
              <p className="p-4 text-sm text-gray-500">
                Este producto todavía no tiene talles cargados en Stock.
              </p>
            ) : (
              <table className="w-full text-sm">

                <thead className="bg-stone-100">
                  <tr>
                    <th className="text-left p-3">Talle</th>
                    <th className="text-left p-3">
                      Cantidad disponible
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {stockProducto.map((s, index) => (
                    <tr key={index} className="border-t">
                      <td className="p-3">{s.talle}</td>
                      <td className="p-3">{s.cantidad}</td>
                    </tr>
                  ))}
                </tbody>

              </table>
            )}

          </div>
        </>
      )}

    </div>
  );
};
