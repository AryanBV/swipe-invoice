import { configureStore, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppState, Invoice, Product, Customer } from '../lib/types';

const initialState: AppState = {
  invoices: [],
  products: [],
  customers: [],
  loading: false,
  error: null
};

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setInvoices: (state, action: PayloadAction<Invoice[]>) => {
      state.invoices = action.payload;
    },
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    setCustomers: (state, action: PayloadAction<Customer[]>) => {
      state.customers = action.payload;
    },
    updateProduct: (state, action: PayloadAction<Product>) => {
      const index = state.products.findIndex(p => p.name === action.payload.name);
      if (index !== -1) {
        state.products[index] = action.payload;
        // Update corresponding invoices
        state.invoices = state.invoices.map(invoice => {
          if (invoice.productName === action.payload.name) {
            return {
              ...invoice,
              tax: action.payload.tax,
              totalAmount: action.payload.priceWithTax * invoice.quantity
            };
          }
          return invoice;
        });
      }
    },
    updateCustomer: (state, action: PayloadAction<Customer>) => {
      const index = state.customers.findIndex(c => c.name === action.payload.name);
      if (index !== -1) {
        state.customers[index] = action.payload;
        // Update corresponding invoices customer info
        state.invoices = state.invoices.map(invoice => {
          if (invoice.customerName === action.payload.name) {
            return {
              ...invoice,
              customerName: action.payload.name
            };
          }
          return invoice;
        });
      }
    }
  }
});

export const {
  setLoading,
  setError,
  setInvoices,
  setProducts,
  setCustomers,
  updateProduct,
  updateCustomer
} = appSlice.actions;

export const store = configureStore({
  reducer: appSlice.reducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;