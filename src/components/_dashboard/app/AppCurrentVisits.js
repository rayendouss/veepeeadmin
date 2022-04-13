/* eslint-disable object-shorthand */
/* eslint-disable array-callback-return */
/* eslint-disable no-var */
import { useEffect, useState } from 'react';
import axios from 'axios';

import { merge } from 'lodash';
import ReactApexChart from 'react-apexcharts';
// material
import { useTheme, experimentalStyled as styled } from '@material-ui/core/styles';
import { Card, CardHeader, getStepLabelUtilityClass } from '@material-ui/core';
// utils
import { fNumber } from '../../../utils/formatNumber';
//
import { BaseOptionChart } from '../../charts';



// ----------------------------------------------------------------------

const CHART_HEIGHT = 372;
const LEGEND_HEIGHT = 72;

const ChartWrapperStyle = styled('div')(({ theme }) => ({
  height: CHART_HEIGHT,
  marginTop: theme.spacing(5),
  '& .apexcharts-canvas svg': { height: CHART_HEIGHT },
  '& .apexcharts-canvas svg,.apexcharts-canvas foreignObject': {
    overflow: 'visible'
  },
  '& .apexcharts-legend': {
    height: LEGEND_HEIGHT,
    alignContent: 'center',
    position: 'relative !important',
    borderTop: `solid 1px ${theme.palette.divider}`,
    top: `calc(${CHART_HEIGHT - LEGEND_HEIGHT}px) !important`
  }
}));

// ----------------------------------------------------------------------



export default function AppCurrentVisits() {
  const theme = useTheme();
  const [charts,setchart]=useState([])
  const [labels,setlabels]=useState([])
  useEffect(()=>{
     axios.get('http://localhost:5000/getNbnuser').then((data)=>{
       var arrayData = []
       var arrayLabel = []
      data.data.map((item) => 
        {
          if(item._id === "bancaire"){
            arrayData.push("carte bancaire")
          }
      else { arrayData.push(item._id)}
        arrayLabel.push(item.count)
      })
      
      setchart(arrayLabel)
      setlabels(arrayData)

     })
  },[])


  const CHART_DATA = charts;
  const chartOptions = merge(BaseOptionChart(), {
    colors: [
      theme.palette.primary.main,
      theme.palette.info.main,
    
    ],
    labels: labels,
    stroke: { colors: [theme.palette.background.paper] },
    legend: { floating: true, horizontalAlign: 'center' },
    dataLabels: { enabled: true, dropShadow: { enabled: false } },
    tooltip: {
      fillSeriesColor: false,
      y: {
        formatter: (seriesName) => fNumber(seriesName),
        title: {
          formatter: (seriesName) => `#${seriesName}`
        }
      }
    },
    plotOptions: {
      pie: { donut: { labels: { show: false } } }
    }
  });

  return (
    <Card>
      <CardHeader title="Method of payment" />
      <ChartWrapperStyle dir="ltr">
        <ReactApexChart type="pie" series={CHART_DATA} options={chartOptions} height={280} />
      </ChartWrapperStyle>
    </Card>
  );
}
