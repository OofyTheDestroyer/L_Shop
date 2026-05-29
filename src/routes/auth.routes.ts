import { Router } from 'express';
import { register, login } from '../controllers/auth.controller';

const router = Router();

router.post('/register', register);
router.post('/login', login);

router.post('/logout', (req, res) => {
    res.clearCookie('sessionId');
    res.json({ message: 'Выход выполнен' });
});

export default router;