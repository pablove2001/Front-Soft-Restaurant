"use client";

import React, { useState } from "react";
import Icon from "@mdi/react";
import { mdiMessage, mdiSend, mdiClose } from "@mdi/js";

const ChatboxButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>(
    []
  );

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  const sendMessage = () => {
    // Logic to send the message
  };

  return (
    <div className="fixed bottom-2 left-2">
      <button
        className="bg-black hover:bg-gray-900 text-white rounded-full p-4 shadow-lg"
        onClick={openModal}
      >
        <Icon path={mdiMessage} size={1} />
      </button>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 rounded-lg w-96">
            <h1 className="text-center font-bold">Chatbox</h1>
            <div className="h-40 overflow-y-auto">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`mb-4 ${
                    msg.sender === "user" ? "text-right" : "text-left"
                  }`}
                >
                  {msg.text}
                </div>
              ))}
            </div>
            <h1>-------------------------------------------</h1>
            <div className="mt-4 flex">
              <button
                onClick={sendMessage}
                className="bg-gray-400 hover:bg-green-600 text-white p-2 rounded-r-md mr-1" // Added mr-1 for margin
              >
                ¿Cómo puedo ordenar?
              </button>
              <button
                className="bg-gray-400 hover:bg-green-600 text-white p-2 rounded-r-md"
                onClick={sendMessage}
              >
                ¿Qué productos venden?
              </button>
            </div>
            <div className="mt-4 flex">
              <button
                onClick={sendMessage}
                className="bg-gray-400 hover:bg-green-600 text-white p-2 rounded-r-md mr-1" // Added mr-1 for margin
              >
                ¿Rango precios?
              </button>
              <button
                className="bg-gray-400 hover:bg-green-600 text-white p-2 rounded-r-md mr-1"
                onClick={sendMessage}
              >
                ¿Qué incluye?
              </button>
              <button
                className="bg-red-400 hover:bg-red-600 text-white p-2 rounded-r-md"
                onClick={closeModal}
              >
                <Icon path={mdiClose} size={1} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatboxButton;
