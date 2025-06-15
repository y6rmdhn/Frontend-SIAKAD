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
        return response.data;
      },
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        const paginationInfo = lastPage.data;

        if (
          !paginationInfo ||
          paginationInfo.current_page >= paginationInfo.last_page
        ) {
          return undefined;
        }

        return paginationInfo.current_page + 1;
      },
    });

  const options =
    data?.pages.flatMap((page) => page?.data?.data).filter(Boolean) ?? [];

  const selectOptions = options.map((item) => ({
    label: item[itemLabel],
    value: item[itemValue].toString(),
  }));

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
