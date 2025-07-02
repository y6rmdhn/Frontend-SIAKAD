import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FormFieldInput } from "../CustomFormInput/CustomFormInput";
import { IoSaveOutline } from "react-icons/io5";
import { RiResetLeftFill } from "react-icons/ri";
import { UseFormReturn } from "react-hook-form";
import { InfiniteScrollSelect } from "../InfiniteScrollSelect/InfiniteScrollSelect";
import adminServices from "@/services/admin.services";
import { RumpunFormValues } from "@/components/view/admin/Referensi/Kepegawaian/RumpunBidangIlmu/RumpunBidangIlmu";

interface AddRumpunBidangIlmuRowProps {
  form: UseFormReturn<RumpunFormValues>;
  handleCancel: () => void;
  isPending: boolean;
}

const AddRumpunBidangIlmuRow: React.FC<AddRumpunBidangIlmuRowProps> = ({
  form,
  handleCancel,
  isPending,
}) => {
  return (
    <TableRow className="bg-green-50">
      <TableCell></TableCell>
      <TableCell>
        <FormFieldInput form={form} name="kode" placeholder="Kode Baru" />
      </TableCell>
      <TableCell>
        <FormFieldInput
          form={form}
          name="nama_bidang"
          placeholder="Nama Bidang Baru"
        />
      </TableCell>
      <TableCell>
        <InfiniteScrollSelect
          form={form}
          name="parent_category"
          placeholder="Pilih Parent"
          queryKey={"rumpun-bidang-ilmu-select"}
          queryFn={adminServices.getRumpunBidangIlmu}
          itemValue="nama_bidang"
          itemLabel="nama_bidang"
        />
      </TableCell>
      <TableCell>
        <InfiniteScrollSelect
          form={form}
          name="sub_parent_category"
          placeholder="Pilih Sub Parent"
          queryKey={"rumpun-bidang-ilmu-select"}
          queryFn={adminServices.getRumpunBidangIlmu}
          itemValue="nama_bidang"
          itemLabel="nama_bidang"
        />
      </TableCell>
      <TableCell>
        <div className="flex justify-center items-center w-full h-full gap-2">
          <Button
            type="submit"
            size="icon"
            variant="ghost"
            className="cursor-pointer"
            disabled={isPending}
          >
            <IoSaveOutline className="w-5 h-5 text-green-light-uika" />
          </Button>
          <Button
            size="icon"
            type="button"
            variant="ghost"
            className="cursor-pointer"
            onClick={handleCancel}
          >
            <RiResetLeftFill className="w-5 h-5 text-yellow-uika" />
          </Button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default AddRumpunBidangIlmuRow;
