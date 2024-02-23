import { CookOrder } from "@/types/Order";

export const fetchCookOrders = async () => {
  const res = await fetch(
    "https://65d6b411f6967ba8e3be6689.mockapi.io/cook-orders",
    { cache: "no-store" }
  );
  const data: CookOrder[] = await res.json();

  console.log(data);

  for (let cookOrder of data) {
    cookOrder.products = [
      { name: "Product 1", quantity: 2 },
      { name: "Product 2", quantity: 1 },
      { name: "Product 3", quantity: 4 },
    ];
    cookOrder.status = "pending";
  }

  console.log(data);

  return data;
};
