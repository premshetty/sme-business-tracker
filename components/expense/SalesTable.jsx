import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function SalesTable({ sales, handleEdit, handleDelete }) {
  return (
    <Table className="w-full mt-4">
      <TableHeader>
        <TableRow>
          <TableHead>Cart</TableHead>
          <TableHead>Cash (₹)</TableHead>
          <TableHead>Online (₹)</TableHead>
          <TableHead>Total (₹)</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sales.map((sale) => (
          <TableRow key={sale.id}>
            <TableCell>{sale.cart}</TableCell>
            <TableCell>{sale.cash.toFixed(2)}</TableCell>
            <TableCell>{sale.online.toFixed(2)}</TableCell>
            <TableCell>{(sale.cash + sale.online).toFixed(2)}</TableCell>
            <TableCell>
              <div className="flex space-x-2">
                <button
                  className="bg-yellow-500 text-white py-1 px-2 rounded"
                  onClick={() => handleEdit(sale.id)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white py-1 px-2 rounded"
                  onClick={() => handleDelete(sale.id)}
                >
                  Delete
                </button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default SalesTable;
