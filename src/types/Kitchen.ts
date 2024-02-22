import { Order } from "./Order";
import { User } from "./User";

export type Kitchen = {
    cookers: User[];
    orders: Order[];
}