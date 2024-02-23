import { Category } from "./Category";

export type Product = {
  quantity: number;
  id: string;
  name: string;
  unitprice: number;
  category: Category;
  image: string;
};
