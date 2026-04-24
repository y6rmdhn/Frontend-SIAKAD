import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface CustomPaginationProps {
  pagination: PaginationMeta | null | undefined;
  onPageChange: (page: number) => void;
}

const CustomPagination = ({ pagination, onPageChange }: CustomPaginationProps) => {
  if (!pagination || pagination.totalPages <= 1) return null;

  const { page: currentPage, totalPages, hasNextPage, hasPrevPage } = pagination;

  const renderPageLinks = () => {
    const pages: number[] = [];
    let start = Math.max(1, currentPage - 1);
    let end = Math.min(totalPages, currentPage + 1);

    if (currentPage === 1 && totalPages > 2) end = 3;
    else if (currentPage === totalPages && totalPages > 2) start = totalPages - 2;

    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
  };

  return (
    <Pagination className="mt-8 flex justify-center sm:justify-end">
      <PaginationContent className="flex flex-wrap gap-2">

        {/* Previous */}
        <PaginationItem>
          <Button
            type="button"
            variant="ghost"
            className="text-sm px-2 sm:px-4"
            disabled={!hasPrevPage}
            onClick={() => onPageChange(currentPage - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline ml-1">Previous</span>
          </Button>
        </PaginationItem>

        {/* Left ellipsis */}
        {currentPage > 2 && (
          <PaginationItem className="hidden sm:block">
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Page numbers */}
        {renderPageLinks().map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href="#"
              isActive={page === currentPage}
              onClick={(e) => { e.preventDefault(); onPageChange(page); }}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Right ellipsis */}
        {currentPage < totalPages - 1 && (
          <PaginationItem className="hidden sm:block">
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Next */}
        <PaginationItem>
          <Button
            type="button"
            variant="ghost"
            className="text-sm px-2 sm:px-4"
            disabled={!hasNextPage}
            onClick={() => onPageChange(currentPage + 1)}
          >
            <span className="hidden sm:inline mr-1">Next</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </PaginationItem>

      </PaginationContent>
    </Pagination>
  );
};

export default CustomPagination;