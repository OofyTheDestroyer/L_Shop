import { Router } from 'express';
import { BasketController } from '../controllers/basket.controller';
import { requireAuth } from '../middlewares/auth.middleware';

const router = Router();
router.use(requireAuth); // все роуты корзины требуют авторизации

router.get('/', BasketController.getBasket);
router.post('/change', BasketController.changeCount);
router.delete('/remove', BasketController.deleteProduct);

export default router;