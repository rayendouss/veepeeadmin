/* eslint-disable radix */
/* eslint-disable vars-on-top */
/* eslint-disable array-callback-return */
/* eslint-disable eqeqeq */
/* eslint-disable react/jsx-no-bind */
/* eslint-disable func-names */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable prefer-destructuring */
/* eslint-disable no-unused-vars */
/* eslint-disable no-var */
import React, { useEffect , useState} from "react";

import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';

import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid' 
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import axios from "axios";

export default function CalendarApi(){
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = useState(false);
  const [detailC,setDetail]=useState(false)
  const [listcalendar, setListcalendar] = useState([]);
  const [CalendarDetail,setCalendarDetail]=useState({})
 const [commandeDetail,setCommandeDetail]=useState()
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);  
//     const API_KEY = "AIzaSyCeyv9YJtZ3SOrd2JF6idHLustRNvWQVaA";
// const calendars = [
//   {calendarId: "1055418627013-iv40hsnbft9iidqjn3qr9guhef1ag5ur.apps.googleusercontent.com"},
//   {
//     calendarId: "1055418627013-iv40hsnbft9iidqjn3qr9guhef1ag5ur.apps.googleusercontent.com",
//     color: "#B241D1" 
//   }
// ];
var gapi=window.gapi
var CLIENT_ID= "1055418627013-iv40hsnbft9iidqjn3qr9guhef1ag5ur.apps.googleusercontent.com"
var API_KEY = "AIzaSyCeyv9YJtZ3SOrd2JF6idHLustRNvWQVaA"
var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
var SCOPES = "https://www.googleapis.com/auth/calendar.events";

function geteventscalendar(){   

  gapi.load('client:auth2', () => {
    console.log('loaded client')

    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES,
    } )
  gapi.client.load('calendar', 'v3', () => console.log('bam!'))
   console.log('bch dkhal')
    gapi.auth2.getAuthInstance().signIn()
    .then(() => {
      console.log(' dkhal')
      gapi.client.calendar.events.list({
        'calendarId':"primary",
        'timeMin':(new Date()).toISOString(),
        'showDeleted':false,
        'singleEvents':true,
        'maxResults':10,
        'orderBy':'startTime'
    }).then(response=>{
      console.log('jeb')
        const events = response.result.items
      var listC=[]
        events.map((data)=>{
     
          var userD={}
          if(data.organizer.email!="nizar@wealzy.com"){
            console.log('data',data)
            userD.title=data.summary
             userD.email=data.attendees[0].email
             userD.description=data.description
             userD.date=data.start.dateTime.substr(0,10)
             userD.location=data.location
          listC.push(userD)
          }
        })
        setListcalendar(listC)
    })
      
    })

  })}
  
useEffect(()=>{
  geteventscalendar()
},[])

useEffect(()=>{
console.log('listcalendar',listcalendar)
},[listcalendar])

function renderEventContent(eventInfo) {
  console.log('aaaa',eventInfo.event._def.extendedProps.description)
 
  setCalendarDetail(eventInfo.event._def)
  axios.get(`http://localhost:5000/commande/${eventInfo.event._def.extendedProps.description}`)
  .then(res=>{
    console.log(res.data.commande)
    setCommandeDetail(res.data.commande)
    setDetail(true)
  })
  setOpen(true)
  
}
  
    return (
      <div>

<Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
 
 <Box sx={style}>
    <Typography id="modal-modal-title" variant="h6" component="h2">
      Commande detail
    </Typography>
   { detailC==true &&
    // <Typography id="modal-modal-description" sx={{ mt: 2 }}>
    //   title: {CalendarDetail.title}
    //   email: {CalendarDetail.description}
    //   address: {CalendarDetail.extendedProps.location}
    //   produit : a suivre

    // </Typography>
   
<Card sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
            {commandeDetail.commandeBy.name.substr(0,1)}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={`${commandeDetail.commandeBy.name} ${commandeDetail.commandeBy.lastname}`}
        subheader={`${commandeDetail.DateC.substr(0,10)}`}
      />
      <CardMedia
        component="img"
        height="194"
        image={commandeDetail.listCommande.photo}
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
        Delivery address: {CalendarDetail.extendedProps.location}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Paiement: {commandeDetail.paiement}
        </Typography>
        <Typography variant="body2" color="text.secondary">
        Quantity: {commandeDetail.quantite}
        </Typography>
        <Button variant="contained" style={{marginTop:"10px"}}  href={`http://localhost:3000/catalog/${commandeDetail.listCommande._id}/testg/view`} target="_blank" >
View product</Button>
      </CardContent>
  
     
    </Card>  
     } 
  </Box>
  
</Modal>

        
        {/* <Calendar apiKey={API_KEY} calendars={calendars} /> */}
      {listcalendar.length > 0 &&  <FullCalendar
  plugins={[ dayGridPlugin ]}
  initialView="dayGridMonth"
  weekends={true}
  eventClick={
    function(arg){
      renderEventContent(arg)
    }
  }
  events={listcalendar}
/>}
      </div>
    )
  
}