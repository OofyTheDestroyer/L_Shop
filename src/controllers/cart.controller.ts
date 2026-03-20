import { type Request, type Response } from 'express';
import { readDB, writeDB } from '../utils/fileDB';
import { type User } from '../models/types';

export const addToCart = async (req: Request, res: Response) => {
    const { productId, quantity } = req.body;
    const userId = req.userId;

    const users = await readDB<User>('users.json');
    const userIndex = users.findIndex(u => u.id === userId);

    if (userIndex === -1) {
        res.status(404).json({ message: "Пользователь не найден" });
        return;
    }

    const user = users[userIndex];
    const existingItem = user.cart.find(item => item.productId === productId);

    if (existingItem) {
        existingItem.quantity += Number(quantity); 
    } else {
        user.cart.push({ productId, quantity: Number(quantity) });
    }

    await writeDB('users.json', users);
    res.json({ message: "Товар добавлен в корзину", cart: user.cart });
};

export const getCart = async (req: Request, res: Response) => {
    const users = await readDB<User>('users.json');
    const user = users.find(u => u.id === req.userId);
    
    if (!user) {
        res.status(404).json({ message: "Пользователь не найден" });
        return;
    }

    res.json({ cart: user.cart });
};