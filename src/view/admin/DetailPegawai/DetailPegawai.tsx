import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { FiSearch } from "react-icons/fi";
import { FaSave } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { HiMiniXMark } from "react-icons/hi2";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import formFieldsCustom from "../../../constant/InputPegawai/index";

const FormFieldGenerator = ({ form, fields }) => {
  return fields.map(({ label, name, placeholder, select, type, required }) => (
    <FormField
      key={name}
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex">
          <FormLabel className="w-full text-[#3F6FA9]">
            {label} {required && <span className="text-[#FF0000]">*</span>}
          </FormLabel>
          <FormControl>
            {select ? (
              <Select {...field}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Semua</SelectLabel>
                    <SelectItem value="apple">Apple</SelectItem>
                    <SelectItem value="banana">Banana</SelectItem>
                    <SelectItem value="blueberry">Blueberry</SelectItem>
                    <SelectItem value="grapes">Grapes</SelectItem>
                    <SelectItem value="pineapple">Pineapple</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            ) : type === "file" ? (
              <Input
                type="file"
                onChange={(e) => form.setValue(name, e.target.files[0])}
              />
            ) : (
              <Input
                {...field}
                type={type || "text"}
                placeholder={placeholder}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  ));
};

const DetailPegawai = () => {
  const navigate = useNavigate();
  const form = useForm();

  return (
    <div className="mt-10 mb-10">
      <h1 className="text-2xl font-semibold">Data Pegawai</h1>
      <Form {...form}>
        <form>
          <Card className="mt-5  border-t-yellow-uika border-t-3">
            <CardHeader>
              <div className="flex justify-between">
                <div className="relative">
                  <Input className="w-2xs pr-8" placeholder="Search" />
                  <FiSearch className="absolute -translate-y-1/2 top-1/2 right-2" />
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={() => navigate("/gate/pegawai")}
                    className="bg-green-light-uika hover:bg-[#329C59] cursor-pointer"
                  >
                    <IoIosArrowBack />
                    Kembali ke Daftar
                  </Button>

                  <Button className="bg-green-light-uika hover:bg-[#329C59] cursor-pointer">
                    <FaSave />
                    Simpan
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="mt-10 grid-cols-2 grid gap-5">
              <FormFieldGenerator
                form={form}
                fields={formFieldsCustom.formFieldsBiodata}
              />

              <FormField
                control={form.control}
                name="Nip"
                render={({ ...field }) => (
                  <FormItem className="flex">
                    <FormLabel className="w-full text-[#3F6FA9]">
                      Jenis Kelamin
                      <span className="text-[#FF0000]">*</span>
                    </FormLabel>

                    <FormControl>
                      <div className="flex gap-5 w-full">
                        <div className="flex items-center gap-3">
                          <Checkbox
                            className="data-[state=checked]:bg-green-light-uika data-[state=checked]:border-green-light-uika cursor-pointer"
                            id="statusNikah"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                          <Label>Laki-Laki</Label>
                        </div>

                        <div className="flex items-center gap-3">
                          <Checkbox
                            className="data-[state=checked]:bg-green-light-uika data-[state=checked]:border-green-light-uika cursor-pointer"
                            id="statusNikah"
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                          <Label>Perempuan</Label>
                        </div>
                      </div>
                    </FormControl>
                    <FormDescription />
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="w-full flex">
                <Label className="text-[#3F6FA9]">
                  Terhubung dengan Sister
                </Label>

                <HiMiniXMark className="w-5 h-5 ml-28 text-[#FF0000]" />
              </div>
            </CardContent>
            <CardFooter>
              <Tabs defaultValue="kepegawaian" className="w-full mt-14">
                <TabsList className="w-full">
                  <TabsTrigger className="cursor-pointer" value="kepegawaian">
                    Kepegawaian
                  </TabsTrigger>
                  <TabsTrigger className="cursor-pointer" value="domisili">
                    Alamat Domisili & Kontak
                  </TabsTrigger>
                  <TabsTrigger className="cursor-pointer" value="kependudukan">
                    Kependudukan
                  </TabsTrigger>
                  <TabsTrigger className="cursor-pointer" value="rekening-bank">
                    Rekening Bank
                  </TabsTrigger>
                  <TabsTrigger className="cursor-pointer" value="dokumen">
                    Dokumen
                  </TabsTrigger>
                  <TabsTrigger className="cursor-pointer" value="lain-lain">
                    Lain-Lain
                  </TabsTrigger>
                </TabsList>

                <TabsContent
                  value="kepegawaian"
                  className="grid grid-rows-5 grid-flow-col gap-5 mt-10"
                >
                  <FormFieldGenerator
                    form={form}
                    fields={formFieldsCustom.formFieldsKepegawaian}
                  />
                </TabsContent>
                <TabsContent
                  value="domisili"
                  className="grid grid-rows-6 grid-flow-col gap-5 mt-10"
                >
                  <FormFieldGenerator
                    form={form}
                    fields={formFieldsCustom.formFieldsAlamat}
                  />
                </TabsContent>
                <TabsContent
                  value="kependudukan"
                  className="grid grid-rows-6 grid-flow-col gap-5 mt-10"
                >
                  <FormFieldGenerator
                    form={form}
                    fields={formFieldsCustom.formFieldsKependudukan}
                  />
                </TabsContent>
                <TabsContent
                  value="rekening-bank"
                  className="grid grid-rows-3 grid-flow-col gap-5 mt-10"
                >
                  <FormFieldGenerator
                    form={form}
                    fields={formFieldsCustom.formFieldsRekeningBank}
                  />
                </TabsContent>
                <TabsContent
                  value="dokumen"
                  className="grid grid-rows-5 grid-flow-col gap-5 mt-10"
                >
                  <FormFieldGenerator
                    form={form}
                    fields={formFieldsCustom.formFieldsDokumen}
                  />
                </TabsContent>
                <TabsContent
                  value="lain-lain"
                  className="grid grid-rows-3 grid-flow-col gap-5 mt-10"
                >
                  <FormFieldGenerator
                    form={form}
                    fields={formFieldsCustom.formFieldsLainLain}
                  />
                </TabsContent>
              </Tabs>
            </CardFooter>
          </Card>
        </form>
      </Form>
    </div>
  );
};

export default DetailPegawai;
