import { readDb, writeDb } from '../../constants/db';
import { Delivery } from '../../constants/types';
import { BasketService } from '../basket/basket.service';

const DELIVERY_FILE = 'delvery.json';

export class DeliveryService {
    public static async createDelivery(userId: string, address: string, phone: string, email: string): Promise<Delivery> {
        const deliveries = await readDb<Delivery>(DELIVERY_FILE);
        
        const newDelivery: Delivery = {
            id: Date.now().toString(),
            userId,
            address,
            phone,
            email,
            status: 'Processing'
        };

        deliveries.push(newDelivery);
        await writeDb<Delivery>(DELIVERY_FILE, deliveries);
        
        await BasketService.clearBasket(userId);

        return newDelivery;
    }
}