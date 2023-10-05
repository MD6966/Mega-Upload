import { Box, Button, styled, useTheme, useThemeProps } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import { Outlet } from 'react-router-dom/dist'
const StyledLogin = styled(Button)(({theme})=>({
  marginLeft:'2rem',
  background:theme.palette.secondary.main,
  fontSize:'13px',
  borderRadius:'20px',
  fontWeight:'bold',
  letterSpacing:1,
  width:'90px',
  height:'38px',
  '&:hover': {
    background:theme.palette.secondary.main
  }
}))
const StyledSignUp = styled(Button)(({theme})=>({
  marginLeft:'1rem',
  background:'#fff',
  fontSize:'13px',
  borderRadius:'20px',
  fontWeight:'bold',
  letterSpacing:1,
  width:'90px',
  height:'38px',
  '&:hover': {
    background:'#fff'
  }
}))
const NavBarLinks = () => {
  const theme = useTheme()
  return (
    <div>
      <Button sx={{
        color:'#fff',
        fontWeight:'bold',
        fontSize:"13px",
        '&:hover': {
          color:theme.palette.secondary.main
        }
      }}>
        Make Money
      </Button>
      <Button sx={{
        color:'#fff',
        fontWeight:'bold',
        fontSize:"13px",
        '&:hover': {
          color:theme.palette.secondary.main
        }
      }}>
        Proof Of Payments
      </Button>
          <StyledLogin variant='contained'
          component={Link}
          to="/"
          >
            Login
          </StyledLogin>
          <StyledSignUp
          component={Link}
          to="/signup"
          >
            Sign Up
          </StyledSignUp>
    </div>
  )
}

export default NavBarLinks
