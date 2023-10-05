import { FormControl, InputLabel, Button, Box, Grid, Hidden, 
  Typography, TextField, Divider, InputAdornment,IconButton, Dialog, DialogTitle, DialogContent, DialogActions  } from '@mui/material';
import OutlinedInput from '@mui/material/OutlinedInput';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import './App.css'
import Page from '../components/page/page';
import Nav from '../components/AppBar/Header'
const initialValues = {
  email:'',
  password:''
}
const Login = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [formValues, setFormValues] = React.useState(initialValues)
  const [open, setOpen] = React.useState(false)
  const [email, setEmail] = React.useState('')
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const dispatch = useDispatch()
  const handleChange =(e) => {
    const {name,value} = e.target
    setFormValues({...formValues, [name]:value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(formValues)
  }
  const handleChangeEmail = (e) => {
    setEmail(e.target.value)
  }
  const handleSubmitEmail = (e) => {
    e.preventDefault()
  }
  return (<Page
  title="Login"
  >
    <Nav />
    
  
    <Box className="container" >
      <Box className='neumorphism'>
     <Grid container>
      <Grid item
      className="Grid1"
      xs={6}
      sm={6}
      md={6}
      lg={6}
      xl={6} >
        <Box sx={{display:'flex', justifyContent:'center', p:5}}>
          <Box>
          <img src="/assets/images/logo-dark.png"/>
          </Box>
        </Box>
        <Box style={{padding: '0px 10px'}}>
          <form onSubmit={handleSubmit}>
          <TextField fullWidth label='Email' className='inputField' 
          name="email" value={formValues.email} onChange={handleChange} required type='email' 
          />
           <FormControl sx={{ mt:2}} variant="outlined" fullWidth>
          <InputLabel htmlFor="outlined-adornment-password"
          >Password</InputLabel>
          <OutlinedInput
          required
          name="password"
          value={formValues.password}
          onChange={handleChange}
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
          <Typography sx={{mt:1, textAlign:'right',fontSize:'14px', mr:1, cursor:'pointer'}}
          onClick={()=>setOpen(true)}
          >
            Forgot Password?
          </Typography>
          <Box sx={{p:2, }}>
              <Button variant='contained' fullWidth sx={{background:'#ff5a6e'}} type='submit'>
                Login
              </Button>
          </Box>
            

          </form>
        </Box>
      </Grid>
      <Hidden smDown>
      <Grid item
      className="Grid2"
      xs={6}
      sm={6}
      md={6}
      lg={6}
      xl={6} >
        <Box className="box">
          <Box sx={{mt:'30%'}}>
          <Typography sx={{fontSize:'3rem', textAlign:'center', fontWeight:'bold', color:'#fff'}}>Login</Typography>
        <Typography style={{color:'#ffffff', fontSize:'1.25rem',}}>Hello!. Glad to see you again </Typography> 
        <Box>
          <Divider sx={{mt:1, borderColor:'#fff'}}/>
          <Box sx={{display:'flex', alignItems:'center', justifyContent:'center'}}>
          <Box>
          <Typography sx={{mt:3, color:"#fff"}}>New User? </Typography>
          </Box>
          <Box sx={{mt:2, ml:2}}>
          <Button variant='outlined'
          sx={{
            borderColor:'#fff',
            color:'#fff',
            '&:hover': {
              background:'#FF5A6E',
            }
          }}
          >Register here</Button>
          </Box>
          </Box>
        </Box>
        
          </Box>
        </Box>
      </Grid>
      </Hidden>
     </Grid>
      </Box>
       </Box>  
  
       <Dialog open={open} onClose={()=>setOpen(false)} fullWidth>
        <form onSubmit={handleSubmitEmail}>
        <DialogTitle>
          Forgot Password
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Typography sx={{mb:2}}>
            Enter the email address associated with your account and we'll send you a link to reset your password
          </Typography>
            <TextField 
            fullWidth
            required
            label="Email Address"
            placeholder='eg: john@abc.com'
            onChange={handleChangeEmail}
            name='email'
            value={email}
            type='email'
            />
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button variant='outlined'
          onClick={()=>setOpen(false)}
          >
            Cancel
          </Button>
          <Button variant='contained'
          type='submit'
          >
            Send
          </Button>
        </DialogActions>
            </form>
       </Dialog>
  
  </Page>
  )
}

export default Login;
    