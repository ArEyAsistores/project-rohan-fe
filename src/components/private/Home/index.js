import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import DescriptionIcon from '@mui/icons-material/Description';
import Users from './Tabs/Users';
import Register from '../../public/registration';
import jwtDecode from 'jwt-decode';
import LogoutIcon from '@mui/icons-material/Logout';
const drawerWidth = 240;

export const Home = () => {
  const tabs = ['Dashboard','Users', `Courses`];
  const [currentTab, setCurrentTab ] = useState('Home');
  const userToken = jwtDecode(localStorage.getItem('token')).sub;
  const userRole = jwtDecode(localStorage.getItem('token')).roles[0].toLowerCase();

  const onChangeTab = (tab) => {
    setCurrentTab(tab);
  }

  return (
    <Box sx={{ display: 'flex', }}>
      <AppBar elevation={0}
              position="fixed"
              sx={{ width: `calc(100% - ${drawerWidth}px)`, 
                    ml: `${drawerWidth}px`, 
                    backgroundColor: '#FFFFFF'
                  }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" color={'#674188'}>
            {currentTab}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{ width: drawerWidth,
              flexShrink: 0,
              backgroundColor: '#FFFFFF',
              '& .MuiDrawer-paper': {
                width: drawerWidth,
                boxSizing: 'border-box',
                borderWidth: 0,
              },
        }}
        variant="permanent"
        anchor="left"
      >
        {/* <Toolbar sx={{backgroundColor: '#EEE9DA',}} /> */}
        <Box sx={{ 
                  position: 'absolute',
                  height:'100%',
                  width:'100%', 
                  zIndex:-1, 
                  backgroundColor:'#FFFFFF', 
                  paddingTop: '55px',
                  paddingBottom:'25px'}}>
          <Typography variant="h8" 
                      sx={{ display: 'flex',
                            color: '#674188',
                            alignSelf:'flex-start',
                            marginLeft: '20px',}}>
              {userToken}
          </Typography>
          <Typography variant="h8" 
                      sx={{ color:'#C3ACD0',
                            display: 'flex', 
                            alignSelf:'flex-start', 
                            marginLeft: '20px', 
                            marginBottom: '25px'
                            }}>
              {userRole}
          </Typography>
        </Box>
        <Box sx={{ backgroundColor: '#F7EFE5', 
                   height: '100%', 
                   display: 'flex', 
                   flexDirection:'column',
                   marginTop: '140px',
                   paddingTop:'55px',
                   borderTopRightRadius:25,
                   borderTopLeftRadius: 25,
                   }}  >
       
        <List>
          {tabs.map((tab, index) => (
            <ListItem key={tab} disablePadding onClick={() =>{ onChangeTab(tab)}} sx={{color:'#674188'}}>
              <ListItemButton>
                <ListItemIcon onClick={() =>{ onChangeTab(tab)}} sx={{color:'#674188'}} >
                  { index % 2 === 0 ?  <DescriptionIcon /> : <AccountBoxIcon /> }
                </ListItemIcon>
                <ListItemText primary={tab} />
              </ListItemButton>
              { tab === currentTab &&  <Box sx={{ height:15, 
                                                  width:30,
                                                  borderTopLeftRadius:10, 
                                                  borderBottomLeftRadius: 10, 
                                                  backgroundColor:'#FFFFFF'}}/> }
            </ListItem>
            
          ))}
        </List>
        <Divider sx={{display:'flex', flexDirection:'column', marginTop: 'auto'}}/>
        <List >
          {['Logout'].map((text, index) => (
            <ListItem key={text} disablePadding  sx={{color:'#E90064'}}>
              <ListItemButton >
                <ListItemIcon  sx={{color:'#E90064'}} >
                  <LogoutIcon/>
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> 
        </Box>
      </Drawer>

      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: '#FFFFFF', p: 3 }}
      >
      <Toolbar />
            {
              currentTab === `Courses`? <Register/> : <Users/>
            }
      </Box>
    </Box>
  );
}
export default Home
