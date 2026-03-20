import  express from 'express';
import  cookieParser from 'cookie-parser';
import  cors from 'cors';

import { register,  login } from './controllers/auth.controller';
import {  getProducts } from './controllers/product.controller';
import {  addToCart,  getCart } from './controllers/cart.controller';
import {  requireAuth } from './middlewares/auth.middleware';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true })); // Разрешаем куки при кросс-доменных запросах

// === Публичные роуты ===
app.post('/api/register', register);
app.post('/api/login', login);
app.get('/api/products', getProducts); // Главная страница (поиск, фильтры, сортировка)

// === Защищенные роуты (только для зарегистрированных) ===
app.post('/api/cart', requireAuth, addToCart);
app.get('/api/cart', requireAuth, getCart);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});