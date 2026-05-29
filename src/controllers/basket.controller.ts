import { type Request, type Response } from 'express';
import { BasketService } from '../services/basket.service';

export class BasketController {
    public static async getBasket(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.userId as string;
            const basket = await BasketService.getBasketByUserId(userId);
            res.status(200).json(basket);
        } catch {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public static async changeCount(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.userId as string;
            const { productId, delta } = req.body as { productId: string; delta: number };
            if (!productId || typeof delta !== 'number') {
                res.status(400).json({ error: 'Invalid payload' });
                return;
            }
            const updatedBasket = await BasketService.modifyProductCount(userId, productId, delta);
            res.status(200).json(updatedBasket);
        } catch {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public static async deleteProduct(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.userId as string;
            const productId = req.query.productId as string;
            if (!productId) {
                res.status(400).json({ error: 'Missing productId' });
                return;
            }
            const updatedBasket = await BasketService.removeProduct(userId, productId);
            res.status(200).json(updatedBasket);
        } catch {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}