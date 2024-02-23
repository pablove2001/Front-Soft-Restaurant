import Icon from "@mdi/react";
import { mdiCart, mdiMagnify } from "@mdi/js"; // Importing search icon

export default function Navbar() {
  return (
    <>
      <nav className="fixed top-0 bg-amber-500 w-full z-10">
        <div className="mx-auto px-10 flex items-center justify-between h-16">
          <div>
            {" "}
            {/* Left side content of the navbar */}
            {/* Add empty div to push the icon to the right */}
          </div>
          <div className="flex items-center">
            {" "}
            {/* Middle content of the navbar */}
            <div className="relative">
              <input
                type="text"
                className="bg-white rounded-lg py-2 px-4 pr-10 focus:outline-none"
                placeholder="Search"
              />
              <Icon
                path={mdiMagnify}
                size={1}
                color="gray"
                className="absolute right-3 top-3 pointer-events-none"
              />
            </div>
          </div>
          <div className="flex items-center">
            {" "}
            {/* Right side content of the navbar */}
            <Icon path={mdiCart} size={1.5} color="white" />
          </div>
        </div>
      </nav>
    </>
  );
}
