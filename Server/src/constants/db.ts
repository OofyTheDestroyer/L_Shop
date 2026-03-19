import fs from 'fs/promises';
import path from 'path';

export const readDb = async <T>(filename: string): Promise<T[]> => {
    const filePath = path.join(__dirname, '../../database', filename);
    try {
        const data = await fs.readFile(filePath, 'utf-8');
        return JSON.parse(data) as T[];
    } catch (error: unknown) {
        return [];
    }
};

export const writeDb = async <T>(filename: string, data: T[]): Promise<void> => {
    const filePath = path.join(__dirname, '../../database', filename);
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf-8');
};