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
import { JabatanStrukturalNode } from "@/components/view/admin/Referensi/Kepegawaian/JabatanStruktural/JabatanStruktural";
// Import the Node type from the parent component to ensure they are in sync

// The props now expect the clean JabatanStrukturalNode type
interface JabatanStrukturalRowProps {
  node: JabatanStrukturalNode;
  level: number;
  openRows: Record<string, boolean>;
  handleDelete: (id: number) => void;
  toggleRow: (kode: string) => void;
  createRefCallback: (kode: string) => (el: HTMLTableRowElement | null) => void;
}

const JabatanStrukturalRow: React.FC<JabatanStrukturalRowProps> = ({
  node,
  level,
  handleDelete,
  openRows,
  toggleRow,
  createRefCallback,
}) => {
  // The key for open/closed state is the node's unique 'kode'
  const isRowOpen = openRows[node.kode] || false;

  return (
    <React.Fragment>
      <TableRow
        className={level > 0 ? "bg-gray-50" : "even:bg-gray-100"}
        ref={createRefCallback(node.kode)}
      >
        <TableCell style={{ paddingLeft: `${(level + 1) * 1}rem` }}>
          {node.children.length > 0 && (
            <Button
              onClick={() => toggleRow(node.kode)}
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
        {/* Displaying the flattened data */}
        <TableCell className="text-center text-xs sm:text-sm">
          {node.kode}
        </TableCell>
        <TableCell className="text-left text-xs sm:text-sm">
          {node.nama_jabatan}
        </TableCell>
        <TableCell className="text-center text-xs sm:text-sm">
          {node.parent_jabatan_nama}
        </TableCell>
        <TableCell className="text-center text-xs sm:text-sm">
          {node.unit_kerja_nama}
        </TableCell>
        <TableCell className="text-center">
          <div className="flex justify-center items-center w-full h-full">
            {/* The links can be made more generic if needed */}
            <Link
              to={`/admin/referensi/kepegawaian/jabatan-struktural/detail-jabatan-struktural`}
            >
              <Button size="icon" variant="ghost">
                <FaPlus className="w-5 h-5 text-green-500" />
              </Button>
            </Link>
            <Link
              to={`/admin/referensi/kepegawaian/jabatan-struktural/detail-data-jabatan-struktural/${node.id}`}
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
                    Apakah Anda yakin ingin menghapus jabatan
                    <strong className="text-red-600">
                      {" "}
                      "{node.nama_jabatan}"
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
          // Recursively render child rows
          <JabatanStrukturalRow
            key={childNode.kode}
            node={childNode}
            level={level + 1}
            openRows={openRows}
            toggleRow={toggleRow}
            handleDelete={handleDelete}
            createRefCallback={createRefCallback}
          />
        ))}
    </React.Fragment>
  );
};

export default JabatanStrukturalRow;
