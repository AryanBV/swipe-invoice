import pdfParse from 'pdf-parse'
import { Invoice, Product, Customer } from './types'

export async function parsePDF(file: File): Promise<{
  invoices: Invoice[];
  products: Product[];
  customers: Customer[];
}> {
  try {
    const arrayBuffer = await file.arrayBuffer()
    const pdfData = await pdfParse(Buffer.from(arrayBuffer))
    const text = pdfData.text

    // Extract invoice information
    const invoiceMatch = text.match(/Invoice #:\s*([^\n]*)/i)
    const dateMatch = text.match(/Invoice Date:\s*([^\n]*)/i)
    const customerMatch = text.match(/Consignee:\s*([^\n]*)/i)
    const phoneMatch = text.match(/Ph:\s*(\d+)/i)
    const companyMatch = text.match(/(?:NextSpeed Technologies Pvt Ltd|Company Name:\s*([^\n]*))/i)

    // Extract products
    const productRegex = /(\d+)\s+([^0-9]+?)\s+([\d,.]+)\s+([\d,.]+)\s+([\d,.]+%?)\s+([\d,.]+)/g
    const products: Product[] = []
    let match

    while ((match = productRegex.exec(text)) !== null) {
      const [, , name, rate, qty, taxStr, amount] = match
      const tax = parseFloat(taxStr.replace(/[^0-9.]/g, ''))
      
      products.push({
        name: name.trim(),
        quantity: parseFloat(qty.replace(/,/g, '')),
        unitPrice: parseFloat(rate.replace(/,/g, '')),
        tax,
        priceWithTax: parseFloat(amount.replace(/,/g, ''))
      })
    }

    // Extract total amount
    const totalMatch = text.match(/Total\s+(?:Amount|₹)\s*([\d,]+\.?\d*)/i)
    const totalAmount = totalMatch 
      ? parseFloat(totalMatch[1].replace(/,/g, ''))
      : products.reduce((sum, p) => sum + p.priceWithTax, 0)

    return {
      invoices: [{
        serialNumber: invoiceMatch?.[1]?.trim() ?? '',
        customerName: customerMatch?.[1]?.trim() ?? '',
        productName: products[0]?.name ?? '',
        quantity: products[0]?.quantity ?? 0,
        tax: products[0]?.tax ?? 0,
        totalAmount,
        date: dateMatch?.[1]?.trim() ?? '',
        status: 'pending'
      }],
      products,
      customers: [{
        name: customerMatch?.[1]?.trim() ?? '',
        phoneNumber: phoneMatch?.[1] ?? '',
        totalPurchaseAmount: totalAmount,
        company: companyMatch?.[1] ?? ''
      }]
    }
  } catch (error) {
    console.error('Error parsing PDF:', error)
    throw new Error('Failed to parse PDF: ' + (error instanceof Error ? error.message : 'Unknown error'))
  }
}