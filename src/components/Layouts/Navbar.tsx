import React from "react";
import { AiOutlineUser } from "react-icons/ai";
import styled from "./Navbar.module.scss";
import { FaBasketShopping } from "react-icons/fa6";

export const Navbar = () => {
  return (
    <nav className={`bg-white w-screen h-16 ${styled.navbar1}`}>
      <div className="w-full py-4 px-24 mobile:px-4 tablet:px-10 flex justify-between items-center">
        <div className="flex justify-start items-center">
          <div className="border border-[#2c2c2c] rounded-full bg-white p-2">
            <FaBasketShopping size={20} />
          </div>
          <p className="label-h2 ml-2">ตะกร้าสินค้า</p>
        </div>
        <div className="flex flex-row justify-center items-center">
          <div className="border border-[#2c2c2c] px-4 py-1 flex justify-center items-center rounded-2xl">
            pandoraedo24
          </div>
          <AiOutlineUser
            size={28}
            className="ml-4 rounded-full border border-[#2c2c2c]"
          />
        </div>
      </div>
    </nav>
  );
};
