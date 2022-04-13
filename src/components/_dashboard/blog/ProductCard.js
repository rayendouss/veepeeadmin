/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
/* eslint-disable eqeqeq */
/* eslint-disable vars-on-top */
/* eslint-disable prefer-template */
/* eslint-disable no-var */
/* eslint-disable prefer-destructuring */
import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from "axios"
// material
import Button from '@mui/material/Button';
import { Box, Card, Link, Typography, Stack } from '@material-ui/core';
import { experimentalStyled as styled } from '@material-ui/core/styles';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { useToasts ,  } from "react-toast-notifications";
// utils
import { fCurrency } from '../../../utils/formatNumber';
//
import Label from '../../Label';
import ColorPreview from '../../ColorPreview';



// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute'
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object
};

export default function ShopProductCard({ product }) {
  const {_id, commandeBy, listCommande, paiement, quantite, status, DateC ,address,date_Reception} = product;
  const { addToast } = useToasts();
  var gapi=window.gapi
  var CLIENT_ID= "1055418627013-iv40hsnbft9iidqjn3qr9guhef1ag5ur.apps.googleusercontent.com"
  var API_KEY = "AIzaSyCeyv9YJtZ3SOrd2JF6idHLustRNvWQVaA"
  var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
  var SCOPES = "https://www.googleapis.com/auth/calendar";
  console.log(product)
const GoogleCalendar=()=>{
  gapi.load('client:auth2', () => {
    console.log('loaded client')

    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES,
    } )
  gapi.client.load('calendar', 'v3', () => console.log('bam!'))

    gapi.auth2.getAuthInstance().signIn()
    .then(() => {
      
      var event = {
        'summary': "Livraison "+ product.commandeBy.lastname+" "+product.commandeBy.name,
        'location': product.address,
        'description': product._id,
   
        'start': {
          'dateTime': value,
          'timeZone': 'America/Los_Angeles'
        },
        'end': {
          'dateTime': value,
          'timeZone': 'America/Los_Angeles'
        },
        'attendees': [
          {'email': commandeBy.email},
        
        ],
        'reminders': {
          'overrides':[
              {
              'method' : 'email',
              'minutes' :'1440'
              },
              {
              'method' : 'popup',
              'minutes' :'1440'
              }
          ],
          'useDefault': false 
      }
  
      }
      var request = gapi.client.calendar.events.insert({
        'calendarId': 'primary',
        'resource': event,
      })

      request.execute(event => {
        console.log(event)
        if(event.status=='confirmed'){
          addToast("commande effectué", { appearance: 'success', autoDismiss: true, })
            console.log('proc',product)
          axios.put('http://localhost:5000/addCommandeDateReception/'+product._id,{
            "dateR":value,
            "email":product.commandeBy.email,
            "photo":product.listCommande.photo,
            "marque":product.listCommande.marque,
            "type":product.listCommande.type,
            "quantite":product.quantite,
            "price":product.listCommande.price,
            "taille":product.listCommande.taille,
            "paiement":product.paiement,
            "date_rec":value
          }).then((res)=>
          {

            console.log('res',res)
          }
          )
        }
        window.open(event.htmlLink)
      })
      
    })

  })

}
const [value, setValue] =useState(new Date(Date.now()));

  const handleChange = (newValue) => {
    setValue(newValue.toISOString());
  };
  useEffect(()=>{
    console.log('value',value)
  },[value])
  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {status && (
          <Label
            variant="filled"
            color={(status === 'sale' && 'error') || 'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase'
            }}
          >
            {paiement}
          </Label>
        )}
        <ProductImgStyle alt={listCommande.title} src={listCommande.photo} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
          Title :  {listCommande.title}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
     
          <Typography variant="subtitle1">
            <Typography
       
            >
             Commande by : {commandeBy.name}
            </Typography>
            
            {listCommande.price} DT
            <Typography
       
            >
            Quantite : {quantite}  </Typography>
          </Typography>
      
        </Stack>
         <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DesktopDatePicker
          label="Date desktop"
          inputFormat="MM/dd/yyyy"
          value={value}
          onChange={handleChange}
          renderInput={(params) => <TextField {...params} />}
        />
     
        </LocalizationProvider>   
        { product.date_Reception == undefined ? <Button variant="contained" onClick={GoogleCalendar}>
add a delivery date</Button> 
:
<Button variant="contained" onClick={GoogleCalendar}>
update the delivery date</Button> 
}
      </Stack>
    </Card>
  );
}
