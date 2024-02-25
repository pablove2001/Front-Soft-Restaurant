import Icon from "@mdi/react";
import { mdiMinus, mdiPlus } from "@mdi/js";

export default function ProductSummary() {
  return (
    <>
      <div className="w-auto h-20 rounded-xl overflow-hidden p-1 relative flex flex-row shadow-md border-[1px] border-gray-300 bg-white items-center">
        <img
          src="https://th.bing.com/th/id/OIP.08yOCZ3d7gE6DWBAoqLLsQHaJO?rs=1&pid=ImgDetMain"
          alt="Picture of the author"
          className="w-16 h-full rounded-xl"
        />
        <ul className="mx-2 flex-grow">
          <li className="font-medium">Tacos</li>
          <li className="text-2xl font-semibold">
            123
            <span className="text-sm text-gray-500">/c.u</span>
          </li>
        </ul>
        <span className="cursor-pointer">
          <Icon path={mdiMinus} size={1.5} color="black" className="icon" />
        </span>
        <span className="cursor-pointer">
          <Icon path={mdiPlus} size={1.5} color="black" className="icon" />
        </span>
        <input
          type="number"
          value={0}
          className="w-12 text-center"
          style={{
            WebkitAppearance:
              "none" /* Hides the default styling for Webkit browsers */,
            MozAppearance:
              "textfield" /* Hides the default styling for Firefox */,
          }}
        />
      </div>
    </>
  );
}
