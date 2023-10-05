import { Box, Grid, TextField, styled } from '@mui/material'
import React from 'react'
import Page from '../components/page/page'
import Nav from '../components/AppBar/Header'

const StyledRoot = styled(Box)(({theme})=>({
  minHeight:'100vh',
  display:'flex',
  justifyContent:'center',
  alignItems:'center'
}))

const SignUp = () => {
  return (
    <Page
    title="Sign Up"
    >
      <Nav />
      <StyledRoot>
        <Grid container>
          <Grid item
          xs={12}
          md={6}
          lg={6}
          >
            <Box
            sx={{p:4}}
            >
                <TextField label="Name" fullWidth/>
                <TextField label="Email" fullWidth/>

            </Box>
          </Grid>
          <Grid item
          xs={12}
          md={6}
          lg={6}
          >
            This is Grid 2
          </Grid>
        </Grid>
      </StyledRoot>
    </Page>
  )
}

export default SignUp
