import { Router } from 'express';
import { login } from '../services/auth.service.js';

const router = Router();

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await login(email, password);
    res.json(data);
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

export default router;
