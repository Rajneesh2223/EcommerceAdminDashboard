"use client";
import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import axios from 'axios';
import { withSwal } from 'react-sweetalert2';

function CategoriesPage({ swal }) {
    const [editedCategory, setEditedCategory] = useState(null);
    const [name, setName] = useState('');
    const [categories, setCategories] = useState([]);
    const [parentCategory, setParentCategory] = useState('');
    const [properties, setProperties] = useState([]);

    useEffect(() => {
        fetchCategories();
    }, []);

    async function fetchCategories() {
        try {
            const result = await axios.get('/api/categories');
            setCategories(result.data);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    }

    async function deleteCategory(category) {
        try {
            await swal.fire({
                title: 'Are you sure?',
                text: `Do you want to delete the category: ${category.name}?`,
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!',
            }).then(async result => {
                if (result.isConfirmed) {
                    const { _id } = category;

                    // Send DELETE request with query parameter
                    await axios.delete(`/api/categories?_id=${_id}`);
            
                    swal.fire(
                      'Deleted!',
                      'Category has been deleted.',
                      'success'
                    );
                    fetchCategories();
                }
            });
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    }

    async function saveCategory(ev) {
        ev.preventDefault();

        const data = { name, parentCategory, properties ,properties};

        try {
            if (editedCategory) {
                // If editing an existing category, send a PUT request
                data._id = editedCategory._id;
                await axios.put(`/api/categories`, data);
                setEditedCategory(null);  // Reset editedCategory state
            } else {
                // If creating a new category, send a POST request
                await axios.post('/api/categories', data);
            }

            setName('');
            setParentCategory('');  // Clear the parent field after successful submission
            setProperties([]);     // Clear properties field after successful submission
            fetchCategories();  // Refresh the categories list
        } catch (error) {
            console.error("Error saving category:", error);
        }
    }

    function editCategory(category) {
        setEditedCategory(category);
        setName(category.name);
        setParentCategory(category.parent?._id || '');  // Set parentCategory from the selected category
        setProperties(category.properties || []);        // Set properties from the selected category
    }

    function addProperty() {
        setProperties(prev => [
            ...prev,
            { name: "", values: "" }
        ]);
    }

    function handlePropertyNameChange(index, newName) {
        setProperties(prev => 
            prev.map((property, i) =>
                i === index ? { ...property, name: newName } : property
            )
        );
    }

    function handlePropertyValuesChange(index, newValue) {
        setProperties(prev => 
            prev.map((property, i) =>
                i === index ? { ...property, values: newValue } : property
            )
        );
    }

    function removeProperty(index) {
        setProperties(prev => prev.filter((_, i) => i !== index));
    }

    return (
        <Layout>
            <h1>Categories</h1>
            <label>{editedCategory ? `Edit Category ${editedCategory.name}` : 'New Category Name'}</label>
            <form onSubmit={saveCategory}>
                <div className='flex gap-1'>
                    <input
                        type="text"
                        placeholder="Category Name"
                        onChange={ev => setName(ev.target.value)}
                        value={name}
                    />
                    <select
                        onChange={ev => setParentCategory(ev.target.value)}
                        value={parentCategory}
                    >
                        <option value="">No Parent Category</option>
                        {categories.map(category => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md space-y-4 mb-2">
                    <label className="block text-lg font-semibold text-gray-800">Properties</label>
                    <button
                        type='button'
                        onClick={addProperty}
                        className="w-full px-4 py-2 bg-blue-900 text-white font-semibold rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                        Add Properties
                    </button>
                    {properties.length > 0 && properties.map((property, index) => (
                        <div key={index} className='flex gap-1'>
                            <input
                                type='text'
                                value={property.name}
                                onChange={ev => handlePropertyNameChange(index, ev.target.value)}
                                placeholder="Property Name"
                            />
                            <input
                                type='text'
                                value={property.values}
                                onChange={ev => handlePropertyValuesChange(index, ev.target.value)}
                                placeholder="Property Value"
                            />
                            <button
                                type='button'
                                onClick={() => removeProperty(index)}
                                className="px-2 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
                <div className='flex gap-1'>
                    {editedCategory && (
                        <button 
                        type='button'
                        onClick={()=>{
                            setEditedCategory(null)
                            setName('')
                            setParentCategory('')
                            setProperties([])

                        } }
                        className='btn-default'
                        >
                            Cancel</button>
                    )}
                    <button type='submit' className='btn-primary py-1'>
                        Save
                    </button>
                </div>
               
            </form>
            {!editedCategory && (
                <table className='basic mt-4'>
                <thead>
                    <tr>
                        <td>Category Name</td>
                        <td>Parent Category</td>
                        <td>Actions</td>
                    </tr>
                </thead>
                <tbody>
                    {categories.map(category => (
                        <tr key={category._id}>
                            <td>{category.name}</td>
                            <td>{category.parent?.name || 'No Parent'}</td> {/* Display parent category name */}
                            <td>
                                <button className='btn-primary mr-1' onClick={() => editCategory(category)}>
                                    <svg className='w-4 h-4' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                                    </svg>
                                    Edit
                                </button>
                                <button className='btn-primary mr-1' onClick={() => deleteCategory(category)}>
                                    <svg className='w-4 h-4' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                                    </svg>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            )}
            
        </Layout>
    );
}

export default withSwal(({ swal }, ref) => <CategoriesPage swal={swal} />);
