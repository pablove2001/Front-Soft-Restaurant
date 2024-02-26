"use client";

// Kiosko.tsx
import Image from "next/image";
import { useEffect, useState } from "react";
import ProductKiosko from "@/components/ProductKiosko";
import { fetchKioskoProducts } from "@/lib/kioskoData";
import { Product } from "@/types/Product";
import Navbar from "@/components/KioskoNavbar";
import Pay from "@/components/Pay";
import ChatboxButton from "@/components/ChatboxButton";
import Modal from "@/components/Modal";
import ProductSummary from "@/components/ProductSummary";

export default function Kiosko() {
  const [products, setProducts] = useState<Product[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [addedProducts, setAddedProducts] = useState<Product[]>([]);
  const [modalPay, setModalPay] = useState(false);

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

  // useEffect(() => {
  //   console.log("Added Products:", addedProducts); // Log addedProducts whenever it changes
  //   console.log("products:", products); // Log totalAmount whenever it changes
  // }, [addedProducts]);

  // modalPay functions
  const openModalPay = () => {
    setModalPay(true);
  };

  const closeModalPay = () => {
    setModalPay(false);
  };

  const openChatbox = () => {
    //setChatbox(true);
  };

  const closeChatbox = () => {
    //setChatbox(false);
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
      <Pay
        totalAmount={totalAmount}
        disabled={totalAmount === 0}
        onClick={openModalPay}
      />
      <ChatboxButton onClick={openChatbox} />
      {modalPay && (
        <Modal onClose={closeModalPay}>
          <div className="grid grid-cols-2 gap-5 p-8 max-w-[1100px] mx-auto">
            <div className="flex items-center">
              <div>
                <div
                  className="text-3xl fon t-medium border-b-2 border-black pb-3 hover:cursor-pointer"
                  onClick={closeModalPay}
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
            <div className="flex items-center">
              <div className="bg-amber-500 rounded-2xl text-white p-5 shadow-md h-auto">
                <div className="flex flex-row justify-between items-center">
                  <h2 className="text-3xl font-medium">Detalles de pago</h2>
                  <Image
                    src="/logo.png"
                    width={90}
                    height={90}
                    alt="Picture of the author"
                  />
                </div>
                <div>
                  <p className="mt-3">Nombre del titular</p>
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full rounded-md p-2 text-black mt-1"
                  />
                  <p className="mt-3">Numero de tarjeta</p>
                  <input
                    type="text"
                    placeholder="1111 2222 3333 4444"
                    className="w-full rounded-md p-2 text-black mt-1"
                  />
                  <div className="flex flex-row items-center gap-2">
                    <div>
                      <p className="mt-3">Fecha de expiracion</p>
                      <input
                        type="text"
                        placeholder="mm/yy"
                        className="w-full rounded-md p-2 text-black mt-1"
                      />
                    </div>
                    <div>
                      <p className="mt-3">CVV</p>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full rounded-md p-2 text-black mt-1"
                      />
                    </div>
                  </div>
                </div>
                <div className="border-t-2 border-white mt-4">
                  <div className="flex flex-row items-center justify-between mt-3">
                    <p>Subtotal</p>
                    <p>${totalAmount.toFixed(2)}</p>
                  </div>
                  <div className="flex flex-row items-center justify-between mt-1">
                    <p>Total {"(IVA 16% incl.)"}</p>
                    <p>${(totalAmount * 1.16).toFixed(2)}</p>
                  </div>
                </div>
                <div
                  className="bg-amber-700 hover:bg-amber-600 hover:cursor-pointer flex flex-row items-center justify-between text-xl font-medium p-4 mt-6 rounded-xl"
                  onClick={() => {
                    restoreOrder();
                    closeModalPay();
                  }}
                >
                  <p>${(totalAmount * 1.16).toFixed(2)}</p>
                  <p>Pagar {"-->"}</p>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
