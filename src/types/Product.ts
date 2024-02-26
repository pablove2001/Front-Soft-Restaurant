import { Category } from "./Category";

export type Product = {
  quantity: number;
  id: string;
  name: string;
  unitPrice: number;
  category: Category;
  img: string;
};
