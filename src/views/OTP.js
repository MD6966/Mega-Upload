import { Button, TextField } from '@mui/material';
import React, { useRef, useState } from 'react';
import { Box, AppBar, Toolbar, styled, Typography, Stack } from '@mui/material';
import Page from '../components/page/page';
const StyledRoot = styled('div')(({ theme }) => ({
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

const OTP = () => {
  const inputRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];
  const [otpValue, setOTPValue] = useState('');

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
    e.preventDefault()
    console.log('Complete OTP:', otpValue);
  };

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
            <Button variant='contained' sx={{ height: '50px', width: '150px' }} type='submit'>
              Validate
            </Button>
          </Box>
          <Typography textAlign="center" sx={{ mt: 2, fontWeight: 'bold', cursor: 'pointer' }}>
            Resend One-Time-Password
          </Typography>
        </form>
      </Stack>
    </StyledRoot>
            </Page>
  );
};

export default OTP;
