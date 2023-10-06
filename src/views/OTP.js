import { Button, TextField } from '@mui/material';
import React, { useRef, useState } from 'react';
import { Box, AppBar, Toolbar, styled, Typography, Stack } from '@mui/material';
import Page from '../components/page/page';
import {useNavigate, useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { resendOTP, verifyOTP } from '../store/actions/authActions';
import { useSnackbar } from 'notistack';
import { HashLoader } from 'react-spinners';
const StyledRoot = styled('div')(({ theme }) => ({
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const OTP = () => {
  const {id} = useParams()
  // console.log(id)
  const inputRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];
  const [otpValue, setOTPValue] = useState('');
  const [loading, setLoading] = React.useState(false)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {enqueueSnackbar} = useSnackbar()
  const [resendDisabled, setResendDisabled] = useState(false);
  const [remainingTime, setRemainingTime] = useState(0);
  const handleInputChange = (e, index) => {
    const value = e.target.value;
    if (value.length === 1) {
      if (index < inputRefs.length - 1) {
        inputRefs[index + 1].current.focus();
      }
    }
    const newOTPValue = otpValue.slice(0, index) + value + otpValue.slice(index + 1);
    setOTPValue(newOTPValue);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && index > 0 && e.target.value === '') {
      inputRefs[index - 1].current.focus();
    }
  };
  const handleValidate = (e) => {
    setLoading(true);
    e.preventDefault();
    dispatch(verifyOTP(id, otpValue))
      .then((result) => {
        enqueueSnackbar(result.data.message, {
          variant:'success'
        });
        navigate('/home', {replace:true})
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        enqueueSnackbar(err.response.data.message, {
          variant: 'error',
        });
  
        setOTPValue('');
  
        const emptyRefs = Array(inputRefs.length).fill('');
        inputRefs.forEach((ref, index) => {
          ref.current.value = emptyRefs[index];
        });
      });
  };
  

  const handleResendOTP = () => {
    setResendDisabled(true);
    setRemainingTime(60);

    const timerId = setTimeout(() => {
      setResendDisabled(false);
      setRemainingTime(0);
    }, 60000);

    dispatch(resendOTP(id)).then((result) => {
      enqueueSnackbar(result.data.message, {
        variant: 'success',
      });
    }).catch((err) => {
      console.log(err);
    });
  };

  React.useEffect(() => {
    if (remainingTime > 0) {
      const timer = setInterval(() => {
        setRemainingTime((prevTime) => prevTime - 1);
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    }
  }, [remainingTime]);

  return (
    <Page title="OTP">
    <StyledRoot>
      <Stack>
        <Typography variant="h4" sx={{ textAlign: 'center', fontWeight: 'bold' }}>
            Please enter One-Time-Password to verify your account
        </Typography>
        <Typography sx={{ textAlign: 'center', mb: '1rem' }}>
          One-Time-Password has been sent to your email
        </Typography>
        <form onSubmit={handleValidate}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {inputRefs.map((ref, index) => (
              <div key={index} style={{ display: 'flex', justifyContent: 'center', marginRight: 5 }}>
                <TextField
                  required
                  inputRef={ref}
                  onChange={(e) => handleInputChange(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  variant="standard"
                  margin="normal"
                  fullWidth
                  type="text"
                  inputProps={{ maxLength: 1, style: { textAlign: 'center' } }}
                  style={{ textAlign: 'center', width: '50px' }}
                />
              </div>
            ))}
          </div>
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            {
              loading? 
              <Button variant='disabled' sx={{ height: '50px', width: '150px' }}>
               <HashLoader
              color="#353B48"
              loading={loading}
              size={30}
              aria-label="Loading Spinner"
              data-testid="loader"
        />
            </Button>
              :

            <Button variant='contained' sx={{ height: '50px', width: '150px' }} type='submit'>
              Validate
            </Button>
            }
          </Box>
          {
            resendDisabled ? <Typography
            textAlign="center"
            sx={{ mt: 2, fontWeight: 'bold', cursor: 'pointer',userSelect: 'none' }}
            >
              Resend after: 00:{remainingTime}
            </Typography>
            :

          <Typography
      textAlign="center"
      sx={{ mt: 2, fontWeight: 'bold', cursor: 'pointer',userSelect: 'none' }}
      onClick={handleResendOTP}
    >
   Resend One-Time-Password
    </Typography>
          }
        </form>
      </Stack>
    </StyledRoot>
            </Page>
  );
};

export default OTP;
