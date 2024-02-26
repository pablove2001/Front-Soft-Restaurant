"use client";

// Kiosko.tsx
import Image from "next/image";
import { useEffect, useState } from "react";
import ProductKiosko from "@/components/ProductKiosko";
import { fetchKioskoProducts } from "@/lib/kioskoData";
import { Product } from "@/types/Product";
import Navbar from "@/components/KioskoNavbarWaiter";
import Pay from "@/components/Pay";
import Modal from "@/components/Modal";
import Icon from "@mdi/react";
import { mdiMinus, mdiPlus } from "@mdi/js";
import ProductSummary from "@/components/ProductSummary";
import router from "next/router";
import { NextPageContext } from "next";
import ConfirmOrder from "@/components/ConfirmOrder";

export default function Kiosko() {
  const [products, setProducts] = useState<Product[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [addedProducts, setAddedProducts] = useState<Product[]>([]);
  const [modalConfirm, setModalConfirm] = useState(false);

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

  const restoreOrder = () => {
    setProducts((prevProducts) =>
      prevProducts.map((product) => {
        product.quantity = 0;
        return product;
      })
    );
  };

  // modalConfirm functions
  const openModalConfirm = () => {
    setModalConfirm(true);
  };

  const closeModalConfirm = () => {
    setModalConfirm(false);
  };

  const totalAmount = addedProducts.reduce(
    (total, product) => total + product.quantity * product.unitPrice,
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
      <ConfirmOrder
        totalAmount={totalAmount}
        disabled={totalAmount === 0}
        onClick={openModalConfirm}
      />
      {modalConfirm && (
        <Modal onClose={closeModalConfirm}>
          <div className="flex items-center">
            <div>
              <div
                className="text-3xl font-medium border-b-2 border-black pb-3 hover:cursor-pointer"
                onClick={closeModalConfirm}
              >
                {"<-"} Regresar
              </div>
              <div className="mt-4">
                <h3 className="text-xl font-medium">Carrito</h3>
                <p>
                  Una vez procesada la orden se comenzaran a preparar tus
                  alimentos!
                </p>
              </div>
              <div className="mt-4 space-y-3 overflow-y-auto max-h-[450px]">
                {products
                  .filter((product) => product.quantity !== 0)
                  .map((product, index) => (
                    <ProductSummary key={index} product={product} />
                  ))}
              </div>
            </div>
          </div>
          <div
            className="bg-amber-500 hover:bg-amber-600 hover:text-white hover:cursor-pointer flex items-center justify-center text-xl font-medium p-4 mt-6 rounded-xl"
            onClick={() => {
              restoreOrder();
              closeModalConfirm();
            }}
          >
            <p>Agregar {"-->"}</p>
          </div>
        </Modal>
      )}
    </div>
  );
}
