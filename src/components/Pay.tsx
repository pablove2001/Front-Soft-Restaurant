// Pay.js
import React from "react";
import Icon from "@mdi/react";
import { mdiCart } from "@mdi/js";

const Pay = ({
  totalAmount,
  disabled,
}: {
  totalAmount: number;
  disabled: boolean;
}) => {
  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-center">
      <button
        className={`py-4 px-8 rounded-lg shadow-lg ${
          disabled
            ? "bg-gray-500 cursor-not-allowed"
            : "bg-green-500 hover:bg-green-600"
        } text-white`}
        disabled={disabled}
      >
        <Icon path={mdiCart} size={1} className="inline-block mr-2" />
        Pay ${totalAmount}
      </button>
    </div>
  );
};

export default Pay;
