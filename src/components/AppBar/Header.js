import { AppBar, Toolbar, Box, useThemeProps, useTheme, styled } from '@mui/material'
import React from 'react'
import NavBarLinks from '../../layouts/Landing/NavBarLinks'

const Image = styled('img')(({theme})=> ({
  height:'50px',
  [theme.breakpoints.down('md')]: {
    height:'30px'
  },
  [theme.breakpoints.down('sm')]: {
    height:'20px'
  }
}))
const Header = () => {
  const theme=useTheme()
  return (
    <div>
      <AppBar position='static' sx={{
        [theme.breakpoints.up('md')]: {
          pl:5, pr:5
        }
      
      }}>
        <Toolbar>
            <Image src="/assets/images/logo.png" />
            <Box style={{marginLeft:'auto'}}>
            <NavBarLinks  /> 
            </Box>
        </Toolbar>
        </AppBar> 
    </div>
  )
}

export default Header
