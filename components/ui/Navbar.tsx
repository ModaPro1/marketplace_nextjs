'use client'
import { useEffect, useRef } from "react";
import NavItems from "./NavItems";

export default function MainNavbar() {
  const navbarRef = useRef<HTMLElement>(null)
  useEffect(() => {
    window.onscroll = () => {
      if(scrollY > 100) {
        navbarRef.current?.classList.add("bg-white")
      } else {
        navbarRef.current?.classList.remove("bg-white")
      }
    }
  }, [])

  return (
    <nav className="fixed w-full z-50" ref={navbarRef}>
      <div className="custom-container flex justify-between items-center">
        <NavItems />
      </div>
    </nav>
  );
}
