import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState ,useEffect} from 'react';

import axios from 'axios';
import userAdd from '@iconify/icons-ant-design/user-outline';
// material
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import { Card, Typography } from '@material-ui/core';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';

// ----------------------------------------------------------------------

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: 'none',
  textAlign: 'center',
  padding: theme.spacing(5, 0),
  color: theme.palette.primary.darker,
  backgroundColor: theme.palette.primary.lighter
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
  color: theme.palette.primary.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.primary.dark, 0)} 0%, ${alpha(
    theme.palette.primary.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

const TOTAL = 714000;

export default function AppWeeklySales() {
  const [USERLISTS,setUSERLISTS]=useState()
  useEffect(()=>{
    fetch('http://localhost:5000/allUser',{
      method:"get",
      headers:{
        "Authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGNjN2Y2MGYyMjdlMjRhMDg5MmJhZTciLCJpYXQiOjE2MjY5NTE4ODR9.VGw-FLYzaPwU7Iy_VXSlNYcy0dTDlhhrita-3uMeEBw",
        "Content-Type":"application/json"
      }
    }).then(res=>res.json())
    .then(result=>{
      console.log(result)
      setUSERLISTS(result.result.length)
    })
  
  },[])
  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon icon={userAdd} width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">{fShortenNumber(USERLISTS)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
        Number of users 
      </Typography>
    </RootStyle>
  );
}
