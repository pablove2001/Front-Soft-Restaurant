import Icon from "@mdi/react";
import { mdiMinus, mdiPlus } from "@mdi/js";
import { Product } from "@/types/Product";

export default function ProductSummary({ product }: { product: Product }) {
  return (
    <>
      <div className="w-auto h-20 rounded-xl overflow-hidden p-1 relative flex flex-row shadow-md border-[1px] border-gray-300 bg-white items-center">
        <img
          src={product.img}
          alt="Picture of the author"
          className="w-16 h-full rounded-xl"
        />
        <ul className="mx-2 flex-grow">
          <li className="font-medium">{product.name}</li>
          <li className="text-2xl font-semibold">
            {product.unitPrice.toFixed(2)}
            <span className="text-sm text-gray-500">/c.u</span>
          </li>
        </ul>
        <p className="mr-4">
          Cant:{" "}
          <span className="text-lg font-semibold">{product.quantity}</span>
        </p>
      </div>
    </>
  );
}
