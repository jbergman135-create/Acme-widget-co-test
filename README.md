Acme Widget Co - Shopping Basket System

A modern shopping basket system for Acme Widget Co, built with PHP backend and React frontend.

 Overview

This project implements a full-featured shopping basket that:
- Displays a product catalog (Red Widget, Green Widget, Blue Widget)
- Adds/removes items from the basket
- Automatically calculates totals with delivery costs
- Applies special offers (Buy one Red Widget, get the second half price)
- Provides a clean, responsive user interface

 Products

| Product      | Code | Price 
| Red Widget   | R01  | $32.95 |
| Green Widget | G01  | $24.95 |
| Blue Widget  | B01  | $7.95  |

 Delivery Costs

- Under $50: $4.95
- $50 - $90: $2.95
- $90 and above: Free

Special Offers

- Buy one Red Widget, get the second half price: When purchasing Red Widgets (R01), every second item is 50% off

Project Structure


Acme Widget Co/
├── backend/                          
│   ├── src/
│   │   └── Basket.php                
│   ├── api.php                       
│   └── composer.json                 
├── frontend/                       
│   ├── src/
│   │   ├── App.jsx                 
│   │   ├── App.css               
│   │   └── components/
│   │       ├── ProductCatalog.jsx
│   │       └── BasketSummary.jsx
│   │	    ├── ProductCatalog.CSS
│   │       └── BasketSummary.CSS
│   ├── public/                   
│   ├── package.json                  
│   └── vite.config.js              
├── README.md
└── package.json                      


Getting Started

Prerequisites
- PHP 8.0 or higher
- Node.js 14+ and npm
- Composer (for PHP)

Running the Application

Terminal 1: 
cd backend
php -S 127.0.0.1:8001 api.php

Terminal 2: Start React Frontend
cd frontend
npm run dev -- --host

The frontend will be available at `http://localhost:3001`  
The backend API runs at `http://localhost:8001`


Implementation Details

Basket Calculation Logic

The Basket class handles all calculation logic:

1. Initialization: Takes products, delivery rules, and offers
2. Adding Items: add(productCode) method validates and adds items
3. Discounts: Automatically applies offer rules (e.g., buy one get second half price)
4. Delivery: Calculates delivery based on subtotal after discounts
5. Total: Returns final total with all calculations applied

Frontend Features

- Real-time Calculations: Totals update instantly as items are added/removed
- Responsive Design: Works on desktop and mobile devices
- Clear UI: Easy-to-use interface with visual feedback
- Product Management: Add/remove items with simple controls

Assumptions Made

1. Offer Application: The "buy one get second half price" offer applies to quantities in pairs (1st full price, 2nd half price, 3rd full price, 4th half price, etc.)
2. Delivery Calculation: Delivery is based on the subtotal after discounts are applied
3. CORS: Backend has CORS enabled for development (should be restricted in production)
4. No Authentication: System doesn't include user authentication or checkout
5. Product Prices: Prices are fixed and stored on the backend

