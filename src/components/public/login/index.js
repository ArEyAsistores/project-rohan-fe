import { Box, Button, Link, TextField, Typography, InputAdornment, IconButton } from '@mui/material'
import {React, useState, useEffect, useRef } from 'react';
import './style.css';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [userToken, setUserToken] = useState();
    const [email, setEmail] = useState('');
    const [getPassword, setPassword] = useState('');
    const [err, setErr] = useState('');
    const history = useNavigate();

    const [state, setState] = useState({
      isPasswordVisible        : false,
      isConfirmPasswordVisible : false,
      password                 : '',
      isPasswordError          : false,
      passwordErrorDesc        : '',
      confirmPassword          : '',
      isConfirmPasswordError   : false,
      confirmPasswordErrorDesc : '',
      isPasswordPassed         : false, 
      passwordCriteria         : {
      has8Characters           : false,
      has1Lowercase            : false,
      has1Uppercase            : false,
      has1Number               : false,
      has1SpecialCharacter     : false
    }
    });
    
    const {
      password, confirmPassword, isPasswordVisible, isPasswordError, passwordErrorDesc, isConfirmPasswordVisible, isConfirmPasswordError, confirmPasswordErrorDesc, passwordCriteria, isPasswordPassed
    } = state;

    const handleClickShowConfirmPassword = () =>{
      setState({...state, isConfirmPasswordVisible: !isConfirmPasswordVisible, isDisableVisible: true});
    }
   
    const handleClick =  async (e) => {
        await fetch("http://localhost:8080/api/login",{
            headers:{'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'},
            method: 'POST',
            body: new URLSearchParams({
              'email': email,
              'password': getPassword,
          })
        })
        .then((response) => response.json())
        .then(res =>{
          setUserToken(res)
          localStorage.setItem('token', JSON.stringify(res))
          console.log(res);
          console.log(email);
          history('/home');
        })
      };
      // GET request
      const handleClickList =  async (e) => {
        await fetch("http://localhost:8080/api/users",{
            method: 'GET',
            headers:{ 'Content-Type': 'application/json',
                      Authorization: `Bearer ${JSON.parse(localStorage.getItem('token')).access_token}`
          },
        }).then((response) => response.json())
        .then(res =>{
          
          console.log(res);
        })
      };
      
      const onChangeEmail = (value) => {
        setEmail(value);
      }
      const getInputPassword = (value) => {
        setPassword(value);
      }
  

  return (
    <Box sx= {{ position:'absolute',
                top:'0px',
                right:'60vw',
                bottom:'0px',
                left:'0px',
                bgcolor: '#ffffff', 
                display: 'flex',
                padding: 10,
                justifyContent:'center',
                flexDirection:'column'}}>
        <Typography sx={{ padding: 2}} >Welcome to the Project Rohan</Typography>
        <TextField  sx={{ margin: 1, color:'#ffffff'}} 
                    className  = 'textField' 
                    label      = 'Email' 
                    onChange   = {(e) => {onChangeEmail(e.target.value)}}
                    InputProps = {{
                      endAdornment:(
                        <InputAdornment position = 'end'>
                        <IconButton edge = 'start'>
                          { <PersonIcon /> }
                        </IconButton>
                      </InputAdornment>
                                )
         }}/>
        <TextField  sx = {{ margin: 1, color:'#ffffff'}} 
                        className     = 'textField' 
                        label         = 'Password'
                        variant       = 'outlined'
                        type          = { isConfirmPasswordVisible ? 'text' : 'password' }
                        value         = { getPassword }
                        error         = { isConfirmPasswordError }
                        helperText    = { confirmPasswordErrorDesc }
                        onChange={(e) => { getInputPassword(e.target.value)}}
                        InputProps={{
                          // startAdornment:(
                          //   <InputAdornment position = "start">
                          //     <LockIcon />
                          //   </InputAdornment>
                          // ),
                          endAdornment  : (
                            <InputAdornment position="end">
                              <IconButton
                                aria-label  = "toggle password visibility"
                                onClick     = {handleClickShowConfirmPassword}
                                edge        = 'start'>
                                { isConfirmPasswordVisible ? <Visibility /> : <VisibilityOffIcon /> }
                              </IconButton>
                            </InputAdornment>
                          ),
                                    // classes: {
                                    //   notchedOutline    : classes.textInputTheme
                                    // },
                                    style: {
                                      // color             : colors.TEXT_BLACK_GRAY,
                                      // backgroundColor   : colors.WHITE,
                                      // borderRadius      : '8px 8px 8px 8px',
                                    }
                }}/>
            <Box sx={{ 
                    display: 'flex',
                    justifyContent:'flex-end',
                    marginTop: 2,
                    flexDirection:'row'}}>
            <Typography sx={{paddingRight: 2}}>Don't have an account?</Typography>
            <Link href="/register" underline="none">{'Register Here!'}</Link>
            </Box>
     
            <Button id='login' variant="contained" onClick={(e) => handleClick(e)} sx={{marginTop: 10}}>Login</Button>
    
       
        {/* <Button id='userList' onClick={(e) => handleClickList(e)} sx={{marginTop: 10}}>UserList</Button> */}
    </Box>
  )
}

export default Login