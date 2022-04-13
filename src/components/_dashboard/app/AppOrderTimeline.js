/* eslint-disable no-plusplus */
/* eslint-disable vars-on-top */
/* eslint-disable no-var */
/* eslint-disable no-unused-vars */
/* eslint-disable prefer-template */
/* eslint-disable array-callback-return */
import faker from 'faker';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import axios from 'axios';
// material
import { Card, Typography, CardHeader, CardContent } from '@material-ui/core';
import {
  Timeline,
  TimelineItem,
  TimelineContent,
  TimelineConnector,
  TimelineSeparator,
  TimelineDot
} from '@material-ui/lab';
// utils
import { fDateTime } from '../../../utils/formatTime';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

OrderItem.propTypes = {
  item: PropTypes.object,
  isLast: PropTypes.bool
};

function OrderItem({ item, isLast }) {
  const { type, title, time } = item;
  return (
    <TimelineItem>
      <TimelineSeparator>
        <TimelineDot
          sx={{
            bgcolor:
              (type === 'order1' && 'primary.main') ||
              (type === 'order2' && 'success.main') ||
              (type === 'order3' && 'info.main') ||
              (type === 'order4' && 'warning.main') ||
              'error.main'
          }}
        />
        {isLast ? null : <TimelineConnector />}
      </TimelineSeparator>
      <TimelineContent>
        <Typography variant="subtitle2">{title}</Typography>
        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
          {fDateTime(time)}
        </Typography>
      </TimelineContent>
    </TimelineItem>
  );
}

export default function Appmosttaille() {
  
const TIMELINES = [
  {
    title: '1983, orders, $4220',
    time: faker.date.past(),
    type: 'order1'
  },
  {
    title: '12 Invoices have been paid',
    time: faker.date.past(),
    type: 'order2'
  },
  {
    title: 'Order #37745 from September',
    time: faker.date.past(),
    type: 'order3'
  },
  {
    title: 'New order placed #XF-2356',
    time: faker.date.past(),
    type: 'order4'
  },
  {
    title: 'New order placed #XF-2346',
    time: faker.date.past(),
    type: 'order5'
  }
];

const [timelineArr,settimelineArr]=useState([])
useEffect(()=>{
console.log('settimelineArr',timelineArr)
},[timelineArr])

useEffect(()=>{
   axios.get('http://localhost:5000/commandetraite').then(data=>{
 console.log('data',data.data.result)
     var id = 1 ;
     const timelinedata = []
     data.data.result.map((item)=>{
       const title = "order for "+ item.commandeBy.lastname + " " +item.commandeBy.name + " , price " + item.listCommande.price +"DT"
       const time =  item.date_Reception.substr(0,10) + " " + item.date_Reception.substr(12,4)
     const type = "order"+id;

       id++
       timelinedata.push({title,time,type})
     })
     settimelineArr(timelinedata)
   })
},[])

  return (
    <Card
      sx={{
        '& .MuiTimelineItem-missingOppositeContent:before': {
          display: 'none'
        }
      }}
    >
      <CardHeader title="Order Timeline" />
      <CardContent>
        <Timeline>
          {timelineArr.map((item, index) => (
            <OrderItem key={item.title} item={item} isLast={index === timelineArr.length - 1} />
          ))}
        </Timeline>
      </CardContent>
    </Card>
  );
}
