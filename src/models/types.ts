export interface User {
    id: number | string;
    login: string;
    name: string;
    password: string;
    email?: string;
    phone?: string;
    cart: CartItem[]; // Корзина юзера
}

export interface CartItem {
    productId: number | string;
    quantity: number;
}

export interface Address {
    city: string;
    street: string;
}

export interface Product {
    id: number | string;
    title: string;
    price: number;
    isAvailable: boolean;
    description: string;
    categories: string[];
    images: {
        preview: string;
        gallery?: string[];
    };
    delivery?: {
        startTown: Address;
        earlyDate: Date | string;
        price: number;
    };
    discount?: number;
}