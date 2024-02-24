"use client";

// Kiosko.tsx
import { useEffect, useState } from "react";
import ProductKiosko from "@/components/ProductKiosko";
import { fetchKioskoProducts } from "@/lib/kioskoData";
import { Product } from "@/types/Product";
import Navbar from "@/components/KioskoNavbar";
import Pay from "@/components/Pay";

export default function Kiosko() {
  const [products, setProducts] = useState<Product[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [addedProducts, setAddedProducts] = useState<Product[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    fetchKioskoProducts().then((products) => {
      setProducts(products);
    });
  }, []);

  const handleAddProduct = (product: Product) => {
    const existingProductIndex = addedProducts.findIndex(
      (p) => p.id === product.id
    );

    if (existingProductIndex !== -1) {
      // Product already exists, update its quantity
      const updatedProducts = [...addedProducts];
      updatedProducts[existingProductIndex].quantity = product.quantity;
      setAddedProducts(updatedProducts);
    } else {
      // Product does not exist, add it to the array
      setAddedProducts([...addedProducts, product]);
    }
  };

  {
    /*
  useEffect(() => {
    console.log("Added Products:", addedProducts); // Log addedProducts whenever it changes
  }, [addedProducts]);
  */
  }

  const totalAmount = addedProducts.reduce(
    (total, product) => total + product.quantity * product.unitprice,
    0
  );

  // Filter products based on search bar input
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(inputValue.toLowerCase())
  );

  return (
    <div>
      <Navbar inputValue={inputValue} onInputChange={handleInputChange} />
      <div className="grid grid-cols-3 gap-12 max-w-4xl mx-auto my-12 mt-24">
        {filteredProducts.map((product, index) => (
          <ProductKiosko
            product={product}
            key={product.id}
            onAddProduct={handleAddProduct}
          />
        ))}
      </div>
      <Pay totalAmount={totalAmount} disabled={totalAmount === 0} />
    </div>
  );
}
