import CustomCard from "@/components/commons/card";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React from "react";
import { FiSearch } from "react-icons/fi";
import { IoIosArrowBack } from "react-icons/io";
import { IoSaveSharp } from "react-icons/io5";

// const FormFieldGenerator = ({ form, fields }) => {
//   return fields.map(({ label, name, placeholder, select, type, required }) => (
//     <FormField
//       key={name}
//       control={form.control}
//       name={name}
//       render={({ field }) => (
//         <FormItem className="flex">
//           <FormLabel className="w-full text-[#3F6FA9]">
//             {label} {required && <span className="text-[#FF0000]">*</span>}
//           </FormLabel>
//           <FormControl>
//             {select ? (
//               <Select {...field}>
//                 <SelectTrigger className="w-full">
//                   <SelectValue placeholder={placeholder} />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectGroup>
//                     <SelectLabel>Semua</SelectLabel>
//                     <SelectItem value="apple">Apple</SelectItem>
//                     <SelectItem value="banana">Banana</SelectItem>
//                     <SelectItem value="blueberry">Blueberry</SelectItem>
//                     <SelectItem value="grapes">Grapes</SelectItem>
//                     <SelectItem value="pineapple">Pineapple</SelectItem>
//                   </SelectGroup>
//                 </SelectContent>
//               </Select>
//             ) : type === "file" ? (
//               <Input
//                 type="file"
//                 onChange={(e) => form.setValue(name, e.target.files[0])}
//               />
//             ) : (
//               <Input
//                 {...field}
//                 type={type || "text"}
//                 placeholder={placeholder}
//               />
//             )}
//           </FormControl>
//           <FormMessage />
//         </FormItem>
//       )}
//     />
//   ));
// };

const DetailRiwayatPelanggaran = () => {
  return (
    <div className="mt-10 mb-20">
      <h1 className="text-2xl font-semibold">
        Pelanggaran{" "}
        <span className="text-muted-foreground font-normal text-[16px]">
          Detail Riwayat Pelanggaran
        </span>
      </h1>

      <CustomCard
        actions={
          <div className="flex justify-between mt-10">
            <div className="flex gap-6">
              <div className="relative">
                <FiSearch className="absolute top-1/2 -translate-y-1/2 right-2" />
                <Input placeholder="Search" className="w-96 pr-8" />
              </div>
            </div>

            <div className="flex gap-4">
              <Button className="cursor-pointer bg-green-light-uika hover:bg-[#329C59]">
                <IoIosArrowBack /> Kembali ke Daftar
              </Button>

              <Button className="cursor-pointer bg-green-light-uika hover:bg-[#329C59]">
                <IoSaveSharp /> Simpan
              </Button>
            </div>
          </div>
        }
      >
        <div className="grid grid-rows-4 grid-flow-col gap-5">
          <div className="">
            <Label>
              Pegawai<span className="">*</span>
            </Label>
          </div>
        </div>
      </CustomCard>
    </div>
  );
};

export default DetailRiwayatPelanggaran;
