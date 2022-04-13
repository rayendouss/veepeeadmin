/* eslint-disable no-cond-assign */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import { sentenceCase } from 'change-case';
import { useState ,useEffect} from 'react';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal'
import Autocomplete from '@mui/material/Autocomplete'
import axios from 'axios';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination
} from '@material-ui/core';
// components
import { styled } from '@mui/material/styles';
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../components/_dashboard/user';
import USERLIST from '../_mocks_/user';



const TABLE_HEAD = [
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'email', label: 'email', alignRight: false },
  { id: 'address', label: 'address', alignRight: false },
  { id: 'genre', label: 'genre', alignRight: false },
  { id: 'Role', label: 'Role', alignRight: false },
  { id: '' }
];

// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
 
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }
  return stabilizedThis.map((el) => el[0]);
}

export default function User() {

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
  const marque=[
    { label: 'PALM ANGELS', year: 1994 },
    { label: 'AIR JORDAN', year: 1994 },
    { label: 'PRADA', year: 1994 },
    { label: 'DIOR', year: 1994 },
    { label: 'HERMES', year: 1994 },
    { label: 'PULL AND BEAR JEANS', year: 1994 },
    { label: 'NIKE', year: 1994 },
    { label: 'CHANEL', year: 1994 },
    { label: 'CONVERSE', year: 1994 },
    { label: 'DSQUARED2', year: 1994 },
    { label: 'OFF WHITE', year: 1994 },
    { label: 'LE TEMPS DES CERISES', year: 1994 },
    { label: 'LOUIS VUITTON', year: 1994 },
    { label: 'CALVIN KLEIN', year: 1994 },
    { label: 'TOMMY HILFIGER', year: 1994 },
    { label: 'LACOSTE', year: 1994 },
    { label: 'RALPH LAUREN', year: 1994 },
    { label: 'THE NORTH FACE', year: 1994 },
    { label: 'MONCLER', year: 1994 },
    { label: 'VALENTINO', year: 1994 },
    { label: 'BERSHKA', year: 1994 },
    { label: 'MANGO', year: 1994 },
    { label: 'HOLLISTER', year: 1994 },
    { label: 'BURBERRY', year: 1994 },
    { label: 'JACK & JONES', year: 1994 },
    { label: 'STONE ISLAND', year: 1994 },
    { label: 'ADIDAS', year: 1994 },
    { label: 'PUMA', year: 1994 },
    { label: 'ANTONY MORATO', year: 1994 },
    { label: 'BENETTON', year: 1994 },
    { label: 'C&A', year: 1994 },
    { label: 'CELIO', year: 1994 },
    { label: 'DIESEL', year: 1994 },
    { label: 'EDEN PARK', year: 1994 },
    { label: 'HAMADI ABID', year: 1994 },
    { label: 'FRED PERRY', year: 1994 },
    { label: 'G-STAR', year: 1994 },
    { label: 'GANT', year: 1994 },
    { label: 'GAP', year: 1994 },
    { label: 'HACKETT', year: 1994 },
    { label: 'H&M', year: 1994 },
    { label: 'HUGO BOSS', year: 1994 },
    { label: 'JULES', year: 1994 },
    { label: 'LE COQ SPORTIF', year: 1994 },
    { label: "LEVI'S", year: 1994 },
    { label: 'NEW BALANCE', year: 1994 },
    { label: 'REEBOOK', year: 1994 },
    { label: 'REDSKINS', year: 1994 },
    { label: 'SCOTHCH & SODA', year: 1994 },
   ]
   const [marqueV, setmarqueV] = useState();
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [photos, setPhotos] = useState('');
  const [status, setstatus] = useState("verified");
  const [rowsPerPage, setRowsPerPage] = useState(4);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  useEffect(()=>{
console.log('photos',photos)
  },[photos])
  const addBrand=()=>{
  
    const data= new FormData()
    data.append("file",photos)
   
    data.append("upload_preset","stagePFE")
    data.append("cloud-name","mernrayen")
    fetch("https://api.cloudinary.com/v1_1/mernrayen/image/upload",{
        method:"post",
        body:data
    }).then(res=>res.json())
  .then(()=>{

 
    axios.post('http://localhost:5000/adminsignup',{
      "email":email,
      "name":marqueV,
      "password":password,
      "status":"verified",
      "photo":photos.name
    }).then((resu) => {
        if (resu.data = 200) {
          handleClose();
        }
      })
  })
  }

  const Input = styled('input')({
    display: 'none',
  });
  
  const [USERLISTS,setUSERLISTS]=useState([])
  useEffect(()=>{
    fetch('http://localhost:5000/allUser',{
      method:"get",
      headers:{
        "Authorization":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGNjN2Y2MGYyMjdlMjRhMDg5MmJhZTciLCJpYXQiOjE2MjY5NTE4ODR9.VGw-FLYzaPwU7Iy_VXSlNYcy0dTDlhhrita-3uMeEBw",
        "Content-Type":"application/json"
      }
    }).then(res=>res.json())
    .then(result=>{
     
      setUSERLISTS(result.result)
    })

  },[USERLISTS])


  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLISTS.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLISTS.length) : 0;

  const filteredUsers = applySortFilter(USERLISTS, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

 

  return (
    <Page title="User | Minimal-UI">
       <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
         Add New Brand
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <TextField id="outlined-basic" label="Email" variant="outlined" onChange={(e) => setEmail(e.target.value)}  />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <TextField id="outlined-basic" type='password' label="Password" variant="outlined" onChange={(e) => setPassword(e.target.value)} />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <Autocomplete
      disablePortal
      id="combo-box-demo"
      options={marque}
      sx={{ width: 200 }}
      value={marqueV}
      onChange={(event, value) => setmarqueV(value.label)}
      renderInput={(params) => <TextField {...params} label="Marque" />}
    />
     </Typography>
    
     <Typography id="modal-modal-description" sx={{ mt: 2 }}>
    
     <label htmlFor="contained-button-file">
     <Button variant="contained" component="span" >
     <IconButton color="success" aria-label="upload picture" component="span" >
          <PhotoCamera />
        </IconButton>  
        <input   multiple type="file" onChange={(e) => setPhotos(e.target.files[0])} name="Upload"/>
        </Button>
      
    
      </label>
     </Typography>
     <Typography id="modal-modal-description" sx={{ mt: 2 }}>
   
     <Button
  variant="contained"
  component="label"
  onClick={()=>addBrand()}
  style={{
    marginLeft:"35%"
  }}
>
  Add Brand
 
</Button>
</Typography>
        </Box>
      </Modal>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            User
          </Typography>
          <Button
            variant="contained"
      
           
            onClick={handleOpen}
            startIcon={<Icon icon={plusFill} />}
          >
            New Brand
          </Button>
        </Stack>

        <Card>
          <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLISTS.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
             
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, name, email, address, genre, photo, role } = row;
                      const isItemSelected = selected.indexOf(name) !== -1;

                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                          role="checkbox"
                          selected={isItemSelected}
                          aria-checked={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              checked={isItemSelected}
                              onChange={(event) => handleClick(event, name)}
                            />
                          </TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Stack direction="row" alignItems="center" spacing={2}>
                              <Avatar alt={name} src={photo} />
                              <Typography variant="subtitle2" noWrap>
                                {name}
                              </Typography>
                            </Stack>
                          </TableCell>
                          <TableCell align="left">{email}</TableCell>
                          <TableCell align="left">{address}</TableCell>
                          <TableCell align="left">{genre}</TableCell>
                          <TableCell align="left">
                          <TableCell align="left">{role}</TableCell>
                          </TableCell>

                          <TableCell align="right">
                            <UserMoreMenu />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[4, 8, 12]}
            component="div"
            count={USERLISTS.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
