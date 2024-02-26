"use client;";

import { Product } from "@/types/Product";
import { useState } from "react";
import Modal from "./Modal";
import { mdiMinus, mdiPlus } from "@mdi/js"; // Importing search icon
import Icon from "@mdi/react";

export default function ProductKiosko({
  product,
  onAddProduct,
}: {
  product: Product;
  onAddProduct: (product: Product) => void;
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [quantity, setQuantity] = useState(1); // State for the quantity of the product

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  return (
    <>
      <div className="w-auto h-80 rounded-xl overflow-hidden p-1 relative flex flex-col shadow-xl border-[1px] border-gray-300">
        <img
          src={product.image}
          alt="Picture of the author"
          className="w-full h-44 rounded-xl"
        />
        <ul className="mx-2 mt-3 flex-grow">
          <li className="">{product.name}</li>
          <li className="text-2xl font-semibold">
            {product.unitprice}
            <span className="text-sm text-gray-500">/c.u</span>
          </li>
        </ul>
        <button
          className="h-9 rounded-3xl bg-amber-500 text-white flex items-center justify-center m-2 hover:cursor-pointer hover:bg-amber-400"
          onClick={openModal}
        >
          Agregar
        </button>
      </div>
      {modalVisible && (
        <Modal onClose={closeModal}>
          <img
            src={product.image}
            alt="Product Image"
            className="w-120 rounded-xl"
          />
          <br />
          <div>
            <h2 className="text-3xl font-bold">{product.name}</h2>
            <p>Price: {product.unitprice} /c.u</p>
            <div style={{ display: "flex", alignItems: "center" }}>
              Add Product:
              <span onClick={decreaseQuantity} className="mx-2 cursor-pointer">
                <Icon
                  path={mdiMinus}
                  size={1.5}
                  color="black"
                  className="icon"
                />
              </span>
              <input
                type="number"
                value={quantity}
                className="w-12 text-center"
                style={{
                  WebkitAppearance:
                    "none" /* Hides the default styling for Webkit browsers */,
                  MozAppearance:
                    "textfield" /* Hides the default styling for Firefox */,
                }}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              />
              <span onClick={increaseQuantity} className="mx-2 cursor-pointer">
                <Icon
                  path={mdiPlus}
                  size={1.5}
                  color="black"
                  className="icon"
                />
              </span>
            </div>

            <br />
            <div
              className="te"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <button
                className="bg-green-500 text-white rounded-lg p-2 w-72"
                onClick={() => {
                  product.quantity = quantity;
                  onAddProduct(product);
                  closeModal();
                }}
              >
                Add
              </button>
              <button
                className="bg-red-500 text-white rounded-lg p-2 ml-2 w-72"
                onClick={closeModal}
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}

/*
function EditQuantityProduct() {
  return (
    <div className="absolute h-screen w-screen z-10 flex inset-0 items-center justify-center">
      <div className=" z-20 h-auto w-96 bg-gray-200 p-4 text-center flex flex-col  rounded-lg overflow-hidden border-[1px] border-black">
        <p>
          Cambiar el status <br /> de la orden:
        </p>
        <div className="flex flex-row space-x-4 mt-5">
          <div className="duration-150 bg-red-400 hover:bg-red-500 hover:cursor-pointer flex-grow p-2 rounded-lg border-[1px] border-black">
            Cancelar
          </div>
          <div className="duration-150 bg-green-400 hover:bg-green-500 hover:cursor-pointer flex-grow p-2 rounded-lg border-[1px] border-black">
            Aceptar
          </div>
        </div>
      </div>
    </div>
  );
}
*/
