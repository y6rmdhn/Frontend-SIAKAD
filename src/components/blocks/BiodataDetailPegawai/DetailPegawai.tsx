import React from "react";

// Tipe ini kemungkinan sudah ada di file Anda
type ColumnItem = {
  name: string;
};

// FIX: Ubah tipe props di sini
type DetailPegawaiProps = {
  leftColumn: ColumnItem[];
  rightColumn: ColumnItem[];
  // Ubah dari (string | number)[] menjadi React.ReactNode[]
  datasLeft: React.ReactNode[];
  datasRight: React.ReactNode[];
  classname?: string;
};

const DetailPegawai: React.FC<DetailPegawaiProps> = ({
  leftColumn,
  rightColumn,
  datasLeft,
  datasRight,
  classname,
}) => {
  return (
    <div className={`flex flex-col md:flex-row w-full ${classname}`}>
      {/* Kolom Kiri */}
      <div className="flex flex-col w-full">
        {leftColumn.map((item, index) => (
          <div
            key={`left-${index}`}
            className="flex flex-col items-start sm:flex-row sm:justify-between sm:items-center py-2 pl-2 md:border-b"
          >
            <h1 className="text-[#3F6FA9] font-medium text-sm">{item.name}</h1>
            <div className="text-xs text-right pr-2">
              {/* Logika untuk menampilkan data, sekarang bisa menerima string, number, atau JSX */}
              {datasLeft[index] !== undefined &&
              datasLeft[index] !== null &&
              datasLeft[index] !== ""
                ? datasLeft[index]
                : "-"}
            </div>
          </div>
        ))}
      </div>

      {/* Pemisah untuk layar kecil */}
      <div className="w-full border-b md:hidden my-2"></div>

      {/* Kolom Kanan */}
      <div className="flex flex-col w-full md:pl-3">
        {rightColumn.map((item, index) => (
          <div
            key={`right-${index}`}
            className="flex flex-col items-start sm:flex-row sm:justify-between sm:items-center py-2 pl-2 md:pl-5 pr-2 md:border-b"
          >
            <h1 className="text-[#3F6FA9] font-medium text-sm">{item.name}</h1>
            <div className="text-xs text-right">
              {datasRight[index] !== undefined &&
              datasRight[index] !== null &&
              datasRight[index] !== ""
                ? datasRight[index]
                : "-"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailPegawai;
