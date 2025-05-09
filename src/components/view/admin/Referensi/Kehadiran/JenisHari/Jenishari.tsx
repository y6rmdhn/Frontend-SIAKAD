import CustomCard from "@/components/blocks/Card";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import adminServices from "@/services/admin.services";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { FaPlus, FaRegTrashAlt } from "react-icons/fa";
import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";

// Define interface for the data item
interface JenisHariItem {
  kode: string;
  nama_hari: string;
  jenis_hari: boolean;
  // Add other properties as needed
}

const JenisHari = () => {
  const form = useForm();

  const { data } = useQuery<JenisHariItem[]>({
    queryKey: ["jenis-hari"],
    queryFn: async () => {
      const response = await adminServices.getJenisHari();
      return response.data.data.data;
    },
  });

  return (
    <div className="mt-10 mb-20">
      <h1 className="text-2xl font-normal">
        Setting Hari{" "}
        <span className="text-muted-foreground font-normal text-[16px]">
          Daftar Setting Hari
        </span>
      </h1>
      <Form {...form}>
        <form>
          <CustomCard
            actions={
              <div className="flex justify-end">
                <div className="flex gap-4">
                  <Button className="cursor-pointer bg-green-light-uika hover:bg-[#329C59]">
                    <FaPlus className="w-4! h-4! text-white" />
                    Tambah
                  </Button>
                </div>
              </div>
            }
          >
            <Table className="mt-5 table-auto">
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="text-center">Kode</TableHead>
                  <TableHead className="text-center">Nama hari</TableHead>
                  <TableHead className="text-center">Jenis Hari</TableHead>
                  <TableHead className="text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-200">
                {data?.map((item, index) => (
                  <TableRow key={index} className=" even:bg-gray-100">
                    <TableCell className="text-center">{item.kode}</TableCell>
                    <TableCell className="text-center">
                      {item.nama_hari}
                    </TableCell>
                    <TableCell className="text-center">
                      {item.jenis_hari ? "Efektif" : "Non Efektif"}
                    </TableCell>
                    <TableCell className="h-full">
                      <div className="flex justify-center items-center w-full h-full">
                        <Link to="/admin/operasional/kompensasi/detail-dokumen-internal">
                          <Button
                            size="icon"
                            variant="ghost"
                            className="cursor-pointer"
                          >
                            <MdEdit className="w-5! h-5! text-[#26A1F4]" />
                          </Button>
                        </Link>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="cursor-pointer"
                        >
                          <FaRegTrashAlt className="text-red-500" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CustomCard>
        </form>
      </Form>
    </div>
  );
};

export default JenisHari;
