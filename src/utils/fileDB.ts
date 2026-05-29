import fs from 'fs/promises';
import path from 'path';

const basePath = path.join(__dirname, '../../database');

export const readDB = async <T>(filename: string): Promise<T[]> => {
    try {
        const data = await fs.readFile(path.join(basePath, filename), 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        return []; // Если файла нет, возвращаем пустой массив
    }
};

export const writeDB = async <T>(filename: string, data: T[]): Promise<void> => {
    await fs.writeFile(path.join(basePath, filename), JSON.stringify(data, null, 2));
};