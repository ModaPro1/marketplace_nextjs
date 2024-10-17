"use client";

import Link from "next/link";
import { MouseEvent, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import { motion } from "framer-motion";
import NavbarSearch from "../Search";
import MainLogo from "../ui/Logo";
import { SessionData } from "@/lib/auth";
import { CartWithProduct } from "@/actions/user";
import UserDropdown from "./UserDropdown";

export default function NavItems(props: {
  session: SessionData;
  user: any;
  cartData: CartWithProduct[];
  userHasOrders: boolean;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const handleMobileLinksClick = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;

    if (target.tagName === "A") {
      setMenuOpen(false);
    }
  };

  return (
    <>
      <div className="py-4 flex gap-10 items-center justify-between flex-1 md:flex-auto md:justify-normal">
        <MainLogo />

        {/* Big Screens */}
        <ul className="hidden md:flex gap-2">
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
          className="select-none px-4 absolute bg-white/75 z-50 top-full left-0 w-full md:hidden overflow-hidden h-0 max-h-[calc(100vh-62px)]"
          animate={{
            height: menuOpen ? "100vh" : "0",
            transition: { duration: 0.3 },
          }}
        >
          <div className="space-y-2" onClick={handleMobileLinksClick}>
            <NavbarSearch />
            <li>
              <Link href="/" className="block p-2 border text-sm rounded">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="block p-2 border text-sm rounded">
                Shop
              </Link>
            </li>
            <li>
              <Link href="#" className="block p-2 border text-sm rounded">
                Contact
              </Link>
            </li>
          </div>
            <div className="mt-5">
              <UserDropdown isLoggedIn={!!props.user} userName={props.user?.name} userHasOrders={props.userHasOrders} />
            </div>
        </motion.ul>
      </div>

      {/* Search Bar */}
      <div className="hidden md:flex gap-6 items-center w-1/3 lg:w-1/2">
        <NavbarSearch />

        {/* User Dropdown */}
        <UserDropdown isLoggedIn={!!props.user} userName={props.user?.name} userHasOrders={props.userHasOrders} />
      </div>
    </>
  );
}
