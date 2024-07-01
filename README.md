# This is an Ecommerce Admin Dashboard built with Next.js, MongoDB, and Google OAuth for authentication. The application allows admins to manage products, categories, and other ecommerce-related data.

Table of Contents
Installation
Environment Variables
Usage
API Endpoints
Features
Contributing
License

## Clone the repository:

git clone https://github.com/Rajneesh2223/EcommerceAdminDashboard.git
cd EcommerceAdminDashboard

## Install the dependencies:
npm install
## Set up MongoDB:
Make sure you have MongoDB installed and running.
Create a MongoDB database and note the connection string.
## Environment Variables
Create a .env file and then put these information given below

MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/<database>?retryWrites=true&w=majority
GOOGLE_CLIENT_ID=<your-google-client-id>
GOOGLE_CLIENT_SECRET=<your-google-client-secret>
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<your-next-auth-secret>

Replace the placeholders with your actual MongoDB URI, Google OAuth credentials, and NextAuth secret.

## Start the development server:
npm run dev

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
