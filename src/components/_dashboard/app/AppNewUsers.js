import { Icon } from '@iconify/react';
import appleFilled from '@iconify/icons-ant-design/shopping-cart-outline';
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
  color: theme.palette.info.darker,
  backgroundColor: theme.palette.info.lighter
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
  color: theme.palette.info.dark,
  backgroundImage: `linear-gradient(135deg, ${alpha(theme.palette.info.dark, 0)} 0%, ${alpha(
    theme.palette.info.dark,
    0.24
  )} 100%)`
}));

// ----------------------------------------------------------------------

const TOTAL = 1352831;

export default function AppNewUsers() {
  const [PRODUCTS,setPRODUCTS]=useState([])
  useEffect(()=>{
    fetch('http://localhost:5000/allposts/all').then(res=>res.json())
    .then(result=>{
      console.log(result)
      setPRODUCTS(result.posts.length)
    })
   
  },[])

  return (
    <RootStyle>
      <IconWrapperStyle>
        <Icon icon={appleFilled} width={24} height={24} />
      </IconWrapperStyle>
      <Typography variant="h3">{fShortenNumber(PRODUCTS)}</Typography>
      <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
      Number of products 
      </Typography>
    </RootStyle>
  );
}
