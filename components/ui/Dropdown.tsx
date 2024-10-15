"use client";

import { ReactNode, useState, useEffect, useRef, MouseEvent } from "react";
import { motion } from "framer-motion";

export default function Dropdown({
  icon,
  children,
  count,
  showPing,
  onOpen,
  disabled
}: {
  icon: ReactNode;
  children: ReactNode;
  count?: number;
  showPing?: boolean;
  onOpen?: () => void;
  disabled?: boolean
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const handleDocumentClick = (e: Event) => {
      const target = e.target as Node;
      if (dropdownRef.current && (!dropdownRef.current.contains(target))) {
        setIsOpen(false);
      }
    };
  
    document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);  

  useEffect(() => {
    if(isOpen && onOpen) {
      onOpen()
    }
  }, [isOpen])

  function handleClick(e: MouseEvent<HTMLDivElement>) {
    const target = e.target as HTMLElement;
    if(target.tagName == "A") {
      setIsOpen(false)
    }
  }

  return (
    <div className="dropdown relative z-40" ref={dropdownRef}>
      <div className={`relative transition ${disabled ? "opacity-50" : ''}`}>
        {count && count > 0 ? (
          <div className="absolute w-4 h-4 -right-2 -top-2 rounded-full bg-main text-white text-xs flex justify-center items-center">
            {count}
          </div>
        ) : (
          ""
        )}
        {showPing && (
          <span className="absolute flex h-2 w-2 left-[calc(100%-5px)] -top-2 ">
            <span className="animate-ping h-full w-full rounded-full bg-red-400 opacity-75"></span>
            <span className="w-full h-full absolute rounded-full bg-red-500"></span>
          </span>
        )}
        <button disabled={disabled || false} className="dropdown-icon cursor-pointer block disabled:cursor-default" onClick={() => setIsOpen((prev) => !prev)}>
          {icon}
        </button>
      </div>
      <motion.div
        onClick={handleClick}
        initial={{ display: "none", opacity: 0, scale: 0.9 }}
        animate={{ display: isOpen ? "block" : "none", opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0.9 }}
        transition={{ duration: 0.2 }}
        className="dropdown-content absolute min-w-32 right-0 top-[calc(100%+5px)] rounded-md border border-gray-100 shadow-md bg-white overflow-hidden"
      >
        {children}
      </motion.div>
    </div>
  );
}
