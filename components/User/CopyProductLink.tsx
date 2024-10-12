'use client'
import { LuShare2 } from "react-icons/lu";
import Tooltip from "../ui/Tooltip";
import { toast } from "react-toastify";

export default function CopyProductLink({ link }: { link: string }) {
  function copyLink() {
    let linkToCopy = window.location.host + link;
    navigator.clipboard.writeText(linkToCopy);

    toast.info("Product Link Copied", {
      autoClose: 1500,
      closeOnClick: true
    })
  }
  return (
    <Tooltip text="Product Link" classes="py-1">
      <button className="px-6 py-3 rounded-3xl bg-gray-200" onClick={copyLink}>
        <LuShare2 fontSize={20} />
      </button>
    </Tooltip>
  );
}
