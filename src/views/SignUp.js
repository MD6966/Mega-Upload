import { Box, Grid, TextField, styled, FormControl,InputLabel,OutlinedInput,InputAdornment,IconButton, Typography, Button, FormControlLabel, Checkbox } from '@mui/material'
import React from 'react'
import Page from '../components/page/page'
import Nav from '../components/AppBar/Header'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import formAnimation from './form.json'
import Lottie from 'react-lottie'
import { Link, useNavigate } from 'react-router-dom';

const StyledRoot = styled(Box)(({theme})=>({
  minHeight:'100vh',
  display:'flex',
  justifyContent:'center',
  alignItems:'center'
}))

const initialValues = {
  name:'',
  email:'',
  password:''
}

const SignUp = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [formValues, setFormValues] = React.useState(initialValues)
  const [checked, setChecked] = React.useState(false)
  const navigate = useNavigate()
  const handleChangeCheck = (event) => {
    setChecked(event.target.checked);
  };
  const handleChange =(e) => {
    const {name,value} = e.target
    setFormValues({...formValues, [name]:value })
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/verify-otp')
    console.log(formValues)
  }
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: formAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };
  return (
    <Page
    title="Sign Up"
    >
      <Nav />
      <StyledRoot>
        <Box>

        <Typography variant='h3' textAlign="center" fontWeight="bold">
          Register Now
        </Typography>
        <Grid container>
          <Grid item
          xs={12}
          md={6}
          lg={6}
          >
            <Box
            sx={{p:4, mt:3}}
            >
              <form autoComplete='off' onSubmit={handleSubmit}>

                <TextField label="Name" fullWidth sx={{mb:2}} name='name' value={formValues.name} onChange={handleChange} required/>
                <TextField label="Email" fullWidth sx={{mb:2}} name='email' value={formValues.email} onChange={handleChange} required type='email'/>
                <FormControl sx={{ mb:2}} variant="outlined" fullWidth>
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
        <FormControlLabel control={<Checkbox  checked={checked}
  onChange={handleChangeCheck}/>} label={
          <Typography>
            I agree to the 
            <span style={{marginLeft:3, marginRight:3}}>
            <Link>
            Terms and Conditions 
            </Link>
            </span>
            of this site.
          </Typography>
        }/>
              <Button variant={checked ? 'contained' : 'disabled'} fullWidth sx={{height:'40px', mt:2}} type='submit'>
                Register
              </Button>
          </form>
            </Box>
          </Grid>
          <Grid item
          xs={12}
          md={6}
          lg={6}
          >
              <Lottie 
	    options={defaultOptions}
        height={400}
        width={400}
        />
          </Grid>
        </Grid>
        </Box>
      </StyledRoot>
    </Page>
  )
}

export default SignUp
