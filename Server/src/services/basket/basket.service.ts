import { readDb, writeDb } from '../../constants/db';
import { Basket, BasketProduct, Product } from '../../constants/types';

const BASKET_FILE = 'basket.json';
const PRODUCTS_FILE = 'products.json';

export class BasketService {
    public static async getBasketByUserId(userId: string): Promise<Basket> {
        const baskets = await readDb<Basket>(BASKET_FILE);
        const userBasket = baskets.find((b: Basket) => b.userId === userId);
        
        if (userBasket) {
            return userBasket;
        }

        const newBasket: Basket = { id: Date.now().toString(), userId, basket: [] };
        baskets.push(newBasket);
        await writeDb<Basket>(BASKET_FILE, baskets);
        return newBasket;
    }

    public static async modifyProductCount(userId: string, productId: string, delta: number): Promise<Basket> {
        const baskets = await readDb<Basket>(BASKET_FILE);
        const basketIndex = baskets.findIndex((b: Basket) => b.userId === userId);
        
        if (basketIndex === -1) {
            throw new Error('BasketNotFound');
        }

        const userBasket = baskets[basketIndex];
        const productIndex = userBasket.basket.findIndex((bp: BasketProduct) => bp.product.id === productId);

        if (productIndex !== -1) {
            userBasket.basket[productIndex].count += delta;
            if (userBasket.basket[productIndex].count <= 0) {
                userBasket.basket.splice(productIndex, 1);
            }
        } else if (delta > 0) {
            const products = await readDb<Product>(PRODUCTS_FILE);
            const product = products.find((p: Product) => p.id === productId);
            if (product) {
                userBasket.basket.push({ count: delta, product });
            }
        }

        baskets[basketIndex] = userBasket;
        await writeDb<Basket>(BASKET_FILE, baskets);
        return userBasket;
    }

    public static async removeProduct(userId: string, productId: string): Promise<Basket> {
        const baskets = await readDb<Basket>(BASKET_FILE);
        const basketIndex = baskets.findIndex((b: Basket) => b.userId === userId);

        if (basketIndex !== -1) {
            baskets[basketIndex].basket = baskets[basketIndex].basket.filter((bp: BasketProduct) => bp.product.id !== productId);
            await writeDb<Basket>(BASKET_FILE, baskets);
            return baskets[basketIndex];
        }
        throw new Error('BasketNotFound');
    }

    public static async clearBasket(userId: string): Promise<void> {
        const baskets = await readDb<Basket>(BASKET_FILE);
        const basketIndex = baskets.findIndex((b: Basket) => b.userId === userId);
        
        if (basketIndex !== -1) {
            baskets[basketIndex].basket = [];
            await writeDb<Basket>(BASKET_FILE, baskets);
        }
    }
}