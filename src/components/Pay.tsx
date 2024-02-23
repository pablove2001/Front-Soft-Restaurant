import React from "react";
import Icon from "@mdi/react";
import { mdiCart } from "@mdi/js";

const Pay = () => {
  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-center">
      <button className="bg-green-500 text-white py-4 px-8 rounded-lg shadow-lg">
        <Icon path={mdiCart} size={1} className="inline-block mr-2" />
        Pay $750
      </button>
    </div>
  );
};

export default Pay;
