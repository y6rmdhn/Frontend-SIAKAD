import React from "react";

type ColumnItem = {
  name: string;
};

type DetailPegawaiProps = {
  leftColumn: ColumnItem[];
  rightColumn: ColumnItem[];
  datasLeft: (string | number)[];
  datasRight: (string | number)[];
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
      {" "}
      {/* 👈 Stack vertically by default, row on medium screens and up */}
      {/* Left Column */}
      <div className="flex flex-col w-full">
        {leftColumn.map((item, index) => (
          <div
            key={`left-${index}`}
            // Removed border-b here to apply it conditionally or on the parent for better responsive control
            className="flex flex-col items-start sm:flex-row sm:justify-between sm:items-center py-2 pl-2 md:border-b" // Apply border-b on medium screens and up
          >
            <h1 className="text-[#3F6FA9] font-medium text-sm">{item.name}</h1>
            <p className="text-xs text-right pr-2">
              {" "}
              {/* Added text-right for better alignment */}
              {datasLeft[index] !== undefined &&
              datasLeft[index] !== null &&
              datasLeft[index] !== ""
                ? datasLeft[index]
                : "-"}
            </p>
          </div>
        ))}
      </div>
      {/* Separator for small screens (optional, but good for clarity) */}
      <div className="w-full border-b md:hidden my-2"></div>
      {/* 👈 Visible only on small screens */}
      {/* Right Column */}
      <div className="flex flex-col w-full md:pl-3">
        {" "}
        {/* Added md:pl-3 for spacing when side-by-side */}
        {rightColumn.map((item, index) => (
          <div
            key={`right-${index}`}
            className="flex flex-col items-start sm:flex-row sm:justify-between sm:items-center py-2 pl-2 md:pl-5 pr-2 md:border-b" // Adjusted padding for responsiveness, apply border-b on medium screens and up
          >
            <h1 className="text-[#3F6FA9] font-medium text-sm">{item.name}</h1>
            <p className="text-xs text-right">
              {" "}
              {/* Added text-right for better alignment */}
              {datasRight[index] !== undefined &&
              datasRight[index] !== null &&
              datasRight[index] !== ""
                ? datasRight[index]
                : "-"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailPegawai;
