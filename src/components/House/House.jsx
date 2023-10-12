// House.js or House.jsx
import React from "react";

export default function House({ country, price, address }) {
  return (
    <div className="p-6">
      <div className="relative">
        <img src="/house.jpg" className="object-cover rounded-2xl" alt="House" />
        <div className="absolute text-black font-bold bottom-6 text-xl ml-2">
          {country}
        </div>
      </div>
      <div className="flex justify-between">
        <div>
          <p className="font-semibold">$ {price}</p>
          <p>{address}</p>
        </div>
      </div>
    </div>
  );
}
