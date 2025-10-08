import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FaRegTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { ChevronDownIcon } from "lucide-react";
import {
  RumpunFormValues,
  RumpunNode,
} from "@/components/view/admin/Referensi/Kepegawaian/RumpunBidangIlmu/RumpunBidangIlmu";
import { FormFieldInput } from "../CustomFormInput/CustomFormInput";
import { IoSaveOutline } from "react-icons/io5";
import { RiResetLeftFill } from "react-icons/ri";
import { UseFormReturn } from "react-hook-form";
import { InfiniteScrollSelect } from "../InfiniteScrollSelect/InfiniteScrollSelect";
import adminServices from "@/services/admin.services";

interface RumpunBidangIlmuRowProps {
  node: RumpunNode;
  level: number;
  openRows: Record<string, boolean>;
  toggleRow: (kode: string) => void;
  form: UseFormReturn<RumpunFormValues>;
  editingItemId: string | null;
  handleEdit: (item: RumpunNode) => void;
  handleDelete: (id: string) => void;
  handleCancel: () => void;
  isPending: boolean;
}

const RumpunBidangIlmuRow: React.FC<RumpunBidangIlmuRowProps> = ({
  node,
  level,
  openRows,
  toggleRow,
  form,
  editingItemId,
  handleEdit,
  handleDelete,
  handleCancel,
  isPending,
}) => {
  const isRowOpen = openRows[node.kode] || false;
  const isEditing = editingItemId === node.id;
  const indentStyle = {
    paddingLeft: `${level * 2 + (node.children.length > 0 ? 0 : 2.5)}rem`,
  };

  if (isEditing) {
    return (
      <TableRow className="bg-blue-50">
        <TableCell style={indentStyle}></TableCell>
        <TableCell>
          <FormFieldInput form={form} name="kode" placeholder="Kode" />
        </TableCell>
        <TableCell>
          <FormFieldInput
            form={form}
            name="nama_bidang"
            placeholder="Nama Bidang"
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
            initialSelectedItem={
              node.parent_category
                ? { nama_bidang: node.parent_category }
                : null
            }
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
            initialSelectedItem={
              node.sub_parent_category
                ? { nama_bidang: node.sub_parent_category }
                : null
            }
          />
        </TableCell>
        <TableCell className="h-full">
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
  }

  return (
    <React.Fragment>
      <TableRow className={level > 0 ? "bg-gray-50" : "even:bg-white"}>
        <TableCell style={indentStyle}>
          {node.children.length > 0 && (
            <Button
              onClick={() => toggleRow(node.kode)}
              variant="ghost"
              type="button"
              size="icon"
              className="mr-2"
            >
              <ChevronDownIcon
                className={`size-4 transition-transform duration-200 ${
                  isRowOpen ? "rotate-180" : ""
                }`}
              />
            </Button>
          )}
        </TableCell>
        <TableCell className="text-left text-xs sm:text-sm">
          {node.kode}
        </TableCell>
        <TableCell className="text-left text-xs sm:text-sm">
          {node.nama_bidang}
        </TableCell>
        <TableCell className="text-left text-xs sm:text-sm">
          {node.parent_category ? node.parent_category : "-"}
        </TableCell>
        <TableCell className="text-left text-xs sm:text-sm">
          {node.sub_parent_category ? node.sub_parent_category : "-"}
        </TableCell>
        <TableCell className="flex justify-center items-center w-full h-full gap-2">
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="cursor-pointer"
            onClick={() => handleEdit(node)}
          >
            <MdEdit className="w-5 h-5 text-blue-500" />
          </Button>
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className="cursor-pointer"
            onClick={() => handleDelete(node.id)}
          >
            <FaRegTrashAlt className="text-red-500" />
          </Button>
        </TableCell>
      </TableRow>

      {isRowOpen &&
        node.children.map((childNode) => (
          <RumpunBidangIlmuRow
            key={childNode.id}
            node={childNode}
            level={level + 1}
            openRows={openRows}
            toggleRow={toggleRow}
            form={form}
            editingItemId={editingItemId}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleCancel={handleCancel}
            isPending={isPending}
          />
        ))}
    </React.Fragment>
  );
};

export default RumpunBidangIlmuRow;
