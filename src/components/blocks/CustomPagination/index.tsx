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
  total?: number;
  page?: number;
  limit?: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface CustomPaginationProps {
  pagination?: PaginationMeta | null | undefined;
  onPageChange: (page: number) => void;
  currentPage?: number;
  totalPages?: number;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
  links?: any;
}

const CustomPagination = ({
  pagination,
  onPageChange,
  currentPage,
  totalPages,
  hasNextPage,
  hasPrevPage,
}: CustomPaginationProps) => {
  const activePagination = pagination || {
    page: currentPage ?? 1,
    totalPages: totalPages ?? 1,
    hasNextPage: hasNextPage ?? false,
    hasPrevPage: hasPrevPage ?? false,
  };

  if (!activePagination || activePagination.totalPages <= 1) return null;

  const {
    page: resolvedPage = 1,
    totalPages: resolvedTotalPages,
    hasNextPage: resolvedHasNextPage,
    hasPrevPage: resolvedHasPrevPage,
  } = activePagination;

  const renderPageLinks = () => {
    const pages: number[] = [];
    let start = Math.max(1, resolvedPage - 1);
    let end = Math.min(resolvedTotalPages, resolvedPage + 1);

    if (resolvedPage === 1 && resolvedTotalPages > 2) end = 3;
    else if (resolvedPage === resolvedTotalPages && resolvedTotalPages > 2) start = resolvedTotalPages - 2;

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
            disabled={!resolvedHasPrevPage}
            onClick={() => onPageChange(resolvedPage - 1)}
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline ml-1">Previous</span>
          </Button>
        </PaginationItem>

        {/* Left ellipsis */}
        {resolvedPage > 2 && (
          <PaginationItem className="hidden sm:block">
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Page numbers */}
        {renderPageLinks().map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href="#"
              isActive={page === resolvedPage}
              onClick={(e) => { e.preventDefault(); onPageChange(page); }}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Right ellipsis */}
        {resolvedPage < resolvedTotalPages - 1 && (
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
            disabled={!resolvedHasNextPage}
            onClick={() => onPageChange(resolvedPage + 1)}
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