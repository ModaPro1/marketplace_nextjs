"use client";

import { FaLink } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { RiLinksLine } from "react-icons/ri";

export default function CopyLink({ merchant_id }: { merchant_id: string }) {
  function copyLink() {
    let link = window.location.host + "/merchant/" + merchant_id;
    navigator.clipboard.writeText(link);

    toast.info("Store Link Copied", {
      autoClose: 1500,
      closeOnClick: true
    })
  }

  return (
    <button onClick={copyLink} className="flex gap-2 p-2 text-[#dee4ee] transition items-center rounded-md hover:bg-[#333a48] w-full">
      <RiLinksLine />
      Store link
    </button>
  );
}
