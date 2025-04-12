import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface IPropsForm {
    pegawai: string,
    tglPelanggaran: string,
    jenisPelanggaran: string
}

const formSchema = z.object({
    namaPegawai: z.string().min(20, "Please Input form over than 20 characters").max(50, "input lebih dari 50 character"),
    tglPelanggaran: z.string().min(10, "input kurang dari 10 characters"),
    jenisPelanggaran: z.number().min(30)

})

const CustomForm = (props: ) => {
  const form = useForm({
    defaultValues: {
      pegawai: "",
      tglPelanggaran: "",
      jenisPelanggaran: "",
      noSk: 0,
      tglSk: "",
      keterangan: "",
      filePelanggaran: null,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="max-w-[540px] w-full"
      >
        <Card>
          <CardHeader>
            <CardTitle>{title}</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-4 grid-flow-col gap-5">
            <FormField
              control={form.control}
              name="namaPegawai"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Pegawai</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Product name need to be between 3 or 16 characters
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tglPelanggaran"
              render={({ field }) => (
                <FormItem>
                  <FormLabel></FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="jenisPelanggaran"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Stock</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="noSk"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image Url</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Please use a valid image url
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tglSk"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image Url</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Please use a valid image url
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="keterangan"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image Url</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Please use a valid image url
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="filePelanggaran"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image Url</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormDescription>
                    Please use a valid image url
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button disabled={isLoading} type="submit" className="w-full">
              Create New Product
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default CustomForm;
