import { Router } from 'express';
import { addToCart, getCart } from '../controllers/cart.controller';
import { requireAuth } from '../middlewares/auth.middleware';

const router = Router();

// Применяем проверку авторизации ко всем путям в этом файле
router.use(requireAuth);

router.post('/add', addToCart);
router.get('/', getCart);

export default router;