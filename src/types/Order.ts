import { CookOrderProduct, OrderProduct } from "./OrderProduct";
import { Table } from "./Table";
import { User } from "./User";

export type OrderType = "Uber Eats" | "Kiosko" | "Restaurant";
export type OrderStatus = "pending" | "cooking" | "completed";

export type Order = {
  id: string;
  waiter: User;
  table: Table;
  date: string;
  customerCount: number;
  orderProducts: OrderProduct[];
  total: number;
  type: OrderType;
  status: OrderStatus;
};

export type CookOrder = {
  id: string;
  date: string;
  type: string;
  products: CookOrderProduct[];
  status: OrderStatus;
};
