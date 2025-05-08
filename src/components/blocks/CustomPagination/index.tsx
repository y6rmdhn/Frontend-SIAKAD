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
  links: PaginationLinkType[];
  onPageChange: (page: number) => void;
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
  totalPages?: number;
}

const CustomPagination = ({
  currentPage,
  links,
  onPageChange,
  hasNextPage,
  hasPrevPage,
  totalPages,
}: CustomPaginationProps) => {
  return (
    <Pagination className="mt-8 flex justify-end">
      <PaginationContent>
        <PaginationItem>
          <Button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={!hasPrevPage || currentPage === 1}
            variant="ghost"
            type="button"
          >
            <ChevronLeft /> Previous
          </Button>
        </PaginationItem>

        {links
          .filter((link) => /^\d+$/.test(link.label))
          .map((link, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                href="#"
                isActive={link.active}
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(Number(link.label));
                }}
              >
                {link.label}
              </PaginationLink>
            </PaginationItem>
          ))}

        {totalPages && totalPages > 3 && <PaginationEllipsis />}
        <PaginationItem>
          <Button
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={!hasNextPage}
            variant="ghost"
          >
            Next <ChevronRight />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default CustomPagination;
