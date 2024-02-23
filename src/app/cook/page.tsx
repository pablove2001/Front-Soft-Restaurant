"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { CookOrder } from "@/types/Order";
import { fetchCookOrders } from "@/lib/cookData";

function Order({
  index,
  order,
  page,
  setShowModal,
}: {
  index: number;
  order: CookOrder;
  page: number;
  setShowModal: (value: number) => void;
}) {
  return (
    <>
      <div
        className="col-span-1 row-span-1 bg-gray-200 h-full flex flex-col rounded-xl overflow-hidden border-[1px] border-black transition-transform duration-300 ease-in-out transform hover:cursor-pointer"
        onClick={() => setShowModal(index + 1 + (page - 1) * 6)}
      >
        <div className="h-auto w-full flex flex-row border-b-[1px] border-black">
          <div className="flex-grow bg-amber-500 pl-2">
            <p>Type: {order.type}</p>
            <p>Time: {order.date}</p>
          </div>
          <div
            className={`w-16 row-span-1 flex items-center justify-center border-l-[1px] border-black ${
              order.status == "pending" ? "bg-red-500" : "bg-green-500"
            }`}
          >
            {index + 1 + (page - 1) * 6}
          </div>
        </div>
        <div className="bg-amber-100 flex-grow pl-3 pt-2">
          <ul>
            {order.products.map((product, index) => (
              <li key={index}>
                {product.quantity} x {product.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

function ModalNextStatus({
  setShowModal,
  showModal,
  updateOrder,
}: {
  setShowModal: (value: number) => void;
  showModal: number;
  updateOrder: (index: number) => void;
}) {
  return (
    <div className="absolute h-screen w-screen z-10 flex inset-0 items-center justify-center">
      <div className=" z-20 h-auto w-96 bg-gray-200 p-4 text-center flex flex-col  rounded-lg overflow-hidden border-[1px] border-black">
        <p>
          Cambiar el status <br /> de la orden: {showModal}
        </p>
        <div className="flex flex-row space-x-4 mt-5">
          <div
            className="duration-150 bg-red-400 hover:bg-red-500 hover:cursor-pointer flex-grow p-2 rounded-lg border-[1px] border-black"
            onClick={() => setShowModal(0)}
          >
            Cancelar
          </div>
          <div
            className="duration-150 bg-green-400 hover:bg-green-500 hover:cursor-pointer flex-grow p-2 rounded-lg border-[1px] border-black"
            onClick={() => updateOrder(showModal - 1)}
          >
            Aceptar
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CookOrders() {
  // modal state
  const [showModal, setShowModal] = useState(0);

  // loading state
  const [loading, setLoading] = useState(true);

  // orders state
  const [orders, setOrders] = useState<CookOrder[]>([]);

  useEffect(() => {
    fetchCookOrders().then((data) => {
      setOrders(data);
      setLoading(false);
    });
  }, []);

  const addOrder = () => {
    const newOrder: CookOrder = {
      id: "1",
      date: "11:14:20",
      type: "Uber Eats",
      status: "pending",
      products: [
        { name: "Product 1", quantity: 2 },
        { name: "Product 2", quantity: 1 },
      ],
    };
    setOrders([...orders, newOrder]);
  };

  const updateOrder = (index: number) => {
    const updatedOrders = orders;

    if (updatedOrders[index].status == "pending") {
      updatedOrders[index].status = "cooking";
    } else {
      // updatedOrders[index].status = "completed";
      updatedOrders.splice(index, 1);
    }

    setOrders(updatedOrders);
    setShowModal(0);
  };

  const updateOrders = () => {
    setLoading(true);
    fetchCookOrders().then((data) => {
      setOrders(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    updatePage();
  }, [orders]);

  // page state
  const [page, setPage] = useState(1);

  const increment = () => {
    if (page < ~~((orders.length - 1) / 6) + 1) {
      setPage(page + 1);
    }
  };

  const decrement = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  };

  const updatePage = () => {
    const newPage = ~~((orders.length - 1) / 6) + 1;
    if (newPage < page) {
      setPage(newPage);
    }
  };

  // filter orders to show
  const showOrders: CookOrder[] = orders.slice((page - 1) * 6, page * 6);

  return (
    <div className="h-screen flex flex-col text-2xl font-medium">
      {showModal !== 0 && (
        <ModalNextStatus
          setShowModal={setShowModal}
          showModal={showModal}
          updateOrder={updateOrder}
        />
      )}
      <div className="h-10 bg-amber-500 flex items-center pl-6">
        Monitor para cocineros
      </div>
      {loading ? (
        <div className="flex-grow flex items-center justify-center">
          <p className="text-3xl">Loading...</p>
        </div>
      ) : (
        <div className="m-4 grid grid-cols-3 grid-rows-2 gap-4 flex-grow">
          {showOrders.map((order, index) => (
            <Order
              key={index}
              index={index}
              order={order}
              page={page}
              setShowModal={setShowModal}
            />
          ))}
        </div>
      )}

      <div className="h-10 bg-amber-500 flex flex-row">
        <div className="bg-slate-300 flex items-center justify-center px-2">
          Orders: {orders.length == 0 ? 0 : (page - 1) * 6 + 1} to{" "}
          {(page - 1) * 6 + showOrders.length} of {orders.length}
        </div>
        <div
          className="bg-slate-500 flex items-center justify-center px-2 ml-6 hover:cursor-pointer"
          onClick={decrement}
        >
          <Image
            src="/left-arrow.png"
            width={40}
            height={40}
            alt="Picture of the author"
          />
        </div>
        <div
          className="bg-slate-500 flex items-center justify-center px-2 hover:cursor-pointer"
          onClick={increment}
        >
          <Image
            src="/right-arrow.png"
            width={40}
            height={40}
            alt="Picture of the author"
          />
        </div>
        <div className="bg-slate-300 flex items-center justify-center px-2">
          Page: {page} of {~~((orders.length - 1) / 6) + 1}
        </div>
        <div
          className="bg-slate-500 flex items-center justify-center px-2 ml-6 hover:cursor-pointer"
          onClick={updateOrders}
        >
          Update
        </div>
        <div
          className="bg-slate-500 flex items-center justify-center px-2 ml-6"
          onClick={addOrder}
        >
          Add
        </div>
      </div>
    </div>
  );
}
