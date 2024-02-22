import { User } from "./User";

export type Table = {
    id: string;
    tableNumber: number;
    status: string;
    waiter: User;
}