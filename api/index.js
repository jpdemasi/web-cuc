import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';

const app = express();
app.use(cors());
app.use(express.json());

const JWT_SECRET = process.env.JWT_SECRET || 'super_secreto_cooperativa_2026';

// Cargar datos en memoria
const dbPath = path.join(process.cwd(), 'server/src/data/db.json');
let db = { productos: [], stock: [], usuarios: [] };

try {
  const data = fs.readFileSync(dbPath, 'utf-8');
  db = JSON.parse(data);
} catch (e) {
  console.error("Error leyendo db.json:", e);
}

// Middlewares
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Token no provisto' });
  try {
    req.user = jwt.verify(token, JWT_SECRET);
    next();
  } catch (err) {
    return res.status(403).json({ error: 'Token inválido' });
  }
};

const requireRole = (roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.rol)) {
    return res.status(403).json({ error: 'Acceso denegado' });
  }
  next();
};

// Endpoints
app.get('/api/productos', (req, res) => {
  const productosConStock = db.productos.map(prod => ({
    ...prod,
    stock: db.stock.filter(s => s.productoId === prod.id)
  }));
  res.json(productosConStock);
});

app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;
  const user = db.usuarios.find(u => u.email === email && u.password === password);
  if (!user) return res.status(401).json({ error: 'Credenciales inválidas' });

  const token = jwt.sign(
    { id: user.id, nombre: user.nombre, email: user.email, rol: user.rol },
    JWT_SECRET,
    { expiresIn: '8h' }
  );

  res.json({ token, user: { id: user.id, nombre: user.nombre, email: user.email, rol: user.rol } });
});

app.post('/api/stock/update', verifyToken, requireRole(['admin', 'produccion']), (req, res) => {
  const { productoId, talle, cantidad } = req.body;
  const index = db.stock.findIndex(s => s.productoId === productoId && Number(s.talle) === Number(talle));
  if (index !== -1) {
    db.stock[index].cantidad = Number(cantidad);
  } else {
    db.stock.push({ id: `stk_${Date.now()}`, productoId, talle: Number(talle), cantidad: Number(cantidad) });
  }
  res.json({ mensaje: 'Stock actualizado en memoria', resultado: { productoId, talle, cantidad } });
});

export default app;
