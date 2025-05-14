import { useTranslate } from "@/locales";
import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const { t } = useTranslate("overview");

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 10) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 4) {
        pages.push("...");
      }

      const start = Math.max(2, currentPage - 2);
      const end = Math.min(totalPages - 1, currentPage + 2);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 3) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const pages = getPageNumbers();

  return (
    <div className="flex items-center justify-center w-full gap-3 text-primary-color text-[16px] mt-6 dark:text-white">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="disabled:opacity-40 hover:cursor-pointer"
      >
        {t("prev")}
      </button>

      {pages.map((page, index) =>
        typeof page === "number" ? (
          <button
            key={index}
            onClick={() => onPageChange(page)}
            className={`w-8 h-8 flex items-center justify-center rounded ${
              page === currentPage
                ? "bg-[#1C2141] text-white dark:bg-white dark:text-black"
                : "hover:bg-gray-200"
            } hover:cursor-pointer`}
          >
            {page}
          </button>
        ) : (
          <span key={index} className="px-2">
            {page}
          </span>
        )
      )}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="disabled:opacity-40 hover:cursor-pointer"
      >
        {t("next")}
      </button>
    </div>
  );
};

export default Pagination;
