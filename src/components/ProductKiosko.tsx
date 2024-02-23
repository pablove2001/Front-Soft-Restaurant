export default function ProductKiosko() {
  return (
    <div className="w-auto h-80 rounded-xl overflow-hidden p-1 relative flex flex-col shadow-xl border-[1px] border-gray-300">
      <img
        src="https://th.bing.com/th/id/OIP.G8woMj2A6otIpdToBGEuFgAAAA?rs=1&pid=ImgDetMain"
        alt="Picture of the author"
        className="w-full h-44 rounded-xl"
      />
      <ul className="mx-2 mt-3 flex-grow">
        <li className="">Tacos de asada</li>
        <li className="text-2xl font-semibold">
          12.99<span className="text-sm text-gray-500">/c.u</span>
        </li>
      </ul>
      <div className="h-7 rounded-2xl bg-amber-500 text-white flex items-center justify-center m-2 ">
        Agregar
      </div>
    </div>
  );
}
