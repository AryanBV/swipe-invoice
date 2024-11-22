import { useSelector } from 'react-redux'
import { DataTable } from './DataTable'
import { RootState } from '../store/store'
import { formatCurrency } from '../lib/utils'
import { Customer } from '../lib/types'
import { ColumnDef } from '@tanstack/react-table'

export function CustomersTab() {
  const customers = useSelector((state: RootState) => state.customers)

  const columns: ColumnDef<Customer>[] = [
    {
      accessorKey: 'name',
      header: 'Customer Name',
    },
    {
      accessorKey: 'phoneNumber',
      header: 'Phone Number',
    },
    {
      accessorKey: 'totalPurchaseAmount',
      header: 'Total Purchase Amount',
      cell: ({ row }) => formatCurrency(row.original.totalPurchaseAmount),
    },
    {
      accessorKey: 'company',
      header: 'Company',
      cell: ({ row }) => row.original.company || '-',
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Customers</h2>
        <div className="text-sm text-gray-500">
          Total: {customers.length} customers
        </div>
      </div>
      <DataTable columns={columns} data={customers} />
    </div>
  )
}