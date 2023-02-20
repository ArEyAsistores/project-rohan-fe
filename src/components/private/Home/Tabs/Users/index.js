import React, { Component } from 'react';
import { Box } from '@mui/system';
import Table from './table';


class Users extends Component{
    // constructor(props) {
    //     super(props);
    //   }

  render(){
    return (
        <Box  sx={{ height: '60vh', width: '75vw', }}>
         <Table/>
        </Box>
      )
  }
}

export default Users