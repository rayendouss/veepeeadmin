import { Icon } from '@iconify/react';
import windowsFilled from '@iconify/icons-ant-design/file-excel-fill';
// material
import { useState ,useEffect} from 'react';
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import { Card, Typography } from '@material-ui/core';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.warning.darker,
  backgroundColor: theme.palette.warning.lighter
}));

const IconWrapperStyle = styled('div')(({ theme }) => ({
  margin: 'auto',
  display: 'flex',
  borderRadius: '50%',
  alignItems: 'center',
  width: theme.spacing(8),
  height: theme.spacing(8),
  justifyContent: 'center',
  marginBottom: theme.spacing(3),
  color: theme.palette.warning.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.warning.dark, 0)} 0%, ${alpha(
    theme.palette.warning.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

const TOTAL = 1723315;

export default function AppItemOrders() {
  const [PRODUCTS,setPRODUCTS]=useState()
  useEffect(()=>{
    fetch('http://localhost:5000/allCommandes',{
      method:"get",
      headers:{
        "Authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGNjN2Y2MGYyMjdlMjRhMDg5MmJhZTciLCJpYXQiOjE2MjY5NTE4ODR9.VGw-FLYzaPwU7Iy_VXSlNYcy0dTDlhhrita-3uMeEBw",
        "Content-Type":"application/json"
      }
    }).then(res=>res.json())
    .then(result=>{
      setPRODUCTS(result.commandes.length)
    
    })
  },[])
  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon icon={windowsFilled} width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">{fShortenNumber(PRODUCTS)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
      Orders Numbers
      </Typography>
    </RootStyle>
  );
}
