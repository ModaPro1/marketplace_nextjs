"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import LoadingDots from "../ui/LoadingDots";

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
          className={`w-8 h-8 flex justify-center items-center ${
            selectedPagination === i ? "bg-main text-white" : "bg-gray-300"
          } rounded`}
          onClick={() => paginationClick(i)}
        >
          {i + 1}
        </button>
      );
    }
    return pages;
  };

  if (loading) {
    return <LoadingDots classes="mt-2 h-8 flex items-center" />;
  }

  if (totalPages > 1) {
    return <div className="flex space-x-3">{createPageNumbers()}</div>;
  }
}
