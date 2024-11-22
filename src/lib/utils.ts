import { GoogleGenerativeAI } from '@google/generative-ai'
import { Invoice, Product, Customer } from './types'

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY)

export async function extractDataFromText(text: string) {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" })
    
    const prompt = `Extract invoice information from the following text. The response should be in JSON format containing arrays of invoice, product, and customer data. Format:
    {
      "invoices": [{
        "serialNumber": string,
        "customerName": string,
        "productName": string,
        "quantity": number,
        "tax": number,
        "totalAmount": number,
        "date": string,
        "status": "pending" | "paid"
      }],
      "products": [{
        "name": string,
        "quantity": number,
        "unitPrice": number,
        "tax": number,
        "priceWithTax": number
      }],
      "customers": [{
        "name": string,
        "phoneNumber": string,
        "totalPurchaseAmount": number,
        "company": string
      }]
    }

    Extract all available information and format numbers appropriately. For missing values, use null.

    Text to process:
    ${text}`

    const result = await model.generateContent(prompt)
    const response = await result.response
    const textResponse = response.text()
    
    try {
      const parsedData = JSON.parse(textResponse)
      console.log('Extracted data:', parsedData) // For debugging
      return {
        invoices: ensureArray(parsedData.invoices),
        products: ensureArray(parsedData.products),
        customers: ensureArray(parsedData.customers)
      }
    } catch (error) {
      console.error('Failed to parse AI response:', textResponse)
      throw new Error('Failed to parse AI response')
    }
  } catch (error) {
    console.error('AI extraction error:', error)
    throw new Error('Failed to extract data using AI')
  }
}

function ensureArray<T>(data: T[] | undefined): T[] {
  return Array.isArray(data) ? data : []
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR'
  }).format(amount)
}