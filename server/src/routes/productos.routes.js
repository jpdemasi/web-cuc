import { Router } from 'express';
import { getProductosConStock, crearProducto } from '../services/data.service.js';
import { verifyToken, requireRole } from '../middlewares/auth.middleware.js';

const router = Router();

router.get('/', async (req, res) => {
  try {
    const productos = await getProductosConStock();
    res.json(productos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', verifyToken, requireRole(['admin']), async (req, res) => {
  try {
    const nuevo = await crearProducto(req.body);
    res.status(201).json(nuevo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
