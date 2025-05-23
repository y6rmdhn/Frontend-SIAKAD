import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationLinkType {
  url: string | null;
  label: string;
  active: boolean;
}

interface CustomPaginationProps {
  currentPage: number;
  links?: PaginationLinkType[];
  onPageChange: (page: number) => void;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
  totalPages?: number;
}

const CustomPagination = ({
  currentPage,
  onPageChange,
  hasNextPage,
  hasPrevPage,
  totalPages,
}: CustomPaginationProps) => {
  const renderPageLinks = () => {
    const pages: number[] = [];

    if (!totalPages) return [];

    let start = Math.max(1, currentPage - 1);
    let end = Math.min(totalPages, currentPage + 1);

    if (currentPage === 1) {
      end = Math.min(3, totalPages);
    } else if (currentPage === totalPages) {
      start = Math.max(1, totalPages - 2);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <Pagination className="mt-8 flex justify-center sm:justify-end">
      <PaginationContent className="flex flex-wrap gap-2">
        {/* Previous Button */}
        <PaginationItem>
          <Button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={!hasPrevPage || currentPage === 1}
            variant="ghost"
            type="button"
            className="text-sm px-2 sm:px-4"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline ml-1">Previous</span>
          </Button>
        </PaginationItem>

        {/* Ellipsis at start */}
        {currentPage > 3 && (
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
              onClick={(e) => {
                e.preventDefault();
                onPageChange(page);
              }}
              className="text-sm px-3"
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}

        {/* Ellipsis at end */}
        {totalPages && currentPage < totalPages - 2 && (
          <PaginationItem className="hidden sm:block">
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {/* Next Button */}
        <PaginationItem>
          <Button
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={!hasNextPage || currentPage === totalPages}
            variant="ghost"
            className="text-sm px-2 sm:px-4"
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
