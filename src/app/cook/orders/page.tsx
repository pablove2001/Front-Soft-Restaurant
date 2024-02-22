"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { CookOrder } from "@/types/Order";
import { fetchCookOrders } from "@/lib/cookData";

function Order({
  index,
  order,
  page,
}: {
  index: number;
  order: CookOrder;
  page: number;
}) {
  return (
    <>
      <div className="col-span-1 row-span-1 bg-gray-200 h-full flex flex-col">
        <div className="h-auto w-full flex flex-row">
          <div className="flex-grow bg-amber-200 pl-1">
            <p>Type: {order.type}</p>
            <p>Time: {order.date}</p>
          </div>
          <div className="w-16 row-span-1 bg-red-400 flex items-center justify-center">
            {index + 1 + (page - 1) * 6}
          </div>
        </div>
        <div className="bg-green-400 flex-grow pl-1">
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

export default function CookOrders() {
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
      products: [
        { name: "Product 1", quantity: 2 },
        { name: "Product 2", quantity: 1 },
      ],
    };
    setOrders([...orders, newOrder]);
  };

  const removeOrder = () => {
    const updatedOrders = orders.slice(1);
    setOrders(updatedOrders);
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
      <div className="h-10 bg-orange-300 flex items-center pl-6">
        Monitor de produccion para soft
      </div>
      {loading ? (
        <div className="flex-grow bg-red-200"></div>
      ) : (
        <div className="m-4 grid grid-cols-3 grid-rows-2 gap-4 flex-grow bg-red-200">
          {showOrders.map((order, index) => (
            <Order key={index} index={index} order={order} page={page} />
          ))}
        </div>
      )}

      <div className="h-10 bg-orange-300 flex flex-row">
        <div className="bg-slate-300 flex items-center justify-center px-2">
          Orders: {orders.length == 0 ? 0 : (page - 1) * 6 + 1} to{" "}
          {(page - 1) * 6 + showOrders.length} of {orders.length}
        </div>
        <div
          className="bg-slate-500 flex items-center justify-center px-2 ml-4"
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
          className="bg-slate-300 flex items-center justify-center px-2"
          onClick={increment}
        >
          <Image
            src="/right-arrow.png"
            width={40}
            height={40}
            alt="Picture of the author"
          />
        </div>
        <div className="bg-slate-500 flex items-center justify-center px-2">
          Page: {page} of {~~((orders.length - 1) / 6) + 1}
        </div>
        <div className="bg-slate-300 flex items-center justify-center px-2 ml-4">
          Update
        </div>
        <div
          className="bg-slate-300 flex items-center justify-center px-2 ml-4"
          onClick={addOrder}
        >
          Add
        </div>
        <div
          className="bg-slate-300 flex items-center justify-center px-2 ml-4"
          onClick={removeOrder}
        >
          Remove
        </div>
      </div>
    </div>
  );
}
