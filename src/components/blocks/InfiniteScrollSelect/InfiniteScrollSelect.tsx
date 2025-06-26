import { useInfiniteQuery } from "@tanstack/react-query";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

type InfiniteScrollSelectProps = {
  form: any;
  name: string;
  label?: string;
  placeholder?: string;
  labelStyle?: string;
  required?: boolean;
  queryKey: string;
  queryFn: (page: number) => Promise<any>;
  itemValue: string;
  itemLabel: string;
};

export const InfiniteScrollSelect = ({
  form,
  name,
  label,
  placeholder,
  labelStyle,
  required,
  queryKey,
  queryFn,
  itemValue,
  itemLabel,
}: InfiniteScrollSelectProps) => {
  const { data, fetchNextPage, hasNextPage, isLoading, isFetchingNextPage } =
    useInfiniteQuery({
      queryKey: [queryKey],
      queryFn: async ({ pageParam = 1 }) => {
        const response = await queryFn(pageParam);
        // Kita tetap return response.data karena itu adalah sumber kebenaran dari API
        return response.data;
      },
      initialPageParam: 1,

      // [SMART LOGIC] Logika getNextPageParam yang bisa menangani kedua struktur
      getNextPageParam: (lastPage) => {
        // Cek dulu apakah paginasi ada di level atas (struktur baru)
        // atau di dalam object .data (struktur lama)
        const paginationSource =
          typeof lastPage?.current_page !== "undefined"
            ? lastPage
            : lastPage?.data;

        // Jika tidak ditemukan sumber paginasi atau sudah halaman terakhir
        if (
          !paginationSource ||
          paginationSource.current_page >= paginationSource.last_page
        ) {
          return undefined;
        }

        return paginationSource.current_page + 1;
      },
    });

  // [SMART LOGIC] Logika flatMap yang bisa menangani kedua struktur
  const options =
    data?.pages
      .flatMap((page) => {
        // Cek apakah 'page.data' adalah array (Struktur Baru)
        if (Array.isArray(page?.data)) {
          return page.data;
        }
        // Jika bukan, cek apakah 'page.data.data' adalah array (Struktur Lama)
        if (Array.isArray(page?.data?.data)) {
          return page.data.data;
        }
        // Jika tidak ada yang cocok, kembalikan array kosong untuk keamanan
        return [];
      })
      .filter(Boolean) ?? [];

  const selectOptions = options.map((item) => ({
    label: item[itemLabel],
    value: item[itemValue].toString(),
  }));

  // ... sisa kode JSX tidak berubah ...
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex items-start gap-2 flex-col lg:flex-row">
          {label && (
            <FormLabel
              className={`w-full text-xs sm:text-sm mt-0 lg:mt-2 ${labelStyle}`}
            >
              {label} {required && <span className="text-red-500">*</span>}
            </FormLabel>
          )}
          <div className="w-full flex flex-col gap-1">
            <Select
              onValueChange={field.onChange}
              value={field.value?.toString()}
              disabled={isLoading}
            >
              <FormControl>
                <SelectTrigger className="w-full text-xs">
                  <SelectValue
                    placeholder={isLoading ? "Memuat data..." : placeholder}
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {selectOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}

                {hasNextPage && (
                  <div className="p-1">
                    <Button
                      type="button"
                      variant="ghost"
                      className="w-full justify-center text-xs"
                      onClick={(e) => {
                        e.preventDefault();
                        fetchNextPage();
                      }}
                      disabled={isFetchingNextPage}
                    >
                      {isFetchingNextPage ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        "Muat lebih banyak"
                      )}
                    </Button>
                  </div>
                )}
              </SelectContent>
            </Select>
            <FormMessage />
          </div>
        </FormItem>
      )}
    />
  );
};
