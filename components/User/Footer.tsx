import Link from "next/link";
import { FaHeart } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="bg-[#191919] text-[#b9b9b9] p-4 flex items-center justify-center gap-1.5">
      Made With <FaHeart className="text-red-800" /> By{" "}
      <a href="https://mahmoud-ahmed-portofolio.vercel.app/" target="_blank" className="text-main">
        Mahmoud Ahmed
      </a>
    </div>
  );
}
