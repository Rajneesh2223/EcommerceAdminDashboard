"use client"
import axios from "axios";
import { useEffect, useState } from "react";
import { redirect } from "next/navigation";

export default function ProductsForm({
    _id,
    title:existingTitle,
    description:existingDescription,
    price:existingPrice,
    images,
    category:assignedCategory,
})
{
    const [title,setTitle] =useState(existingTitle || "");
    const [description,setDescription]=useState(existingDescription||"");
    const [price , setPrice] =useState(existingPrice||"");
    const [goToProducts,setGoToProducts]=useState(false);
    const [categories,setCategories] = useState([])
    const [category,setCategory] = useState(assignedCategory||'')

    useEffect(()=>{
        axios.get('/api/categories').then(result=>{
            setCategories(result.data);
        })

    },[])
    

  async function saveProduct(e) {
    e.preventDefault();
    const data = { title, description, price  ,category};

    try {
        if (_id) {
            // Update the product
            
            console.log("inside",_id)
            await axios.put('/api/products', { ...data, _id});
            alert('Product updated successfully');
        } else {
            // Create a new product
            await axios.post('/api/products', data);
            alert('Product created successfully');
        }
        setGoToProducts(true);
    } catch (error) {
        console.error('Error saving product:', error);
        alert('Error saving product');
    }
}
 
  if(goToProducts){
    return redirect('/products')
  }

async function UploadImages(e) {
    e.preventDefault(); // Prevent default form submission behavior

    const files = e.target?.files;
    if (files?.length) {
        const formData = new FormData();
        for (const file of files) {
            formData.append('file', file);
        }

        try {
            const { data } = await axios.post("/api/upload", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(data);  // Log the response data from the API
        } catch (error) {
            console.error(error.response?.data || error.message);  // Log any errors that occur
        }
    }
}



    return (
            <form onSubmit={saveProduct} className="space-y-6 max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
    <div className="space-y-2">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Product Name</label>
        <input
            id="title"
            placeholder="Product name..."
            type="text"
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={title}
            onChange={e => setTitle(e.target.value)}
        />
    </div>

    <div className="space-y-2">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
        <select
            id="category"
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={category}
            onChange={e => setCategory(e.target.value)}
        >
            <option value="">Uncategorized</option>
            {categories.length > 0 && categories.map(c => (
                <option key={c._id} value={c._id}>{c.name}</option>
            ))}
        </select>
        {categories.length >0 && (
            <div>

            </div>
        )}
    </div>

    <div className="space-y-2">
        <label htmlFor="photos" className="block text-sm font-medium text-gray-700">Photos</label>
        <label htmlFor="photos" className="relative  w-full h-24 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50 text-center flex items-center justify-center text-gray-500 hover:bg-gray-100 cursor-pointer">
            <div className="absolute inset-0 flex items-center justify-center gap-2">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
                    />
                </svg>
                <div>Upload</div>
            </div>
            <input
                id="photos"
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={UploadImages}
            />
        </label>
        {!images?.length && <p className="text-center text-sm text-gray-500">No photos in this product</p>}
    </div>

    <div className="space-y-2">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <textarea
            id="description"
            placeholder="Description..."
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={description}
            onChange={e => setDescription(e.target.value)}
        />
    </div>

    <div className="space-y-2">
        <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price (in Rupees)</label>
        <input
            id="price"
            placeholder="Price"
            type="number"
            className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            value={price}
            onChange={e => setPrice(e.target.value)}
        />
    </div>

    <button type="submit" className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">Save</button>
</form>
)
}
