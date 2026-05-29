import { readDB, writeDB } from '../utils/fileDB';
import { type Delivery } from '../models/types';
import { BasketService } from './basket.service';

const DELIVERY_FILE = 'delivery.json';

export class DeliveryService {
    public static async createDelivery(
        userId: string,
        address: string,
        phone: string,
        email: string
    ): Promise<Delivery> {
        const deliveries = await readDB<Delivery>(DELIVERY_FILE);

        const newDelivery: Delivery = {
            id: Date.now().toString(),
            userId,
            address,
            phone,
            email,
            status: 'Processing'
        };

        deliveries.push(newDelivery);
        await writeDB(DELIVERY_FILE, deliveries);

        await BasketService.clearBasket(userId); // очищает корзину после оформления

        return newDelivery;
    }
}