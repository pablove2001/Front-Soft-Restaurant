// "use client";

import { useEffect, useState } from "react";

import ProductKiosko from "@/components/ProductKiosko";
import Navbar from "@/components/Navbar";
import Pay from "@/components/Pay";

export default function Kiosko() {
  return (
    <div className="">
      <Navbar />
      <br />
      <div className="grid grid-cols-3 gap-12 max-w-4xl mx-auto my-12">
        <ProductKiosko />
        <ProductKiosko />
        <ProductKiosko />
        <ProductKiosko />
        <ProductKiosko />
        <ProductKiosko />
        <ProductKiosko />
        <ProductKiosko />
        <ProductKiosko />
        <ProductKiosko />
        <ProductKiosko />
        <ProductKiosko />
        <ProductKiosko />
        <ProductKiosko />
        <ProductKiosko />
        <ProductKiosko />
        <ProductKiosko />
        <ProductKiosko />
        <ProductKiosko />
        <ProductKiosko />
        <ProductKiosko />
      </div>
      <Pay />
    </div>
  );
}
