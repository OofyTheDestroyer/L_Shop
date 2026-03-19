import { Request, Response } from 'express';
import { DeliveryService } from '../../services/delivery/delivery.service';

export class DeliveryController {
    public static async create(req: Request, res: Response): Promise<void> {
        try {
            const { userId, address, phone, email } = req.body as { userId: string; address: string; phone: string; email: string };
            
            if (!userId || !address || !phone || !email) {
                res.status(400).json({ error: 'Missing required fields' });
                return;
            }

            const delivery = await DeliveryService.createDelivery(userId, address, phone, email);
            res.status(201).json(delivery);
        } catch (error: unknown) {
            res.status(500).json({ error: 'Internal Server Error' });
        }
    }
}