import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { ChevronDownIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { RumpunNode } from "@/components/view/admin/Referensi/Kepegawaian/RumpunBidangIlmu/RumpunBidangIlmu";

interface RumpunBidangIlmuRowProps {
  node: RumpunNode;
  level: number;
  openRows: Record<string, boolean>;
  toggleRow: (kode: string) => void;
}

const RumpunBidangIlmuRow: React.FC<RumpunBidangIlmuRowProps> = ({
  node,
  level,
  openRows,
  toggleRow,
}) => {
  const isRowOpen = openRows[node.kode] || false;
  const indentStyle = { paddingLeft: `${level * 2 + 1}rem` };

  return (
    <React.Fragment>
      <TableRow className={level > 0 ? "bg-gray-50" : "even:bg-white"}>
        <TableCell style={indentStyle}>
          <div className="flex items-center">
            {node.children.length > 0 && (
              <Button
                onClick={() => toggleRow(node.kode)}
                variant="ghost"
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
          </div>
        </TableCell>
        <TableCell style={indentStyle}>{node.kode}</TableCell>
        <TableCell className="text-left text-xs sm:text-sm">
          {node.nama_bidang}
        </TableCell>
        <TableCell className="text-left text-xs sm:text-sm">
          {node.parent_category || "-"}
        </TableCell>
        <TableCell className="h-full">
          <div className="flex justify-center items-center w-full h-full">
            <Link to={`/admin/referensi/rumpun-bidang-ilmu/tambah/${node.id}`}>
              <Button size="icon" variant="ghost" className="cursor-pointer">
                <FaPlus className="w-5 h-5 text-green-500" />
              </Button>
            </Link>
            <Link to={`/admin/referensi/rumpun-bidang-ilmu/edit/${node.id}`}>
              <Button size="icon" variant="ghost" className="cursor-pointer">
                <MdEdit className="w-5 h-5 text-[#26A1F4]" />
              </Button>
            </Link>
            <Button size="icon" variant="ghost" className="cursor-pointer">
              <FaRegTrashAlt className="text-red-500" />
            </Button>
          </div>
        </TableCell>
      </TableRow>

      {isRowOpen &&
        node.children.map((childNode) => (
          <RumpunBidangIlmuRow
            key={childNode.kode}
            node={childNode}
            level={level + 1}
            openRows={openRows}
            toggleRow={toggleRow}
          />
        ))}
    </React.Fragment>
  );
};

export default RumpunBidangIlmuRow;
