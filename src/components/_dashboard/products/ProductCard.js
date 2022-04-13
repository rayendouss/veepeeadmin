import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
// material
import {FacebookShareButton,FacebookIcon} from "react-share"
import { Box, Card, Link, Typography, Stack } from '@material-ui/core';
import { experimentalStyled as styled } from '@material-ui/core/styles';
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
  const { _id,title, photo, price, quantite, status, postedBy } = product;

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
            {status}
          </Label>
        )}
        <ProductImgStyle alt={title} src={photo} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
          Title :{title}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
     
          <Typography variant="subtitle1">
            <Typography
              
            >
             Posted By: {postedBy.name}
            </Typography>
            
            {price} DT
            <Typography>
       Quantite : {quantite}  </Typography>
      
       <Typography>
          <FacebookShareButton
          url="https://www.youtube.com/watch?v=2BnTYEafRQc"
          quote={title}
         
          >
           <FacebookIcon logoFillColor="white" round="true">aa</FacebookIcon>
          </FacebookShareButton>
        </Typography>

          </Typography>
   
        </Stack>
      </Stack>
    </Card>
  );
}
