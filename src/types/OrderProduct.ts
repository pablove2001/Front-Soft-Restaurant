import { Product } from "./Product";

export type OrderProduct = {
    product: Product;
    quantity: number;
    subtotal: number;
};

export type CookOrderProduct = {
    name: string;
    quantity: number;
}