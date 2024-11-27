import { ModeToggle } from "@/components/DarkMode";
import ExpenseManager from "@/components/expense/ExpenseManager";
import RecordSales from "@/components/expense/Payment";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import localFont from "next/font/local";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function Home() {
  return (
    <div
      className={`${geistSans.variable} 
      ${geistMono.variable} 
     flex flex-col    p-3`}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold mt-3">Manoj vada pav</h1>
        <ModeToggle />
      </div>

      <Tabs defaultValue="overview" className="mt-5">
        <TabsList>
          <TabsTrigger value="overview">Over View</TabsTrigger>
          <TabsTrigger value="manageexpense">Manage expense</TabsTrigger>
          <TabsTrigger value="recordsales">Record sales</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">Over View</TabsContent>
        <TabsContent value="manageexpense">
          <TabsContent value="manageexpense">Managa Expense</TabsContent>
          <ExpenseManager />
        </TabsContent>
        <TabsContent value="recordsales">
          <TabsContent value="recordsales">Record Sales</TabsContent>
          <RecordSales />
        </TabsContent>
      </Tabs>
    </div>
  );
}
