const payroll: {
  title: string;
  href: string;
  childrenItems?: { title: string; href: string }[];
}[] = [
  {
    title: "Generate Payroll",
    href: "/admin/payroll/generate-payroll",
  },
  {
    title: "Slip Gaji",
    href: "/admin/payroll/slip-gaji",
  },
];

export default payroll;
