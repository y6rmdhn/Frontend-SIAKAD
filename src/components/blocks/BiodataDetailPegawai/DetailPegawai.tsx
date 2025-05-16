import React from "react";

type ColumnItem = {
  name: string;
};

type DetailPegawaiProps = {
  leftColumn: ColumnItem[];
  rightColumn: ColumnItem[];
  datasLeft: (string | number)[];
  datasRight: (string | number)[];
};

const DetailPegawai: React.FC<DetailPegawaiProps> = ({
  leftColumn,
  rightColumn,
  datasLeft,
  datasRight,
}) => {
  return (
    <div className="flex w-full">
      {/* Left Column */}
      <div className="flex flex-col w-full">
        {leftColumn.map((item, index) => (
          <div
            key={`left-${index}`}
            className="border-b flex justify-between items-center py-2 pl-2"
          >
            <h1 className="text-[#3F6FA9] font-medium text-sm">{item.name}</h1>
            <p className="text-xs">
              {datasLeft[index] !== undefined ? datasLeft[index] : "-"}
            </p>
          </div>
        ))}
      </div>

      {/* Right Column */}
      <div className="flex flex-col w-full">
        {rightColumn.map((item, index) => (
          <div
            key={`right-${index}`}
            className="border-b flex justify-between items-center py-2 pl-5"
          >
            <h1 className="text-[#3F6FA9] font-medium text-sm">{item.name}</h1>
            <p className="text-xs">
              {datasRight[index] !== undefined ? datasRight[index] : "-"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailPegawai;
