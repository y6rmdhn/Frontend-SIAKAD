import CustomCard from "@/components/blocks/Card";
import { FaGraduationCap, FaBirthdayCake } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { FaUserGroup } from "react-icons/fa6";
import { MdOutlinePersonRemove } from "react-icons/md";
import { Label } from "@/components/ui/label";
import { RiErrorWarningLine } from "react-icons/ri";
import { HiSpeakerphone } from "react-icons/hi";
import Title from "@/components/blocks/Title";
import CardStatistikPegawai from "@/components/blocks/CardStatistikPegawai/CardStatistikPegawai";
import SelectFilter from "@/components/blocks/SelectFilter";
import unitKerjaOptions from "@/constant/dummyFilter";
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
import LoadingStateDasbordAdmin from "@/components/blocks/LoadingStateDasboradAdmin/LoadingStateDasbordAdmin.tsx";

const Dasboard = () => {
  const { data } = useQuery({
    queryKey: ["dasboard-admin"],
    queryFn: async () => {
      const response = await adminServices.getDasboardAdmin();

      console.log(response.data);

      return response.data.data;
    },
  });

  return (
    <div className="mt-10 mb-20">
      <Title title="Dasboard" />
      <CustomCard
        actions={
          <div className="flex gap-30">
            <Label className="text-[#FFAC07]">Unit Kerja</Label>
            <SelectFilter
              options={unitKerjaOptions}
              classname="w-80 hidden md:flex"
              placeholder="041001 - Universitas Ibn Khaldun"
            />
          </div>
        }
      />

      {data ? (
        <>
          <div className="grid grid-rows-4 md:grid-rows-1 gap-4 md:grid-cols-4 md:gap-10 mt-6">
            <div className="bg-gradient-to-r from-[#1C8C88] to-[#28BCB7] h-40 rounded-xl text-white flex items-center justify-center relative">
              <div className="relative w-full h-full flex items-center justify-center">
                <h1 className="text-lg font-semibold flex flex-col items-center">
                  Jumlah Pegawai Aktif
                  {data?.staff_summary && (
                    <p className="text-4xl font-semibold mt-3">
                      {data.staff_summary.active_employees}
                    </p>
                  )}
                </h1>
                <IoPersonOutline className="w-14 h-14 absolute bottom-0 left-1 " />
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#5abd1d] to-[#66D820] h-40 rounded-xl text-white flex items-center justify-center relative">
              <div className="relative w-full h-full flex items-center justify-center">
                <h1 className="text-lg text-center font-semibold flex flex-col items-center">
                  Jumlah Pegawai Pendidik (Akademik)
                  {data?.staff_summary && (
                    <p className="text-4xl font-semibold mt-1">
                      {data.staff_summary.academic_staff}
                    </p>
                  )}
                </h1>
                <FaGraduationCap className="w-14 h-14 absolute bottom-0 left-1" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#e09808] to-[#FFAC07] h-40 rounded-xl text-white flex items-center justify-center relative">
              <div className="relative w-full h-full flex items-center justify-center">
                <h1 className="text-lg text-center font-semibold flex flex-col items-center">
                  Jumlah Pegawai Kependidikan (Non Akademik)
                  {data?.staff_summary && (
                    <p className="text-4xl font-semibold mt-1">
                      {data.staff_summary.academic_staff}
                    </p>
                  )}
                </h1>
                <FaUserGroup className="w-14 h-14 absolute bottom-0 left-1" />
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#b92916] to-[#D22D17] h-40 rounded-xl text-white flex items-center justify-center relative">
              <div className="relative w-full h-full flex items-center justify-center">
                <h1 className="text-lg text-center font-semibold flex flex-col items-center">
                  Jumlah Pegawai Pensiun
                  {data?.staff_summary && (
                    <p className="text-4xl font-semibold mt-1">
                      {data.staff_summary.inactive_employees}
                    </p>
                  )}
                </h1>
                <MdOutlinePersonRemove className="w-14 h-14 absolute bottom-0 left-1" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
            {/* Kolom pertama - CardStatistikPegawai */}
            <div className="min-w-0">
              {/* Tambahkan min-w-0 untuk memastikan flex-shrink bekerja */}
              <CardStatistikPegawai
                academicEducation={data?.academic_education}
                nonAcademicEducation={data?.non_academic_education}
                staffDistribution={data?.staff_distribution}
                workRelationships={data?.work_relationships}
              />
            </div>

            {/* Kolom kedua - Group cards */}
            <div className="flex flex-col gap-5 min-w-0">
              {" "}
              {/* Tambahkan min-w-0 di sini juga */}
              <CustomCard
                actions={
                  <h1 className="flex gap-3 items-center text-[#DA2A21]">
                    <RiErrorWarningLine className="w-5! h-5!" />{" "}
                    <span className="text-lg font-semibold">Pemberitahuan</span>
                  </h1>
                }
                cardStyle="border-t-[#DA2A21] border-t-2"
              >
                <h1 className="truncate">Pemberitahuan</h1>{" "}
                {/* Tambahkan truncate untuk teks panjang */}
              </CustomCard>
              <CustomCard
                actions={
                  <h1 className="flex gap-3 items-center">
                    <HiSpeakerphone />{" "}
                    <span className="text-lg font-semibold text-[#106D63]">
                      Berita
                    </span>
                  </h1>
                }
                cardStyle="border-t-[#106D63] border-t-2"
              >
                <div className="flex flex-col gap-5 overflow-hidden">
                  {/* Tambahkan overflow-hidden */}
                  {data?.news.map((item, index) => (
                    <div key={index} className="min-w-0">
                      {/* Tambahkan min-w-0 di setiap item */}
                      <h1 className="truncate">{item.judul}</h1>
                      <p className="text-xs text-muted-foreground truncate">
                        {item.ringkasan}
                      </p>
                    </div>
                  ))}
                </div>
              </CustomCard>
              <CustomCard
                actions={
                  <h1 className="flex gap-3 items-center">
                    <FaBirthdayCake />{" "}
                    <span className="text-lg font-semibold text-black">
                      Daftar Ulang Tahun
                    </span>
                  </h1>
                }
                cardStyle="border-t-[#FFF3A7] border-t-2"
              >
                <div className="overflow-x-auto">
                  <Table className="mt-3 table-auto">
                    <TableHeader>
                      <TableRow className="bg-[#FFF3A7] hover:bg-[#FFF3A7]">
                        <TableHead className="text-center text-black rounded-tl-lg">
                          Tgl Lahir
                        </TableHead>
                        <TableHead className="text-center text-black">
                          NIP
                        </TableHead>
                        <TableHead className="text-center text-black">
                          Nama Pegawai
                        </TableHead>
                        <TableHead className="text-center text-black rounded-tr-lg">
                          Unit Kerja
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody className="divide-y divide-gray-200">
                      <TableRow className=" even:bg-gray-100">
                        <TableCell className="text-center flex flex-col">
                          01
                        </TableCell>
                        <TableCell className="text-center">11111</TableCell>
                        <TableCell className="text-center">Jhon Doe</TableCell>
                        <TableCell className="text-center">FTS</TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </div>
              </CustomCard>
            </div>
          </div>
        </>
      ) : (
        <LoadingStateDasbordAdmin />
      )}
    </div>
  );
};

export default Dasboard;
