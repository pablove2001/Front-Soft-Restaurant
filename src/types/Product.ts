import { Category } from "./Category";

export type Product = {
    id: string;
    name: string;
    unitprice: number;
    category: Category;
};