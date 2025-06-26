import { FormFieldInput } from "../CustomFormInput/CustomFormInput";
import type { UseFormReturn } from "react-hook-form";
import type { DataPegawaiSchema } from "@/components/view/admin/DataPegawai/DataPegawai";
import adminServices from "@/services/admin.services";
import { InfiniteScrollSelect } from "../InfiniteScrollSelect/InfiniteScrollSelect";

interface RekeningBankSectionProps {
  form: UseFormReturn<DataPegawaiSchema>;
  isReadOnly?: boolean;
}

const RekeningBankSection = ({
  form,
  isReadOnly = false,
}: RekeningBankSectionProps) => (
  <div className="grid lg:grid-rows-2 lg:grid-flow-col gap-4 mt-10">
    {isReadOnly ? (
      <FormFieldInput
        form={form}
        label="Nama BANK"
        name="nama_bank"
        labelStyle="text-[#3F6FA9]"
        readOnly
      />
    ) : (
      <InfiniteScrollSelect
        form={form}
        label="Nama Bank"
        name="nama_bank"
        labelStyle="text-[#3F6FA9]"
        placeholder="--Pilih Bank--"
        required={false}
        queryKey="bank-select"
        queryFn={adminServices.getBankPelangkap}
        itemValue="nama_bank"
        itemLabel="nama_bank"
      />
    )}

    <FormFieldInput
      form={form}
      label="Cabang BANK"
      name="cabang_bank"
      labelStyle="text-[#3F6FA9]"
      required={false}
      readOnly={isReadOnly}
    />
    <FormFieldInput
      form={form}
      label="Atas Nama Rekening"
      name="nama_rekening"
      labelStyle="text-[#3F6FA9]"
      required={false}
      readOnly={isReadOnly}
    />
    <FormFieldInput
      form={form}
      label="No Rekening"
      name="no_rekening"
      labelStyle="text-[#3F6FA9]"
      required={false}
      readOnly={isReadOnly}
    />
  </div>
);

export default RekeningBankSection;
