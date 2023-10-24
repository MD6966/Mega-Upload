import React from 'react'
import { Button, styled, TextField, Stack   } from '@mui/material'
import { RotatingLines } from 'react-loader-spinner'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from 'react-redux'
import { adminLogin } from '../../../store/actions/adminActions'
const StyledButton = styled(Button)(({theme})=> ({
    margin:'10px 0',
    background:theme.palette.primary.main,
    '&:hover' : {
        background:theme.palette.secondary.main
    }
}))
const initialValues = {
    email:'',
    password:'',
    role:'admin'
}
const AdminLoginForm = () => {
    const handleChange = (e) => {
        const {name, value} = e.target
        setFormValues({...formValues, [name]:value})
    }
    const navigate = useNavigate()
    const { enqueueSnackbar } = useSnackbar();
    const [formValues, setFormValues] = React.useState(initialValues)
    const [loading, setLoading] = React.useState(false)
    const dispatch = useDispatch()
    const handleSubmit = (e) => {
        setLoading(true)
        dispatch(adminLogin(formValues)).then((res)=> {
            if(res.status == 200) {
                setLoading(false)
                navigate('/admin/dashboard')
            }
        }).catch((err)=>{
            // console.log(err)
            setLoading(false)
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
        })
        // setLoading(true)
        e.preventDefault()
        // console.log(formValues)
    }
    
  return (
    <form onSubmit={handleSubmit}>

        <Stack>
       <TextField label='Email' sx={{mb:'1rem', width:'350px',}} 
       name='email'  value={formValues.email} onChange={handleChange} required
       autoComplete='off'
       />
        <TextField label='Password' sx={{mb:'1rem', width:'350px',}} 
        name='password' value={formValues.password} onChange={handleChange} required 
       autoComplete='off'
       type="password" />
        {
          loading ? <StyledButton type='submit' variant='disabled'>    <RotatingLines
          strokeColor="white"
          strokeWidth="5"
          animationDuration="0.75"
          width="30"
          visible={loading}/> </StyledButton> :
          <StyledButton type='submit' sx={{color:'#fff'}}
          > Login </StyledButton>
        }
        
        </Stack>
        </form>
  )
}

export default AdminLoginForm
