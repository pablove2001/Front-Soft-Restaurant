"use client";

import Icon from "@mdi/react";
import React, { useState } from "react";
import { mdiCart, mdiMagnify } from "@mdi/js"; // Importing search icon
import Image from "next/image";

interface KioskoNavbarProps {
  inputValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

function KioskoNavbar({ inputValue, onInputChange }: KioskoNavbarProps) {
  return (
    <>
      <nav className="fixed top-0 bg-amber-500 w-full z-10">
        <div className="mx-auto px-10 flex items-center justify-between h-16">
          <div>
            {/* Left side content of the navbar */}
            <a href="/waiter">
              <Image
                src="/t_de_taco_horizontal.png"
                alt="logo"
                width={80}
                height={80}
              />
            </a>

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
                value={inputValue}
                onChange={onInputChange}
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
          </div>
        </div>
      </nav>
    </>
  );
}

export default KioskoNavbar;
