import { Router } from 'express';
import { BasketController } from '../controllers/basket/basket.controller';
import { DeliveryController } from '../controllers/delivery/delivery.controller';

const router = Router();

router.get('/basket', BasketController.getBasket);
router.post('/basket/change', BasketController.changeCount);
router.delete('/basket/remove', BasketController.deleteProduct);

router.post('/delivery', DeliveryController.create);

export default router;