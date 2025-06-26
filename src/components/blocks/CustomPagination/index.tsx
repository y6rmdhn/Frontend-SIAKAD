import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

// 1. Definisikan SEMUA kemungkinan props. Buat props lama menjadi opsional (?).
interface CustomPaginationProps {
  currentPage: number;
  onPageChange: (page: number) => void;

  // Props untuk "Mode Pintar" (cara baru)
  data?: any;

  // Props untuk "Mode Lama" (cara lama)
  links?: any[]; // `links` tetap ada untuk backward compatibility
  hasNextPage?: boolean;
  hasPrevPage?: boolean;
  totalPages?: number;
}

const CustomPagination = (props: CustomPaginationProps) => {
  const { currentPage, onPageChange } = props;

  // --- LOGIKA UTAMA: DETEKSI MODE ---
  let totalPages: number | undefined;
  let hasNextPage: boolean;
  let hasPrevPage: boolean;

  // JIKA prop `data` diberikan, kita masuk "Mode Pintar"
  if (props.data) {
    // Skenario 1.1: `data` memiliki object `pagination`
    if (props.data.pagination && typeof props.data.pagination === "object") {
      totalPages = props.data.pagination.last_page;
      hasPrevPage = currentPage > 1;
      hasNextPage = totalPages ? currentPage < totalPages : false;
    }
    // Skenario 1.2: `data` memiliki `next_page_url`
    else {
      totalPages = props.data.last_page;
      hasPrevPage = !!props.data.prev_page_url;
      hasNextPage = !!props.data.next_page_url;
    }
  }
  // JIKA `data` TIDAK diberikan, kita masuk "Mode Lama"
  else {
    totalPages = props.totalPages;
    // Gunakan props eksplisit, beri nilai default `false` jika tidak ada
    hasNextPage = props.hasNextPage ?? false;
    hasPrevPage = props.hasPrevPage ?? false;
  }
  // --- AKHIR LOGIKA UTAMA ---

  if (!totalPages || totalPages <= 1) {
    return null;
  }

  // Logika render halaman tidak perlu diubah, karena ia menggunakan variabel
  // `totalPages` dan `currentPage` yang sudah kita tentukan di atas.
  const renderPageLinks = () => {
    const pages: number[] = [];
    if (!totalPages) return [];
    let start = Math.max(1, currentPage - 1);
    let end = Math.min(totalPages, currentPage + 1);
    if (currentPage === 1 && totalPages > 2) {
      end = 3;
    } else if (currentPage === totalPages && totalPages > 2) {
      start = totalPages - 2;
    }
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <Pagination className="mt-8 flex justify-center sm:justify-end">
      <PaginationContent className="flex flex-wrap gap-2">
        <PaginationItem>
          <Button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={!hasPrevPage}
            type="button"
            variant="ghost"
            className="text-sm px-2 sm:px-4"
          >
            <ChevronLeft className="h-4 w-4" />
            <span className="hidden sm:inline ml-1">Previous</span>
          </Button>
        </PaginationItem>

        {currentPage > 2 && (
          <PaginationItem className="hidden sm:block">
            <PaginationEllipsis />
          </PaginationItem>
        )}
        {renderPageLinks().map((page) => (
          <PaginationItem key={page}>
            <PaginationLink
              href="#"
              isActive={page === currentPage}
              onClick={(e) => {
                e.preventDefault();
                onPageChange(page);
              }}
            >
              {page}
            </PaginationLink>
          </PaginationItem>
        ))}
        {totalPages && currentPage < totalPages - 1 && (
          <PaginationItem className="hidden sm:block">
            <PaginationEllipsis />
          </PaginationItem>
        )}

        <PaginationItem>
          <Button
            type="button"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={!hasNextPage}
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
