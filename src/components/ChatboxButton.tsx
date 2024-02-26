import React from "react";
import Icon from "@mdi/react";
import { mdiMessage } from "@mdi/js";

const ChatboxButton = ({ onClick }: { onClick: () => void }) => {
  return (
    <div className="fixed bottom-2 left-2">
      <button
        className="bg-black hover:bg-gray-900 text-white rounded-full p-4 shadow-lg"
        onClick={onClick}
      >
        <Icon path={mdiMessage} size={1} />
      </button>
    </div>
  );
};

export default ChatboxButton;
