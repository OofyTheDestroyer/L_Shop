import { Router } from 'express';
import { DeliveryController } from '../controllers/delivery.controller';
import { requireAuth } from '../middlewares/auth.middleware';

const router = Router();
router.use(requireAuth);

router.post('/', DeliveryController.create);

export default router;