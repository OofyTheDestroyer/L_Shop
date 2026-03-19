export interface Product {
    id: string;
    name: string;
    price: number;
}

export interface BasketProduct {
    count: number;
    product: Product;
}

export interface Basket {
    id: string;
    userId: string;
    basket: BasketProduct[];
}

export interface Delivery {
    id: string;
    userId: string;
    address: string;
    phone: string;
    email: string;
    status: string;
}