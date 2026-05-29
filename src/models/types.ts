export interface User {
    id: number | string;
    login: string;
    name: string;
    password: string;
    email?: string;
    phone?: string;
    // cart убрана — теперь корзина хранится отдельно в Basket
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

// ─── Корзина (из second-backend) ────────────────────────────

export interface BasketProduct {
    count: number;
    product: Product;
}

export interface Basket {
    id: string;
    userId: string;
    basket: BasketProduct[];
}

// ─── Доставка (из second-backend) ───────────────────────────

export interface Delivery {
    id: string;
    userId: string;
    address: string;
    phone: string;
    email: string;
    status: string;
}