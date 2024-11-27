import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
export function PaymentTable({
  totalCash,
  totalOnline,
  total,
  detailedCalculation,
}) {
  const payments = [
    { type: "Total Cash Payments", amount: totalCash.toFixed(2) },
    { type: "Total Online Payments", amount: totalOnline.toFixed(2) },
    { type: "Total Sales", amount: total.toFixed(2), isBold: true },
    {
      type: "Pavs Sold",
      amount: detailedCalculation.pavsSold || 0,
    },
    {
      type: "Vada Pav Revenue",
      amount: `₹${detailedCalculation.pavRevenue?.toFixed(2) || 0}`,
    },
    {
      type: "Remaining (Daal Vada) Sales",
      amount: `₹${
        total?.toFixed(2) - detailedCalculation.pavRevenue?.toFixed(2) || 0
      }`,
    },
  ];

  return (
    <Table>
      <TableCaption>A summary of payment types and their amounts.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Type of Payment</TableHead>
          <TableHead>Amount (₹)</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {payments.map((payment, index) => (
          <TableRow key={index}>
            <TableCell className={payment.isBold ? "font-bold bg-red-500" : ""}>
              {payment.type}
            </TableCell>
            <TableCell className={payment.isBold ? "font-bold bg-red-500" : ""}>
              {payment.amount}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
