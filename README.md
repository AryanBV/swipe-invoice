# Swipe Invoice Management System

A React application for automated invoice data extraction and management.

## Features

- File upload support for Excel, PDF, and Images
- AI-powered data extraction using Google Gemini
- Real-time data synchronization across tabs
- Comprehensive invoice, product, and customer management

## Tech Stack

- React with TypeScript
- Redux Toolkit for state management
- Tailwind CSS for styling
- Google Gemini AI for data extraction
- React Table for data display

## Setup

1. Clone the repository:
```bash
git clone https://github.com/AryanBV/swipe-invoice.git
cd swipe-invoice
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory and add your Gemini API key:
```
VITE_GEMINI_API_KEY=your_api_key_here
```

To get an API key:
- Visit https://makersuite.google.com/app/apikey
- Sign in with your Google account
- Create a new API key

4. Start the development server:
```bash
npm run dev
```

## Project Structure

- `/src/components`: React components
- `/src/store`: Redux store configuration
- `/src/lib`: Types and utilities
- `/src/services`: API services

## Features

### Invoices Tab
- View all invoices
- Sort and filter functionality
- Real-time updates

### Products Tab
- Product management
- Automatic price calculations
- Tax handling

### Customers Tab
- Customer information management
- Purchase history tracking

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.