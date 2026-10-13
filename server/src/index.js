import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes.js';
import productosRoutes from './routes/productos.routes.js';
import stockRoutes from './routes/stock.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/productos', productosRoutes);
app.use('/api/stock', stockRoutes);

app.listen(PORT, () => {
  console.log(`Servidor de Unidos por el Calzado listo en http://localhost:${PORT}`);
});
