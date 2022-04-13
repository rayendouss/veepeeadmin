import { useFormik } from 'formik';
import { useState ,useEffect} from 'react';
// material


import { Container, Menu, Button, MenuItem,  Typography } from '@material-ui/core';
// components
import Page from '../components/Page';
import {
  ProductSort,
  ProductList,
  ProductCartWidget,
  ProductFilterSidebar
} from '../components/_dashboard/products';
//



export default function EcommerceShop() {
 
  const [PRODUCTS,setPRODUCTS]=useState([])
  useEffect(()=>{
    fetch('http://localhost:5000/allposts/all').then(res=>res.json())
    .then(result=>{
      console.log(result)
      setPRODUCTS(result.posts)
    })
   
  },[])


 

  

  return (
    <Page title="Dashboard: Products | Minimal-UI">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Products
        </Typography>

     

        <ProductList products={PRODUCTS} />
   
      </Container>
    </Page>
  );
}
