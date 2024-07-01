"use client";
import Layout from '@/components/Layout';
import { usePathname } from 'next/navigation';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ProductsForm from '../../../../components/ProductsForm'

const EditProductPage = () => {
  
  const [productInfo, setProductInfo] = useState(null);
  const pathname = usePathname();
  const segments = pathname.split('/');
  const id = segments[segments.length - 1];
  console.log(id)
  
  console.log("productinfo",productInfo)

  
  useEffect(() => {
    if (!id) {
      return;
    }
    axios.get(`/api/products?id=${id}`).then(response => {
      setProductInfo(response.data);
     
    }).catch(error => {
      console.error('Error fetching product:', error);
    });
  }, [id]);

  return (
    <Layout>
      <h1>Edit Product</h1>
      {productInfo && ( <ProductsForm {...productInfo} />)}
    </Layout>
  );
};

export default EditProductPage;
