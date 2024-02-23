import { Product } from "@/types/Product";

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

export default function ProductKiosko({ product }: { product: Product }) {
  return (
    <>
      {/* <EditQuantityProduct /> */}
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
        <div className="h-9 rounded-3xl bg-amber-500 text-white flex items-center justify-center m-2 hover:cursor-pointer hover:bg-amber-400">
          Agregar
        </div>
      </div>
    </>
  );
}
