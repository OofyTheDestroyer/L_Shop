import { type Request, type Response } from 'express';
import { readDB } from '../utils/fileDB';
import {type Product } from '../models/types';

export const getProducts = async (req: Request, res: Response) => {
    let products = await readDB<Product>('products.json');
    const { search, sortByPrice, category, available } = req.query;

    // 1. Поиск по имени или описанию
    if (search) {
        const s = (search as string).toLowerCase();
        products = products.filter(p => 
            p.title.toLowerCase().includes(s) || 
            p.description.toLowerCase().includes(s)
        );
    }

    // 2. Фильтрация по категории
    if (category) {
        products = products.filter(p => p.categories.includes(category as string));
    }

    // 3. Фильтрация по доступности
    if (available === 'true') {
        products = products.filter(p => p.isAvailable);
    }

    // 4. Сортировка по цене
    if (sortByPrice === 'asc') products.sort((a, b) => a.price - b.price);
    if (sortByPrice === 'desc') products.sort((a, b) => b.price - a.price);

    res.json(products);
};