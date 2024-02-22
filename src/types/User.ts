export type UserType = "admin" | "cook" | "waiter";

export type User = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    type: UserType;
}