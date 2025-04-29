import React from "react";

interface InfoListProps {
  items: string[];
}

const InfoList: React.FC<InfoListProps> = ({ items }) => {
  // Bagi items jadi 2
  const half = Math.ceil(items.length / 2);
  const leftItems = items.slice(0, half);
  const rightItems = items.slice(half);

  return (
    <div className="w-full grid grid-cols-2 gap-96 mt-10 bg-[#D6E8F9] p-4">
      <ul className="flex flex-col gap-2 text-[#2572BE]">
        {leftItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
      <ul className="flex flex-col gap-2 text-[#2572BE]">
        {rightItems.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default InfoList;
