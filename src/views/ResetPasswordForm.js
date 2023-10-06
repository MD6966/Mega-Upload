import { Button, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, Stack, TextField, styled } from '@mui/material'
import React from 'react'
import { HashLoader } from 'react-spinners'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate, useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { resetPassword } from '../store/actions/authActions';
import { useSnackbar } from 'notistack';
const StyledButton = styled(Button)(({theme})=> ({
    margin:'10px 0',
    background:theme.palette.primary.main,
    '&:hover' : {
        background:theme.palette.secondary.main
    }
}))
const initialValues = {
    password:'',
    password_confirmation:'',

}

const ResetPasswordForm = () => {
    const {token} = useParams()
    // console.log(token)
    const dispatch = useDispatch()
    const [formValues, setFormValues] = React.useState(initialValues)
    const [loading, setLoading] = React.useState(false)
    const [showPassword, setShowPassword] = React.useState(false);
    const [showPassword1, setShowPassword1] = React.useState(false);
    const {enqueueSnackbar} = useSnackbar()
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowPassword1 = () => setShowPassword1((show) => !show);
    const navigate = useNavigate()

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
    const handleChange = (e) => {
        const {name, value} = e.target
        setFormValues({...formValues, [name]:value})
    }
    const handleSubmit = (e) => {
        setLoading(true)
        e.preventDefault()
        const updatedValues ={
            ...formValues,
            token:token
        }
        dispatch(resetPassword(updatedValues)).then((result) => {
            setLoading(false)
            enqueueSnackbar(result.data.message, {
                variant:'success'
            })
            navigate('/')
            
        }).catch((err) => {
            setLoading(false)
            console.log(err)
            Object.values(err.response.data.data).map((array) => {
                array.forEach((item) => {
                    enqueueSnackbar(item, {
                        variant:'error'
                    });
                });
              });
        });
        
    }
  return (
    <form onSubmit={handleSubmit}>

        <Stack>
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
        <FormControl sx={{ mt:2}} variant="outlined" fullWidth>
          <InputLabel htmlFor="outlined-adornment-password"
          >Confirm Password</InputLabel>
          <OutlinedInput
          required
          name="password_confirmation"
          value={formValues.password_confirmation}
          onChange={handleChange}
            id="outlined-adornment-password"
            type={showPassword1 ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword1}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword1 ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Confirm Password"
          />
        </FormControl>
       
        {
          loading ? <Button variant='disabled' sx={{mt:1}}>     <HashLoader
          color="#353B48"
          loading={loading}
          size={30}
          aria-label="Loading Spinner"
          data-testid="loader"
    /> </Button> :
          <StyledButton type='submit' sx={{color:'#fff'}}
          > Reset  </StyledButton>
        }
        
        </Stack>
        </form>
  )
}

export default ResetPasswordForm
