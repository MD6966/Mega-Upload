import React from 'react'
import { Box, AppBar, Toolbar, styled, 
    Typography, Stack } from '@mui/material'
import Page from '../components/page/page'
import ResetPasswordForm from './ResetPasswordForm'
const StyledRoot = styled('div')(({theme})=> ({
    // backgroundImage: Gradients.Custom,
    height:'100vh',
    display:'flex',
    justifyContent:'center',
    alignItems:'center'
    
  }))
const StyledAppBar = styled(AppBar)(({theme})=> ({
    background:theme.palette.primary.main,
    position:'fixed',
  
  }))
  const StyledToolbar = styled(Toolbar)(({theme})=> ({
    display:'flex',
    justifyContent:'space-between'
   }))
const ResetPassword = () => {
  return (
    <Page
    title="Reset Password"
    >
 <StyledRoot>
     <Stack>
         
         <Typography variant='h4' sx={{textAlign:'center', fontWeight:'bold'}}> Reset Your Password </Typography>
                <ResetPasswordForm />
           
     </Stack>
 </StyledRoot>
    </Page>
  )
}

export default ResetPassword
