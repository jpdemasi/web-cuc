import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, '../data/db.json');

async function readDB() {
  const data = await fs.readFile(dbPath, 'utf-8');
  return JSON.parse(data);
}

async function writeDB(data) {
  await fs.writeFile(dbPath, JSON.stringify(data, null, 2));
}

export const getProductosConStock = async () => {
  const db = await readDB();
  return db.productos.map(prod => ({
    ...prod,
    stock: db.stock.filter(s => s.productoId === prod.id)
  }));
};

export const crearProducto = async (producto) => {
  const db = await readDB();
  const nuevoProducto = { id: `prod_${Date.now()}`, ...producto };
  db.productos.push(nuevoProducto);
  await writeDB(db);
  return nuevoProducto;
};

export const actualizarStock = async (productoId, talle, cantidad) => {
  const db = await readDB();
  const index = db.stock.findIndex(s => s.productoId === productoId && Number(s.talle) === Number(talle));
  if (index !== -1) {
    db.stock[index].cantidad = Number(cantidad);
  } else {
    db.stock.push({ id: `stk_${Date.now()}`, productoId, talle: Number(talle), cantidad: Number(cantidad) });
  }
  await writeDB(db);
  return { productoId, talle, cantidad };
};
