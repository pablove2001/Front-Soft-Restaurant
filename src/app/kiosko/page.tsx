// "use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import ProductKiosko from "@/components/ProductKiosko";
import { fetchKioskoProducts } from "@/lib/kioskoData";
import { Product } from "@/types/Product";

export default async function Kiosko() {
  let products: Product[] = await fetchKioskoProducts();
  return (
    <div className="">
      <nav className="bg-amber-500 h-14 fixed w-full top-0 z-10 shadow-md">
        <div className="container mx-auto h-full">
          <div className="flex items-center justify-between h-full">
            <div className="text-white text-lg font-bold">Hola</div>
            <div className="">
              <Image
                src="/shopping-cart.png"
                width={35}
                height={35}
                alt="Picture of the author"
              />
            </div>
          </div>
        </div>
      </nav>
      <div className="grid grid-cols-3 gap-12 max-w-4xl mx-auto my-12 mt-20">
        {products.map((product, index) => (
          <ProductKiosko product={product} />
        ))}
      </div>
    </div>
  );
}
