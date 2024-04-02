// PaginationControls.tsx
"use client";
import { FC } from "react";
import { useRouter } from "next/router";

interface PaginationControlsProps {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  currentPage: number;
  totalPages: number;
}

const PaginationControls: FC<PaginationControlsProps> = ({
  hasNextPage,
  hasPrevPage,
  currentPage,
  totalPages,
}) => {
  const router = useRouter();

  const goToPage = (page: number) => {
    router.push(`/?page=${page}`);
  };

  return (
    <div className="flex gap-2">
      <button
        className="bg-blue-500 text-white p-1"
        disabled={!hasPrevPage}
        onClick={() => goToPage(currentPage - 1)}
      >
        Prev page
      </button>

      <div>
        {currentPage} / {totalPages}
      </div>

      <button
        className="bg-blue-500 text-white p-1"
        disabled={!hasNextPage}
        onClick={() => goToPage(currentPage + 1)}
      >
        Next page
      </button>
    </div>
  );
};

export default PaginationControls;
