import { Product } from "@/types/Product";

export const fetchKioskoProducts = async () => {
  const res = await fetch(process.env.NEXT_PUBLIC_API_URL + "/products", {
    cache: "no-store",
  });

  const data: Product[] = await res.json();

  for (let product of data) {
    product.quantity = 0;
  }

  return data;
};
