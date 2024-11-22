import { Invoice, Product, Customer } from './types'

declare const pdfjsLib: any

export async function processFile(file: File): Promise<{
  invoices: Invoice[];
  products: Product[];
  customers: Customer[];
}> {
  try {
    const text = await extractTextFromPDF(file)
    console.log('Extracted text:', text)

    // Parse the text content
    const invoiceNumber = text.match(/Invoice #:\s*(INV-[0-9A-Z]+)/)?.[1] || ''
    const date = text.match(/Invoice Date:\s*([^\n]+)/)?.[1] || ''
    const customerName = text.match(/Consignee:\s*([^\n]+)/)?.[1] || ''
    const phoneNumber = text.match(/Ph:\s*([0-9]+)/)?.[1] || ''
    const company = text.match(/NextSpeed Technologies[^\n]*/)?.[0] || ''

    // Extract products
    const products = extractProducts(text)

    // Get total amount
    const totalMatch = text.match(/Total\s*₹\s*([\d,]+\.?\d*)/i)
    const totalAmount = totalMatch ? parseFloat(totalMatch[1].replace(/,/g, '')) : 0

    return {
      invoices: [{
        serialNumber: invoiceNumber,
        customerName,
        productName: products[0]?.name || '',
        quantity: products[0]?.quantity || 0,
        tax: products[0]?.tax || 0,
        totalAmount,
        date,
        status: 'pending'
      }],
      products,
      customers: [{
        name: customerName,
        phoneNumber,
        totalPurchaseAmount: totalAmount,
        company
      }]
    }
  } catch (error) {
    console.error('Error processing file:', error)
    throw error
  }
}

async function extractTextFromPDF(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = async function() {
      try {
        const typedarray = new Uint8Array(this.result as ArrayBuffer)
        const pdf = await pdfjsLib.getDocument({ data: typedarray }).promise
        let text = ''
        
        // Get text content from all pages
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i)
          const content = await page.getTextContent()
          text += content.items.map((item: any) => item.str).join(' ') + '\n'
        }
        
        resolve(text)
      } catch (error) {
        reject(error)
      }
    }
    reader.onerror = reject
    reader.readAsArrayBuffer(file)
  })
}

function extractProducts(text: string): Product[] {
  const products: Product[] = []
  const lines = text.split('\n')
  
  // Find lines that look like product entries
  const productPattern = /(\d+)\s+([\w\s]+?)\s+(\d+\.?\d*)\s+(\d+,?\d*\.?\d*)\s+(\d+,?\d*\.?\d*)\s+(\d+\.?\d*)%?\s+(\d+,?\d*\.?\d*)/
  
  for (const line of lines) {
    const match = line.match(productPattern)
    if (match) {
      const [, , name, rate, quantity, , tax, amount] = match
      
      products.push({
        name: name.trim(),
        quantity: parseFloat(quantity.replace(/,/g, '')),
        unitPrice: parseFloat(rate),
        tax: parseFloat(tax),
        priceWithTax: parseFloat(amount.replace(/,/g, ''))
      })
    }
  }
  
  return products
}