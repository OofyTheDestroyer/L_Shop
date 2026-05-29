import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRoutes from './routes/auth.routes';
import productRoutes from './routes/product.routes';
import basketRoutes from './routes/basket.routes';
import deliveryRoutes from './routes/delivery.routes';

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: true, credentials: true }));

app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/basket', basketRoutes);
app.use('/api/delivery', deliveryRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});