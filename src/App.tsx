import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs"

function App() {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Invoice Management System</h1>
      <Tabs defaultValue="invoices">
        <TabsList className="flex space-x-4 mb-4">
          <TabsTrigger value="invoices" className="px-4 py-2 rounded-md">
            Invoices
          </TabsTrigger>
          <TabsTrigger value="products" className="px-4 py-2 rounded-md">
            Products
          </TabsTrigger>
          <TabsTrigger value="customers" className="px-4 py-2 rounded-md">
            Customers
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="invoices">
          <div className="p-4 border rounded-md">
            Invoices Content Coming Soon
          </div>
        </TabsContent>
        
        <TabsContent value="products">
          <div className="p-4 border rounded-md">
            Products Content Coming Soon
          </div>
        </TabsContent>
        
        <TabsContent value="customers">
          <div className="p-4 border rounded-md">
            Customers Content Coming Soon
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default App