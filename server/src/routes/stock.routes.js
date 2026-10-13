import { Router } from 'express';
import { actualizarStock } from '../services/data.service.js';
import { verifyToken, requireRole } from '../middlewares/auth.middleware.js';

const router = Router();

router.post('/update', verifyToken, requireRole(['admin', 'produccion']), async (req, res) => {
  try {
    const { productoId, talle, cantidad } = req.body;
    const resultado = await actualizarStock(productoId, talle, cantidad);
    res.json({ mensaje: 'Stock actualizado correctamente', resultado });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
