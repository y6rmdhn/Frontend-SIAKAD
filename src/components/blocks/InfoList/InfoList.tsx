interface InfoItem {
    label: string;
    value: string;
}

interface InfoListProps {
    items: InfoItem[];
}

const InfoList: React.FC<InfoListProps> = ({ items }) => {
    const half = Math.ceil(items.length / 2);
    const leftItems = items.slice(0, half);
    const rightItems = items.slice(half);

    return (
        <div className="w-full border-l-2 border-l-[#6AAEF1] text-xs lg:text-base grid md:grid-cols-2 mt-10 bg-[#D6E8F9] py-4">
            {/* Kolom Kiri */}
            <ul className="flex flex-col text-[#2572BE]  px-4 md:pr-0">
                {leftItems.map((item, index) => (
                    <li className="flex justify-between border-b border-b-[#6AAEF1] py-1" key={index}>
                        <span className="font-semibold">{item.label}</span>
                        <span className="md:pr-2">{item.value}</span>
                    </li>
                ))}
            </ul>

            {/* Kolom Kanan */}
            <ul className="flex flex-col text-[#2572BE] px-4 md:pl-0">
                {rightItems.map((item, index) => (
                    <li className="flex justify-between border-b border-b-[#6AAEF1] py-1" key={index}>
                        <span className="font-semibold md:pl-2">{item.label}</span>
                        <span>{item.value}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
};



export default InfoList