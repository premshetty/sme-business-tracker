import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import React, { useState } from "react";

export function SalesForm({
  formData,
  handleChange,
  handleSubmit,
  editMode,
  onDetailedCalculation,
  handleEdit=()=>{},
  sales,
}) {
  const [pavPackets, setPavPackets] = useState(""); // Track pav packets input

  const handlePavChange = (e) => {
    const packets = parseInt(e.target.value, 10);
    setPavPackets(packets);

    // Perform calculations
    if (!isNaN(packets) && packets > 0) {
      const pavsSold = packets * 12; // Each packet contains 12 pavs
      const pavRevenue = pavsSold * 25; // Vada pav sold at ₹25 each
      const remainingSales = formData.cash + formData.online - pavRevenue;

      // Trigger callback with details
      onDetailedCalculation({
        pavsSold,
        pavRevenue,
        remainingSales,
      });
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild onClick={() =>{
        console.log('hi')
        handleEdit(sales?.id)}}>
        <Button variant="outline">
          {editMode ? "Edit " : "Add Sales Record"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">
              {editMode ? "Edit Record" : "New Sales Record"}
            </h4>
            <p className="text-sm text-muted-foreground">
              Fill in the details below.
            </p>
          </div>
          <div className="grid gap-2">
            {/* Cart Selection */}
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="cart">Cart</Label>
              <select
                id="cart"
                name="cart"
                value={formData.cart}
                onChange={handleChange}
                required
                className="col-span-2 h-8 border rounded"
              >
                <option value="">Select Cart</option>
                <option value="Cart 1">Cart 1</option>
                <option value="Cart 2">Cart 2</option>
                <option value="Cart 3">Cart 3</option>
              </select>
            </div>
            {/* Cash Input */}
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="cash">Cash (₹)</Label>
              <Input
                id="cash"
                name="cash"
                type="number"
                value={formData.cash}
                onChange={handleChange}
                required
                placeholder="E.g., 1000"
                className="col-span-2 h-8"
              />
            </div>
            {/* Online Input */}
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="online">Online (₹)</Label>
              <Input
                id="online"
                name="online"
                type="number"
                value={formData.online}
                onChange={handleChange}
                required
                placeholder="E.g., 500"
                className="col-span-2 h-8"
              />
            </div>
            {/* Pav Packets Input */}
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="pavPackets">Pav Packets</Label>
              <Input
                id="pavPackets"
                name="pavPackets"
                type="number"
                value={pavPackets}
                onChange={handlePavChange}
                placeholder="E.g., 5"
                className="col-span-2 h-8"
              />
            </div>
          </div>
          <Button type="submit" className="w-full">
            {editMode ? "Update Record" : "Add Record"}
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}
