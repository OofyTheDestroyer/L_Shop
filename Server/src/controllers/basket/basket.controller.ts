import { Request, Response } from 'express';
import { BasketService } from '../../services/basket/basket.service';

export class BasketController {
    public static async getBasket(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.query.userId as string;
            if (!userId) {
                res.status(400).json({ error: 'Missing userId parameter' });
                return;
            }
            const basket = await BasketService.getBasketByUserId(userId);
            res.status(200).json(basket);
        } catch (error: unknown) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public static async changeCount(req: Request, res: Response): Promise<void> {
        try {
            const { userId, productId, delta } = req.body as { userId: string; productId: string; delta: number };
            if (!userId || !productId || typeof delta !== 'number') {
                res.status(400).json({ error: 'Invalid payload' });
                return;
            }
            const updatedBasket = await BasketService.modifyProductCount(userId, productId, delta);
            res.status(200).json(updatedBasket);
        } catch (error: unknown) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }

    public static async deleteProduct(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.query.userId as string;
            const productId = req.query.productId as string;
            if (!userId || !productId) {
                res.status(400).json({ error: 'Missing parameters' });
                return;
            }
            const updatedBasket = await BasketService.removeProduct(userId, productId);
            res.status(200).json(updatedBasket);
        } catch (error: unknown) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}