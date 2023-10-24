import { Box, Grid, TextField, styled, FormControl,InputLabel,OutlinedInput,InputAdornment,IconButton, Typography, Button, FormControlLabel, Checkbox, FormHelperText, useTheme } from '@mui/material'
import React from 'react'
import Page from '../components/page/page'
import Nav from '../components/AppBar/Header'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import formAnimation from './form.json'
import Lottie from 'react-lottie'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../store/actions/authActions';
import { useSnackbar } from 'notistack';
import {HashLoader} from "react-spinners";

const StyledRoot = styled(Box)(({theme})=>({
  minHeight:'100vh',
  display:'flex',
  justifyContent:'center',
  alignItems:'center'
}))

const initialValues = {
  email:'',
  password:'',
  role:'user'
}

const SignUp = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [passwordError, setPasswordError] = React.useState('')
  const [formValues, setFormValues] = React.useState(initialValues)
  const [checked, setChecked] = React.useState(false)
  const [loading , setLoading] = React.useState(false)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {enqueueSnackbar} = useSnackbar()
  const theme = useTheme()
  const handleChangeCheck = (event) => {
    setChecked(event.target.checked);
  };
 
    const handleChange = (e) => {
      const { name, value } = e.target;
      if (name === 'password' && value.length < 8) {
        setPasswordError('Password must be at least 8 characters long');
        setFormValues({ ...formValues, [name]: value });

      } else {
        setPasswordError('');
        setFormValues({ ...formValues, [name]: value });
      }
    };

  const handleSubmit = (e) => {
    setLoading(true)
    e.preventDefault()
    dispatch(registerUser(formValues)).then((result) => {
      setLoading(false)
      setFormValues(initialValues)
      setChecked(false)
      // console.log(result.data.data.id)
      enqueueSnackbar(result.data.message, {
        variant:'success'
      })
      navigate(`/verify-otp/${result.data.data.user.id}`, {replace:true})
    }).catch((err) => {
      setLoading(false)
      // console.log(err.response.data.data.email[0])
      if(err.response.data.message == 'validation_error') {
        const errorData = err.response.data.data;
        const errorMessage = Object.values(errorData).map((errorArray)=> errorArray[0]).join(', ')
        enqueueSnackbar(errorMessage, {
            variant: 'error',
        });
    }
    else
    enqueueSnackbar(err.response.data.message, {
        variant:'error'
    })
    });
    // navigate('/verify-otp')
    // console.log(formValues)
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

        <Typography variant='h3' textAlign="center" fontWeight="bold"
        sx={{
          [theme.breakpoints.down('sm')]:
          {
            fontSize:'35px'
          }
        }}
        >
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
           <FormHelperText sx={{color:'red'}}>{passwordError}</FormHelperText>
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
        {
  passwordError ? (
    <Button disabled fullWidth sx={{ height: '40px', mt: 2 }}>
      Register
    </Button>
  ) : (
    loading ? (
      <Button
      variant="disabled"
      fullWidth
      sx={{ height: '40px', mt: 2 }}
    >
       <HashLoader
        color="#353B48"
        loading={loading}
        size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </Button>
     
    ) : (
      <Button
        variant={checked ? 'contained' : 'disabled'}
        fullWidth
        sx={{ height: '40px', mt: 2 }}
        type="submit"
      >
        Register
      </Button>
    )
  )
}
             
          </form>
            </Box>
          </Grid>
          <Grid item
          sx={{[theme.breakpoints.down('md')]:{
            display:'none'
          }}}
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
