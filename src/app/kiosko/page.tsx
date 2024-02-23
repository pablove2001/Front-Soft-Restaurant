// "use client";

import { useEffect, useState } from "react";

import ProductKiosko from "@/components/ProductKiosko";
import { fetchKioskoProducts } from "@/lib/kioskoData";
import { Product } from "@/types/Product";
import Navbar from "@/components/Navbar";
import Pay from "@/components/Pay";

export default async function Kiosko() {
  let products: Product[] = await fetchKioskoProducts();
  return (
    <div className="">
      <Navbar />
      <div className="grid grid-cols-3 gap-12 max-w-4xl mx-auto my-12 mt-24">
        {products.map((product, index) => (
          <ProductKiosko product={product} />
        ))}
      </div>
      <Pay />
    </div>
  );
}
