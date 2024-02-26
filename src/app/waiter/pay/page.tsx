import ProductSummary from "@/components/ProductSummary";
import Image from "next/image";

export default function Waiter() {
  return (
    <div className="h-screen grid grid-cols-2 gap-5 p-8 max-w-[1100px] mx-auto">
      <div className="flex items-center">
        <div>
          <a href="/waiter">
            <div className="text-3xl font-medium border-b-2 border-black pb-3">
              {"<-"} Regresar
            </div>
          </a>

          <div className="mt-4">
            <h3 className="text-xl font-medium">Carrito</h3>
            <p>
              Una vez procesada la orden se comenzaran a preparar tus alimentos!
            </p>
          </div>
          <div className="mt-4 space-y-3 overflow-y-auto max-h-[450px]">
            <ProductSummary
              product={{
                quantity: 3,
                id: "",
                name: "Tacos",
                unitPrice: 123,
                category: {
                  id: "",
                  name: "",
                },
                img: "https://th.bing.com/th/id/OIP.08yOCZ3d7gE6DWBAoqLLsQHaJO?rs=1&pid=ImgDetMain",
              }}
            />
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
              <p>$1,688</p>
            </div>
            <div className="flex flex-row items-center justify-between mt-1">
              <p>Propina</p>
              <p>$4</p>
            </div>
            <div className="flex flex-row items-center justify-between mt-1">
              <p>Subtotal</p>
              <p>$1,672</p>
            </div>
          </div>
          <div className="bg-amber-700 hover:bg-amber-600 hover:cursor-pointer flex flex-row items-center justify-between text-xl font-medium p-4 mt-6 rounded-xl">
            <p>$1,672</p>
            <p>Pagar {"-->"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
