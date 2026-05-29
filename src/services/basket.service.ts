import { readDB, writeDB } from '../utils/fileDB';
import { type Basket, type BasketProduct, type Product } from '../models/types';

const BASKET_FILE = 'basket.json';
const PRODUCTS_FILE = 'products.json';

export class BasketService {
    public static async getBasketByUserId(userId: string): Promise<Basket> {
        const baskets = await readDB<Basket>(BASKET_FILE);
        const userBasket = baskets.find(b => b.userId === userId);

        if (userBasket) return userBasket;

        const newBasket: Basket = { id: Date.now().toString(), userId, basket: [] };
        baskets.push(newBasket);
        await writeDB(BASKET_FILE, baskets);
        return newBasket;
    }

    public static async modifyProductCount(userId: string, productId: string, delta: number): Promise<Basket> {
        const baskets = await readDB<Basket>(BASKET_FILE);
        const basketIndex = baskets.findIndex(b => b.userId === userId);

        if (basketIndex === -1) throw new Error('BasketNotFound');

        const userBasket = baskets[basketIndex];
        const productIndex = userBasket.basket.findIndex(bp => bp.product.id === productId);

        if (productIndex !== -1) {
            userBasket.basket[productIndex].count += delta;
            if (userBasket.basket[productIndex].count <= 0) {
                userBasket.basket.splice(productIndex, 1);
            }
        } else if (delta > 0) {
            const products = await readDB<Product>(PRODUCTS_FILE);
            const product = products.find(p => p.id === productId);
            if (product) userBasket.basket.push({ count: delta, product });
        }

        baskets[basketIndex] = userBasket;
        await writeDB(BASKET_FILE, baskets);
        return userBasket;
    }

    public static async removeProduct(userId: string, productId: string): Promise<Basket> {
        const baskets = await readDB<Basket>(BASKET_FILE);
        const basketIndex = baskets.findIndex(b => b.userId === userId);

        if (basketIndex === -1) throw new Error('BasketNotFound');

        baskets[basketIndex].basket = baskets[basketIndex].basket.filter(
            bp => bp.product.id !== productId
        );
        await writeDB(BASKET_FILE, baskets);
        return baskets[basketIndex];
    }

    public static async clearBasket(userId: string): Promise<void> {
        const baskets = await readDB<Basket>(BASKET_FILE);
        const basketIndex = baskets.findIndex(b => b.userId === userId);

        if (basketIndex !== -1) {
            baskets[basketIndex].basket = [];
            await writeDB(BASKET_FILE, baskets);
        }
    }
}