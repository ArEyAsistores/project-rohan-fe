import { Autocomplete, Box, Button, TextField } from '@mui/material'
import { Container } from '@mui/system'
import React, { useEffect, useState } from 'react';
import LoadingButton from '@mui/lab/LoadingButton';


const ModalCreateAccount
 = (props) => {
   

    const [role, setRole] = useState('');
    const [roles, setRoles ] = useState([]);
    const [value, setValue] = useState(roles[0]);

    const [email, setEmail] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [loading, setLoading] = useState(false);

    const { handleClose } = props;
  
    const newAccount = {
        email: email,
        firstname: firstname,
        lastname: lastname,
        role: role
    };
    const onChangeEmail = (value) => {
        setEmail(value);
      }
    const onChangeFirstname = (value) => {
        setFirstname(value);
      }
    const onChangeLastname = (value) => {
        setLastname(value);
      }
    
      const createAccount = async () => {
        console.log(newAccount);
        setLoading(true);

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 
                       Authorization: `Bearer ${JSON.parse(localStorage.getItem('token')).access_token}` 
                    },
        
            body: JSON.stringify(newAccount)
        };
        const response = await fetch('http://localhost:8080/api/users', requestOptions);
        const data = await response.json();
        console.log(data);
        setLoading(true);
        handleClose();
    }


   useEffect(() => {
     fetch("http://localhost:8080/api/roles",{
            method: 'GET',
            headers:{ 'Content-Type': 'application/json',
                      Authorization: `Bearer ${JSON.parse(localStorage.getItem('token')).access_token}`
          },
        }).then((response) => response.json())
        .then(res =>{
            setRoles(res.map((role) => role.name));
          console.log(res.map((role) => role.name));
        })
      }, [])

  return (
    <Container sx={{ position: 'absolute',
                     display:'flex',
                     flexDirection:'column',
                     justifyContent: 'center',
                     top: '50%',
                     left: '50%',
                     transform: 'translate(-50%, -50%)',
                     width: 500,
                     bgcolor: '#FFFFFF',
                     boxShadow: 24,
                     p: 4,}}>
        <TextField id="tf-email" label="Email" variant="outlined" sx={{ marginTop:2, marginBottom: 1}} onChange={(e) => {onChangeEmail(e.target.value)}} />
        <Box sx={{  display:'flex',
                    flexDirection:'row',
                    marginTop:1,
                    justifyContent: 'space-between',}}>
            <TextField id="tf-firstname" label="Firstname" variant="outlined" onChange={(e) => {onChangeFirstname(e.target.value)}} />
            <TextField id="tf-lastname" label="Lastname" variant="outlined" onChange={(e) => {onChangeLastname(e.target.value)}}/>
        </Box>
    <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        inputValue={role}
        onInputChange={(event, newInputValue) => {
          setRole(newInputValue);
        //   console.log(newInputValue);
        }}
        id="controllable-states-demo"
        options={roles}
        sx={{ width: 300, paddingTop:2, paddingBottom: 5 }}
        renderInput={(params) => <TextField {...params} label="Roles" />}
      />
        <LoadingButton variant='contained' onClick={() => createAccount()} loading={loading} >SAVE</LoadingButton>
        
    </Container>
  )
}

export default ModalCreateAccount
