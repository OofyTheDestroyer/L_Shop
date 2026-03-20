import { type Request, type Response } from 'express';
import {  readDB,  writeDB } from '../utils/fileDB';
import { type User } from '../models/types';

export const register = async (req: Request, res: Response) => {
    const { login, name, password, email, phone } = req.body;
    const users = await readDB<User>('users.json');

    if (users.find(u => u.login === login)) {
        res.status(400).json({ message: "Пользователь с таким логином уже существует" });
        return;
    }

    const newUser: User = {
        id: Date.now().toString(),
        login, name, password, email, phone, cart: []
    };

    users.push(newUser);
    await writeDB('users.json', users);

    res.cookie('sessionId', newUser.id, {
        httpOnly: true,
        maxAge: 10 * 60 * 1000 
    });

    res.status(201).json({ message: "Успешная регистрация", user: { id: newUser.id, login: newUser.login } });
};

export const login = async (req: Request, res: Response) => {
    const { login, password } = req.body;
    const users = await readDB<User>('users.json');

    const user = users.find(u => u.login === login && u.password === password);

    if (!user) {
        res.status(401).json({ message: "Неверный логин или пароль" });
        return;
    }

    res.cookie('sessionId', user.id, {
        httpOnly: true,
        maxAge: 10 * 60 * 1000
    });

    res.json({ message: "Вход выполнен", cart: user.cart });
};