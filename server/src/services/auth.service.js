import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, '../data/db.json');

export const login = async (email, password) => {
  const raw = await fs.readFile(dbPath, 'utf-8');
  const db = JSON.parse(raw);
  const user = db.usuarios.find(u => u.email === email && u.password === password);
  if (!user) throw new Error('Credenciales inválidas');

  const token = jwt.sign(
    { id: user.id, nombre: user.nombre, email: user.email, rol: user.rol },
    process.env.JWT_SECRET || 'secret',
    { expiresIn: '8h' }
  );

  return { token, user: { id: user.id, nombre: user.nombre, email: user.email, rol: user.rol } };
};
