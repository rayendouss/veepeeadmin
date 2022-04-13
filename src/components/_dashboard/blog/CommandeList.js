/* eslint-disable prefer-destructuring */
/* eslint-disable no-var */
import PropTypes from 'prop-types';
// material

import { useState ,useEffect} from 'react';

import { Grid ,Container, Menu, Button, MenuItem,  Typography } from '@material-ui/core';
import ShopProductCard from './ProductCard';


// ----------------------------------------------------------------------

CommandeList.propTypes = {
  products: PropTypes.array.isRequired
};

export default function CommandeList({ products, ...other }) {

  return (
    
    <Grid container spacing={3} {...other}>
            
      {products.map((product) => (
        <Grid key={product._id} item xs={12} sm={6} md={3}>
          <ShopProductCard product={product} />
         
          
        </Grid>
      ))}
    </Grid>
  );
}
