import { Button, TextField } from '@mui/material';
import React, { useRef, useState, useEffect } from 'react';
import { Box, AppBar, Toolbar, styled, Typography, Stack } from '@mui/material';
import Page from '../components/page/page';
import { useNavigate, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { resendOTP, verifyOTP } from '../store/actions/authActions';
import { useSnackbar } from 'notistack';
import { HashLoader } from 'react-spinners';
import { updateResend, updateTimer } from '../store/actions/timerActions';

const StyledRoot = styled('div')(({ theme }) => ({
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const OTP = () => {
  const { id } = useParams();
  const inputRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];
  const [otpValue, setOTPValue] = useState('');
  const [loading, setLoading] = useState(false);

  const remainingTime = useSelector((state) => state.timer.remainingTime);
  const resendDisabled = useSelector((state) => state.timer.resendDisabled);
  const resendAttempts = useSelector((state) => state.timer.resendAttempts);


  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const handleInputChange = (e, index) => {
    const value = e.target.value;
    if (value.length === 1) {
      if (index < inputRefs.length - 1) {
        inputRefs[index + 1].current.focus();
      }
      const newOTPValue = otpValue.slice(0, index) + value + otpValue.slice(index + 1);
      setOTPValue(newOTPValue);
    }
  };
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedValue = e.clipboardData.getData('text');
    const pastedOTP = pastedValue.slice(0, inputRefs.length);

    for (let i = 0; i < inputRefs.length; i++) {
      const inputRef = inputRefs[i];
      inputRef.current.value = pastedOTP[i];
      handleInputChange({ target: { value: pastedOTP[i] } }, i);
    }
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
          variant: 'success',
        });
        navigate('/home', { replace: true });
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
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

        setOTPValue('');

        const emptyRefs = Array(inputRefs.length).fill('');
        inputRefs.forEach((ref, index) => {
          ref.current.value = emptyRefs[index];
        });
      });
  };

  const handleResendOTP = () => {
    if (resendAttempts < 3) {
      dispatch(updateResend(true, resendAttempts + 1));
      dispatch(updateTimer(60));
  
      setTimeout(() => {
        dispatch(updateResend(false, resendAttempts + 1));
        dispatch(updateTimer(0));
      }, 60000);
  
      dispatch(resendOTP(id))
        .then((result) => {
          enqueueSnackbar(result.data.message, {
            variant: 'success',
          });
        })
        .catch((err) => {
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
    } else {
      dispatch(updateResend(true, resendAttempts));
      dispatch(updateTimer(3600));
      setTimeout(() => {
        dispatch(updateResend(false, 0));
        dispatch(updateTimer(0));
      }, 3600000);
    }
  };

  useEffect(() => {
    if (remainingTime > 0) {
      const timer = setInterval(() => {
        dispatch(updateTimer(remainingTime - 1));
      }, 1000);

      return () => {
        clearInterval(timer);
      };
    } else {
      dispatch(updateResend(false, resendAttempts));
    }
  }, [remainingTime]);
  // console.log(resendDisabled)
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
                    onPaste={handlePaste}
                    variant="standard"
                    margin="normal"
                    fullWidth
                    inputProps={{ maxLength: 1, style: { textAlign: 'center' }, inputMode: 'numeric' }}
                    style={{ textAlign: 'center', width: '50px' }}
                  />
                </div>
              ))}
            </div>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              {loading ? (
                <Button variant='disabled' sx={{ height: '50px', width: '150px' }}>
                  <HashLoader
                    color="#353B48"
                    loading={loading}
                    size={30}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </Button>
              ) : (
                <Button variant='contained' sx={{ height: '50px', width: '150px' }} type='submit'>
                  Validate
                </Button>
              )}
            </Box>
            {resendDisabled ? (
            <Typography
            textAlign="center"
            sx={{ mt: 2, fontWeight: 'bold', cursor: 'pointer', userSelect: 'none' }}
          >
            Resend after: {String(Math.floor(remainingTime / 60)).padStart(2, '0')}:
            {String(remainingTime % 60).padStart(2, '0')}
          </Typography>
            ) : (
              <Typography
                textAlign="center"
                sx={{ mt: 2, fontWeight: 'bold', cursor: 'pointer', userSelect: 'none' }}
                onClick={handleResendOTP}
              >
                Resend One-Time-Password
              </Typography>
            )}
          </form>
        </Stack>
      </StyledRoot>
    </Page>
  );
};

export default OTP;
