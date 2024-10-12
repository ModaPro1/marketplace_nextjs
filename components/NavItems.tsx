"use client";

import Link from "next/link";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { motion } from "framer-motion";
import { FaRegUserCircle } from "react-icons/fa";
import Dropdown from "./ui/Dropdown";
import NavbarSearch from "./Search";
import MainLogo from "./ui/Logo";
import { AiOutlineUser } from "react-icons/ai";
import { MdOutlineLogout } from "react-icons/md";
import { signout } from "@/actions/auth";
import { SessionData } from "@/lib/auth";
import { PiShoppingBagBold } from "react-icons/pi";
import CartDropdown from "./Cart/CartDropdown";
import { CartWithProduct } from "@/actions/user";
import { HiOutlineClipboardList } from "react-icons/hi";

export default function NavItems(props: {
  session: SessionData;
  user: any;
  cartData: CartWithProduct[];
  userHasOrders: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <div className="py-4 flex gap-10 items-center justify-between flex-1 md:flex-auto md:justify-normal">
        <MainLogo />

        {/* Big Screens */}
        <ul className="hidden md:flex gap-2 ">
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/products">Shop</Link>
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
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/products">Shop</Link>
            </li>
            <li>
              <Link href="#">Contact</Link>
            </li>
          </div>
        </motion.ul>
      </div>

      {/* Search Bar */}
      <div className="hidden md:flex gap-6 items-center w-1/3 lg:w-1/2">
        <NavbarSearch />

        {/* User Dropdown */}
        <div className="flex gap-4">
          {props.user ? (
            <>
              <Dropdown icon={<FaRegUserCircle className="text-xl" />}>
                <div className="flex flex-col px-3 py-2 w-[180px]">
                  <h5 className="text-sm font-[500] mb-3">
                    {props.session.userType == "user" ? props.user.name : props.user.store_name}
                  </h5>
                  <Link href="/profile" className="flex gap-2 items-center text-sm">
                    <AiOutlineUser fontSize={17} />
                    Profile
                  </Link>
                  {props.session.userType == "user" && props.userHasOrders && (
                    <Link href="/orders" className="flex gap-1.5 items-center text-sm mt-3">
                      <HiOutlineClipboardList fontSize={17} />
                      My Orders
                    </Link>
                  )}
                  {props.session.userType == "merchant" && (
                    <Link href="/merchant_dashboard " className="flex gap-2 items-center text-sm border-t pt-1.5 mt-1.5">
                      <PiShoppingBagBold fontSize={17} />
                      Dashboard
                    </Link>
                  )}
                  <button
                    onClick={async () => {
                      await signout();
                    }}
                    className="flex gap-2 items-center text-sm border-t pt-1.5 mt-1.5"
                  >
                    <MdOutlineLogout fontSize={17} />
                    Sign Out
                  </button>
                </div>
              </Dropdown>
              {props.session.userType == "user" && <CartDropdown />}
            </>
          ) : (
            <Dropdown icon={<FaRegUserCircle className="text-xl" />}>
              <div className="px-3 py-2">
                <Link href="/login" className="block">
                  Login
                </Link>
                <Link href="/signup" className="block mt-1">
                  Sign up
                </Link>
              </div>
            </Dropdown>
          )}
        </div>
      </div>
    </>
  );
}
