'use client'
import Layout from '@/components/Layout'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'
import React, { useEffect, useState } from 'react'


const DeleteProductPage = () => {

    const router =useRouter();
    const pathname = usePathname();
  const segments = pathname.split('/');
  const id = segments[segments.length - 1];
  const [productInfo,setProductInfo]=useState();
  console.log(id)
  console.log("productinfo",productInfo)
   
    useEffect(()=>{
      if(!id){
        return ;
      }
      axios.get(`/api/products?id=${id}`)
      .then(response => {
          setProductInfo(response.data);
      })
      .catch(error => {
          console.error('Error fetching product:', error);
      });
}, [id]);
    function goBack(){
      router.push('/products')

  }

  async function deleteProduct() {
    try {
        await axios.delete(`/api/products?id=${id}`);
        alert('Product deleted successfully');
        goBack();
    } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product');
    }
}

  return (
    <Layout>
        <h1 className='text-center'>Do You really want to delete product
          &nbsp;"
          {productInfo?.title }"
           </h1>
        <div className='flex gap-4 justify-center '>

        
        <button  className='btn-red' onClick={deleteProduct}> Yes </button>
       
        <button className='btn-default' onClick={goBack}> No  </button>
        </div>
    </Layout>
  )
}

export default DeleteProductPage