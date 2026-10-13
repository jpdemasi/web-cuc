import React, { useState } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';

export const StockDashboard = ({ productos, onRefresh }) => {
  const { token, user } = useAuth();
  const [selectedProd, setSelectedProd] = useState(productos[0]?.id || '');
  const [talle, setTalle] = useState('40');
  const [cantidad, setCantidad] = useState(0);

  const handleUpdate = async (e) => {
    e.preventDefault();
    await api.actualizarStock(selectedProd, talle, cantidad, token);
    onRefresh();
    alert('Stock actualizado');
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-2">Control de Stock ({user.rol})</h2>
      <p className="text-sm text-gray-500 mb-6">Actualización de inventario por taller/producción.</p>
      <form onSubmit={handleUpdate} className="bg-white p-4 border rounded mb-8 flex gap-4 items-end">
        <div>
          <label className="text-xs font-semibold block mb-1">Modelo</label>
          <select className="border p-2 rounded text-sm" value={selectedProd} onChange={e => setSelectedProd(e.target.value)}>
            {productos.map(p => <option key={p.id} value={p.id}>{p.nombre}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold block mb-1">Talle</label>
          <input className="border p-2 rounded text-sm w-20" type="number" value={talle} onChange={e => setTalle(e.target.value)} />
        </div>
        <div>
          <label className="text-xs font-semibold block mb-1">Nueva Cantidad</label>
          <input className="border p-2 rounded text-sm w-24" type="number" value={cantidad} onChange={e => setCantidad(e.target.value)} />
        </div>
        <button type="submit" className="bg-stone-900 text-white px-4 py-2 rounded text-sm font-semibold">Guardar Stock</button>
      </form>
    </div>
  );
};
