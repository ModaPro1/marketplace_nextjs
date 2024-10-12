"use client";

import Link from "next/link";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { motion } from "framer-motion";
import { IoIosSearch } from "react-icons/io";
import { FaRegUserCircle } from "react-icons/fa";
import Dropdown from "./Dropdown";
import { GiShoppingCart } from "react-icons/gi";
import { PiShoppingCartBold } from "react-icons/pi";

export default function NavItems() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="py-4 flex gap-10 items-center justify-between flex-1 md:flex-auto md:justify-normal">
        <h1 className="flex gap-2 text-lg items-center uppercase font-medium tracking-wide">
          <GiShoppingCart className="text-main text-3xl" />
          MODASHOP
        </h1>

        {/* Big Screens */}
        <ul className="hidden md:flex gap-2 ">
          <li>
            <Link href="#">Home</Link>
          </li>
          <li>
            <Link href="#">Shop</Link>
          </li>
          <li>
            <Link href="#">Categories</Link>
          </li>
          <li>
            <Link href="#">Contact</Link>
          </li>
        </ul>

        {/* Mobile Screens */}
        <RxHamburgerMenu className="cursor-pointer text-xl md:hidden" onClick={() => setMenuOpen((prev) => !prev)} />
        <motion.ul
          className="select-none px-4 absolute bg-white/75 z-50 top-full left-0 w-full md:hidden overflow-hidden h-0 max-h-[calc(100vh-62px)] text-center"
          animate={{
            height: menuOpen ? "100vh" : "0",
            transition: { duration: 0.3 },
          }}
        >
          <div className="pt-52 space-y-4">
            <li>
              <Link href="#">Home</Link>
            </li>
            <li>
              <Link href="#">Shop</Link>
            </li>
            <li>
              <Link href="#">Categories</Link>
            </li>
            <li>
              <Link href="#">Contact</Link>
            </li>
          </div>
        </motion.ul>
      </div>

      {/* Search Bar */}
      <div className="hidden md:flex gap-6 items-center w-1/3 lg:w-1/2">
        <form className="relative flex-1">
          <input
            type="text"
            className="bg-gray-100 px-2 py-1 rounded-md w-full focus:outline-none"
            placeholder="Search"
          />
          <IoIosSearch className="absolute right-2 top-[50%] translate-y-[-50%] text-lg " />
        </form>

        {/* User Dropdown */}
        <div className="flex gap-4">
          <Dropdown icon={<FaRegUserCircle className="text-xl" />}>
            <div className="flex flex-col gap-2 px-3 py-2">
              <Link href="/login">Login</Link>
              <Link href="/login">Sign up</Link>
            </div>
          </Dropdown>
          <Dropdown icon={<PiShoppingCartBold className="text-xl" />}>
            <Link href="/login">Login</Link>
            <Link href="/login">Sign up</Link>
          </Dropdown>
        </div>
      </div>
    </>
  );
}
