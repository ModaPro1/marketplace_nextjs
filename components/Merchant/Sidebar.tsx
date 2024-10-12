"use client";

import clsx from "clsx";
import Link from "next/link";
import { ReactNode, useContext, useEffect, useRef } from "react";
import { CgShoppingCart } from "react-icons/cg";
import { FaArrowLeft } from "react-icons/fa";
import { GiShoppingCart } from "react-icons/gi";
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import CopyLink from "./CopyLink";
import { SidebarContext } from "@/context/MerchantSidebarContext";
import { motion } from "framer-motion";
import { PiShoppingBag } from "react-icons/pi";
import { usePathname } from "next/navigation";
import { LuBell } from "react-icons/lu";

function NavLink(props: { link: string; children: ReactNode; isHome?: boolean }) {
  const pathname = usePathname();

  return (
    <li>
      <Link
        href={props.link}
        className={clsx("flex gap-2 p-2 text-[#dee4ee] transition items-center rounded-md hover:bg-[#333a48]", {
          "bg-[#333a48]": props.isHome ? pathname == props.link : pathname.startsWith(props.link),
        })}
      >
        {props.children}
      </Link>
    </li>
  );
}

export default function MerchantSidebar({ userId }: { userId: string }) {
  const { menuIsOpen, toggleMenu } = useContext(SidebarContext);
  const sidebarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (!sidebarRef.current?.contains(target) && menuIsOpen) {
        toggleMenu();
      }
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [menuIsOpen]);

  return (
    <motion.aside
      ref={sidebarRef}
      animate={{ left: menuIsOpen ? 0 : "-100%" }}
      transition={{ duration: 0.4 }}
      className="bg-[#1c2434] min-w-64 min-h-[100vh] z-50 fixed sm:static p-4 text-white"
    >
      <div className="flex gap-5">
        <Link href={"/merchant_dashboard"} className={`flex gap-2 text-xl items-center font-medium tracking-wide`}>
          <GiShoppingCart className="text-main text-3xl" />
          <span>Merchant Admin</span>
        </Link>
        <button className="sm:hidden" onClick={toggleMenu}>
          <FaArrowLeft color="#64748b" />
        </button>
      </div>
      <ul className="mt-3.5 pt-3.5 border-t border-t-gray-700 space-y-2">
        <NavLink link="/merchant_dashboard" isHome>
          <HiOutlineSquares2X2 />
          Dashboard
        </NavLink>
        <NavLink link="/merchant_dashboard/products">
          <PiShoppingBag />
          Products
        </NavLink>
        <NavLink link="/merchant_dashboard/orders">
          <CgShoppingCart />
          Orders
        </NavLink>
        <NavLink link="/merchant_dashboard/notifications">
          <LuBell />
          Notifications
        </NavLink>
        <CopyLink merchant_id={userId} />
      </ul>
    </motion.aside>
  );
}
