# ShopIT - E-Commerce Website

## Overview
ShopIT is a full-stack e-commerce web application built using the MERN stack. It provides users with a seamless shopping experience including product browsing, cart management, authentication, order placement, and secure payments.

# Link - https://shop-it-beryl.vercel.app/

## Features

### User Features
- User Authentication (Register/Login)
- JWT-based Authorization
- Browse Products
- Add to Cart
- Place Orders
- Order Tracking
- User Profile Management
- Responsive Design

### Admin Features
- Add / Update / Delete Products
- Manage Orders
- Manage Users
- Dashboard Analytics

## Tech Stack

### Frontend
- React.js
- Tailwind CSS
- Axios
- React Router DOM
- Redux Toolkit / Context API

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcrypt.js

### Payment Integration
- Razorpay Payment Gateway

## Project Structure

```bash
│
├── client/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   └── App.jsx
│
├── server/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── uploads/
│   ├── server.js
│   └── .env
│
└── README.md
```

### Install Dependencies

Frontend:

```bash
cd client
npm install
```

Backend:

```bash
cd server
npm install
```

## Run Project

Backend:

```bash
cd server
npm run dev
```

Frontend:

```bash
cd client
npm run dev
```

## API Endpoints

### Authentication

- POST `/api/auth/register`
- POST `/api/auth/login`

### Products

- GET `/api/products`
- POST `/api/products`

### Orders

- POST `/api/orders`
- GET `/api/orders/myorders`

## Screenshot

<img width="1366" height="649" alt="Screenshot (128)" src="https://github.com/user-attachments/assets/feec969d-10c5-45be-9281-e5113a3e9c5c" />

## Author

**Pranjal Patel**

Email: pranjalpatel8827@gmail.com
