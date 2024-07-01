import { NextResponse } from "next/server";
import { mongooseConnect } from "../../../../lib/mongoose";
import Category from "../../../../models/Category";

export async function POST(req) {
  try {
    await mongooseConnect();
    const { name ,parentCategory, properties } = await req.json(); // Parse JSON body
    const categoryDoc = await Category.create({ 
        name ,
        parent : parentCategory|| undefined,
        properties:properties.map(p=>
            ({
                name:p.name,
                values:p.values.split(',')
            })),
     });
    return new Response(JSON.stringify(categoryDoc), {
      status: 201,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error("Error creating category:", error);
    return new Response(JSON.stringify({ error: "Error creating category" }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}


export async function GET(req) {
    await mongooseConnect();
    const categories = await Category.find().populate('parent');
    return NextResponse.json(categories);
}

export async function PUT(req) {
    try {
        await mongooseConnect();  // Connect to the database
        const { _id, name, parentCategory ,properties } = await req.json();  // Parse the JSON body

        // Update the category document
        const categoryDoc = await Category.updateOne(
            { _id },  // Filter by the category ID
            { $set: { name, parent:  parentCategory|| undefined, properties } }  // Update fields
        );

        // Return the updated category document
        return NextResponse.json(categoryDoc);
    } catch (error) {
        console.error("Error updating category:", error);
        return NextResponse.json({ error: "Error updating category" }, { status: 500 });
    }
}
export async function DELETE(req) {
    try {
      await mongooseConnect();
  
      // Get the search parameters from the URL
      const { searchParams } = new URL(req.url);
      const id = searchParams.get('_id');  // Ensure you are using _id as the query parameter name
  
      console.log("Deleting category with ID:", id);  // Log the ID for debugging
  
      if (!id) {
        return NextResponse.json({ error: 'ID is required' }, { status: 400 });
      }
  
      // Delete the category with the given ID
      const result = await Category.deleteOne({ _id: id });
  
      if (result.deletedCount === 0) {
        return NextResponse.json({ error: 'Category not found' }, { status: 404 });
      }
  
      return NextResponse.json({ message: 'Category deleted' });
  
    } catch (error) {
      console.error("Error deleting category:", error);
      return NextResponse.json({ error: "Error deleting category" }, { status: 500 });
    }
  }