import CustomCard from "@/components/blocks/Card";
import Title from "@/components/blocks/Title";
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
import { useForm } from "react-hook-form";
import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import { Separator } from "@/components/ui/separator";

const StatusPernikahan = () => {
  const form = useForm();

  return (
    <div className="mt-10 mb-20">
      <Title title="Status Pernikahan"/>
      <Separator className="w-full bg-green-500" />
      <Form {...form}>
        <form>
          <CustomCard
            actions={
              <div>
              </div>
            }
          >
            <Table className="table-auto">
              <TableHeader>
                <TableRow className="bg-gray-100">
                  <TableHead className="text-center text-xs sm:text-sm">Kode</TableHead>
                  <TableHead className="text-center text-xs sm:text-sm">Status</TableHead>
                  <TableHead className="text-center text-xs sm:text-sm">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-200">
                <TableRow className=" even:bg-gray-100">
                  <TableCell className="text-center text-xs sm:text-sm"></TableCell>
                  <TableCell className="text-center text-xs sm:text-sm"></TableCell>
                  <TableCell className="h-full">
                    <div className="flex justify-center items-center w-full h-full">
                      <Link to="">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="cursor-pointer"
                        >
                          <MdEdit className="w-5! h-5! text-[#26A1F4]" />
                        </Button>
                      </Link>
                    </div>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CustomCard>
        </form>
      </Form>
    </div>
  );
};

export default StatusPernikahan;
