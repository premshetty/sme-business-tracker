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
import dayjs from "dayjs"; // Ensure dayjs is installed
import React from "react";
import { Chart } from "../Chart";

// Example data for daily sales
const dailySales = [
  {
    date: "2024-11-21",
    cash: 1200,
    online: 800,
    vadaPavSold: 80, // Number of vada pavs sold
    vadaPavRevenue: 2000, // Revenue from vada pav
    otherRevenue: 400, // Revenue from daal vada and others
    total: 2400,
  },
  {
    date: "2024-11-22",
    cash: 1500,
    online: 1000,
    vadaPavSold: 100,
    vadaPavRevenue: 2500,
    otherRevenue: 500,
    total: 3000,
  },
  {
    date: "2024-11-23",
    cash: 1200,
    online: 800,
    vadaPavSold: 80, // Number of vada pavs sold
    vadaPavRevenue: 2000, // Revenue from vada pav
    otherRevenue: 400, // Revenue from daal vada and others
    total: 2400,
  },
  {
    date: "2024-11-24",
    cash: 1500,
    online: 1000,
    vadaPavSold: 100,
    vadaPavRevenue: 2500,
    otherRevenue: 500,
    total: 3000,
  },
  {
    date: "2024-11-25",
    cash: 1200,
    online: 800,
    vadaPavSold: 80, // Number of vada pavs sold
    vadaPavRevenue: 2000, // Revenue from vada pav
    otherRevenue: 400, // Revenue from daal vada and others
    total: 2400,
  },
  {
    date: "2024-11-26",
    cash: 1500,
    online: 1000,
    vadaPavSold: 100,
    vadaPavRevenue: 2500,
    otherRevenue: 500,
    total: 3000,
  },
];

const Overview = () => {
  return (
    <div className="grid grid-cols-6 gap-3">
      <div className="col-span-2">
        <Chart dailySales={dailySales} />
      </div>
      <div className="col-span-4">
        <Table>
          <TableCaption>A daily overview of sales performance.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Date</TableHead>
              <TableHead>Day</TableHead>
              <TableHead>Cash (₹)</TableHead>
              <TableHead>Online (₹)</TableHead>
              <TableHead>Vada Pav Revenue (₹)</TableHead>
              <TableHead>Daal Vada & Others (₹)</TableHead>
              <TableHead className="text-right">Total (₹)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {dailySales.map((sale, index) => {
              const formattedDate = dayjs(sale.date).format("YYYY-MM-DD");
              const dayName = dayjs(sale.date).format("dddd"); // Get day of the week
              return (
                <TableRow key={index}>
                  <TableCell className="font-medium">{formattedDate}</TableCell>
                  <TableCell>{dayName}</TableCell>
                  <TableCell>{sale.cash.toFixed(2)}</TableCell>
                  <TableCell>{sale.online.toFixed(2)}</TableCell>
                  <TableCell>{sale.vadaPavRevenue.toFixed(2)}</TableCell>
                  <TableCell>{sale.otherRevenue.toFixed(2)}</TableCell>
                  <TableCell className="text-right">
                    {sale.total.toFixed(2)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={4} className="font-medium">
                Grand Total
              </TableCell>
              <TableCell>
                {dailySales
                  .reduce((sum, sale) => sum + sale.vadaPavRevenue, 0)
                  .toFixed(2)}
              </TableCell>
              <TableCell>
                {dailySales
                  .reduce((sum, sale) => sum + sale.otherRevenue, 0)
                  .toFixed(2)}
              </TableCell>
              <TableCell className="text-right">
                {dailySales
                  .reduce((sum, sale) => sum + sale.total, 0)
                  .toFixed(2)}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </div>
  );
};

export default Overview;
