// Detecta si corre en local para pegarle a Node (puerto 5000), o en Vercel (/api)
const API_URL =
  typeof window !== 'undefined' &&
  (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1')
    ? 'http://localhost:5000/api'
    : '/api';

export const api = {
  // Obtener catálogo completo de productos con su stock
  getProductos: async () => {
    const res = await fetch(`${API_URL}/productos`);
    if (!res.ok) {
      throw new Error(`Error en la petición: status ${res.status}`);
    }
    return res.json();
  },

  // Autenticación de socios/taller
  login: async (email, password) => {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || 'Credenciales inválidas');
    }
    return res.json();
  },

  // Actualización de stock desde el panel
  actualizarStock: async (productoId, talle, cantidad, token) => {
    const res = await fetch(`${API_URL}/stock/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productoId, talle, cantidad }),
    });
    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(errorData.error || 'Error al actualizar stock');
    }
    return res.json();
  },
};