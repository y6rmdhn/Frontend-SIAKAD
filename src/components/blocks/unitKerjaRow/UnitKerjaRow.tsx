import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "lucide-react";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface UnitNode {
  id: string;
  kode_unit: string;
  nama_unit: string;
  parent_unit_id: string | null;
  children: UnitNode[];
}

interface UnitKerjaRowProps {
  node: UnitNode;
  level: number;
  openRows: Record<string, boolean>;
  handleDelete: (id: string) => void;
  toggleRow: (kode_unit: string) => void;
  createRefCallback: (
    kode_unit: string
  ) => (el: HTMLTableRowElement | null) => void;
}

const UnitKerjaRow: React.FC<UnitKerjaRowProps> = ({
  node,
  level,
  handleDelete,
  openRows,
  toggleRow,
  createRefCallback,
}) => {
  const isRowOpen = openRows[node.kode_unit] || false;

  return (
    <React.Fragment>
      <TableRow
        className={level > 0 ? "bg-gray-50" : "even:bg-gray-100"}
        ref={createRefCallback(node.kode_unit)}
      >
        <TableCell style={{ paddingLeft: `${(level + 1) * 1}rem` }}>
          {node.children.length > 0 && (
            <Button
              onClick={() => toggleRow(node.kode_unit)}
              variant="ghost"
              size="icon"
            >
              <ChevronDownIcon
                className={`text-muted-foreground size-4 transition-transform duration-200 ${
                  isRowOpen ? "rotate-180" : ""
                }`}
              />
            </Button>
          )}
        </TableCell>
        <TableCell className="text-center text-xs sm:text-sm">
          {node.kode_unit}
        </TableCell>
        <TableCell className="text-left text-xs sm:text-sm">
          {node.nama_unit}
        </TableCell>
        <TableCell className="text-center text-xs sm:text-sm">
          {node.parent_unit_id || "-"}
        </TableCell>
        <TableCell className="text-center">
          <div className="flex justify-center items-center w-full h-full">
            {/* Tombol Aksi */}
            <Link to="/admin/referensi/kepegawaian/unit-kerja/detail-unit-kerja">
              <Button size="icon" variant="ghost">
                <FaPlus className="w-5 h-5 text-green-500" />
              </Button>
            </Link>
            <Link
              to={
                "/admin/referensi/kepegawaian/unit-kerja/detail-data-unit-kerja/" +
                node.id
              }
            >
              <Button size="icon" variant="ghost">
                <IoEyeOutline className="w-5 h-5 text-[#26A1F4]" />
              </Button>
            </Link>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="icon" variant="ghost">
                  <FaRegTrashAlt className="text-red-500" />
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Konfirmasi Penghapusan</DialogTitle>
                  <DialogDescription>
                    Apakah Anda benar-benar yakin ingin menghapus unit kerja
                    <strong className="text-red-600">
                      {" "}
                      "{node.nama_unit}"
                    </strong>
                    ? Tindakan ini tidak dapat dibatalkan.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Batal</Button>
                  </DialogClose>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(node.id)}
                  >
                    Hapus
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </TableCell>
      </TableRow>

      {isRowOpen &&
        node.children.map((childNode) => (
          <UnitKerjaRow
            key={childNode.kode_unit}
            node={childNode}
            level={level + 1} // Tingkatkan level indentasi
            openRows={openRows}
            toggleRow={toggleRow}
            handleDelete={handleDelete}
            createRefCallback={createRefCallback}
          />
        ))}
    </React.Fragment>
  );
};

export default UnitKerjaRow;
