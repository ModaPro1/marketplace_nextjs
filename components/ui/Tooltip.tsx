"use client";
import { ReactNode, useState } from "react";
import { motion } from "framer-motion";

export default function Tooltip({ children, text, classes }: { children: ReactNode; text: string, classes?: string }) {
  const [show, setShow] = useState(false);
  let timeout: number | undefined;

  function showTooltip() {
    timeout = window.setTimeout(() => {
      setShow(true);
    }, 500);
  }

  function hideTooltip() {
    setShow(false);
    if (timeout) {
      clearTimeout(timeout);
    }
  }


  return (
    <div className="relative flex" onMouseEnter={showTooltip} onMouseLeave={hideTooltip}>
      {children}
      <motion.div
        animate={{ display: show ? "block" : "none", opacity: show ? 1 : 0, scale: show ? 1 : 0.9, translateX: "-50%" }}
        className={`absolute hidden bottom-full left-1/2 whitespace-nowrap text-[10px] px-2 bg-[#333] text-white rounded-md ${classes ? classes : ''}`}
      >
        {text}
      </motion.div>
    </div>
  );
}
