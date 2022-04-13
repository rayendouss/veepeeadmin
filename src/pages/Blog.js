/* eslint-disable no-var */
/* eslint-disable prefer-destructuring */
/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
import { useFormik } from 'formik';
import { useState ,useEffect} from 'react';
import { Icon } from '@iconify/react';
// material
import { Grid ,Container, Menu, Button, MenuItem,  Typography  } from '@material-ui/core';
import chevronUpFill from '@iconify/icons-eva/chevron-up-fill';
import chevronDownFill from '@iconify/icons-eva/chevron-down-fill';

// components
import Page from '../components/Page';
import {
 
  CommandeList,
  
} from '../components/_dashboard/blog';


//
const SORT_BY_OPTIONS = [

  { value: 'livraison', label: 'Livraison' },
  { value: 'bancaire', label: 'ClickToPay' },
  { value: 'paymee', label: 'Paymee' }
];

// ----------------------------------------------------------------------

export default function Blog() {
  const [PRODUCT,setPRODUCT]=useState([])
  const [open, setOpen] = useState(null);
  const [PRODUCTS,setPRODUCTS]=useState([])
 
  const handleOpen = (event) => {
   setPRODUCTS(PRODUCT) 
   console.log(PRODUCT)
    setOpen(event.currentTarget);
 
  };
 
  const handleClose = () => {
    
    setOpen(null);
  };
  
  useEffect(()=>{
    fetch('http://localhost:5000/allCommandes',{
      method:"get",
      headers:{
        "Authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGNjN2Y2MGYyMjdlMjRhMDg5MmJhZTciLCJpYXQiOjE2MjY5NTE4ODR9.VGw-FLYzaPwU7Iy_VXSlNYcy0dTDlhhrita-3uMeEBw",
        "Content-Type":"application/json"
      }
    }).then(res=>res.json())
    .then(result=>{
      setPRODUCTS(result.commandes)
     setPRODUCT(result.commandes)
    })
  },[])

  const filterOption=(value)=>{
   
     
      
      const result = PRODUCTS.filter(pr => pr.paiement === value);
  
      setPRODUCTS(result)
      
handleClose()

  }
 

  

  return (
    <Page title="Dashboard: Products | Minimal-UI">
      <Container>
        <Typography variant="h4" sx={{ mb: 5 }}>
          Commandes
          
        </Typography>
        <Button
        color="inherit"
        disableRipple
        onClick={handleOpen}
        endIcon={<Icon icon={open ? chevronUpFill : chevronDownFill} />}
      >
        Sort By:&nbsp;
        <Typography component="span" variant="subtitle2" sx={{ color: 'text.secondary' }}>
          Paiement
        </Typography>
      </Button>
      <Menu
        keepMounted
        anchorEl={open}
        open={Boolean(open)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {SORT_BY_OPTIONS.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === 'newest'}
            onClick={() => filterOption(option.value)}
            sx={{ typography: 'body2' }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>
     

        <CommandeList products={PRODUCTS} />
   
      </Container>
    </Page>
  );
}
