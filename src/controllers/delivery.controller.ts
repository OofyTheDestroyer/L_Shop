import { type Request, type Response } from 'express';
import { DeliveryService } from '../services/delivery.service';

export class DeliveryController {
    public static async create(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.userId as string;
            const { address, phone, email } = req.body as {
                address: string;
                phone: string;
                email: string;
            };

            if (!address || !phone || !email) {
                res.status(400).json({ error: 'Missing required fields' });
                return;
            }

            const delivery = await DeliveryService.createDelivery(userId, address, phone, email);
            res.status(201).json(delivery);
        } catch {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}