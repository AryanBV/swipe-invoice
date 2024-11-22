export interface Invoice {
    serialNumber: string;
    customerName: string;
    productName: string;
    quantity: number;
    tax: number;
    totalAmount: number;
    date: string;
    status: 'pending' | 'paid';
  }
  
  export interface Product {
    name: string;
    quantity: number;
    unitPrice: number;
    tax: number;
    priceWithTax: number;
  }
  
  export interface Customer {
    name: string;
    phoneNumber: string;
    totalPurchaseAmount: number;
    company: string;
  }
  
  export interface AppState {
    invoices: Invoice[];
    products: Product[];
    customers: Customer[];
    loading: boolean;
    error: string | null;
  }