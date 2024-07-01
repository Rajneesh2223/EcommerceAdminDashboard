import { mongooseConnect } from '../../../../lib/mongoose';
import Product from '../../../../models/product';
import { NextResponse } from 'next/server';

export const POST = async (req) => {
  try {
    // Connect to MongoDB
    
    await mongooseConnect();
    // Parse the request body
    const body = await req.json();
    const { title, description, price, category } = body;
    console.log({ title, description, price,category });

    // Validate required fields
    if (!title || !price) {
      return NextResponse.json({ error: 'Title and Price are required' }, { status: 400 });
    }

    // Create a new product using Mongoose model
    const productDoc = await Product.create({
      title,
      description,
      price,
      category,
    });

    // Respond with the created product document
    return NextResponse.json(productDoc, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json({ error: 'Error creating product' }, { status: 500 });
  }
};
export const GET = async (req) => {
  try {
    await mongooseConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (id) {
      const product = await Product.findById(id); 
      if (!product) {
        return NextResponse.json({ error: 'Product not found' }, { status: 404 });
      }
      return NextResponse.json(product, { status: 200 });
    } else {
      const products = await Product.find();
      return NextResponse.json(products, { status: 200 });
    }
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: 'Error fetching products' }, { status: 500 });
  }
};


export const PUT = async (req) => {
  try {
    await mongooseConnect();
    const body = await req.json();
    const { _id, title, description, price , category} = body;
    // console.log("Received PUT request with data:", { _id, title, description, price });
    if (!_id) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }
    const updatedProduct = await Product.updateOne({ _id}, { title, description, price ,category});

    if (updatedProduct.nModified === 0) {
      return NextResponse.json({ error: 'Product not found or no changes made' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Product updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ error: 'Error updating product' }, { status: 500 });
  }
};




export const DELETE = async (req) => {
  try {
    await mongooseConnect();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    console.log(id)

    if (!id) {
      return NextResponse.json({ error: 'Product ID is required' }, { status: 400 });
    }

    await Product.deleteOne({ _id: id });

    return NextResponse.json(true, { status: 200 });
  } catch (error) {
    console.error('Error deleting product:', error);
    return NextResponse.json({ error: 'Error deleting product' }, { status: 500 });
  }
};
