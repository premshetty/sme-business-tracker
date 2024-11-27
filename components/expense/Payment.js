import DatePickerDemo from "@/components/ui/DatePicker";
import { Separator } from "@/components/ui/separator";
import dayjs from "dayjs";
import React, { useState } from "react";
import { SalesForm } from "./RecordSales";
import SalesTable from "./SalesTable";
import { PaymentTable } from "./Table";
export default function RecordSales() {
  const [sales, setSales] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    cart: "",
    cash: "",
    online: "",
  });
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false); // Toggle form visibility
  const [detailedCalculation, setDetailedCalculation] = useState({
    pavsSold: 0,
    pavRevenue: 0,
    remainingSales: 0,
  });

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Add or update sales record
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId !== null) {
      setSales((prev) =>
        prev.map((sale) =>
          sale.id === editId
            ? {
                ...sale,
                ...formData,
                cash: parseFloat(formData.cash),
                online: parseFloat(formData.online),
              }
            : sale
        )
      );
      setEditId(null);
    } else {
      setSales([
        ...sales,
        {
          ...formData,
          id: Date.now(),
          cash: parseFloat(formData.cash),
          online: parseFloat(formData.online),
        },
      ]);
    }
    setFormData({ id: null, cart: "", cash: "", online: "" });
    // setShowForm(false); // Hide form after submission
  };

  // Edit sales record
  const handleEdit = (id) => {
    const saleToEdit = sales.find((sale) => sale.id === id);
    setFormData({ ...saleToEdit });
    setEditId(id);
    setShowForm(true); // Show form in edit mode
  };

  // Delete sales record
  const handleDelete = (id) => {
    setSales((prev) => prev.filter((sale) => sale.id !== id));
  };

  // Calculate total sales
  const calculateTotals = () => {
    const totalCash = sales.reduce((sum, sale) => sum + sale.cash, 0);
    const totalOnline = sales.reduce((sum, sale) => sum + sale.online, 0);
    const total = totalCash + totalOnline;

    return { totalCash, totalOnline, total };
  };

  const { totalCash, totalOnline, total } = calculateTotals();
  const handleDetailedCalculation = (data) => {
    setDetailedCalculation(data);
  };
  return (
    <div className="max-w-full mx-auto p-6   rounded-lg shadow-md">
      <div className="flex justify-center items-center gap-3">
        <h2 className="text-xl font-semibold ">
          Sales Records - {dayjs().format("DD/MMM/YYYY")}
        </h2>
        <DatePickerDemo />
        <SalesForm
          formData={formData}
          onDetailedCalculation={handleDetailedCalculation}
          handleChange={handleChange}
          editMode={editId !== null}
          handleSubmit={handleSubmit}
        />
      </div>
      <Separator className="my-4" />

      <div className="grid grid-cols-2">
        {sales.length === 0 ? (
          <p className="text-gray-600 text-center col-span-2 mt-2">
            No sales records available.
          </p>
        ) : (
          <div className="flex gap-3">
            <SalesTable
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              sales={sales}
              formData={formData}
              onDetailedCalculation={handleDetailedCalculation}
              handleChange={handleChange}
              editMode={editId !== null}
              handleSubmit={handleSubmit}
              setFormData={setFormData}
              setEditId={setEditId}
            />
            <Separator orientation="vertical" />
          </div>
        )}

        {/* Add/Edit button */}

        {/* Record Sales Form */}

        {/* Sales Summary in Table */}
        {sales.length > 0 && (
          <div className="mt-6 p-4  rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Sales Summary</h3>

            <PaymentTable
              total={total}
              totalCash={totalCash}
              totalOnline={totalOnline}
              detailedCalculation={detailedCalculation}
            />
          </div>
        )}
      </div>
    </div>
  );
}
