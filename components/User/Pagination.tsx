"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoadingDots from "../ui/LoadingDots";
import { TfiAngleLeft, TfiAngleRight } from "react-icons/tfi";

export default function Pagination({ totalPages, currentPage }: { totalPages: number; currentPage: number }) {
  const [selectedPagination, setSelectedPagination] = useState(currentPage);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  function paginationClick(i: number) {
    setSelectedPagination(i);
    setLoading(true);
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set("page", i.toString());
    const newPathname = `/products?${currentParams.toString()}`;
    router.push(newPathname);
  }

  const createPageNumbers = () => {
    const pages = [];
    for (let i = 0; i < totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={`${
            selectedPagination === i ? "bg-main text-white" : "text-slate-600"
          } hover:bg-main hover:text-white`}
          onClick={() => paginationClick(i)}
        >
          {i + 1}
        </button>
      );
    }
    return pages;
  };

  if (totalPages > 1) {
    return (
      <>
        {loading && (
          <div className="bg-white shadow rounded fixed left-1/2 top-1/2 translate-x-[-50%] translate-y-[-50%] w-20 h-20 flex justify-center items-center z-50">
            <LoadingDots />
          </div>
        )}
        <div className="flex space-x-2 *:w-8 *:h-8 *:flex *:justify-center *:items-center *:rounded *:font-medium">
          <button
            className="text-slate-600 hover:bg-main hover:text-white disabled:opacity-60"
            disabled={selectedPagination == 0}
            onClick={() => paginationClick(selectedPagination - 1)}
          >
            <TfiAngleLeft />
          </button>
          {createPageNumbers()}
          <button
            className="text-slate-600 hover:bg-main hover:text-white disabled:opacity-60"
            disabled={selectedPagination + 1 == totalPages}
            onClick={() => paginationClick(selectedPagination + 1)}
          >
            <TfiAngleRight />
          </button>
        </div>
      </>
    );
  }
}
