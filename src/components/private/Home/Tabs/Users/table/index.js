import { React, useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid';
import { Box } from '@mui/system';
import { Button, CircularProgress, Container, IconButton, InputAdornment, Modal, TextField, Typography } from '@mui/material';
import ModalCreateAccount from './ModalCreateAccount';
import SearchIcon from '@mui/icons-material/Search';
import { usersSearch } from '../../../../../../api/users';

const Table = () => {
    
    const TABLE_COLUMNS = [
        { field: 'id', headerName: 'ID', width: 90 },
        {
          field: 'firstname',
          headerName: 'First name',
          width: 150,
        },
        {
          field: 'lastname',
          headerName: 'Last name',
          width: 150,
        },
        {
          field: 'email',
          headerName: 'Email',
          width: 200,
        },
        {
            field: 'role',
            headerName: 'Role',
            width: 180,
            editable: true,
          },
      ];

    const [ open, setOpen ] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [ searchValue, setSearchValue ] = useState('');
    const [ searchRes, setSearchRes ] = useState('');
    const [ isLoading, setIsLoading ] = useState(false);
    const onChangeSearch = (event) => {
      setSearchValue(event.target.value);
    }
  
    useEffect( () => {
      (async function fetchUsers()  {
        setIsLoading(true);
        // console.log(searchRes);
        const searchResult = await usersSearch(searchValue);
        setSearchRes(searchResult);
        setIsLoading(false);
      })();
      
    }, [searchValue]);

  return (
    <Box  sx={{ height: '100%', width: 'auto',  }}>
      <Modal
        open={open}
        onClose={ handleClose }
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <ModalCreateAccount handleClose = { handleClose }/>
        </Box>
      </Modal>
      <TextField  sx={{ margin: 1, color:'#ffffff'}} 
                    className  = 'textField' 
                    label      = 'Search'
                    value      = {searchValue}
                    onChange   = { onChangeSearch }
                    InputProps = {{
                      endAdornment:(
                        <InputAdornment position = 'end'>
                        <IconButton edge = 'start'>
                          { <SearchIcon /> }
                        </IconButton>
                      </InputAdornment>
                                )
         }}/>
    <DataGrid
       rows={searchRes?.data? searchRes?.data : {}}
       columns={TABLE_COLUMNS}
       pageSize={searchRes?.size? searchRes?.size : 10}
       rowsPerPageOptions={[1]}
       checkboxSelection
       disableSelectionOnClick
       components={{
        NoRowsOverlay: () => (
         <Container sx={{ backgroundColor:'#FFFBF5',height: '65vh', display:'flex', alignItems:'center', justifyContent: 'center' }}>
        {
           isLoading ? <CircularProgress/> : 
           <Typography>
              No result
           </Typography>
        }
         </Container>
        ),
      }}
       experimentalFeatures={ { newEditingApi: true, lazyLoading: isLoading }}
     />
     <Box sx={{ display: 'flex', justifyContent:'flex-end', marginTop: '10px',  }}>
         <Button variant='contained' onClick={handleOpen} sx={{width: '120px', marginRight: '15px'}}> ADD </Button>
         <Button variant='contained'sx={{ width: '120px', marginRight: '15px', backgroundColor: '#ff5252'}} >DEACTIVATE</Button>
     </Box>
   </Box>
  )
}

export default Table