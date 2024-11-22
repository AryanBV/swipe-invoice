import { useSelector } from 'react-redux'
import { DataTable } from './DataTable'
import { RootState } from '../store/store'
import { formatCurrency } from '../lib/utils'
import { Product } from '../lib/types'
import { ColumnDef, Row } from '@tanstack/react-table'

export function ProductsTab() {
  const products = useSelector((state: RootState) => state.products)

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
    },
    {
      accessorKey: 'quantity',
      header: 'Quantity',
    },
    {
      accessorKey: 'unitPrice',
      header: 'Unit Price',
      cell: ({ row }: { row: Row<Product> }) => formatCurrency(row.original.unitPrice),
    },
    {
      accessorKey: 'tax',
      header: 'Tax',
      cell: ({ row }: { row: Row<Product> }) => `${row.original.tax}%`,
    },
    {
      accessorKey: 'priceWithTax',
      header: 'Price with Tax',
      cell: ({ row }: { row: Row<Product> }) => formatCurrency(row.original.priceWithTax),
    },
    {
      accessorKey: 'discount',
      header: 'Discount',
      cell: ({ row }: { row: Row<Product> }) => row.original.discount ? `${row.original.discount}%` : '-',
    },
  ]

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Products</h2>
        <div className="text-sm text-gray-500">
          Total: {products.length} products
        </div>
      </div>
      <DataTable columns={columns} data={products} />
    </div>
  )
}