import * as Tabs from "@radix-ui/react-tabs"
import { FileUpload } from "./components/FileUpload"
import { InvoicesTab } from "./components/InvoicesTab"
import { ProductsTab } from "./components/ProductsTab"
import { CustomersTab } from "./components/CustomersTab"
import { useSelector } from "react-redux"
import { RootState } from "./store/store"

function App() {
  const loading = useSelector((state: RootState) => state.loading)
  const error = useSelector((state: RootState) => state.error)

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Invoice Management System</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      <div className="mb-6">
        <FileUpload />
      </div>
      
      {loading && (
        <div className="text-center py-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
        </div>
      )}

      <Tabs.Root defaultValue="invoices" className="flex flex-col gap-4">
        <Tabs.List className="flex gap-4 border-b" aria-label="Manage your invoices">
          <Tabs.Trigger
            value="invoices"
            className="px-4 py-2 hover:text-blue-600 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600"
          >
            Invoices
          </Tabs.Trigger>
          <Tabs.Trigger
            value="products"
            className="px-4 py-2 hover:text-blue-600 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600"
          >
            Products
          </Tabs.Trigger>
          <Tabs.Trigger
            value="customers"
            className="px-4 py-2 hover:text-blue-600 data-[state=active]:text-blue-600 data-[state=active]:border-b-2 data-[state=active]:border-blue-600"
          >
            Customers
          </Tabs.Trigger>
        </Tabs.List>
        
        <Tabs.Content value="invoices" className="p-4 border rounded-md">
          <InvoicesTab />
        </Tabs.Content>
        
        <Tabs.Content value="products" className="p-4 border rounded-md">
          <ProductsTab />
        </Tabs.Content>
        
        <Tabs.Content value="customers" className="p-4 border rounded-md">
          <CustomersTab />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  )
}

export default App