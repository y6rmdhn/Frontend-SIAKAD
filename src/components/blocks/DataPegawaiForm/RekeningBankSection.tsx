import { FormFieldInput } from "../CustomFormInput/CustomFormInput";
import { FormFieldSelect } from "../CustomFormSelect/CustomFormSelect";
import { INDONESIAN_BANKS } from "@/constant/Bank/indonesianBank.ts";
import type { UseFormReturn } from "react-hook-form";
import type { DataPegawaiSchema } from "@/components/view/admin/DataPegawai/DataPegawai";

interface RekeningBankSectionProps {
    form: UseFormReturn<DataPegawaiSchema>;
}

const RekeningBankSection = ({ form }: RekeningBankSectionProps) => (
    <div className="grid lg:grid-rows-2 lg:grid-flow-col gap-4 mt-10">
        <FormFieldSelect
            form={form}
            label="Nama BANK"
            name="nama_bank"
            labelStyle="text-[#3F6FA9]"
            options={INDONESIAN_BANKS}
            placeholder="--Pilih BANK--"
            required={false}
        />
        <FormFieldInput
            form={form}
            label="Cabang BANK"
            name="cabang_bank"
            labelStyle="text-[#3F6FA9]"
            required={false}
        />
        <FormFieldInput
            form={form}
            label="Atas Nama Rekening"
            name="nama_rekening"
            labelStyle="text-[#3F6FA9]"
            required={false}
        />
        <FormFieldInput
            form={form}
            label="No Rekening"
            name="no_rekening"
            labelStyle="text-[#3F6FA9]"
            required={false}
        />
    </div>
);

export default RekeningBankSection;
