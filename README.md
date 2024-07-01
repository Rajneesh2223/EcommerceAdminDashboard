# Ecommerce Admin Dashboard

This is an Ecommerce Admin Dashboard built with Next.js, MongoDB, and Google OAuth for authentication. The application allows admins to manage products, categories, and other ecommerce-related data.

## Table of Contents

- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## Installation

### Clone the repository

```sh
git clone https://github.com/Rajneesh2223/EcommerceAdminDashboard.git
cd EcommerceAdminDashboard

Install the dependencies
sh
Copy code
npm install
Set up MongoDB
Make sure you have MongoDB installed and running.
Create a MongoDB database and note the connection string.
Environment Variables
Create a .env file in the root of your project and add the following environment variables:

env
Copy code
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<database>?retryWrites=true&w=majority
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<your-next-auth-secret>
Replace the placeholders with your actual MongoDB URI, Google OAuth credentials, and NextAuth secret.

Usage
Start the development server
sh
Copy code
npm run dev
Open your browser and navigate to http://localhost:3000.

API Endpoints
The application provides the following API endpoints:

GET /api/products: Get all products.
POST /api/products: Create a new product.
PUT /api/products: Update an existing product.
DELETE /api/products: Delete a product.
GET /api/categories: Get all categories.
POST /api/categories: Create a new category.
PUT /api/categories: Update an existing category.
DELETE /api/categories: Delete a category.
POST /api/upload: Upload product images.
Features
Authentication: Secure authentication using Google OAuth.
Product Management: Create, read, update, and delete products.
Category Management: Create, read, update, and delete categories.
Image Upload: Upload product images using a simple drag-and-drop interface.
Responsive Design: Responsive and user-friendly interface.
Contributing
Contributions are welcome! Please fork this repository and submit a pull request with your changes. For major changes, please open an issue first to discuss what you would like to change.

License
This project is licensed under the MIT License. See the LICENSE file for details.
