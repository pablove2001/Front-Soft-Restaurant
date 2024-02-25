import { Product } from "@/types/Product";

export const fetchKioskoProducts = async () => {
  const res = await fetch(
    "https://65d6b411f6967ba8e3be6689.mockapi.io/products",
    { cache: "no-store" }
  );
  const data: Product[] = await res.json();

  for (let product of data) {
    product.quantity = 0;
  }

  return data;
};
