import { AppBar, Toolbar, Box } from '@mui/material'
import React from 'react'
import NavBarLinks from '../../layouts/Landing/NavBarLinks'

const Header = () => {
  return (
    <div>
      <AppBar position='static' sx={{pl:5, pr:5}}>
        <Toolbar>
            <img src="/assets/images/logo.png" style={{height:'50px'}}/>
            <Box style={{marginLeft:'auto'}}>
            <NavBarLinks  /> 
            </Box>
        </Toolbar>
        </AppBar> 
    </div>
  )
}

export default Header
