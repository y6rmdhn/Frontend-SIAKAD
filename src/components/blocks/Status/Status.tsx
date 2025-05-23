import { useQuery } from "@tanstack/react-query";
import adminServices from "@/services/admin.services.ts";

const Status = () => {
  const { data } = useQuery({
    queryKey: ["status"],
    queryFn: async () => {
      const response = await adminServices.getStatus();

      return response.data.data;
    },
  });

  return (
    <div className="w-full bg-[#F6E9E9] px-10 py-6 mt-16 mb-10">
      <h1 className="text-2xl font-medium">Status</h1>

      <div className="mt-4">
        <ul className="grid lg:grid-rows-4 lg:grid-flow-col gap-4">
          <li>-- Pilih Status --</li>
          {data?.data.map((item) => (
            <li key={item.id}>
              <span className="font-semibold mr-2">{item.kode}: </span>
              {item.nama_status_aktif}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Status;
